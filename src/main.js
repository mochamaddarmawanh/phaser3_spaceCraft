import { Start } from './scenes/Start.js';
import { MainMenu } from "./scenes/MainMenu.js";

const config = {
    type: Phaser.AUTO,
    title: 'Overlord Rising',
    description: '',
    parent: 'game-container',

    width: window.innerWidth,
    height: window.innerHeight,
    // width: 140,
    // height: 140,

    backgroundColor: '#000000',
    pixelArt: false,

    scene: [
        MainMenu,
        Start
    ],

    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
}

new Phaser.Game(config);
            