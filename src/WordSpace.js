class WordSpace {

    constructor(assetManager, stage) {
        // stage object
        this._stage = stage;

        // build blank space for word
        this.space = assetManager.getSprite("assets");
        this.space.gotoAndStop("letterLine");
        this.space.x = 10;
        this._stage.addChild(this.space);

        // build bitmapText for letters
        this._letterSpace = new createjs.BitmapText("", assetManager.getSpriteSheet("assets"));
        this._letterSpace.y = 275;
        this._letterSpace.x = 10;
    }

    // -------------------------------------------------- get/set methods
    get letterSpace() {
        return this._letterSpace;
    }
    set letterSpace(letterChoice) {
        this._letterSpace = letterChoice;
    }

    // -------------------------------------------------- private methods
    spaceLocation(count) {
        this.space.x = this.space.getBounds().width * count;
        this.letterSpace.x = this.space.x + 20;
    }

    deleteSpace() {
        this._stage.removeChild(this.space);
        this._stage.removeChild(this._letterSpace);
    }
}