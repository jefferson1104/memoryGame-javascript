class MemoryGame {
  constructor ({ screen }) {
    this.screen = screen

    this.initialHeroes = [
      {img: './images/batman.png', name: 'batman'},
      {img: './images/flash.png', name: 'flash'},
      {img: './images/spider-man.png', name: 'spider-man'},
      {img: './images/hawkeye.png', name: 'hawkeye'},
    ]

    this.defaultIcon = './images/standard.png'

    this.hiddenHeroes = []
  }

  // para utilizar o this, nao podemos usar o static
  initialize() {
    // vai pegar todas as funcoes da classe screen, coloca todos os herois na screen
    this.screen.updateImages(this.initialHeroes)

    // força a screen a usar o THIS de MemoryGame
    this.screen.configurePlayButton(this.play.bind(this))
  }

  shuffle() {
    const copies = this.initialHeroes
    // duplicar os itens
    .concat(this.initialHeroes)
    // entrar em cada item e criar um id aleatório
    .map(item => {
      return Object.assign({}, item, {id: Math.random() / 0.5})
    })
    // ordenar aleatóriamente
    .sort(() => Math.random() - 0.5)

    this.screen.updateImages(copies)

    // esperar 1 segundo para atualizar a tela
    setTimeout(() => {
      this.hideHeroes(copies)
    }, 1000);
  }

  hideHeroes(heroes) {
    // vamos trocar a imagem de todos os herois existentes pelo icone padrão
    const heroesHidden = heroes.map(({ name, id }) => ({
      id,
      name,
      img: this.defaultIcon
    }))

    // atualizar a tela com os herois ocultos
    this.screen.updateImages(heroesHidden)
    
    // guardamos os herois para trabalhar com eles depois
    this.heroesHidden = heroesHidden
  }

  play() {
    this.shuffle()
  }

}