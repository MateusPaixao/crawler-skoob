const URI_BOOK_MAP = [
    { key: 'o-vale-dos-mortos', title: 'O Vale dos Mortos', URI: 'https://www.skoob.com.br/livro/resenhas/296313/edicao:332009' },
    { key: 'a-batalha-dos-mortos', title: 'A Batalha dos Mortos', URI: 'https://www.skoob.com.br/livro/resenhas/400997/edicao:454362' },
    { key: 'elevador-16', title: 'Elevador 16', URI: 'https://www.skoob.com.br/livro/resenhas/371385/edicao:419134' },
    { key: 'a-senhora-dos-mortos', title: 'A Senhora dos Mortos', URI: 'https://www.skoob.com.br/livro/resenhas/432811/edicao:490341' },
    { key: 'a-ilha-dos-mortos', title: 'A Ilha dos Mortos', URI: 'https://www.skoob.com.br/livro/resenhas/574460/edicao:575333' },
    { key: 'a-era-dos-mortos-1', title: 'A Era dos Mortos - Parte 1', URI: 'https://www.skoob.com.br/livro/resenhas/745718/edicao:748679' },
    { key: 'a-era-dos-mortos-2', title: 'A Era dos Mortos - Parte 2', URI: 'https://www.skoob.com.br/livro/resenhas/786063/edicao:791100' },
]

const SELECTOR_REVIEWS = '#perfil-conteudo-intern div[id^="resenha"]'
const SELECTOR_REVIEWS_COUNT = '.contador b'

module.exports = {
    URI_BOOK_MAP,
    SELECTOR_REVIEWS,
    SELECTOR_REVIEWS_COUNT
}