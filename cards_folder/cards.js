var btnRefresh = document.getElementsByClassName("btn-refresh");

var deckSize = 52;
var d = 52;
for (d = deckSize; d > 0; d--) { $('container select').innerHtml += '<option value=' + d + '>' + d + '</option>'; }

var numberOfCards = 52;

function deckOfCards() {

    var randomValue, randomSuit, cardSingle, cardSuit, cardValue;

    var n = 0;
    var i = 0;
    var c = 0;
    var m = 0;

    var cardList = [];
    var listValue = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    var listSuit = ['♠', '♦', '♥', '♣'];

    $('card').remove();

    function cardGenerate() {
        randomValue = listValue[Math.floor(Math.random() * listValue.length)];
        randomSuit = listSuit[Math.floor(Math.random() * listSuit.length)];
        cardSingle = randomSuit + randomValue;

        if (jQuery.inArray(cardSingle, cardList) !== -1) {
            //rerun if card already exists
            cardGenerate();
            return;
        } else {
            //push card to array if is doesn't
            cardList.push(cardSingle);
        }
    }

    for (i = 0; i < deckSize; i++) { cardGenerate(); }

    function cardCode() {
        document.querySelector('container').innerHTML += '<card><corner><value></value><suit></suit></corner><center></center><corner><value></value><suit></suit></corner></card>'
    }

    for (n = 0; n < numberOfCards; n++) { cardCode(); }

    document.querySelectorAll('card').forEach(function(item) {

        cardSuit = cardList[c].substring(0).replace(/\d+/g, '').replace('A', '').replace('K', '').replace('Q', '').replace('J', '');
        cardValue = cardList[c].substring(1);

        item.classList.add('no-' + cardValue);
        item.querySelectorAll('suit')[c].innerHtml = cardSuit;

        item.querySelectorAll('value')[c].innerHtml = cardValue;

        if (cardValue === 'A') { item.querySelector('center').innerHtml = '<symbol>' + cardSuit + '&#xFE0E;</symbol>'; } else if (cardValue === 'K' && (cardSuit === '♥' || cardSuit === '♦')) { item.querySelector('center').innerHtml = '&#x2654;&#xFE0E;'; } else if (cardValue === 'K' && (cardSuit === '♠' || cardSuit === '♣')) { item.querySelector('center').innerHtml = '&#x265a;&#xFE0E;'; } else if (cardValue === 'Q' && (cardSuit === '♥' || cardSuit === '♦')) { item.querySelector('center').innerHtml = '&#x2655;&#xFE0E;'; } else if (cardValue === 'Q' && (cardSuit === '♠' || cardSuit === '♣')) { item.querySelector('center').innerHtml = '&#x265b;&#xFE0E;'; } else if (cardValue === 'J' && (cardSuit === '♥' || cardSuit === '♦')) { item.querySelector('center').innerHtml = '&#x2657;&#xFE0E;'; } else if (cardValue === 'J' && (cardSuit === '♠' || cardSuit === '♣')) { item.querySelector('center').innerHtml = '&#x265d;&#xFE0E;'; } else {
            for (m = 0; m < cardValue; m++) { item.querySelector('center').innerHtml += '<symbol>' + cardSuit + '&#xFE0E;</symbol>'; }
        }
        if (cardSuit === '♥') { cardSuit = 'heart'; } else if (cardSuit === '♦') { cardSuit = 'diamond'; } else if (cardSuit === '♠') { cardSuit = 'spade'; } else if (cardSuit === '♣') { cardSuit = 'club'; }
        item.classList.add(cardSuit);
        c++;
        console.log(c);
    });

} //deckOfCards

deckOfCards();