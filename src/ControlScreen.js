class ControlScreen extends Screen {

    constructor(assetManager, stage) {
        super(assetManager, stage);

        // event for button press
        this._back = new createjs.Event("controlScreenDone");

        // instructions
        let controls = assetManager.getSprite("assets");
        controls.gotoAndStop("controlScreen");
        controls.x = 25;
        controls.y = 25;
        this._screen.addChild(controls);

        // back button
        let back = assetManager.getSprite("assets");
        back.gotoAndStop("backButton_up");
        back.buttonHelper = new createjs.ButtonHelper(back, "backButton_up", "backButton_over", "backButton_over", false);
        back.on("click", this.onClick, this);
        this._screen.addChild(back);
    }

    // ------------------------------------------------------ event handlers
    onClick(e) {
        this._stage.dispatchEvent(this._back);
    }
}