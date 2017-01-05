function Point() {
    this.pos = createVector(random(width), random(height));
    this.r = 2.5;

    this.update = function() {

        this.pos = createVector(random(width), random(height));

        this.show();
    }

    this.show = function() {
        push();
        stroke(255);

        fill(225, 225, 0);
        ellipse(this.pos.x, this.pos.y, PI * this.r * this.r, PI * this.r * this.r);
        pop();
    }

    this.hits = function(input) { //input ist der jewweilige spieler
        var d = dist(this.pos.x, this.pos.y, input.pos.x, input.pos.y);
        if (d < (PI * this.r * this.r) + input.r) {
            return true;
        } else {
            return false;
        }
    }

}
