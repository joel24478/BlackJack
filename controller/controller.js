$(document).ready(function() {
    //keep track of amount of times player clicks hit
    //players starts with 2 cards, so index 1 is 2rd card
    i = 1; //Global
    //create a table to play on 
    //Table() creates a new deck, a dealer and player //setTable() gives players their cards 
    table = new Table();
    $('#stay_btn').prop('disabled', true);
    $('#hit_btn').prop('disabled', true);
})

function startGame() {
    i = 1;
    table.setTable();
    $('#dealers_card1').html("<img src='assets/images/PNG-cards-1.3/back.jpg'></img>");
    $('#dealers_card2').html("<img src='" + table.getDealer().getCard(1).getImage() + "'></img>");
    $('#players_card1').html("<img src='" + table.getPlayer().getCard(0).getImage() + "'></img>");
    $('#players_card2').html("<img src='" + table.getPlayer().getCard(1).getImage() + "'></img>");

    $('#dealers_card3').html("");
    $('#dealers_card4').html("");
    $('#dealers_card5').html("");
    $('#players_card3').html("");
    $('#players_card4').html("");
    $('#players_card5').html("");
    updateScore();
}

function hit() {
    i++; //Global

    table.hit();

    $('#players_card' + (i + 1)).html("<img src='" + table.getPlayer().getCard(i).getImage() + "'></img>");

    updateScore();

    if (table.getPlayer().getScore() >= 21) {
        stay();
    }
}

function stay() {
    //flip dealers card
    $('#dealers_card1').html("<img src='" + table.getDealer().getCard(0).getImage() + "'></img>");
    //disable button, so no one can hit or stay again
    $('#stay_btn').prop('disabled', true);
    $('#hit_btn').prop('disabled', true);

    table.stay();

    for (var i = 2; i < table.getDealer().getHand().length; i++) {
        $('#dealers_card' + (i + 1)).html("<img src='" + table.getDealer().getCard(i).getImage() + "'></img>");
    };

    if (table.getPlayer().getWon() == true) {
        $('#msg').html('You Won <b>$' + table.getPlayer().getChips());
    } else if (table.getPlayer().getWon() == false && table.getDealer().getWon() == false) {
        $('#msg').html('Tie <b>$' + table.getPlayer().getChips());
    } else {
        $('#msg').html('You Lost <b>$' + table.getPlayer().getChips());
    }

    updateScore();
    //enable to allow player to bet
    $('#bet_btn').prop('disabled', false);
}

//Updates score for both player and dealer
function updateScore() {
    $('#dealers_score').html(table.getDealer().getScore());
    $('#players_score').html(table.getPlayer().getScore());
}

function bet() {
    console.log($("#bet_input").val());

    if (table.getPlayer().getChips() <= 0) {
        $('#msg').html("Get Some money you Bum");
    } else if (isNaN(parseInt($("#bet_input").val())) || parseInt($("#bet_input").val()) <= 0 || isNaN($("#bet_input").val())) {
        $('#msg').html("Invalid entry, try again");
    } else if (table.getPlayer().getChips() < parseInt($("#bet_input").val())) {
        $('#msg').html("You dont got enough chips sir, " + bet_input);
    } else {
        table.setBet(parseInt($("#bet_input").val()));
        $('#msg').html('Bet: ' + table.getBet() + ' <b>$' + table.getPlayer().getChips());
        $('#stay_btn').prop('disabled', false);
        $('#hit_btn').prop('disabled', false);
        $('#bet_btn').prop('disabled', true);
        startGame();
    }

}