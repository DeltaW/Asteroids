function Hitbox() {

    this.show = function() {
        this.showship();
        this.showasteroid();
        this.showpoint();
    }

    this.showship = function() {
        //player
        push();
        stroke(0);
        fill(0, 255, 255)
        ellipse(player.pos.x, player.pos.y, player.r, player.r);
        pop();
        //playertwo
        push();
        stroke(0);
        fill(0, 255, 255)
        ellipse(playertwo.pos.x, playertwo.pos.y, playertwo.r, playertwo.r);
        pop();
    }

    this.showasteroid = function() {
        for (var i = 0; i < asteroids.length; i++) {
            push();
            stroke(0);
            fill(0, 255, 255)
            ellipse(asteroids[i].pos.x, asteroids[i].pos.y, asteroids[i].r, asteroids[i].r);
            pop();
        }
    }

    this.showpoint = function() {
        for (var i = 0; i < points.length; i++) {
            push();
            stroke(0);
            fill(0, 255, 255)
            ellipse(points[i].pos.x, points[i].pos.y, PI * points[i].r * points[i].r, PI * points[i].r * points[i].r);
            pop();
        }
    }

}
