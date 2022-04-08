// select elements
const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
const cards = document.querySelectorAll(".card");
const toggleCard = document.querySelectorAll(".toggleCard");

let playerLives = 6;
playerLivesCount.textContent = playerLives;

// generate the data
const getData = () => [
  { imgSrc: "./images/beatles.jpeg", id: 1, name: "beatles" },
  { imgSrc: "./images/blink182.jpeg", id: 2, name: "blink 182" },
  { imgSrc: "./images/fkatwigs.jpeg", id: 3, name: "fka twigs" },
  { imgSrc: "./images/fleetwood.jpeg", id: 4, name: "fleetwood" },
  { imgSrc: "./images/joy-division.jpeg", id: 5, name: "joy division" },
  { imgSrc: "./images/ledzep.jpeg", id: 6, name: "led zeppelin" },
  { imgSrc: "./images/metallica.jpeg", id: 7, name: "metallica" },
  { imgSrc: "./images/pinkfloyd.jpeg", id: 8, name: "pink floyd" },
  { imgSrc: "./images/beatles.jpeg", id: 9, name: "beatles" },
  { imgSrc: "./images/blink182.jpeg", id: 10, name: "blink 182" },
  { imgSrc: "./images/fkatwigs.jpeg", id: 11, name: "fka twigs" },
  { imgSrc: "./images/fleetwood.jpeg", id: 12, name: "fleetwood" },
  { imgSrc: "./images/joy-division.jpeg", id: 13, name: "joy division" },
  { imgSrc: "./images/ledzep.jpeg", id: 14, name: "led zeppelin" },
  { imgSrc: "./images/metallica.jpeg", id: 15, name: "metallica" },
  { imgSrc: "./images/pinkfloyd.jpeg", id: 16, name: "pink floyd" },
];

const randomize = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.7);
  return cardData;
};

// card generator function
const cardGenerator = () => {
  const cardData = randomize();
  // generating the html
  cardData.forEach((item) => {
    const card = document.createElement("div");
    card.classList = "card";
    const face = document.createElement("img");
    face.classList = "face";
    const back = document.createElement("div");
    back.classList = "back";

    // attaching the cards info
    face.src = item.imgSrc;
    card.setAttribute("name", item.name);
    //appending the cards to the section element
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    //adding the event listener for the cards
    card.addEventListener("click", (e) => {
      card.classList.toggle("toggleCard");
      checkCards(e);
    });
  });
};
// cards checking function
const checkCards = (e) => {
  const clickedCard = e.target;
  clickedCard.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");
  //logic to check the flipped cards matching
  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "none";
      });
    } else {
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        setTimeout(() => card.classList.remove("toggleCard"), 1000);
      });
      playerLives--;
      playerLivesCount.textContent = playerLives;
      if (playerLives === 0) {
        restart("👻 you lost, try again");
      }
    }
  }
  // check if the player won
  if (toggleCard.length === 16) {
    restart(" 🤡 you won");
  }
};

//game restart
const restart = (text) => {
  let cardData = randomize();
  let faces = document.querySelectorAll(".face");
  let cards = document.querySelectorAll(".card");
  section.style.pointerEvents = "none";
  cardData.forEach((item, index) => {
    cards[index].classList.remove("toggleCard");
    setTimeout(() => {
      cards[index].style.pointerEvents = "all";
      cards[index].setAttribute("name", item.name);
      faces[index].src = item.imgSrc;
      section.style.pointerEvents = "all";
    }, 1000);
  });
  playerLives = 6;
  playerLivesCount.textContent = playerLives;
  setTimeout(() => window.alert(text), 100);
};

cardGenerator();
