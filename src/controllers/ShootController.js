export default class ShootController {

    constructor(scene, ship) {
        this.scene = scene;
        this.ship = ship;

        this.bulletSpeed = 800;
        this.bulletSpeedMax = 2000;

        this.bulletFireRate = 300;
        this.bulletFireRateMin = 80;

        this.bulletCount = 1;
        this.bulletMax = 5;

        this.bulletRange = 500;
    }

    create() {

        this.bullets = this.scene.physics.add.group();

        this.fireEvent = this.scene.time.addEvent({
            delay: this.bulletFireRate,
            callback: this.shoot,
            callbackScope: this,
            loop: true
        });
    }

    update() {
        this.bullets.children.each((bullet) => {
            if (bullet.x > this.scene.scale.width + 100) {
                bullet.destroy();
            }
        });
    }

    shoot() {

        const spreadAngle = 8; // gap between a bullet

        for (let i = 0; i < this.bulletCount; i++) {

            const angle = (i - (this.bulletCount - 1) / 2) * spreadAngle;

            const bullet = this.bullets.create(
                this.ship.x + 80,
                this.ship.y,
                'blueBullet'
            );

            this.scene.physics.velocityFromAngle(
                angle,
                this.bulletSpeed,
                bullet.body.velocity
            );

            // // save start position
            // bullet.startX = bullet.x;
            // bullet.startY = bullet.y;

            this.scene.time.delayedCall(300, () => {
                if (bullet.active) bullet.destroy();
            });
        }
    }

    increaseBulletSpeed(amount = 100) {
        this.bulletSpeed = Math.min(
            this.bulletSpeed + amount,
            this.bulletSpeedMax
        );
    }

    increaseBulletFireRate(amount = 50) {

        this.bulletFireRate = Math.max(
            this.bulletFireRate - amount,
            this.bulletFireRateMin
        );

        this.fireEvent.remove(false);

        this.fireEvent = this.scene.time.addEvent({
            delay: this.bulletFireRate,
            callback: this.shoot,
            callbackScope: this,
            loop: true
        });
    }

    increaseBulletCount() {
        this.bulletCount = Math.min(this.bulletCount + 1, this.bulletMax);
    }

    resetUpgrades() {
        this.bulletSpeed = 800;
        this.bulletFireRate = 300;
        this.bulletCount = 1;
    }
}