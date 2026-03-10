export default class PrincessDiamondController {

    constructor(scene) {
        this.scene = scene;
        this.speed = 300;
    }

    create() {
        // group for all princess diamonds
        this.princessDiamonds = this.scene.physics.add.group();

        // spawn princess diamond every 27 seconds
        this.scene.time.addEvent({
            delay: 27000,
            callback: this.spawnPrincessDiamond,
            callbackScope: this,
            loop: true
        });
    }

    update() {
        this.princessDiamonds.children.each(princessDiamond => {
            if (princessDiamond.x < -50) {
                princessDiamond.destroy();
            }
        }); // destroy after
    }

    spawnPrincessDiamond() {

        const width = this.scene.scale.width;
        const height = this.scene.scale.height;

        // random Y position
        const randomY = Phaser.Math.Between(50, height - 50);

        const princessDiamond = this.princessDiamonds.create(
            width + 50,
            randomY,
            'princessDiamond'
        );

        princessDiamond.setScale(1.5);
        princessDiamond.setVelocityX(-this.speed);
    }
}