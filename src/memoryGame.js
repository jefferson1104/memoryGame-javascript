class MemoryGame {
  constructor ({ screen }) {
    this.screen = screen

    this.initialHeroes = [
      {img: './images/batman.png', name: 'batman'},
      {img: './images/flash.png', name: 'flash'},
      {img: './images/spider-man.png', name: 'spider-man'},
      {img: './images/hawkeye.png', name: 'hawkeye'},
    ]
  }

  // para utilizar o this, nao podemos usar o static
  initialize() {
    // vai pegar todas as funcoes da classe screen, coloca todos os herois na screen
    this.screen.updateImages(this.initialHeroes)
  }
}