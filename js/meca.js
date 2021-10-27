/**
  meca.js
  Controlador principal del juego MecaTRON - 3000
  @author Julio Antonio Ramos Gago <jramosgago.guadalupe@alumnado.fundacionloyola.net>
  @license GPL v3 2021
**/

'use strict'

class Juego {
  constructor() {
    this.vista = new Vista()
    this.modelo = new Modelo()
    this.generadorPalabras = null
    this.animador = null
    this.divPrincipal = null
    window.onload = this.iniciar.bind(this)
  }

  /**
    Pone en marcha el juego
  **/
  iniciar(){
    console.log('Iniciando ... ')
    this.divPrincipal = document.getElementById('divPrincipal')
    this.vista.div = this.divPrincipal
    this.generadorPalabras = window.setInterval(this.generarPalabra.bind(this), 1000)
    this.animador = window.setInterval(this.vista.moverPalabras.bind(this.vista), 100)
  }

  generarPalabra(){
    let nuevaPalabra = this.modelo.crearPalabra()
    this.vista.dibujar(nuevaPalabra)
  }
}

class Vista {
  constructor(){
    this.div = null
  }

  /**
    Dibuja el area del juego
    @param palabra {String} la nueva palabra
  */
  dibujar(palabra){
    // <div class=palabra>Meca</div>
    let div = document.createElement('div')
    this.div.appendChild(div)
    div.appendChild(document.createTextNode(palabra))
    div.classList.add('palabra')
    div.style.top = '0px'
    div.style.left = Math.floor(Math.random() * 85) + '%'
  }

  /**
    Mueve las palabras del juego
  **/
  moverPalabras(){
    //Buscar todas las palabras del divPrincipal
    let palabras = this.div.querySelectorAll('.palabra')
    console.log(palabras)

    //Para cada palabra, aumento su atributo top
    for(let palabra of palabras){
      let top = parseInt(palabra.style.top)
      top += 5
      palabra.style.top = `${top}px`
    }

    //TODO: Si ha llegado al suelo...

  }
}
/**
  Modelo de datos del juego
*/
class Modelo {
  constructor(){
    this.palabras = ['En', 'un', 'lugar', 'de', 'La', 'Mancha']
  }
  /**
    Devuelve una nueva palabra
    @return {String} Palabra generada
  **/
  crearPalabra(){
    return this.palabras[Math.floor(Math.random() * this.palabras.length)]
  }
}

var app = new Juego()
