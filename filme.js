/**
 * Lucas Tonussi
 */

document.documentElement.addEventListener('keyup', function(e) {

  var filme = document.getElementById("processing");

  var e = e || window.event;

  if ((e.which == 88 || e.keyCode == 88) && e.ctrlKey) {

    // when ctrl + x

    if (filme.paused) {

      filme.play();

    }

    else {

      filme.pause();

    }

  }

});
