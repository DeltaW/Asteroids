function timer() {
    ///this.total = 500;
    this.update = function() {
        //setInterval(this.subtract, 5000);
        this.show();
    }

    this.show = function() {
        push();
        textSize(32);
        fill(255);
        noStroke();

        var minuten = floor(zeit / 60);
        var temp = (zeit/60) - (minuten);
        var sekunden = temp * 60 + '';
        if (sekunden.charAt(4) > 4) {
          sekunden = ceil(sekunden);
        } else {
            sekunden = floor(sekunden);
        }
        text(minuten + ':' + sekunden, (width / 2), 25);
        //text(zeit, (width / 2), 25);
        pop();

        push();
        if (zeit <= 10) {
            textSize(120);
            fill(255);
            noStroke();
            text(zeit, (width / 2), height / 2);
        }
        if (zeit == 0) {
            if (score.player > score.playertwo) {
                text('Blue Wins', (width / 2) - 120, (height / 2) + 120);
            } else if (score.playertwo > score.player) {
                text('Red Wins', (width / 2) - 120, (height / 2) + 120);
            } else if (score.player == score.playertwo) {
                text('Draw', (width / 2) - 120, (height / 2) + 120);
            }
        }
        pop();
    }

    this.subtract = function() {
        if (zeit > 0) {
            zeit -= 1;
        }
        //zeit -= 1;
        //this.total -=1;
        //console.log(this.total + 'total');
    }
}
