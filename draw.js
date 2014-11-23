function desenhoProcessing(processing) {
  var letrinhas = [];

  processing.setup = function () {

    var tamanho = capturarTamanhoJanela();

    processing.textSize(32);

    processing.background(255, 0);

    processing.size(tamanho[0], tamanho[1]);

    processing.textAlign(processing.CENTER);

    for (var i = 0; i < 100; i++) {
      letrinhas.push(new Letrinha(processing.random(0x2620, 0x262C)));
    }


  }

  // Override draw function, by default it
  // will be called 60 times per second
  processing.draw = function() {
    processing.background(255, 0);

    for (var i = 0; i < letrinhas.length; i++) {
      letrinhas[i].update();
      letrinhas[i].borders();
      letrinhas[i].display();
      for (var j = 0; j < letrinhas.length; j++) {
        letrinhas[i].collideEqualMass(letrinhas[j]);
      }
    }

    // processing.text(String.fromCharCode(parseInt(
    //   processing.random(0x2620, 0x262C))),
    //   processing.random(processing.width),
    //   processing.random(processing.height));

  };

  function Letrinha(letra) {
    this.r = 30;
    this.sumR = 0.0;
    this.bounce = 1.0;
    this.letra = letra;
    this.colisao = false;

    this.vel = new Vector(processing.random(-0.35, 0.35),
                          processing.random(-0.35, 0.35), 0);

    this.loc = new Vector(processing.random(processing.width),
                          processing.random(processing.height), 0);
  }

  Letrinha.prototype = {

    update : function () {
      this.loc = this.loc.adicionar(this.vel);
    },

    display : function () {

      processing.pushMatrix();
      processing.noStroke();
      processing.fill(130, 70);
      processing.translate(this.loc.x, this.loc.y);
      processing.ellipseMode(processing.CENTER);
      processing.ellipse(0, 0, this.r, this.r);
      processing.fill(255);
      processing.text(String.fromCharCode(parseInt(this.letra)), 0, 0);
      processing.popMatrix();

    },

    borders : function () {

      if (this.loc.y > processing.height) {
          this.vel.y *= -this.bounce;
          this.loc.y = processing.height;

      } else if (this.loc.y < 0) {
                 this.vel.y *= -this.bounce;
                 this.loc.y = 0;

      } if (this.loc.x > processing.width) {
            this.vel.x *= -this.bounce;
            this.loc.x = processing.width;

      } else if (this.loc.x < 0) {
                 this.vel.x *= -this.bounce;
                 this.loc.x = 0;
      }

    },

    collideEqualMass: function(other) {
      if (other instanceof Letrinha) {
        this.d = Vector.dist(this.loc, other.loc);
        this.sumR = this.r + other.r;

        if (!this.colisao && this.d <= this.sumR) {

          this.colisao = true;
          var n = Vector.sub(other.loc, this.loc);
          n.normalizar();

          var u = new Vector.sub(this.vel, other.vel);

          var un = this.componentVector(u, n);

          u.sub(un);

          vel = Vector.add(u, other.vel);

          other.vel = Vector.add(un, other.vel);

        } else if (this.d > this.sumR) {
          this.colisao = false;
        }
      }

    },

    componentVector: function(vector, directionVector) {
      if (vector instanceof Vector && directionVector instanceof Vector) {
        directionVector.normalizar();
        directionVector.mult(vector.dot(directionVector));
        return directionVector;
      }

    }

  };

};

function Vector(x, y, z) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
}

Vector.prototype = {

  adicionar: function(v) {
    if (v instanceof Vector) {
      return new Vector(
        this.x + v.x,
        this.y + v.y,
        this.z + v.z
      );
    }
    else {
      return new Vector(
        this.x + v,
        this.y + v,
        this.z + v
      );
    }
  },

  sub: function(v) {
    if (v instanceof Vector) {
      return new Vector(
        this.x - v.x,
        this.y - v.y,
        this.z - v.z
      );
    }
    else {
      return new Vector(
        this.x - v,
        this.y - v,
        this.z - v
      );
    }
  },

  comprimento: function() {
    return Math.sqrt(this.dot(this));
  },

  unit: function() {
    return this.divide(this.comprimento());
  },

  divide: function(v) {
    if (v instanceof Vector) {
      return new Vector(this.x / v.x, this.y / v.y, this.z / v.z);
    } else {
      return new Vector(this.x / v, this.y / v, this.z / v);
    }
  },

  dot: function(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  },

  mult: function(v) {
    if (v instanceof Vector) {
      return new Vector(this.x * v.x, this.y * v.y, this.z * v.z);
    }
    else {
      return new Vector(this.x * v, this.y * v, this.z * v);
    }
  },

  norm : function (v) {
    if (v instanceof Vector) {
      return new Vector(Math.sqrt(Math.pow(this.x, 2) +
                                  Math.pow(this.y, 2) +
                                  Math.pow(this.z, 2)));
    }
  }

};

Vector.add = function(a, b, c) {
  if (b instanceof Vector) {
    c.x = a.x + b.x;
    c.y = a.y + b.y;
    c.z = a.z + b.z;
  } else {
    c.x = a.x + b;
    c.y = a.y + b;
    c.z = a.z + b;
  }
  return c;

};

Vector.subtract = function(a, b, c) {
  if (b instanceof Vector) {
    c.x = a.x - b.x;
    c.y = a.y - b.y;
    c.z = a.z - b.z;
  }
  else {
    c.x = a.x - b;
    c.y = a.y - b;
    c.z = a.z - b;
  }
  return c;
};

Vector.dist = function(a, b) {
  if (a instanceof Vector && b instanceof Vector) {
    return new PVector(Math.sqrt(Math.pow(b.x - a.x, 2) +
                                 Math.pow(b.y - a.y, 2) +
                                 Math.pow(b.z - a.z, 2)));
  }
};

capturarTamanhoJanela = function() {
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

};

// var vetor = require('./vetor.js');
// var util = require('./util.js');
var canvas = document.getElementById("desenho");
var p = new Processing(canvas, desenhoProcessing);
// p.exit(); to detach it
