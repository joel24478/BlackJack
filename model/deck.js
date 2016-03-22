//Constants that can be used inplace on numbers for suits
SPADE = 1;
DIAMOND = 2;
HEART = 3;
CLUB = 4;

function Deck() {
    var deck = [];

    this.getDeck = function() {
        return deck;
    };
    //Private to make deck self sufficient, lazy bastard
    var fillDeck = function() {
        //empty deck incase of errors
        deck.length = 0;

        for (var i = 1; i <= 52; i++) {
            if (i < 13) {
                deck.push(new Card((i % 13), SPADE));
            } else if (i == 13) {
                deck.push(new Card(i, SPADE))
            } else if (i >= 14 && i <= 25) {
                deck.push(new Card((i % 13), DIAMOND));
            } else if (i == 26) {
                deck.push(new Card(13, DIAMOND));
            } else if (i >= 27 && i <= 38) {
                deck.push(new Card((i % 13), HEART));
            } else if (i == 39) {
                deck.push(new Card(13, HEART));
            } else if (i >= 40 && i <= 51) {
                deck.push(new Card((i % 13), CLUB));
            } else {
                deck.push(new Card(13, CLUB));
            }
        }
        console.log("deck filled");
    }

    var shuffle = function() {
        var temp;
        temp = deck[0];
        for (var i = 0; i <= 51; i++) {
            //Pick a random card from 0-51
            randomCard = Math.floor((Math.random() * 52));
            temp = deck[i];
            deck[i] = deck[randomCard];
            deck[randomCard] = temp;
        }
    };

    //Testing to see if deck was built or shuffle properly
    this.printDeck = function() {
        for (var i = 0; i <= 51; i++) {
            console.log("#: " + deck[i].getNum() + " Suit: " + deck[i].getSuit());
        }
    };
    //returns a card off the top of the deck
    //If there is no cards in the deck then it will fill the deck,
    //shuffle, and returns a card off the top of the deck
    this.deal = function() {
        console.log(deck.length);
        if (deck.length !== 0) {
            console.log("dealt card");
            return deck.pop();
        } else {
            console.log("Deck is empty");
            fillDeck();
            shuffle();
            return deck.pop();
        }
    };
};