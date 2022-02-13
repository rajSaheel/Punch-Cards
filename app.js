let header = $(".header")
let stats = $(".stats")
let elements = $(".elements")
let footer = $(".footer")

let audio = document.querySelector('#audio')

let form = $('form')
let inputName = $("#name")

let playerName = $("#player")
let cardsLeft = document.getElementById('cards-left')

let icon6 = document.getElementById("a6-o")
let icon9 = document.getElementById("a9-o")
let icon12 = document.getElementById("a12-o")
let icon3 = document.getElementById("a3-o")

let avatars = document.querySelectorAll("input[name=icons]")
let otherIcons = [icon9, icon12, icon3, ]
let iconList = ["url('/asset/monkey.jfif') 10vh 10vh", "url('/asset/lion.jfif') 10vh 10vh", "url('/asset/bull.jfif') 10vh 10vh", "url('/asset/bear.jfif') 10vh 10vh"]

let lion = ["url('/asset/lion.jfif')", 'Lion', [], false]
let bull = ["url('/asset/bull.jfif')", 'Bull', [], false]
let ape = ["url('/asset/moneky.jfif')", 'Ape', [], false]
let bear = ["url('/asset/bear.jfif')", 'Bear', [], false]

let avatarsProfile = [ape, lion, bull, bear]
let player = []
let playerF = []
let syncValue = -1

let cardSection = document.querySelector('#cards-section')
let playingCards = document.querySelectorAll('playing-cards')
let submittingCards = document.getElementById('submitting-cards')
let card6 = document.getElementById('card-6')

let hideAll = function() {
    header.hide()
    stats.hide()
    elements.hide()
    footer.hide()
}

let showAll = function() {
    form.remove()
    $('.header').show()
    $('.stats').show()
    $('.elements').show()
    $('.footer').show()
}

let deckSize = 52;
let d = 52;
let listValue = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
let listSuit = ['♠', '♦', '♥', '♣'];
let numberOfCards = 52;
let cardList = [];
let cardFigures = [];

function cardBuilding(e, c) {
    let cardSuit, cardValue;

    let m = 0;

    cardSuit = cardList[c].substring(0).replace(/\d+/g, '').replace('A', '').replace('K', '').replace('Q', '').replace('J', '');
    cardValue = cardList[c].substring(1);

    e.addClass('no-' + cardValue);
    e.find('suit').html(cardSuit);
    e.find('value').html(cardValue);

    if (cardValue === 'A') { e.find('center').html('<symbol>' + cardSuit + '&#xFE0E;</symbol>'); } else if (cardValue === 'K' && (cardSuit === '♥' || cardSuit === '♦')) { e.find('center').html('&#x2654;&#xFE0E;'); } else if (cardValue === 'K' && (cardSuit === '♠' || cardSuit === '♣')) { e.find('center').html('&#x265a;&#xFE0E;'); } else if (cardValue === 'Q' && (cardSuit === '♥' || cardSuit === '♦')) { e.find('center').html('&#x2655;&#xFE0E;'); } else if (cardValue === 'Q' && (cardSuit === '♠' || cardSuit === '♣')) { e.find('center').html('&#x265b;&#xFE0E;'); } else if (cardValue === 'J' && (cardSuit === '♥' || cardSuit === '♦')) { e.find('center').html('&#x2657;&#xFE0E;'); } else if (cardValue === 'J' && (cardSuit === '♠' || cardSuit === '♣')) { e.find('center').html('&#x265d;&#xFE0E;'); } else {
        for (m = 0; m < cardValue; m++) { e.find('center').append('<symbol>' + cardSuit + '&#xFE0E;</symbol>'); }
    }
    if (cardSuit === '♥') { cardSuit = 'heart'; } else if (cardSuit === '♦') { cardSuit = 'diamond'; } else if (cardSuit === '♠') { cardSuit = 'spade'; } else if (cardSuit === '♣') { cardSuit = 'club'; }
    e.addClass(cardSuit);
}

let currentCard;

let highLighting = function(e) {
    var sel = document.getElementsByClassName('playing-cards');
    for (var i = 0; i < sel.length; i++) {
        sel[i].classList.remove('highlight')
    }

    currentCard = e

    document.getElementById(e).classList.toggle('highlight')

}

let registration = function() {
    showAll()
    cardShuffling()

    playerName.html("Player : " + inputName.val())
    let i = 0
    for (let avatar of avatars) {
        if (avatar.checked) {
            syncValue = avatar.value
            icon6.classList.add('icon-active')
            icon6.style.background = iconList[avatar.value]
            icon6.style.backgroundSize = '10vh 10vh'
            icon6.innerHTML = '<label class ="avatar-details">You</label>'
            player = avatarsProfile[avatar.value]
            avatarsProfile.splice(avatar.value, 1, player)
            player[3] = true



        } else {
            otherIcons[i].style.background = iconList[avatar.value];
            otherIcons[i].style.backgroundSize = '10vh 10vh';
            otherIcons[i].innerHTML = `
            <label class="avatar-details" id = "avatar-name">
            ${avatarsProfile[avatar.value][1]}
            <br>Cards : ${avatarsProfile[avatar.value][2].length}</label>
            `
            i = i + 1;
        }
    }

    cardsLeft.innerHTML = "Cards : " + player[2].length



}

hideAll()

var cardShuffling = function() {
    let i = 0;

    function cardGenerate() {
        let randomValue, randomSuit, cardSingle
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
            cardFigures.push('<card class="playing-cards" id="card-' + cardList[i] + '" onclick="highLighting(this.id)"><corner><value></value><suit></suit></corner><center></center><corner><value></value><suit></suit></corner></card>')
            i = i + 1
        }
    }

    for (let j = 0; j < 52; j++) { cardGenerate(); }

    audio.play()


    let z = 0


    for (let p = 0; p < 20; p = p + 4) {

        cardSection.innerHTML += cardFigures[p]
        cardBuilding($('#card-' + cardList[p]), p)
        playerF.push(cardFigures[p])
    }
    for (let profile of avatarsProfile) {

        for (let k = z; k < 20; k = k + 4) {

            profile[2].push(cardList[k])

        }

        z = z + 1
    }
    for (let k = 0; k < 20; k = k + 1) {
        let temp = cardList.shift()

        let tempF = cardFigures.shift()


    }

}

let replaceCard = function() {

    if (player[3] & (card6.innerHTML.length > 0)) {


        for (let currsuit of listSuit) {
            let currnum = currsuit + currentCard.slice(6)
            if (player[2].includes(currnum)) {

                cardFigures.push(playerF[player[2].indexOf(currnum)])
                playerF.splice(player[2].indexOf(currnum), 1)
                cardList.push(currnum)
                player[2].splice(player[2].indexOf(currnum), 1)
                $("#card-" + currnum).remove();


            }
        }

        submittingCards.innerHTML = cardFigures[cardList.indexOf(currentCard.slice(5))]
        cardBuilding($("#" + currentCard), cardList.indexOf(currentCard.slice(5)))
        player[2].push(cardList[0])
        playerF.push(cardFigures[0])
        card6.innerHTML = ""
        cardSection.innerHTML += cardFigures[0]
        cardBuilding($("#card-" + cardList[0]), 0)
        let tempF = cardFigures.shift()
        cardFigures.push(tempF)
        let temp = cardList.shift()
        cardList.push(temp)
        player[3] = false
        audio.play()

        nextPlay()
    }
}

let dumpCard = function() {

    if ((player[3] == true) & (card6.innerHTML != "")) {


        for (let currsuit of listSuit) {
            let currnum = currsuit + cardList[0].slice(1)
            if (player[2].includes(currnum)) {
                cardFigures.push(playerF[player[2].indexOf(currnum)])
                playerF.splice(player[2].indexOf(currnum), 1)
                cardList.push(currnum)
                player[2].splice(player[2].indexOf(currnum), 1)
                $("#card-" + currnum).remove();


            }
        }


        card6.innerHTML = ""
        submittingCards.innerHTML = cardFigures[0]
        cardBuilding($("#card-" + cardList[0]), 0)
        let tempF = cardFigures.shift()
        cardFigures.push(tempF)
        let temp = cardList.shift()
        cardList.push(temp)
        player[3] = false
        audio.play()
        nextPlay()
    }

}

let drawCard = function() {
    if (player[3]) {

        audio.play()
        card6.innerHTML = cardFigures[0]
        cardBuilding($('#card-' + cardList[0]), 0)
    }
}


let nextPlay = function() {
    icon6.classList.remove("icon-active")
    let z = 0
    for (let otherPlayer of avatarsProfile) {
        if (otherPlayer == player) {
            continue
        } else {
            e = otherIcons[z]
            setTimeout(function() {

                e.classList.add('icon-active')
            }, 1000)
            console.log(e);
            e.classList.remove('icon-active')
        }
        z = z + 1
    }
}