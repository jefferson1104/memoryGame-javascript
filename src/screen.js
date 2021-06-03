const ID_CONTENT = "content"
const ID_BTN_PLAY = "playGame"
const ID_MESSAGE = "message"
const CLASS_INVISIBLE = "invisible"

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

  static showMessage(success = true) {
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
  }
}