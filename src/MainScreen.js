class MainScreen extends Screen {

    constructor(assetManager, stage, Keyboard, Dictionary, WordSpace) {
        super(assetManager, stage);

        this._assetManager = assetManager;

        // event for moving to outcome screen
        this._outcome = new createjs.Event("gameEnded");

        // keyboard array
        this._keyboard = [];

        // variable for wrong guesses
        this._wrong = 0;

        // variable for word chosen
        this._word = undefined;

        // variable for determining outcome
        this._winLose = null;

        // variable for resetting
        this._reset = false;

        // variable for determining correct guesses
        this._wrongAnswer = true;

        // guessed word object
        this._guessedWord = [];

        // blank spaces and bitmapText
        this._spaces = [];
        this._letters = [];

        // hanger object
        let hanger = assetManager.getSprite("assets");
        hanger.gotoAndStop("hanger");
        this._screen.addChild(hanger);

        // hangman
        this._hangman = assetManager.getSprite("assets");
        this._hangman.gotoAndStop("hangmanHead");
        this._screen.addChild(this._hangman);

        // setup keyboard buttons
        for (let x = 0; x < 26; x++) {
            this._keyboard.push(new Keyboard(assetManager, stage));
        }

        // event for choosing letters
        this._stage.on("letterChosen", this.onLetterChoice, this);

        // selecting the word from the list
        this._wordChoice = new Dictionary();
        while (this._word == undefined) {
            this._word = this._wordChoice.chooseWord(this._wordChoice.wordList);
        }
        console.log(this._word);
    }

    // --------------------------------------------------- get/set methods
    get word() {
        return this._word;
    }

    get winLose() {
        return this._winLose;
    }

    get reset() {
        return this._reset;
    }

    // --------------------------------------------------- event handlers
    onLetterChoice(e) {
        // does not transfer correctly on replay - check on this!
        console.log("here: " + e.choice);
        // checks each letter for a match
        for (let x = 0; x < this._word.length; x++) {
            if (e.choice.toLowerCase() == this._word.charAt(x)) {
                console.log("match");
                this._guessedWord[x] = e.choice;
                this._stage.addChild(this._spaces[x].letterSpace);
                this._wrongAnswer = false;
                // check if whole word is guessed
                this._allLetters = false;
                for (let x = 0; x < this._letters.length; x++) {
                    if (this._guessedWord[x].toString().toLowerCase() == this._letters[x].toString()) {
                        this._allLetters = true;
                    } else {
                        this._allLetters = false;
                        break;
                    }
                }
                if (this._allLetters == true) {
                    this._winLose = 1;
                    this._reset = true;
                    console.log(this._winLose);
                    this._stage.dispatchEvent(this._outcome);
                }
            }
        }

        // if no matching letters
        if (this._wrongAnswer == true) {
            this._wrong++;
            createjs.Sound.play("noLetter");
            switch(this._wrong) {
                case 1:
                    this._hangman.play();
                    this._hangman.on("animationend", this.onAnimEnd, this);
                    break;
                case 2:
                    this._hangman.gotoAndPlay("hangmanBody");
                    this._hangman.on("animationend", this.onAnimEnd, this);
                    break;
                case 3:
                    this._hangman.gotoAndPlay("hangmanLeftArm");
                    this._hangman.on("animationend", this.onAnimEnd, this);
                    break;
                case 4:
                    this._hangman.gotoAndPlay("hangmanRightArm");
                    this._hangman.on("animationend", this.onAnimEnd, this);
                    break;
                case 5:
                    this._hangman.gotoAndPlay("hangmanLeftLeg");
                    this._hangman.on("animationend", this.onAnimEnd, this);
                    break;
                case 6:
                    this._hangman.gotoAndPlay("hangmanRightLeg");
                    this._hangman.on("animationend", this.onManDone, this);
                    break;
            }
        } else if (this._wrongAnswer == false) {
            createjs.Sound.play("gotLetter");
            this._wrongAnswer = true;
        }
    }

    onAnimEnd(e) {
        this._hangman.stop();
        this._hangman.removeAllEventListeners();
    }

    onManDone(e) {
        this._hangman.stop();
        this._hangman.removeAllEventListeners();
        this._winLose = 2;
        this._reset = true;
        for (let x = 0; x < this._word.length; x++) {
            this._stage.addChild(this._spaces[x].letterSpace);
        }
        this._stage.dispatchEvent(this._outcome);
    }

    // -------------------------------------------------- public methods
    removeScreen() {
        super.hideScreen();
        for (let x = 0; x < this._keyboard.length; x++) {
            this._keyboard[x].disableKey();
        }
    }

    showGame() {
        super.showScreen();
        // create keyboard buttons
        this._keyboard[0].createKey("A");
        this._keyboard[1].createKey("B");
        this._keyboard[2].createKey("C");
        this._keyboard[3].createKey("D");
        this._keyboard[4].createKey("E");
        this._keyboard[5].createKey("F");
        this._keyboard[6].createKey("G");
        this._keyboard[7].createKey("H");
        this._keyboard[8].createKey("I");
        this._keyboard[9].createKey("J");
        this._keyboard[10].createKey("K");
        this._keyboard[11].createKey("L");
        this._keyboard[12].createKey("M");
        this._keyboard[13].createKey("N");
        this._keyboard[14].createKey("O");
        this._keyboard[15].createKey("P");
        this._keyboard[16].createKey("Q");
        this._keyboard[17].createKey("R");
        this._keyboard[18].createKey("S");
        this._keyboard[19].createKey("T");
        this._keyboard[20].createKey("U");
        this._keyboard[21].createKey("V");
        this._keyboard[22].createKey("W");
        this._keyboard[23].createKey("X");
        this._keyboard[24].createKey("Y");
        this._keyboard[25].createKey("Z");

        for (let x = 0; x < this._word.length; x++) {
            this._spaces.push(new WordSpace(this._assetManager, this._stage));
            this._spaces[x].spaceLocation(x);
            this._spaces[x].letterSpace.text = this._word[x];
            this._letters[x] = this._word[x];
            this._guessedWord[x] = "";
        }
    }

    hideWord() {
        for (let x = 0; x < this._word.length; x++) {
            this._spaces[x].deleteSpace();
        }
    }

    resetGame() {
        this._spaces = [];
        this._hangman.gotoAndStop("hangmanHead");
        this._wrong = 0;
        this._word = this._wordChoice.chooseWord(this._wordChoice.wordList);
        while (this._word == undefined) {
            this._word = this._wordChoice.chooseWord(this._wordChoice.wordList);
        }
        for (let x = 0; x < this._keyboard.length; x++) {
            this._keyboard[x].resetKey();
        }
        console.log(this._word);
    }
}