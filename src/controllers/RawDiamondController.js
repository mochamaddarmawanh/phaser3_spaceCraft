export default class RawDiamondController {

    constructor(scene) {
        this.scene = scene;
        this.speed = 300;
    }

    create() {
        // group for all raw diamonds
        this.rawDiamonds = this.scene.physics.add.group();

        // spawn raw diamond every 5 seconds
        this.scene.time.addEvent({
            delay: 5000,
            callback: this.spawnRawDiamond,
            callbackScope: this,
            loop: true
        });
    }

    update() {
        this.rawDiamonds.children.each(rawDiamond => {
            if (rawDiamond.x < -50) {
                rawDiamond.destroy();
            }
        }); // destroy after
    }

    spawnRawDiamond() {

        const width = this.scene.scale.width;
        const height = this.scene.scale.height;

        // random Y position
        const randomY = Phaser.Math.Between(50, height - 50);

        const rawDiamond = this.rawDiamonds.create(
            width + 50,
            randomY,
            'rawDiamond'
        );

        rawDiamond.setScale(1.5);

        rawDiamond.setVelocityX(-this.speed);
    }
}