function Card(_num, _suit) {
    var num = _num;
    var suit = _suit;
    var image = "assets/images/PNG-cards-1.3/" + _num + "_of_";

    if (_suit == 1) {
        image += "spades.png";
    } else if (_suit == 2) {
        image += "diamonds.png";
    } else if (_suit == 3) {
        image += "hearts.png";
    } else {
        image += "clubs.png";
    }

    this.getNum = function() {
        return num;
    };

    this.getSuit = function() {
        return suit;
    };
    this.getImage = function() {
        return image;
    };

};