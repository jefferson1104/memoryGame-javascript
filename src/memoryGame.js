class MemoryGame {
  constructor ({ screen }) {
    this.screen = screen

    this.initialHeroes = [
      {img: './images/batman.png', name: 'batman'},
      {img: './images/flash.png', name: 'flash'},
      {img: './images/spider-man.png', name: 'spider-man'},
      {img: './images/ciclops.png', name: 'ciclops'},
      {img: './images/dead-pool.png', name: 'dead-pool'},
      {img: './images/thor.png', name: 'thor'},
    ]

    this.defaultIcon = './images/standard.png'
    this.hiddenHeroes = []
    this.selectedHeroes = []
  }

  // para utilizar o this, nao podemos usar o static
  initialize() {
    // vai pegar todas as funcoes da classe screen, coloca todos os herois na screen
    this.screen.updateImages(this.initialHeroes)

    // força a screen a usar o THIS de MemoryGame
    this.screen.configurePlayButton(this.play.bind(this))
    this.screen.configureCheckSelectionButton(this.checkSelection.bind(this))
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

  showHeroes(heroName) {
    // procurando esse heroi pelo nome em initialHeroes, e vamos obter a imagem dele
    const { img } = this.initialHeroes.find(({ name }) => heroName === name)

    // funcao para exibir somente o heroi selecionado
    this.screen.showHeroes(heroName, img)
  }

  checkSelection(id, name) {
    const item = { id, name }

    // verifica a quantidade de herois selecionados e toma uma decisão se escolheu certo ou errado
    const selectedHeroes = this.selectedHeroes.length

    switch(selectedHeroes) {
      case 0:
        // adiciona o heroi selecionado na lista, esperando pela proxima selecao de heroi
        this.selectedHeroes.push(item)
        break;
      case 1:
        // se ja houver 1 heroi selecionado, significa que o usuario só pode selecionar mais 1 heroi
        const [option1] = this.selectedHeroes

        // zerar a lista de herois selecionados para não permitir selecionar mais de 2 herois
        this.selectedHeroes = []

        // conferir se os herois selecionados são iguais, e tambem uma regra onde nao permite selecionar a mesma carta 2 vezes
        if(option1.name === item.name && option1.id !== item.id) {
          // funcao que mostra a imagem do herou selecionado quando acertado
          this.showHeroes(item.name)

          // funcao que mostra a mensagem de correto
          this.screen.showMessage()

          return;
        }

        // funcao que mostra a mensagem de errado
        this.screen.showMessage(false)
        break;
    }
  }

  play() {
    this.shuffle()
  }
}