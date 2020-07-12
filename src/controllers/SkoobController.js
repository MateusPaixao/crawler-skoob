const puppeteer = require("puppeteer")

const { URI_BOOK_MAP, SELECTOR_REVIEWS, SELECTOR_REVIEWS_COUNT } = require("../config/constants")

module.exports = {
        index: (request, response) => {
            return response.json({ message: 'Hi there, netlify functions work!' })
        },
        search: async (request, response) => {
            const { key, page } = request.query
            const pagination = page ? page : 1

            const bookSelected = URI_BOOK_MAP.find(book => book.key == key)
            
            if (!bookSelected){
                return response.status(400).json({ message: 'Book not found with this key' })
            }

            const browser = await puppeteer.launch()
            const frame = await browser.newPage()

            frame.on('console', msg => {
                for (let i = 0; i < msg.args().length; ++i)
                    console.log(`${i}: ${msg.args()[i]}`);
            });

            await frame.goto(`${bookSelected.URI}/mpage:${pagination}`)

            try{
                await frame.waitForSelector(SELECTOR_REVIEWS, { timeout: 45000 })
            }catch(error){
                return response.status(404).json({ message: 'Page not found' })
            }

            const list = await frame.evaluate(SELECTOR_REVIEWS => {
                const NodeList = document.querySelectorAll(SELECTOR_REVIEWS)
                let content = Array.from(NodeList)
                return content.map(element => {

                    let boxReview = element.children[1].children[2]

                    if (boxReview) {
                        let resenha = Array.from(boxReview.children[1].children[0].childNodes)
                        let rate = boxReview.children[0].children[0].children[0].getAttribute("rate")
                        let [name] = resenha.slice(0, 1)
                        let [date] = resenha.slice(1, 2)

                        let userElement = element.children[1].children[0].children[0]

                        let user = {
                            name: userElement.getAttribute('tooltip'),
                            avatar: userElement.children[0].src,
                            link: 'https://www.skoob.com.br/'+userElement.getAttribute('href')
                        }

                        resenha.splice(0, 2)

                        let text = resenha.map(el => el.textContent).join(' ').trim()

                        return { 
                            user,
                            review: {
                                name: name ? name.textContent.trim() : 'Anônimo',
                                date: date ? date.textContent.trim() : '',
                                rate: Number(rate),
                                text
                            }
                        }
                    }         

                }).filter(review => review) // remove nulls
                
            }, SELECTOR_REVIEWS)
            
            let totalReviews = await frame.evaluate(SELECTOR_REVIEWS_COUNT => {
                const element = document.querySelector(SELECTOR_REVIEWS_COUNT)
                return Number(element.innerText.split(' ')[0])
            }, SELECTOR_REVIEWS_COUNT)

            const reviews = {
                book: bookSelected.title,
                page: `${pagination}/${Math.round(totalReviews / 15)}`,
                count: list.length,
                total: totalReviews,
                list
            }

            return response.json({ reviews })
        }
}