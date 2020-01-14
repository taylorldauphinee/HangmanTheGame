class Screen {

    constructor (assetManager, stage) {
        this._stage = stage;

        this._screen = new createjs.Container();
    }

    // ------------------------------------------------- public methods
    showScreen() {
        this._stage.addChild(this._screen);
    }

    hideScreen() {
        this._stage.removeChild(this._screen);
    }
}