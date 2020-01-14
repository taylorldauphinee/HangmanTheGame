class OutcomeScreen extends Screen {

    constructor(assetManager, stage, MainScreen) {
        super(assetManager, stage);

        // event for button press
        this._done = new createjs.Event("outcomeScreenDone");

        // main screen
        this._mainScreen = MainScreen;

        // win message
        this._winScreen = assetManager.getSprite("assets");
        this._winScreen.gotoAndStop("winScreen");

        // lose message
        this._loseScreen = assetManager.getSprite("assets");
        this._loseScreen.gotoAndStop("loseScreen");

        // play again button
        let playAgain = assetManager.getSprite("assets");
        playAgain.name = "playAgain";
        playAgain.gotoAndStop("playAgain_up");
        playAgain.buttonHelper = new createjs.ButtonHelper(playAgain, "playAgain_up", "playAgain_over", "playAgain_over", false);
        playAgain.on("click", this.onClick, this);
        this._screen.addChild(playAgain);
        
        // quit to main menu button
        let quit = assetManager.getSprite("assets");
        quit.name = "quit";
        quit.gotoAndStop("quitButton_up");
        quit.buttonHelper = new createjs.ButtonHelper(quit, "quitButton_up", "quitButton_over", "quitButton_over");
        quit.on("click", this.onClick, this);
        this._screen.addChild(quit);

        // variable to store which button was pressed
        this._choose = 1;
    }

    // ----------------------------------------------------- get/set methods
    get choose() {
        return this._choose;
    }

    // ----------------------------------------------------- event handlers
    onClick(e) {
        if (e.target.name == "playAgain") {
            this._choose = 1;
        } else if (e.target.name == "quit") {
            this._choose = 2;
        }

        this._stage.dispatchEvent(this._done);
    }

    // ----------------------------------------------------- private methods
    getOutcome(winLose) {
        super.showScreen();
        // determines which text object is shown
        if (winLose == 1) {
            createjs.Sound.play("winSound");
            this._screen.removeChild(this._loseScreen);
            this._screen.addChild(this._winScreen);
        } else if (winLose == 2) {
            createjs.Sound.play("loseSound");
            this._screen.removeChild(this._winScreen);
            this._screen.addChild(this._loseScreen);
        }
    }
}