const ID_CONTENT = "content";
class Screen {
  static getHtmlCode(item) {
    return ` 
    <div class="col-md-3">
      <div class="card" style="width: 50%;">
        <img src="${item.img}" name="${item.name}" class="card-img-top" alt="...">
      </div>
    </div>
    <br />
    `
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
}