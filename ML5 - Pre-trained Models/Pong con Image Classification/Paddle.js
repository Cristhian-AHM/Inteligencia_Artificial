

  function Paddle(left) {
    this.x;
    this.y = 400/2;
    this.w = 20;
    this.h = 100;

    this.ychange = 0;
    if (left) {
      this.x = this.w;
    } else {
      this.x = 600 - this.w;
    }
  }

  Paddle.prototype.update = function() {
    this.y += this.ychange;
    this.y = constrain(this.y, this.h/2, 400-this.h/2);
  }


  Paddle.prototype.move = function(steps) {
    this.ychange = steps;
  }

  Paddle.prototype.show = function() {
    fill(255);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
  }
