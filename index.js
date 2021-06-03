function onLoad() {
  const dependencies = {
    screen: Screen, // a classe screen é global
    util: Util // a classe util é global
  }

  // inicializamos o jogo da memoria
  const memoryGame =  new MemoryGame(dependencies)
  memoryGame.initialize()
}
window.onload = onLoad