// Metodos estaticos nao podem acessar o 'this' , por isso nao vamos colocar util no constructor
const util = Util

const ID_CONTENT = "content"
const ID_BTN_PLAY = "playGame"
const ID_MESSAGE = "message"
const CLASS_INVISIBLE = "invisible"
const ID_LOADING = "loading"
const ID_COUNTER = "counter"
const ID_BTN_SHOW_ALL = "showAll"

const MESSAGES = {
  success: {
    text: 'Correct combination !',
    class: 'alert-success'
  },
  error: {
    text: 'Wrong combination !',
    class: 'alert-danger'
  }
}

class Screen {
  static getHtmlCode(item) {
    return ` 
    <div class="col-md-3 mb-4">
      <div class="card" style="width: 50%;" onclick="window.checkSelection('${item.id}','${item.name}' )">
        <img src="${item.img}" name="${item.name}" class="card-img-top" alt="...">
      </div>
    </div>
    `
  }

  static configureCheckSelectionButton(functionOnClick) {
    window.checkSelection = functionOnClick
  }

  static updateContentHtml(htmlCode) {
    const content = document.getElementById(ID_CONTENT)
    content.innerHTML = htmlCode
  }

  static generateHtmlStringByImage(items) {
    // para cada item da lista, vai executar a funcao getHtmlCode, ao final vai concatenar tudo em uma unica string, muda de array para string
    return items.map(Screen.getHtmlCode).join('')
  }

  static updateImages(items) {
    const htmlCode = Screen.generateHtmlStringByImage(items)
    Screen.updateContentHtml(htmlCode)
  }

  static configurePlayButton(functionOnClick) {
    const btnPlay = document.getElementById(ID_BTN_PLAY)
    btnPlay.onclick = functionOnClick
  }

  static showHeroes(nameHero, img) {
    const htmlElement = document.getElementsByName(nameHero)

    // para cada elemento encontrado na tela, vamos alterar a imagem para a imagem inicial dele
    // com o forEach, para cada item dentro dos () setamos o valor de image
    htmlElement.forEach(item => (item.src = img))
  }

  static async showMessage(success = true) {
    const element = document.getElementById(ID_MESSAGE)

    if (success) {
      element.classList.remove(MESSAGES.error.class)
      element.classList.add(MESSAGES.success.class)
      element.innerText = MESSAGES.success.text
    }
    else {
      element.classList.remove(MESSAGES.success.class)
      element.classList.add(MESSAGES.error.class)
      element.innerText = MESSAGES.error.text
    }

    element.classList.remove(CLASS_INVISIBLE)
    
    await util.timeout(1000)
    element.classList.add(CLASS_INVISIBLE)
  }

  static showLoading(show = true) {
    const loading = document.getElementById(ID_LOADING)

    if (show) {
      loading.classList.remove(CLASS_INVISIBLE)
      return;
    }

    loading.classList.add(CLASS_INVISIBLE)
  }

  static startCounter() {
    let countTo = 3
    const elementCounter = document.getElementById(ID_COUNTER)

    // vamos substituir o texto, no lugar de '$$counter' adicionaremos o valor do segundo
    const identifierInText = "$$counter"
    const textDefault = `Starting at ${identifierInText} seconds...`

    // criando uma funcao em linha onde atualizaremos o texto a cada segundo
    const updateText = () => (elementCounter.innerHTML = textDefault.replace(identifierInText, countTo--))

    // a cada segundo a funcao updateText vai ser chamada e essa funcao vai substituir '$$couter' por 'countTo' diminuindo o valor
    // retornamos o 'idOfInterval' para parar, vamos trabalhar com ele no proximo metodo
    updateText()
    const idOfInterval = setInterval(updateText, 1000)
    return idOfInterval
  }

  static clearCounter(idOfInterval) {
    clearInterval(idOfInterval)
    document.getElementById(ID_COUNTER).innerHTML = ""
  }

  static configureButtonShowAll(functionOnClick) {
    const btnShowAll = document.getElementById(ID_BTN_SHOW_ALL)
    btnShowAll.onclick = functionOnClick
  }
}