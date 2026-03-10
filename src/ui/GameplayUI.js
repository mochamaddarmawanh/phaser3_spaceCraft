export default class GameplayUI {

    constructor(scene) {
        this.scene = scene;
    }

    create(shipController, shootController) {

        this.shipController = shipController;
        this.shootController = shootController;

        const style = {
            fontSize: '22px',
            fill: '#ffffff'
        };

        this.healthText = this.scene.add.text(20, 20, '', style);
        this.shipSpeedText = this.scene.add.text(20, 50, '', style);
        this.bulletSpeedText = this.scene.add.text(20, 110, '', style);
        this.fireRateText = this.scene.add.text(20, 140, '', style);
        this.bulletCountText = this.scene.add.text(20, 170, '', style);
        this.scoreText = this.scene.add.text(20, 230, '', style);
    }

    update() {

        if (!this.shipController || !this.shootController) return;

        this.healthText.setText("Ship Health: " + this.shipController.health);
        this.shipSpeedText.setText("Ship Speed: " + this.shipController.speed);
        this.bulletSpeedText.setText("Bullet Speed: " + this.shootController.bulletSpeed);
        this.fireRateText.setText("Bullet Fire Rate: " + this.shootController.bulletFireRate);
        this.bulletCountText.setText("Bullet Count: " + this.shootController.bulletCount);
        this.scoreText.setText("Alien Killed: " + this.scene.score);
    }

}