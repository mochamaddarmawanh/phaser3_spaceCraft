export class MainMenu extends Phaser.Scene {

    constructor() {
        super("MainMenu");
    }

    preload() {
        this.load.image('background', 'assets/space.png');
    }

    create() {

        const width = this.scale.width;
        const height = this.scale.height;

        // background
        this.background = this.add.tileSprite(
            width / 2,
            height / 2,
            width,
            height,
            "background"
        );

        // title
        const title = this.add.text(
            width / 2,
            height / 2 - 120,
            "SPACE SHOOTER",
            {
                fontSize: "64px",
                color: "#ffffff",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);

        // subtitle
        const subtitle = this.add.text(
            width / 2,
            height / 2 - 60,
            "Defeat aliens and survive the UFO boss",
            {
                fontSize: "22px",
                color: "#cccccc"
            }
        ).setOrigin(0.5);

        // start button
        const startBtn = this.add.text(
            width / 2,
            height / 2 + 20,
            "▶ Start Game",
            {
                fontSize: "32px",
                backgroundColor: "#222",
                color: "#ffffff",
                padding: { x: 30, y: 12 }
            }
        ).setOrigin(0.5).setInteractive();

        // credit button
        const creditBtn = this.add.text(
            width / 2,
            height / 2 + 90,
            "Credits",
            {
                fontSize: "28px",
                backgroundColor: "#222",
                color: "#ffffff",
                padding: { x: 25, y: 10 }
            }
        ).setOrigin(0.5).setInteractive();

        // hover effect
        const hover = (btn) => {

            btn.on("pointerover", () => {
                btn.setScale(1.1);
                btn.setStyle({ backgroundColor: "#00aaff" });
            });

            btn.on("pointerout", () => {
                btn.setScale(1);
                btn.setStyle({ backgroundColor: "#222" });
            });

        };

        hover(startBtn);
        hover(creditBtn);

        // start game
        startBtn.on("pointerdown", () => {
            this.scene.start("Start");
        });

        // credits popup
        creditBtn.on("pointerdown", () => {

            this.add.text(
                width / 2,
                height - 80,
                "Game created with Phaser by Mochamad Darmawan Hardjakusumah",
                {
                    fontSize: "20px",
                    color: "#ffffff"
                }
            ).setOrigin(0.5);

        });

    }

    update() {

        // background movement
        if (this.background) {
            this.background.tilePositionX += 1;
        }

    }

}