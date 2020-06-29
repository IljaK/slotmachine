import Game from './components/Game.js';
import Loader from './components/Loader.js';

var application = null;

function createGame()
{
    application.game = new Game();
    application.stage.addChild(application.game)
}

function createApplication()
{
    //Create a Pixi Application
    application = new PIXI.Application({
        width: 768,
        height: 768,
        backgroundColor: 0xB6B6B6
    });

    window.application = application;
    document.getElementById("container").appendChild(application.view);

    let loader = new Loader();
    loader.loadAssets(createGame)
}

createApplication();
