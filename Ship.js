function Ship() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.r = 20;
    this.force = 0;
    this.heading = 0;
    this.rotation = 0;
    this.isBoosting = false;
    this.lasers = [];

    this.boosting = function(b) {
        this.isBoosting = b;
    }

    this.update = function() {
        if (this.isBoosting) {
            this.boost();
        }
        this.pos.add(this.vel);
        this.vel.mult(0.99);

        for (var i = this.lasers.length - 1; i >= 0; i--) {
            this.lasers[i].show();
            this.lasers[i].update();
            if (this.lasers[i].offscreen()) {
                this.lasers.splice(i, 1);
            }
            /*else {
                           for (var j = asteroids.length - 1; j >= 0; j--) {
                               if (this.lasers[i].hits(asteroids[j])) {
                                   if (asteroids[j].r > 20) { //war 10 davor
                                       var newAsteroids = asteroids[j].breakup();
                                       asteroids = asteroids.concat(newAsteroids);
                                   } else {
                                       if (j % 10 == 0) {
                                           asteroids.push(new Asteroid());
                                       }
                                       //asteroids.push(new Asteroid());
                                   }
                                   asteroids.splice(j, 1);
                                   this.lasers.splice(i, 1);
                                   break;
                               }
                           }
                       }*/

        }
        this.show();
        this.turn();
        this.edges();
    }

    this.shotasteroid = function(j, i) {
        if (asteroids[j].r > 20) { //war 10 davor
            var newAsteroids = asteroids[j].breakup();
            asteroids = asteroids.concat(newAsteroids);
        } else {
            if (j % 10 == 0) {
                asteroids.push(new Asteroid());
            }
            //asteroids.push(new Asteroid());
        }
        asteroids.splice(j, 1);
        this.lasers.splice(i, 1);
        //break;
    }


    this.boost = function() {
        var force = p5.Vector.fromAngle(this.heading);
        force.mult(0.1);
        this.vel.add(force);
    }

    this.hits = function(asteroid) {
        var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
        if (d < this.r + asteroid.r) {
            return true;
        } else {
            return false;
        }
    }

    this.hitsplayer = function() {
        var d = dist(playertwo.x, playertwo.pos.y, player.pos.x, player.pos.y)
        if (d < playertwo.r) {
          console.log('trueffs');
            return true;
        } else {
          console.log('p1wtf');
            return false;
        }
    }

    this.hitsplayertwo = function() {
        var d = dist(player.pos.x, player.pos.y, playertwo.pos.x, playertwo.pos.y)
        if (d < player.r) {
          console.log('ffstrue');
            return true;
        } else {
          console.log('p2wtf');
            return false;
        }
    }

    this.show = function() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.heading + PI / 2);
        //fill(0);
        //stroke(255);
        triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
        //triangle(-this.r, this.r, this.r, this.r, 0, -this.r-(this.r/2));
        //das fun triangle ---
        triangle(-this.r / 4, this.r, this.r / 4, this.r, 0, -this.r / 4);
        pop();


        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.heading + PI / 2);
        stroke(255);
        fill(87);
        triangle(-this.r / 2, this.r, this.r / 2, this.r, 0, -this.r / 8);
        pop();


    }

    this.colour = function(pnum) { // as in player number
        if (pnum === 1) {
            //push();
            fill(255, 0, 0);
            stroke(255);
            strokeWeight(2);
            //triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
            //pop();
        } else if (pnum === 2) {
            //push();
            fill(0, 0, 255);
            stroke(255);
            strokeWeight(2);
            //triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
            //pop();
        }
    }

    this.edges = function() {
        if (this.pos.x > width + this.r) {
            this.pos.x = -this.r;
        } else if (this.pos.x < -this.r) {
            this.pos.x = width + this.r;
        }
        if (this.pos.y > height + this.r) {
            this.pos.y = -this.r;
        } else if (this.pos.y < -this.r) {
            this.pos.y = height + this.r;
        }
    }

    this.setRotation = function(angle) {
        this.rotation = angle;
    }

    this.turn = function() {
        this.heading += this.rotation;
    }
}
