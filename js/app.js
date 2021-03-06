// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    let rows = [50, 130, 210];
    this.x = -100;
    this.y = rows[Math.floor(Math.random() * 3)];
    this.speed = Math.floor(Math.random() * 300) + 100;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.speed * dt;

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function() {
    this.x = 200;
    this.y = 370;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function() {
    this.checkCollision();
    this.checkWin();
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Handle player movement
Player.prototype.handleInput = function(direction) {
    // Move player sprite Left
    if (direction === 'left' && this.x > 0) {
        this.x -= 100;
    }
    // Move player sprite Right
    if (direction === 'right' && this.x < 400) {
        this.x += 100;
    }
    // Move player sprite Up
    if (direction === 'up' && this.y > -30) {
        this.y -= 80;
    }
    // Move player sprite Down
    if (direction === 'down' && this.y < 370) {
        this.y += 80;
    }
}

// This function will check if the player has reached the water,
// then increment score and reset to starting position
Player.prototype.checkWin = function() {
     if (this.y === -30) {
        score++;
        document.querySelector('.score').textContent = score;
        this.x = 200;
        this.y = 370;
    }   
}

// This function will check for collisions then reset player position and decrement score
Player.prototype.checkCollision = function() {
    for (let i = 0; i < allEnemies.length; i++) {
        if (this.y === allEnemies[i].y) {
            if (this.x > (allEnemies[i].x - 50) && this.x < (allEnemies[i].x + 50)) {
                score--;
                document.querySelector('.score').textContent = score;
                this.x = 200;
                this.y = 370;                
            }

        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Player();
let score = 0;

let allEnemies = [];

newEmeny();

function newEmeny() {
    // Create 3 new enemy bugs
    const newEnemy = new Enemy();
    allEnemies.push(newEnemy);

    // Limit size of allEnemies array to 9 elements
    if (allEnemies.length === 10) {
        allEnemies.shift();
    }
}

// Create new enemy bugs every 3/4 seconds
window.setInterval(function(){
    newEmeny();
}, 750);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});