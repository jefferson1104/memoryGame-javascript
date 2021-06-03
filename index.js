function onLoad() {
  const dependencies = {
    screen: Screen, // a classe screen é global
    util: Util // a classe util é global
  }

  // inicializamos o jogo da memoria
  const memoryGame =  new MemoryGame(dependencies)
  memoryGame.initialize()

  // toggleMenu
  const navigation = document.querySelector('nav');
  const clickToggle = document.querySelector('.toggleMenu')
  clickToggle.addEventListener('click', function(event) {
    this.classList.toggle('active')
    navigation.classList.toggle('active')
  })
}

window.onload = onLoad

window.addEventListener("scroll", function(){
  const header = document.querySelector('header')
  header.classList.toggle('sticky', window.scrollY > 0)

  setTimeout(function(){ 
    const invisible = document.querySelector('.buttons')
    invisible.classList.toggle('visible', window.scrollY > 0)  
   }, 1000);
})




