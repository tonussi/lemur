function desenhoProcessing(processing) {

  processing.setup = function () {
    var tamanho = capturarTamanhoJanela();
    processing.frameRate(3);
    processing.background(255, 0);
    processing.size(tamanho[0], tamanho[1]);
    processing.textSize(32);
    var letrinha = new Letrinha();
    alert(letrinha.local);
  }

  var caracteres =
  [ '\u2620' /* Skull and Crossbones */
  , '\u2621' /* Caution Sign */
  , '\u2622' /* Radioactive Sign */
  , '\u2623' /* Biohazard Sign */
  , '\u2624' /* Caduceus */
  , '\u2625' /* Ankh */
  , '\u2626' /* Orthodox Cross */
  , '\u2627' /* Chi Rho */
  , '\u2628' /* Cross of Lorraine */
  , '\u2629' /* Cross of Jerusalem */
  , '\u262A' /* Star and Crescent */
  , '\u262B' /* Farsi Symbol */
  , '\u262C' /* Adi Shakti */
  , '\u262D' /* Hammer and Sickle */
  , '\u262E' /* Peace Symbol */
  , '\u262F' /* Yin Yang */
  , '\u2638' /* Wheel of Dharma */
  , '\u263F' /* Mercury */
  ];

  // Override draw function, by default it will be called 60 times per second
  processing.draw = function() {
    processing.text(String.fromCharCode(parseInt(processing.random(0x2620, 0x263F))), processing.random(processing.width), processing.random(processing.height));
  };

  function Letrinha() {
    var local = new Vector(0, 0, 0);
  }


}

function Vector(x, y, z) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
}

function Util() { }

Util.capturarTamanhoJanela = function() {
  var largura = 0, altura = 0;

  if (typeof (window.innerWidth) == 'number') {

    largura = window.innerWidth;
    altura = window.innerHeight;

  } else if (document.documentElement &&
            (document.documentElement.clientWidth ||
             document.documentElement.clientHeight)) {

    largura = document.documentElement.clientWidth;
    altura = document.documentElement.clientHeight;

  } else if (document.body &&
            (document.body.clientWidth ||
             document.body.clientHeight)) {

    largura = document.body.clientWidth;
    altura = document.body.clientHeight;
  }

  return [largura, altura];
}

var canvas = document.getElementById("desenho");
// attaching the desenhoProcessing function to the canvas
var p = new Processing(canvas, desenhoProcessing);
// p.exit(); to detach it
