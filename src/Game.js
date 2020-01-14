// Project 2 - Hangman
// Taylor Dauphinee
// April 6, 2018

(function() {

    // game variables
    let stage = null;
    let canvas = null;
    // frame rate of game
    let frameRate = 24;

    // game objects
    let assetManager;
    let background;
    let titleScreen;
    let controlScreen;
    let mainScreen;
    let outcomeScreen;

    // ------------------------------------------------------------ event handlers
    function onReady(e) {
        console.log(">> setup");
        // kill event listener
        e.remove();

       // create the game objects
        background = assetManager.getSprite("assets");
        background.gotoAndStop("background");
        stage.addChildAt(background, 0);

        // set up screens
        titleScreen = new TitleScreen(assetManager, stage);
        titleScreen.showScreen();
        controlScreen = new ControlScreen(assetManager, stage);
        mainScreen = new MainScreen(assetManager, stage, Keyboard, Dictionary, WordSpace);
        //mainScreen.showScreen();
        outcomeScreen = new OutcomeScreen(assetManager, stage, MainScreen);
        //outcomeScreen.showScreen();

        // set up event listeners for screen changes
        stage.on("titleScreenDone", onTitleDone);
        stage.on("controlScreenDone", onControlsDone);
        stage.on("gameEnded", onGameEnd);
        stage.on("outcomeScreenDone", onOutcomeDone);

        console.log(">> game ready");
        // startup the ticker
        createjs.framerate = frameRate;
        createjs.Ticker.on("tick", onTick);
    }

    function onTitleDone(e) {
        titleScreen.hideScreen();
        // determines which screen to move to
        if (titleScreen.choose == 1) {
            if (mainScreen.reset == true) {
                mainScreen.resetGame();
            }
            mainScreen.showGame();
        } else if (titleScreen.choose == 2) {
            controlScreen.showScreen();
        }
    }

    function onControlsDone(e) {
        controlScreen.hideScreen();
        titleScreen.showScreen();
    }

    function onGameEnd(e) {
        mainScreen.removeScreen();
        outcomeScreen.getOutcome(mainScreen.winLose);
    }

    function onOutcomeDone(e) {
        outcomeScreen.hideScreen();
        mainScreen.hideWord();
        if (outcomeScreen.choose == 1) {
            mainScreen.resetGame();
            mainScreen.showGame();
        } else if (outcomeScreen.choose == 2) {
            titleScreen.showScreen();
        }
    }

    function onTick(e) {
        // TESTING FPS
        document.getElementById("fps").innerHTML = createjs.Ticker.getMeasuredFPS();

        // game loop
        //...

        // update the stage!
        stage.update();
    }

    // ------------------------------------------------------------- main method
    function main() {
        console.log(">> initializing");

        // get reference to canvas
        canvas = document.getElementById("myCanvas");
        // set canvas to as wide/high as the browser window
        canvas.width = 565;
        canvas.height = 600;
        // create stage object
        stage = new createjs.StageGL(canvas);
        stage.setClearColor("#669900");
        stage.enableMouseOver(10);

        // construct preloader object to load spritesheet and sound assets
        assetManager = new AssetManager(stage);
        stage.on("allAssetsLoaded", onReady);
        // load the assets
        assetManager.loadAssets(manifest);
    }

    main();

})(); 