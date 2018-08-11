function Puck() {
  this.x = 600 / 2;
  this.y = 400 / 2;
  this.xspeed;
  this.yspeed;
  this.r = 12;
  this.reset();
}

Puck.prototype.checkPaddleLeft = function(p) {
  if (this.y - this.r < p.y + p.h / 2 && this.y + this.r > p.y - p.h / 2 && this.x - this.r < p.x + p.w / 2) {
    if (this.x > p.x) {
      var diff = this.y - (p.y - p.h / 2);
      var rad = radians(45);
      var angle = map(diff, 0, p.h, -rad, rad);
      this.xspeed = 5 * cos(angle);
      this.yspeed = 5 * sin(angle);
      this.x = p.x + p.w / 2 + this.r;
      //xspeed *= -1;
    }
  }
}
Puck.prototype.checkPaddleRight = function(p) {
  if (this.y - this.r < p.y + p.h / 2 && this.y + this.r > p.y - p.h / 2 && this.x + this.r > p.x - p.w / 2) {
    if (this.x < p.x) {
      //xspeed *= -1;
      var diff = this.y - (p.y - p.h / 2);
      var angle = map(diff, 0, p.h, radians(225), radians(135));
      this.xspeed = 5 * cos(angle);
      this.yspeed = 5 * sin(angle);
      this.x = p.x - p.w / 2 - this.r;
    }
  }
}




Puck.prototype.update = function() {
  this.x = this.x + this.xspeed;
  this.y = this.y + this.yspeed;
}

Puck.prototype.reset = function() {
  this.x = 600 / 2;
  this.y = 400 / 2;
  var angle = random(-PI / 4, PI / 4);
  //angle = 0;
  this.xspeed = 5 * cos(angle);
  this.yspeed = 5 * sin(angle);

  if (random(1) < 0.5) {
    this.xspeed *= -1;
  }
}

Puck.prototype.edges = function() {
  if (this.y < 0 || this.y > 400) {
    this.yspeed *= -1;
  }

  if (this.x - this.r > 600) {
    //ding.play();
    leftscore++;
    this.reset();
  }

  if (this.x + this.r < 0) {
    //ding.play();
    rightscore++;
    this.reset();
  }
}


Puck.prototype.show = function() {
  fill(255);
  ellipse(this.x, this.y, this.r * 2, this.r * 2);
}
