// select elements
const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
const cards = document.querySelectorAll(".card");
const toggleCard = document.querySelectorAll(".toggleCard");

let playerLives = 6;
playerLivesCount.textContent = playerLives;

// generate the data
const getData = () => [
  { imgSrc: "./images/manneken_pis.jpg", id: 1, name: "manneken_pis" },
  { imgSrc: "./images/Atomium.jpg", id: 2, name: "Atomium" },
  { imgSrc: "./images/mussels.jpg", id: 3, name: "mussels" },
  { imgSrc: "./images/Speculoos.jpg", id: 4, name: "Speculoos" },
  { imgSrc: "./images/chocolate.jpg", id: 5, name: "chocolate" },
  { imgSrc: "./images/fries.jpg", id: 6, name: "fries" },
  { imgSrc: "./images/waffle.jpg", id: 7, name: "waffle" },
  { imgSrc: "./images/vub_1.jpg", id: 8, name: "vuB_1" },
  { imgSrc: "./images/manneken_pis.jpg", id: 9, name: "manneken_pis" },
  { imgSrc: "./images/Atomium.jpg", id: 10, name: "Atomium" },
  { imgSrc: "./images/mussels.jpg", id: 11, name: "mussels" },
  { imgSrc: "./images/Speculoos.jpg", id: 12, name: "Speculoos" },
  { imgSrc: "./images/chocolate.jpg", id: 13, name: "chocolate" },
  { imgSrc: "./images/fries.jpg", id: 14, name: "fries" },
  { imgSrc: "./images/waffle.jpg", id: 15, name: "waffle" },
  { imgSrc: "./images/vub_1.jpg", id: 16, name: "vuB_1" },
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
    card.classList = "card toggleCard flipped";
    setTimeout(() => {
      card.classList = "card";
    }, 2000);
    
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
  if (flippedCards === 16) {
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
