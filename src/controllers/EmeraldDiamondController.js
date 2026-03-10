export default class EmeraldDiamondController {

    constructor(scene) {
        this.scene = scene;
        this.speed = 300;
    }

    create() {
        // group for all emerald diamonds
        this.emeraldDiamonds = this.scene.physics.add.group();

        // spawn emerald diamond every 12 seconds
        this.scene.time.addEvent({
            delay: 12000,
            callback: this.spawnEmeraldDiamond,
            callbackScope: this,
            loop: true
        });
    }

    update() {
        this.emeraldDiamonds.children.each(emeraldDiamond => {
            if (emeraldDiamond.x < -50) {
                emeraldDiamond.destroy();
            }
        }); // destroy after
    }

    spawnEmeraldDiamond() {

        const width = this.scene.scale.width;
        const height = this.scene.scale.height;

        // random Y position
        const randomY = Phaser.Math.Between(50, height - 50);

        const emeraldDiamond = this.emeraldDiamonds.create(
            width + 50,
            randomY,
            'emeraldDiamond'
        );

        emeraldDiamond.setScale(1.5);
        emeraldDiamond.setVelocityX(-this.speed);
    }
}