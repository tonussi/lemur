![Lyrebird](http://upload.wikimedia.org/wikipedia/commons/4/42/Flickr_-_law_keven_-_How_much_longer_have_I_got_to_wait%5E.jpg)

# Ring-tailed lemur

The ring-tailed lemur (Lemur catta) is a large strepsirrhine primate and the most recognized lemur due to its long, black and white ringed tail. It belongs to Lemuridae, one of five lemur families, and is the only member of the Lemur genus. Like all lemurs it is endemic to the island of Madagascar.

# Para usar

```
sudo apt-get install npm
npm install -g bower
bower install Processing.js
cp /bower_components/Processing.js/processing.min.js processing.min.js
```

# Video + Canvas

```html
<div id="processingdiv">
  <video id="processing" poster="poster.jpg" media="(orientation:landscape)">
    <source src="http://www.w3schools.com/tags/mov_bbb.mp4" type="video/mp4"/>
  </video>
  <canvas id="desenho" />
</div>
```

# Processing

Em processing o código imprime na frente do vídeo. Em um canvas os unicodes equivalentes ao characteres abaixo.

```js
processing.draw = function() {
  processing.text(String.fromCharCode(
  parseInt(processing.random(0x2620, 0x263F))),
           processing.random(processing.width),
           processing.random(processing.height));
};
```

```js
var caracteres =
[ '☠' /* u2620 Skull and Crossbones */
, '☡' /* u2621 Caution Sign */
, '☢' /* u2622 Radioactive Sign */
, '☣' /* u2623 Biohazard Sign */
, '☤' /* u2624 Caduceus */
, '☥' /* u2625 Ankh */
, '☦' /* u2626 Orthodox Cross */
, '☧' /* u2627 Chi Rho */
, '☨' /* u2628 Cross of Lorraine */
, '☩' /* u2629 Cross of Jerusalem */
, '☪' /* u262A Star and Crescent */
, '☫' /* u262B Farsi Symbol */
, '☬' /* u262C Adi Shakti */
, '☭' /* u262D Hammer and Sickle */
, '☮' /* u262E Peace Symbol */
, '☯' /* u262F Yin Yang */
, '☸' /* u2638 Wheel of Dharma */
, '☿' /* u263F Mercury */
];
```
