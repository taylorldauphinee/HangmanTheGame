class Keyboard {

    constructor(assetManager, stage) {
        // event for letter chosen
        this._letterGuess = new createjs.Event("letterChosen");
        this._letterGuess.choice = "";

        // stage object
        this._stage = stage;

        // private letter variable
        this._letter = "";

        // setup button sprite
        this._sprite = assetManager.getSprite("assets");
    }

    // ------------------------------------------------------- get/set methods
    set letter(type) {
        this._letter = type;
    }
    get letter() {
        return this._letter;
    }

    // ------------------------------------------------------- event handlers
    onClick(e) {
        console.log("button clicked: " + e.target.name);
        this.disableKey();
        this._letterGuess.choice = e.target.name;
        this._stage.dispatchEvent(this._letterGuess);
    }

    // ------------------------------------------------------- public methods
    createKey(letter) {
        // create buttons
        this._sprite.name = letter;
        this._sprite.gotoAndStop(letter + "_up");
        this._sprite.buttonHelper = new createjs.ButtonHelper(this._sprite, letter + "_up", letter + "_over", letter + "_over", false);
        this._sprite.on("click", this.onClick, this);
        this._stage.addChild(this._sprite);
    }

    disableKey() {
        this._stage.removeChild(this._sprite);
        this._sprite.buttonHelper.enabled = false;
        this._sprite.removeAllEventListeners();
    }

    resetKey() {
        this._letterGuess = new createjs.Event("letterChosen");
        this._letterGuess.choice = "";
    }
}