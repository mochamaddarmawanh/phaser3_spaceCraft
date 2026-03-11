export default class GameplayUI {

    constructor(scene) {
        this.scene = scene;

        this.bossBar = null;
        this.bossBarBg = null;
        this.bossMaxHealth = 1000;
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

    showBossHealth(maxHealth) {

        this.bossMaxHealth = maxHealth;

        const width = this.scene.scale.width;

        this.barWidth = 300;
        this.barHeight = 18;

        this.x = width - this.barWidth - 30;
        this.y = 40;

        this.bossBarBg = this.scene.add.graphics();
        this.bossBarBg.fillStyle(0x000000, 0.6);
        this.bossBarBg.fillRect(this.x - 3, this.y - 3, this.barWidth + 6, this.barHeight + 6);

        this.bossBar = this.scene.add.graphics();
        this.bossBar.fillStyle(0xff0000, 1);
        this.bossBar.fillRect(this.x, this.y, this.barWidth, this.barHeight);

        this.bossTitle = this.scene.add.text(
            this.x + this.barWidth / 2,
            this.y - 18,
            "UFO BOSS",
            {
                fontSize: "18px",
                color: "#ffffff"
            }
        ).setOrigin(0.5);

    }

    updateBossHealth(currentHealth) {

        if (!this.bossBar) return;

        const percent = currentHealth / this.bossMaxHealth;

        this.bossBar.clear();
        this.bossBar.fillStyle(0xff0000, 1);
        this.bossBar.fillRect(this.x, this.y, this.barWidth * percent, this.barHeight);

    }

    hideBossHealth() {

        if (this.bossBar) this.bossBar.destroy();
        if (this.bossBarBg) this.bossBarBg.destroy();
        if (this.bossTitle) this.bossTitle.destroy();

    }
}