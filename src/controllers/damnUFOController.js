export default class DamnUFOController {

    constructor(scene) {
        this.scene = scene;

        this.shipUFO = null;
        this.bullets = null;

        this.health = 1000;
    }

    create() {

        this.shipUFO = this.scene.physics.add.group();
        this.bullets = this.scene.physics.add.group();

        // start the countdown 30 seconds before UFO spawn
        this.scene.time.delayedCall(90000, () => {
            this.scene.gameplayUI.startUFOCountdown(30);
        });

        // spawn UFO after 2 minutes
        this.scene.time.delayedCall(120000, () => {
            this.spawnUFO();
        });

    }

    update() {

        this.shipUFO.children.each(ufo => {

            if (!ufo.active) return;

            ufo.y += ufo.direction * ufo.speedY * 0.02;

            if (ufo.y <= 80) {
                ufo.direction = 1;
            }

            if (ufo.y >= this.scene.scale.height - 80) {
                ufo.direction = -1;
            }

        });

        this.bullets.children.each(bullet => {

            if (bullet.x < -100) {
                bullet.destroy();
            }

        });
    }

    spawnUFO() {

        this.scene.gameplayUI.showBossHealth(this.health);

        this.scene.cameras.main.shake(500, 0.01);

        // stop alien spawning
        this.scene.alienController.stopSpawn();

        const y = Phaser.Math.Between(
            150,
            this.scene.scale.height - 150
        );

        const ufo = this.shipUFO.create(
            this.scene.scale.width - 100,
            y,
            'damnUFO'
        );

        ufo.setScale(6);

        ufo.direction = Phaser.Math.Between(0, 1) ? 1 : -1;
        ufo.speedY = 200;

        // shoot super fast
        this.scene.time.addEvent({
            delay: 750,
            callback: () => {

                if (!ufo.active) return;

                this.shoot(ufo);

            },
            loop: true
        });

    }

    shoot(ufo) {

        const bullet = this.bullets.create(
            ufo.x - 120,
            ufo.y,
            'redBullet'
        );

        bullet.setFlipX(true);
        bullet.setScale(5);
        bullet.setVelocityX(-900);

    }

    decreaseHealthShipUFO(ufo) {

        if (this.health <= 0) return;

        this.health--;

        this.scene.gameplayUI.updateBossHealth(this.health);

        if (this.health <= 0) {

            ufo.destroy();

            this.scene.gameplayUI.hideBossHealth();
            this.scene.gameOver('MISSION SUCCESS');

        }

    }

}