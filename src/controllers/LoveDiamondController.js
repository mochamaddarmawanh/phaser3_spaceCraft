export default class LoveDiamondController {

    constructor(scene) {
        this.scene = scene;
        this.speed = 300;
    }

    create() {
        // group for all love diamonds
        this.loveDiamonds = this.scene.physics.add.group();

        // spawn love diamond every 31 seconds
        this.scene.time.addEvent({
            delay: 31000,
            callback: this.spawnLoveDiamond,
            callbackScope: this,
            loop: true
        });
    }

    update() {
        this.loveDiamonds.children.each(loveDiamond => {
            if (loveDiamond.x < -50) {
                loveDiamond.destroy();
            }
        }); // destroy after
    }

    spawnLoveDiamond() {

        const width = this.scene.scale.width;
        const height = this.scene.scale.height;

        // random Y position
        const randomY = Phaser.Math.Between(50, height - 50);

        const loveDiamond = this.loveDiamonds.create(
            width + 50,
            randomY,
            'loveDiamond'
        );

        loveDiamond.setScale(1.5);
        loveDiamond.setVelocityX(-this.speed);
    }
}