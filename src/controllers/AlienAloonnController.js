export default class AlienAloonnController {

    constructor(scene) {
        this.scene = scene;
        this.aliens = null;
    }

    create() {
        this.aliens = this.scene.physics.add.group();
        this.bullets = this.scene.physics.add.group();

        // alien spawn every 3 seconds
        this.spawnEvent = this.scene.time.addEvent({
            delay: 3000,
            callback: this.spawnAlien,
            callbackScope: this,
            loop: true
        });
    }

    update() {
        this.aliens.children.each(alien => {

            if (!alien.active) return;

            alien.y += alien.direction * alien.speedY * 0.02;

            // top and bottom screen boundaries
            if (alien.y <= 50) {
                alien.direction = 1;
            }

            if (alien.y >= this.scene.scale.height - 50) {
                alien.direction = -1;
            }

            // destroy when it leaves the screen
            if (alien.x < -100) {
                alien.destroy();
            }
        });

        this.bullets.children.each(bullet => {
            if (bullet.x < -50) {
                bullet.destroy();
            }
        }); // destroy after
    }

    spawnAlien() {

        if (this.aliens.countActive(true) >= 4) return;

        const y = Phaser.Math.Between(50, this.scene.scale.height - 50);

        const alien = this.aliens.create(
            this.scene.scale.width - 100,
            y,
            'alienAloonn'
        );

        alien.health = 40;

        alien.setScale(3);

        // random up-down movement
        alien.direction = Phaser.Math.Between(0, 1) ? 1 : -1;
        alien.speedY = Phaser.Math.Between(70, 250);

        // alien shoot every 3 seconds
        this.scene.time.addEvent({
            delay: 3000,
            callback: () => {
                if (!alien.active) return;
                this.shoot(alien);
            },
            loop: true
        });
    }

    shoot(alien) {
        const bullet = this.bullets.create(
            alien.x - 50,
            alien.y,
            'redBullet'
        );

        bullet.setFlipX(true);
        bullet.setScale(3);
        bullet.setVelocityX(-400);
    }

    stopSpawn() {
        if (this.spawnEvent) {
            this.spawnEvent.remove(false);
        }
    }
}