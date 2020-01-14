class Dictionary {

    constructor() {
        // array for words
        this._wordList = ["test", "thoughts", "query", "list",
                        "picture", "divide", "scale", "arrange",
                        "movement", "impulse", "string", "act",
                        "diagram", "control", "canvas", "oppose"];
    }

    // ------------------------------------------------------ get/set methods
    get wordList() {
        return this._wordList;
    }

    // ------------------------------------------------------ public methods
    chooseWord(wordList) {
        let x = Math.floor(Math.random() * (wordList.length - 0 + 1) + 0);
        let wordChosen = wordList[x];
        return wordChosen;
    }
}