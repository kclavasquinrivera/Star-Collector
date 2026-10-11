let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 }, // Aumento de la gravedad para hacer las caídas más naturales
            debug: false,
            // Asegurándonos de que las interacciones físicas no sean demasiado exageradas
            worldBounds: true,
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let score = 0;
let scoreText;
let gameOver = false;
let platforms;
let player;
let cursors;
let stars;
let bombs;
let game;

// Inicializar el juego cuando la página esté lista
window.onload = function() {
    console.log('Inicializando Phaser...');
    console.log('Contenedor:', document.getElementById('phaser-game'));
    game = new Phaser.Game(config);
};

function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create() {
    this.add.image(400, 300, 'sky');

    // Ajustar plataformas para que el jugador no pase a través de ellas
    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    player = this.physics.add.sprite(100, 450, 'dude');

    // Ajustes del jugador para una mejor física
    player.setCollideWorldBounds(true);
    player.setBounce(0.1);  // Menos rebote para un movimiento más natural
    player.setDrag(0.4);  // Ajuste para la fricción del jugador (mejor control al moverse)

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1,
    });

    this.anims.create({
        key: 'turn',
        frames: [{
            key: 'dude',
            frame: 4
        }],
        frameRate: 20,
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1,
    });

    player.body.setGravityY(100);

    this.physics.add.collider(player, platforms);

    cursors = this.input.keyboard.createCursorKeys();

    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)); 
        child.setCollideWorldBounds(true);
    });

    this.physics.add.collider(stars, platforms);
    this.physics.add.overlap(player, stars, collectStar, null, true);

    scoreText = this.add.text(16, 16, "Score: 0", { fontSize: '32px', fill: '#000' });

    bombs = this.physics.add.group();

    bombs.children.iterate(function (bomb) {
        bomb.setBounce(1); 
        bomb.setCollideWorldBounds(true)
    });

    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(player, bombs, hitBomb, null, this);
}

function update() {
    if (gameOver) {
        if (this.input.keyboard.checkDown(cursors.space, 500)) {
            restartGame(this);  // Pasar 'this' como parámetro
        }
        return;
    }
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-500);  // Ajustar salto para hacerlo más natural
    }
}

function collectStar(player, star) {
    star.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0) {
        stars.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
}

function hitBomb(player, bomb) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
    scoreText.setText('Game Over! Press ENTER to Restart');
}

function restartGame(scene) {
    score = 0;
    gameOver = false;
    scoreText.setText('Score: ' + score);

    player.setTint(0xffffff);
    player.setPosition(100, 450);
    player.setVelocity(0, 0);

    stars.children.iterate(function (child) {
        child.enableBody(true, child.x, 0, true, true);
    });

    bombs.clear(true, true);

    scene.physics.resume(); 
}
