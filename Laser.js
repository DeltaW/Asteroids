function Laser(playerpos, angle, pnum) {
    this.pos = createVector(playerpos.x, playerpos.y);
    this.vel = p5.Vector.fromAngle(angle);
    this.vel.mult(10);

    this.update = function() {
        this.pos.add(this.vel);
        //this.colour(pnum);
    }

    this.show = function() {
        if (pnum === 1) {
            push();
            fill(0, 0, 255);
            stroke(0, 0, 225);
            strokeWeight(4);
            point(this.pos.x, this.pos.y);
            pop();
        } else if (pnum === 2) {
            push();
            fill(255, 0, 0);
            stroke(255, 0, 0);
            strokeWeight(4);
            point(this.pos.x, this.pos.y);
            pop();
        }
    }

    this.hitsplayertwo = function() {
        var d = dist(this.pos.x, this.pos.y, playertwo.pos.x, playertwo.pos.y)
        if (d < playertwo.r) {
            return true;
        } else {
            return false;
        }
    }

    this.hits = function(asteroid) {
        var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y)
        if (d < asteroid.r) {
            return true;
        } else {
            return false;
        }
    }

    this.hitsplayer = function() {
        var d = dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y)
        if (d < player.r) {
            return true;
        } else {
            return false;
        }
    }

    this.offscreen = function() {
        if (this.pos.x > width || this.pos.x < 0) {
            return true;
        }
        if (this.pos.y > height || this.pos.y < 0) {
            return true;
        }
        return false;
    }
}
