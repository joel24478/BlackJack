var Table = function() {
    //create a deck thats shuffled
    var deck = new Deck();
    var player = new Player();
    var dealer = new Player();
    var bet = 0;

    this.getDealer = function() {
        return dealer;
    };
    this.getPlayer = function() {
        return player;
    };
    this.getDeck = function() {
        return deck;
    }
    this.setBet = function(_value) {
        bet = _value;
    }
    this.getBet = function() {
        return bet;
    }

    //Deal the players and dealer their first two cards
    this.setTable = function() {
        /*clear both their hands so they dont remain with their 
        previous hand from a past game*/
        player.clearHand();
        dealer.clearHand();


        for (var i = 2; i > 0; i--) {
            player.setHand(deck.deal());
            dealer.setHand(deck.deal());
            console.log("Hands are set");
        };

        player.getScore();
        dealer.getScore();
    };
    this.hit = function() {
        if (player.getScore() < 21) {
            //deal a card
            player.setHand(deck.deal());
            //update the players score
            player.getScore();
        } else {
            console.log("Cant hit");
        }
    };

    //The Dealers logic on how to play
    this.dealerPlays = function() {
        //check score before dealing a card
        //Dealer might have 17 or greater
        dealer.getScore();

        while (dealer.getScore() < 17) {
            dealer.setHand(deck.deal());
            dealer.getScore();
        }
    };

    this.checkWinner = function() {
        console.log("playersChips: " + player.getChips());
        console.log("player bet: " + bet);

        var playersChips = 0;

        if (player.getScore() == 21) {
            if (dealer.getScore() == 21) {
                console.log("Tie, both have 21");
                //two false getWons equals a tie
                player.setWon(false);
                dealer.setWon(false);
                console.log("You Current Chips: " + player.getChips());
            } else {
                console.log("You Win by 21");
                player.setWon(true);
                dealer.setWon(false);
                playersChips = player.getChips() + bet
                player.setChips(playersChips);
                console.log("You Current Chips: " + player.getChips());
            }
        } else if (player.getScore() <= 21 && player.getScore() > dealer.getScore()) {
            console.log("You Win by larger score");
            player.setWon(true);
            dealer.setWon(false);
            playersChips = player.getChips() + bet;
            player.setChips(playersChips);
            console.log("You Current Chips: " + player.getChips());
        } else if (dealer.getScore() > 21 && player.getScore() > 21) {
            console.log("Tie");
            player.setWon(false);
            dealer.setWon(false);
            console.log("You Current Chips: " + player.getChips());
        } else if (player.getScore() > 21) {
            console.log("Bust");
            player.setWon(false);
            dealer.setWon(true);
            playersChips = player.getChips() - bet;
            player.setChips(playersChips);
            console.log("You Current Chips: " + player.getChips());
        } else if (dealer.getScore() > 21) {
            console.log("You Win, Dealer Bust");
            player.setWon(true);
            dealer.setWon(false);
            playersChips = player.getChips() + bet;
            player.setChips(playersChips);
            console.log("You Current Chips: " + player.getChips());
        } else {
            console.log("You Lose");
            player.setWon(false);
            dealer.setWon(true);
            playersChips = player.getChips() - bet;
            player.setChips(playersChips);
            console.log("You Current Chips: " + player.getChips());
        }
    };

    this.stay = function() {
        this.dealerPlays();
        this.checkWinner();
    };
};