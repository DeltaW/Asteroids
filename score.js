function score() {
    this.player = 0;
    this.playertwo = 0;

    this.update = function() {
        this.playerupdate();
        this.playertwoupdate();

        if (this.player < 0) {
          this.player = 0;
        }
        if (this.playertwo < 0) {
          this.playertwo = 0;
        }
    }

    this.playerupdate = function() {
        //falls player.laser asteroid hittet +5 punkte
        for (var j = 0; j < asteroids.length; j++) {
            for (var i = 0; i < player.lasers.length; i++) {
                //console.log('loop funzt');
                if (player.lasers[i].hits(asteroids[j])) {
                    //console.log('if-works');
                    this.player += 10;
                    player.shotasteroid(j, i);
                    break;
                    ///////////
                }
            }
        }

        push();
        textSize(32);
        fill(0, 0, 255);
        noStroke();
        text("" + score.player, (width / 2.5) - 10, 25);
        pop();
    }

    this.playertwoupdate = function() {
        //falls playertwo.laser asteroid hittet +5 punkte
        for (var j = 0; j < asteroids.length; j++) {
            for (var i = 0; i < playertwo.lasers.length; i++) {
                //console.log('loop funzt');
                if (playertwo.lasers[i].hits(asteroids[j])) {
                    //console.log('if-works');
                    this.playertwo += 10;
                    playertwo.shotasteroid(j, i);
                    break;
                    ///////////
                }
            }
        }

        push();
        textSize(32);
        fill(255, 0, 0);
        noStroke();
        text("" + score.playertwo + "", (width / 1.5) - 20, 25);
        pop();
    }

}
