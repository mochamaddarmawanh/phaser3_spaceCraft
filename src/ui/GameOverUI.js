export default class GameOverUI {

    constructor(scene) {
        this.scene = scene;
    }

    show(score) {

        const width = this.scene.scale.width;
        const height = this.scene.scale.height;

        // overlay
        const overlay = this.scene.add.rectangle(
            width/2,
            height/2,
            width,
            height,
            0x000000,
            0.7
        ).setAlpha(0);

        // panel
        const panel = this.scene.add.rectangle(
            width/2,
            height/2,
            500,
            350,
            0x111111,
            0.9
        ).setStrokeStyle(4, 0xffffff).setAlpha(0);

        const title = this.scene.add.text(
            width/2,
            height/2 - 120,
            "MISSION FAILED",
            {
                fontSize: "48px",
                color: "#ff4444",
                fontStyle: "bold"
            }
        ).setOrigin(0.5).setAlpha(0);

        const scoreText = this.scene.add.text(
            width/2,
            height/2 - 40,
            "Score: " + score,
            {
                fontSize: "32px",
                color: "#ffffff"
            }
        ).setOrigin(0.5).setAlpha(0);

        const retryBtn = this.scene.add.text(
            width/2,
            height/2 + 40,
            "🔄 Retry",
            {
                fontSize: "28px",
                backgroundColor: "#222",
                color: "#fff",
                padding: { x: 25, y: 10 }
            }
        ).setOrigin(0.5).setInteractive().setAlpha(0);

        const menuBtn = this.scene.add.text(
            width/2,
            height/2 + 100,
            "🏠 Main Menu",
            {
                fontSize: "28px",
                backgroundColor: "#222",
                color: "#fff",
                padding: { x: 25, y: 10 }
            }
        ).setOrigin(0.5).setInteractive().setAlpha(0);

        this.scene.tweens.add({
            targets: [overlay, panel, title, scoreText, retryBtn, menuBtn],
            alpha: 1,
            duration: 600
        });

        const hover = (btn) => {

            btn.on("pointerover", () => {
                btn.setScale(1.1);
                btn.setStyle({ backgroundColor: "#ff4444" });
            });

            btn.on("pointerout", () => {
                btn.setScale(1);
                btn.setStyle({ backgroundColor: "#222" });
            });

        };

        hover(retryBtn);
        hover(menuBtn);

        retryBtn.on("pointerdown", () => {
            this.scene.scene.restart();
        });

        menuBtn.on("pointerdown", () => {
            this.scene.scene.start("MainMenu");
        });

    }

}