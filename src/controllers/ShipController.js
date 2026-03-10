export default class ShipController {

    constructor(scene, cursors) {
        this.scene = scene;
        this.cursors = cursors;
        
        this.speed = 5;
        this.health = 10;
    }

    create() {
        this.ship = this.scene.physics.add.sprite(640, 360, 'ship');

        this.ship.anims.create({
            key: 'fly',
            frames: this.scene.anims.generateFrameNumbers('ship', { start: 0, end: 2 }),
            frameRate: 15,
            repeat: -1
        });

        this.ship.play('fly');
    }

    update() {

        if (this.cursors.left.isDown) {
            this.ship.x -= this.speed;
        }

        if (this.cursors.right.isDown) {
            this.ship.x += this.speed;
        }

        if (this.cursors.up.isDown) {
            this.ship.y -= this.speed;
        }

        if (this.cursors.down.isDown) {
            this.ship.y += this.speed;
        }

        // Keep the ship within the screen bounds
        const halfW = this.ship.width / 2;
        const halfH = this.ship.height / 2;

        const width = this.scene.scale.width;
        const height = this.scene.scale.height;

        this.ship.x = Phaser.Math.Clamp(this.ship.x, halfW, width - halfW);
        this.ship.y = Phaser.Math.Clamp(this.ship.y, halfH, height - halfH);
    }

    increaseSpeedShip() {
        this.speed += 1;
    }

    decreaseHealthShip() {
        this.health--;

        if (this.health <= 0) {
            this.scene.gameOver();
        }
    }

    resetUpgrades() {
        this.speed = 5;
    }

    increaseHealth() {
        this.health += 1;
    }
}