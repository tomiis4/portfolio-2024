var canvas = document.querySelector('canvas');
var ctx = canvas === null || canvas === void 0 ? void 0 : canvas.getContext('2d');
var width = window.innerWidth * 0.85, height = window.innerHeight * 0.85;
var scoreElem = document.querySelector('#score');
canvas.width = width;
canvas.height = height;
var gap = 200;
var numPipe = 3;
var topPipes = [];
var bottomPipes = [];
var bird = {
    x: 80,
    y: height / 2 - 50,
    velocity: 0
};
var score = 0;
var isLost = false;
window.addEventListener('keypress', function (e) {
    if (e.keyCode == 32) {
        bird.velocity = 5;
    }
});
var randNum = function (max) { return Math.round(Math.random() * max); };
var appendBird = function (x, y) {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(x, y, 50, 50);
};
var checkColision = function () {
    if (bird.y <= 0 || (bird.y + 50) >= height) {
        isLost = true;
    }
};
var newPipe = function (num) {
    for (var i = 0; i < num; i++) {
        var heightRand = randNum(height * 0.6); // 70% of max 
        topPipes.push({
            x: width - 60 + i * 360,
            y: 0,
            height: heightRand
        });
        bottomPipes.push({
            x: width - 60 + i * 360,
            y: heightRand + gap,
            height: height - (heightRand + gap)
        });
    }
};
var generatePipe = function () {
    if (topPipes[0]) {
        topPipes.forEach(function (obj) {
            if (obj.x <= 0) {
                topPipes.shift();
                bottomPipes.shift();
                newPipe(1);
            }
            else {
                obj.x -= 1.5;
            }
        });
        bottomPipes.forEach(function (obj) {
            obj.x -= 1.5;
        });
    }
    else {
        newPipe(numPipe);
    }
};
var checkPipeColision = function () {
    topPipes.forEach(function (pipe) {
        if (((bird.x + 50) >= pipe.x
            && bird.x <= pipe.x)
            && (bird.y <= pipe.height
                || bird.y + 50 >= pipe.height + gap)) {
            isLost = true;
        }
    });
};
var appendPipes = function () {
    topPipes.forEach(function (obj) {
        ctx.fillStyle = 'green';
        ctx.fillRect(obj.x, obj.y, 60, obj.height);
    });
    bottomPipes.forEach(function (obj) {
        ctx.fillStyle = 'green';
        ctx.fillRect(obj.x, obj.y, 60, obj.height);
    });
};
var checkScore = function () {
    topPipes.forEach(function (pipe) {
        if (bird.x + 50 >= pipe.x && bird.x <= pipe.x) {
            score += 1 / 32;
            scoreElem.innerHTML = "Score: ".concat(Math.floor(score));
        }
    });
};
var loop = function () {
    ctx.clearRect(0, 0, width, height);
    appendBird(bird.x, bird.y);
    if (bird.velocity > 0) {
        bird.velocity -= 1;
        bird.y -= height / 45;
    }
    else {
        bird.y += 1.7;
    }
    checkColision();
    generatePipe();
    appendPipes();
    checkScore();
    checkPipeColision();
    if (!isLost) {
        window.requestAnimationFrame(loop);
    }
};
window.requestAnimationFrame(loop);
