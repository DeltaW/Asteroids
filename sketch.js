var player;
var playertwo;
var asteroids = [];
var points = [];
var score;
var hb;
var t;
var zeit = 180;

function setup() {
    createCanvas(windowWidth, windowHeight);

    hb = new Hitbox();
    score = new score();
    player = new Ship();
    playertwo = new Ship();
    timer = new timer();
    setInterval(timer.subtract, 1000);
    for (var i = 0; i < 10; i++) {
        asteroids.push(new Asteroid());
    }
    for (var i = 0; i < 5; i++) {
        points.push(new Point());
    }
}

function draw() {
    background(0);
    timer.show();
    score.update();

    //if (player.hitsplayertwo) {
    //    console.log('true');
    //    playertwo.vel.mult(-1);
    //    player.vel.mult(-1);
    //} // else if (playertwo.hitsplayer) {
    //  playertwo.vel.mult(-1);
    //  player.vel.mult(-1);
    //}

    if (keyIsDown(UP_ARROW)) {
        player.boosting(true);
    } else {
        player.boosting(false);
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(LEFT_ARROW)) {
        if (keyIsDown(RIGHT_ARROW)) {
            player.setRotation(0.1);
        } else if (keyIsDown(LEFT_ARROW)) {
            player.setRotation(-0.1);
        }
    } else {
        player.setRotation(0);
    }

    if (keyIsDown(87)) {
        playertwo.boosting(true);
    } else {
        playertwo.boosting(false);
    }
    if (keyIsDown(68) || keyIsDown(65)) {
        if (keyIsDown(68)) {
            playertwo.setRotation(0.1);
        } else if (keyIsDown(65)) {
            playertwo.setRotation(-0.1);
        }
    } else {
        playertwo.setRotation(0);
    }

    for (var i = 0; i < asteroids.length; i++) {
        if (player.hits(asteroids[i])) {
            console.log('p1 hit an asteroid!'); //punkte halbieren
            /* remove asteroid
            var newAsteroids = asteroids[i].remove();
            asteroids = asteroids.concat(newAsteroids);
            asteroids.splice(i, 1);
            */
            var tempvel = asteroids[i].vel;
            player.vel.add(tempvel);
            asteroids[i].vel.mult(-1);
            player.vel.mult(-1);

            score.player = floor(score.player / 2); // UND WENN SCHILD AUS IST
        } else if (playertwo.hits(asteroids[i])) {
            console.log('p2 hit an asteroid!'); //punkte halbieren
            /* remove asteroid
            var newAsteroids = asteroids[i].remove();
            asteroids = asteroids.concat(newAsteroids);
            asteroids.splice(i, 1);
            */

            //console.log(asteroids[i].vel);
            var tempvel = asteroids[i].vel;
            //asteroids[i].vel.add(playertwo.vel); //creates many glitches
            playertwo.vel.add(tempvel);
            asteroids[i].vel.mult(-1);
            playertwo.vel.mult(-1);

            score.playertwo = floor(score.playertwo / 2); // UND WENN SCHILD AUS IST (SCHILD MUSS NOCH EINGEFÜGT WERDEN)
        } else {
            //asteroids[i].show();
            //asteroids[i].update();
            //asteroids[i].edges();
        }
    }

    for (var j = 0; j < points.length; j++) {
        if (points[j].hits(player)) {
            console.log('p1 hit a point');
            score.player += 250;
            points[j].update();
        } else if (points[j].hits(playertwo)) {
            console.log('p2 hit a point');
            score.playertwo += 250;
            points[j].update();
        } else {
            points[j].show();
        }
    }

    for (var as = 0; as < asteroids.length; as++) {

        asteroids[as].show();
        asteroids[as].update();
        asteroids[as].edges();
    }

    while (asteroids.length < 10) {
        asteroids.push(new Asteroid());
    }

    //console.log(playertwo.vel + 'p2.vel');

    var d = dist(playertwo.pos.x, playertwo.pos.y, player.pos.x, player.pos.y)
    //console.log(d + 'd');
    if (d <= playertwo.r + player.r) {

        console.log('players hit each other');
        1
        if (player.vel.x <= 0.5 && player.vel.y <= 0.5 || playertwo.vel.x <= 0.5 && playertwo.vel.y <= 0.5) {
            console.log('case1: 1 player did not move before the impact');
            if (player.vel.x <= 0.5 && player.vel.y <= 0.5) {
                //score.playertwo += 500;
                playertwo.vel.add(player.vel.mult(0.9));
                playertwo.vel.mult(-1);
                player.vel.add(playertwo.vel.mult(0.9));
                player.vel.mult(-1);
            } else if (playertwo.vel.x <= 0.5 && playertwo.vel.y <= 0.5) {
                //score.player += 500;
                //score.playertwo -= 500;
                player.vel.add(playertwo.vel.mult(0.9));
                player.vel.mult(-1);
                playertwo.vel.add(player.vel.mult(0.9));
                playertwo.vel.mult(-1);
            }



            /*
            player.vel.add(playertwo.vel.mult(0.9));
            player.vel.mult(-1);
            playertwo.vel.add(player.vel.mult(0.9));
            playertwo.vel.mult(-1);
            */
        } else {
            console.log('case2;');
            player.vel.mult(-1);
            playertwo.vel.mult(-1);
        }


        //score.player = -1000;
        //score.playertwo = -1000;
    }


    player.update();
    player.colour(1);
    playertwo.update();
    playertwo.colour(2);

    //falls spieler sich gegenseitig abschießen
    for (var g = 0; g < player.lasers.length; g++) {
        if (player.lasers[g].hitsplayertwo()) {
            score.playertwo = score.playertwo - 50;
            score.player += 25;
            player.lasers.splice(g, 1);
        }
    }

    for (var g2 = 0; g2 < playertwo.lasers.length; g2++) {
        if (playertwo.lasers[g2].hitsplayer()) {
            //console.log('true');
            score.player = score.player - 50;
            score.playertwo += 25;
            playertwo.lasers.splice(g2, 1);
        }

    }
    //hb.show();
}

function keyPressed() {
    if (keyCode === DOWN_ARROW) {
        player.lasers.push(new Laser(player.pos, player.heading, 1));
        //playertwo.heading = playertwo.heading * -1;
    }
    if (keyCode === 83) {
        playertwo.lasers.push(new Laser(playertwo.pos, playertwo.heading, 2));
    }
}
