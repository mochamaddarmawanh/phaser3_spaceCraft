import ShipController from '../controllers/ShipController.js';
import ShootController from '../controllers/ShootController.js';
import RawDiamondController from '../controllers/RawDiamondController.js';
import EmeraldDiamondController from '../controllers/EmeraldDiamondController.js';
import PrincessDiamondController from '../controllers/PrincessDiamondController.js';
import LoveDiamondController from '../controllers/LoveDiamondController.js';
import AlienController from '../controllers/AlienAloonnController.js';
import DamnUFOController from '../controllers/DamnUFOController.js';
import GameplayUI from '../ui/GameplayUI.js';
import GameOverUI from '../ui/GameOverUI.js';

export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {
        this.load.image('background', 'assets/space.png');
        // this.load.image('logo', 'assets/phaser.png');
        this.load.image('blueBullet', 'assets/blueBullet.png');
        this.load.image('redBullet', 'assets/redBullet.png');
        this.load.image('rawDiamond', 'assets/rawDiamond.png');
        this.load.image('emeraldDiamond', 'assets/emeraldDiamond.png');
        this.load.image('princessDiamond', 'assets/princessDiamond.png');
        this.load.image('loveDiamond', 'assets/loveDiamond.png');
        this.load.image('alienAloonn', 'assets/alienAloonn.png');
        this.load.image('damnUFO', 'assets/damnUFO.png');

        //  The ship sprite is CC0 from https://ansimuz.itch.io
        this.load.spritesheet('ship', 'assets/spaceship.png', {
            frameWidth: 176, frameHeight: 96
        });
    }

    create() {
        this.background = this.add.tileSprite(640, 360, 1280, 720, 'background');
        // const logo = this.add.image(640, 200, 'logo');

        this.input.keyboard.enabled = true;
        this.cursors = this.input.keyboard.createCursorKeys();

        this.score = 0;

        this.shipController = new ShipController(this, this.cursors);
        this.shipController.create();

        this.shootController = new ShootController(this, this.shipController.ship);
        this.shootController.create();

        this.rawDiamondController = new RawDiamondController(this);
        this.rawDiamondController.create();

        this.emeraldDiamondController = new EmeraldDiamondController(this);
        this.emeraldDiamondController.create();

        this.princessDiamondController = new PrincessDiamondController(this);
        this.princessDiamondController.create();

        this.loveDiamondController = new LoveDiamondController(this);
        this.loveDiamondController.create();

        this.alienController = new AlienController(this);
        this.alienController.create();

        this.damnUFOController = new DamnUFOController(this);
        this.damnUFOController.create();

        // every collation in this game
        this.collisionComplication();

        this.gameplayUI = new GameplayUI(this);
        this.gameplayUI.create(this.shipController, this.shootController);

        this.gameOverUI = new GameOverUI(this);
    }

    update() {
        this.background.tilePositionX += 2;

        this.shipController.update();
        this.shootController.update();
        this.rawDiamondController.update();
        this.emeraldDiamondController.update();
        this.princessDiamondController.update();
        this.loveDiamondController.update();
        this.alienController.update();
        this.damnUFOController.update();
        
        this.gameplayUI.update();
    }

    collisionComplication() {

        // collision ship with raw diamond
        this.physics.add.overlap(
            this.shipController.ship,
            this.rawDiamondController.rawDiamonds,
            this.collectrawDiamond,
            null,
            this
        );

        // collision ship with emerald diamond
        this.physics.add.overlap(
            this.shipController.ship,
            this.emeraldDiamondController.emeraldDiamonds,
            this.collectEmeraldDiamond,
            null,
            this
        );

        // collision ship with princess diamond
        this.physics.add.overlap(
            this.shipController.ship,
            this.princessDiamondController.princessDiamonds,
            this.collectPrincessDiamond,
            null,
            this
        );

        // collision ship with love diamond
        this.physics.add.overlap(
            this.shipController.ship,
            this.loveDiamondController.loveDiamonds,
            this.collectLoveDiamond,
            null,
            this
        );

        // collision ship with red bullet
        this.physics.add.overlap(
            this.shipController.ship,
            this.alienController.bullets,
            this.hitAlienBullet,
            null,
            this
        );

        // collision ship with red bullet
        this.physics.add.overlap(
            this.shipController.ship,
            this.alienController.aliens,
            this.hitAlien,
            null,
            this
        );

        // collision ship blue bullet with alien
        this.physics.add.overlap(
            this.shootController.bullets,
            this.alienController.aliens,
            this.hitAlienByShipBlueBullet,
            null,
            this
        );

        // collision ship blue bullet with ufo
        this.physics.add.overlap(
            this.shootController.bullets,
            this.damnUFOController.shipUFO,
            this.hitUFOByShipBlueBullet,
            null,
            this
        );

        // collision ufo red bullet with ship
        this.physics.add.overlap(
            this.shipController.ship,
            this.damnUFOController.bullets,
            this.hitShipByUFORedBullet,
            null,
            this
        );
    }

    collectrawDiamond(ship, rawDiamond) {
        rawDiamond.destroy();

        const bonus = Phaser.Math.Between(1, 3);

        if (bonus === 1) this.shootController.increaseBulletSpeed();;
        if (bonus === 2) this.shootController.increaseBulletFireRate();;
        if (bonus === 3) this.shootController.increaseBulletCount();;
    }

    collectEmeraldDiamond(ship, emeraldDiamond) {
        emeraldDiamond.destroy();
        this.shipController.increaseSpeedShip();
    }

    collectPrincessDiamond(ship, princessDiamond) {
        princessDiamond.destroy();
        this.shipController.resetUpgrades();
        this.shootController.resetUpgrades();
    }

    collectLoveDiamond(ship, loveDiamond) {
        loveDiamond.destroy();
        this.shipController.increaseHealth();
    }

    hitAlienBullet(ship, bullet) {
        bullet.destroy();
        this.shipController.decreaseHealthShip();
    }

    hitAlien(ship, alien) {
        alien.destroy();
        this.shipController.decreaseHealthShip();
    }

    hitAlienByShipBlueBullet(shipBlueBullet, alien) {
        shipBlueBullet.destroy();
        alien.health--;

        if (alien.health <= 0) {
            alien.destroy();

            this.score += 1;
        }
    }

    hitUFOByShipBlueBullet(bullet, ufo) {
        bullet.destroy();
        this.damnUFOController.decreaseHealthShipUFO(ufo);
    }

    hitShipByUFORedBullet(ship, bullet) {
        bullet.destroy();
        this.shipController.decreaseHealthShip();
    }

    gameOver(title = "MISSION FAILED") {
        this.physics.pause();
        this.input.keyboard.enabled = false;

        this.gameOverUI.show(this.score, title);
    }
}