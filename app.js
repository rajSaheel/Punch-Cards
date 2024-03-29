if (window.innerWidth < 860) {
    alert("Please open in a wider screen")
}

let header = $(".header")
let stats = $(".stats")
let elements = $(".elements")
let footer = $(".footer")

let audio = document.querySelector("#audio")

let form = $("form")
let inputName = $("#name")

let playerName = $("#player")
let cardsLeft = document.getElementById("cards-left")

let icon6 = document.getElementById("a6-o")
let icon9 = document.getElementById("a9-o")
let icon12 = document.getElementById("a12-o")
let icon3 = document.getElementById("a3-o")

let avatars = document.querySelectorAll("input[name=icons]")
let otherIcons = [icon9, icon12, icon3]
let iconList = [
    "url('/asset/monkey_.JFIF') 10vh 10vh",
    "url('/asset/lion_.JFIF') 10vh 10vh",
    "url('/asset/bull_.JFIF') 10vh 10vh",
    "url('/asset/bear_.JFIF') 10vh 10vh",
]

let lion = ["url('/asset/lion.JFIF')", "Lion", [], false]
let bull = ["url('/asset/bull.JFIF')", "Bull", [], false]
let ape = ["url('/asset/moneky.JFIF')", "Ape", [], false]
let bear = ["url('/asset/bear.JFIF')", "Bear", [], false]

let avatarsProfile = [ape, lion, bull, bear]
let player = []
let playerF = []
let syncValue = -1

let cardSection = document.querySelector("#cards-section")
let playingCards = document.querySelectorAll("playing-cards")
let submittingCards = document.getElementById("submitting-cards")
let card6 = document.getElementById("card-6")

let roundN = 0
let roundT = Math.ceil(Math.random() * 5)
let playerN = Math.floor(Math.random() * 4)

let hideAll = function () {
    header.hide()
    stats.hide()
    elements.hide()
    footer.hide()
}

let showAll = function () {
    form.remove()
    $(".header").show()
    $(".stats").show()
    $(".elements").show()
    $(".footer").show()
}

let deckSize = 52
let d = 52
let listValue = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
]
let listSuit = ["♠", "♦", "♥", "♣"]
let numberOfCards = 52
let cardList = []
let cardFigures = []

function cardBuilding(e, c) {
    let cardSuit, cardValue

    let m = 0

    cardSuit = cardList[c]
        .substring(0)
        .replace(/\d+/g, "")
        .replace("A", "")
        .replace("K", "")
        .replace("Q", "")
        .replace("J", "")
    cardValue = cardList[c].substring(1)

    e.addClass("no-" + cardValue)
    e.find("suit").html(cardSuit)
    e.find("value").html(cardValue)

    if (cardValue === "A") {
        e.find("center").html("<symbol>" + cardSuit + "&#xFE0E;</symbol>")
    } else if (cardValue === "K" && (cardSuit === "♥" || cardSuit === "♦")) {
        e.find("center").html("&#x2654;&#xFE0E;")
    } else if (cardValue === "K" && (cardSuit === "♠" || cardSuit === "♣")) {
        e.find("center").html("&#x265a;&#xFE0E;")
    } else if (cardValue === "Q" && (cardSuit === "♥" || cardSuit === "♦")) {
        e.find("center").html("&#x2655;&#xFE0E;")
    } else if (cardValue === "Q" && (cardSuit === "♠" || cardSuit === "♣")) {
        e.find("center").html("&#x265b;&#xFE0E;")
    } else if (cardValue === "J" && (cardSuit === "♥" || cardSuit === "♦")) {
        e.find("center").html("&#x2657;&#xFE0E;")
    } else if (cardValue === "J" && (cardSuit === "♠" || cardSuit === "♣")) {
        e.find("center").html("&#x265d;&#xFE0E;")
    } else {
        for (m = 0; m < cardValue; m++) {
            e.find("center").append("<symbol>" + cardSuit + "&#xFE0E;</symbol>")
        }
    }
    if (cardSuit === "♥") {
        cardSuit = "heart"
    } else if (cardSuit === "♦") {
        cardSuit = "diamond"
    } else if (cardSuit === "♠") {
        cardSuit = "spade"
    } else if (cardSuit === "♣") {
        cardSuit = "club"
    }
    e.addClass(cardSuit)
}

let currentCard

let highLighting = function (e) {
    var sel = document.getElementsByClassName("playing-cards")
    for (var i = 0; i < sel.length; i++) {
        sel[i].classList.remove("highlight")
    }

    currentCard = e

    document.getElementById(e).classList.toggle("highlight")
}

let registration = function () {
    showAll()
    cardShuffling()

    playerName.html("Player : " + inputName.val())
    let i = 0
    for (let avatar of avatars) {
        if (avatar.checked) {
            syncValue = parseInt(avatar.value)
            icon6.classList.add("icon-active")
            icon6.style.background = iconList[avatar.value]
            icon6.style.backgroundSize = "10vh 10vh"
            icon6.innerHTML = `<label class="avatar-details" id="avatar-name"> You </label>`

            avatarsProfile[avatar.value][1] = "You"
            player = avatarsProfile[avatar.value]
            avatarsProfile.splice(avatar.value, 1, player)
            player[3] = true
        } else {
            otherIcons[i].style.background = iconList[avatar.value]
            otherIcons[i].style.backgroundSize = "10vh 10vh"
            otherIcons[
                i
            ].innerHTML = `<label class="avatar-details" id="avatar-name"> ${
                avatarsProfile[avatar.value][1]
            } </label>`

            i = i + 1
        }
    }
    for (let p = syncValue; p < 20; p = p + 4) {
        cardSection.innerHTML += cardFigures[p]
        cardBuilding($("#card-" + cardList[p]), p)
        playerF.push(cardFigures[p])
    }

    for (let k = 0; k < 20; k = k + 1) {
        let temp = cardList.shift()

        let tempF = cardFigures.shift()
    }

    let sum = cardSum(player[2])

    cardsLeft.innerHTML = "Sum : " + sum
}

hideAll()

var cardShuffling = function () {
    let i = 0

    function cardGenerate() {
        let randomValue, randomSuit, cardSingle
        randomValue = listValue[Math.floor(Math.random() * listValue.length)]
        randomSuit = listSuit[Math.floor(Math.random() * listSuit.length)]
        cardSingle = randomSuit + randomValue

        if (jQuery.inArray(cardSingle, cardList) !== -1) {
            //rerun if card already exists
            cardGenerate()
            return
        } else {
            //push card to array if is doesn't
            cardList.push(cardSingle)
            cardFigures.push(
                '<card class="playing-cards" id="card-' +
                    cardList[i] +
                    '" onclick="highLighting(this.id)"><corner><value></value><suit></suit></corner><center></center><corner><value></value><suit></suit></corner></card>'
            )
            i = i + 1
        }
    }

    for (let j = 0; j < 52; j++) {
        cardGenerate()
    }

    audio.play()

    let z = 0
    for (let profile of avatarsProfile) {
        // (profile[2]);
        for (let k = z; k < 20; k = k + 4) {
            profile[2].push(cardList[k])
            // return cardFigures, cardList
        }
        z = z + 1
    }
}

let replaceCard = function () {
    if (player[3] && card6.innerHTML.length > 0) {
        for (let currsuit of listSuit) {
            let currnum = currsuit + currentCard.slice(6)
            if (player[2].includes(currnum)) {
                // cardList[]
                cardFigures.push(playerF[player[2].indexOf(currnum)])
                playerF.splice(player[2].indexOf(currnum), 1)
                cardList.push(currnum)
                player[2].splice(player[2].indexOf(currnum), 1)
                $("#card-" + currnum).remove()

                // (player[2])
            }
        }

        submittingCards.innerHTML =
            cardFigures[cardList.indexOf(currentCard.slice(5))]
        cardBuilding(
            $("#" + currentCard),
            cardList.indexOf(currentCard.slice(5))
        )
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
        let sum = cardSum(player[2])
        cardsLeft.innerHTML = "Sum : " + sum
        // (player[2]);
        nextPlay()
    }
}

let dumpCard = function () {
    if ((player[3] == true) & (card6.innerHTML != "")) {
        // (player[2]);

        for (let currsuit of listSuit) {
            let currnum = currsuit + cardList[0].slice(1)
            if (player[2].includes(currnum)) {
                cardFigures.push(playerF[player[2].indexOf(currnum)])
                playerF.splice(player[2].indexOf(currnum), 1)
                cardList.push(currnum)
                player[2].splice(player[2].indexOf(currnum), 1)
                $("#card-" + currnum).remove()

                // (player[2])
            }
        }
        // (player[2]);

        card6.innerHTML = ""
        submittingCards.innerHTML = cardFigures[0]
        cardBuilding($("#card-" + cardList[0]), 0)
        let tempF = cardFigures.shift()
        cardFigures.push(tempF)
        let temp = cardList.shift()
        cardList.push(temp)
        player[3] = false
        let sum = cardSum(player[2])
        cardsLeft.innerHTML = "Sum : " + sum
        audio.play()
        nextPlay()
    }
}

let drawCard = function () {
    if (player[3]) {
        // (cardList);
        // let ard = 20
        audio.play()
        card6.innerHTML = cardFigures[0]
        cardBuilding($("#card-" + cardList[0]), 0)
        roundN += 1
    }
}

let nextPlay = function () {
    if (roundN > roundT && player[3] == false) {
        let leaderBoard = []
        for (let avatars of avatarsProfile) {
            let sum = cardSum(avatars[2])
            leaderBoard.push(sum)
        }
        if (
            alert(
                "Someone asked for Show; the winner is " +
                    avatarsProfile[
                        leaderBoard.indexOf(
                            Math.min(
                                leaderBoard[0],
                                leaderBoard[1],
                                leaderBoard[2],
                                leaderBoard[3]
                            )
                        )
                    ][1] +
                    " with the sum of " +
                    Math.min(
                        leaderBoard[0],
                        leaderBoard[1],
                        leaderBoard[2],
                        leaderBoard[3]
                    )
            )
        ) {
        } else {
            window.location.reload()
        }
    }
    icon6.classList.remove("icon-active")
    const arr = [...avatarsProfile]
    arr.splice(avatarsProfile.indexOf(player, 1))

    let index = 0

    for (index = 0; index < 3; index++) {
        index
        rotate(index, avatarsProfile[index])
    }

    function rotate(indexArg, nextAvatar) {
        setTimeout(function () {
            if (cardList[0] > nextAvatar[(2)[0]]) {
                nextavatar[2].splice(nextAvatar[2][0], 1, cardList[0])
                cardList.shift()
                cardFigures.shift()
                cardList.push(nextAvatar[2][0])
                cardFigures.push(
                    '<card class="playing-cards" id="card-' +
                        cardList[cardList.length - 1] +
                        '" onclick="highLighting(this.id)"><corner><value></value><suit></suit></corner><center></center><corner><value></value><suit></suit></corner></card>'
                )
                submittingCards.innerHTML = cardFigures[cardFigures.length - 1]
                cardBuilding(
                    $("#card-" + cardList[cardList.length - 1]),
                    cardList.length - 1
                )
            } else {
                let temp = cardList.shift()
                cardList.push(temp)
                let tempF = cardFigures.shift()
                cardFigures.push(tempF)
                submittingCards.innerHTML = cardFigures[cardFigures.length - 1]
                cardBuilding(
                    $("#card-" + cardList[cardList.length - 1]),
                    cardList.length - 1
                )
            }

            audio.play()
            otherIcons[indexArg].classList.add("icon-active")
            try {
                otherIcons[indexArg - 1].classList.remove("icon-active")
            } catch (e) {
                e
            }
        }, 2000 * (indexArg + 1))
    }
    setTimeout(() => {
        audio.play()
        icon3.classList.remove("icon-active")
        player[3] = true
        icon6.classList.add("icon-active")
    }, 8000)
}

let cardSum = function (e) {
    let sum = 0
    for (item of e) {
        switch (item.slice(1)) {
            case "K":
                sum += 13
                break
            case "Q":
                sum += 12
                break
            case "J":
                sum += 11
                break
            case "A":
                sum += 1
                break
            default:
                sum += parseInt(item.slice(1))
        }
    }
    return sum
}

var showCards = function () {
    let leaderBoard = []
    for (let avatars of avatarsProfile) {
        let sum = cardSum(avatars[2])
        leaderBoard.push(sum)
    }
    leaderBoard
    if (
        alert(
            "You asked for Show; the winner is " +
                avatarsProfile[
                    leaderBoard.indexOf(
                        Math.min(
                            leaderBoard[0],
                            leaderBoard[1],
                            leaderBoard[2],
                            leaderBoard[3]
                        )
                    )
                ][1] +
                " with the sum of " +
                Math.min(
                    leaderBoard[0],
                    leaderBoard[1],
                    leaderBoard[2],
                    leaderBoard[3]
                )
        )
    ) {
    } else {
        window.location.reload()
    }
}
