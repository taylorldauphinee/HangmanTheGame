class TitleScreen extends Screen {

    constructor(assetManager, stage) {
        super(assetManager, stage);

        // event for button press
        this._continue = new createjs.Event("titleScreenDone");

        // construct the game objects
        let title = assetManager.getSprite("assets");
        title.gotoAndStop("titleScreen");
        this._screen.addChild(title);

        // play button
        let playGame = assetManager.getSprite("assets");
        playGame.name = "playGame";
        playGame.gotoAndStop("playButton_up");
        playGame.buttonHelper = new createjs.ButtonHelper(playGame, "playButton_up", "playButton_over", "playButton_over", false);
        playGame.on("click", this.onClick, this);
        this._screen.addChild(playGame);

        // control screen button
        let controls = assetManager.getSprite("assets");
        controls.name = "controls";
        controls.gotoAndStop("controlsButton_up");
        controls.buttonHelper = new createjs.ButtonHelper(controls, "controlsButton_up", "controlsButton_over", "controlsButton_over", false);
        controls.on("click", this.onClick, this);
        this._screen.addChild(controls);

        // variable to store which button was pressed
        this._choose = 1;
    }

    // --------------------------------------------------- get/set methods
    get choose() {
        return this._choose;
    }

    // --------------------------------------------------- event handlers
    onClick(e) {
        if (e.target.name == "playGame") {
            this._choose = 1;
        } else if (e.target.name == "controls") {
            this._choose = 2;
        }

        this._stage.dispatchEvent(this._continue);
    }
}