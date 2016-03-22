function Player() {
    var playersHand = [];
    var score = 0;
    //if the player won it is set to true
    var won = false;
    var chips = 200;

    this.setHand = function(_card) {
        playersHand.push(_card);
    };
    this.getHand = function() {
        return playersHand;
    };
    this.clearHand = function() {
        //This will clear the array by setting its length to 0
        playersHand.length = 0;
    }
    this.getCard = function(_index) {
        return playersHand[_index];
    };
    this.setDone = function(_done) {
        done = _done;
    };
    this.getDone = function() {
        return done;
    };
    this.getWon = function() {
        return won;
    };
    this.setWon = function(_won) {
        won = _won;
    };
    this.getChips = function() {
        return chips;
    };
    this.setChips = function(_value) {
        chips = _value;
    };
    this.getScore = function() {
        var tempScore = 0;
        score = 0;
        for (var i = 0; i < playersHand.length; i++) {
            if (playersHand[i].getNum() == 1) {
                score += 11;
                tempScore += 1
            } else if (playersHand[i].getNum() >= 10) {
                score += 10;
                tempScore += 10;
            } else {
                score += playersHand[i].getNum();
                tempScore += playersHand[i].getNum();
            }
        };
        if (score > 21) {
            score = tempScore;
        }
        return score;
    };
};