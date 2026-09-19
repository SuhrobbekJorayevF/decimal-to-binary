let cards = [
  {
    id: 0,
    content: 0,
  },
  {
    id: 1,
    content: 0,
  },
  {
    id: 2,
    content: 0,
  },
  {
    id: 3,
    content: 0,
  },
  {
    id: 4,
    content: 0,
  },
  {
    id: 5,
    content: 0,
  },
  {
    id: 6,
    content: 0,
  },
  {
    id: 7,
    content: 0,
  },
];

let result = document.querySelector(".result span");
const numberGenerator = document.querySelector(".generate_button");
const generatedNumber = document.querySelector(".generated_number");
const generatedN = document.querySelector(".generated_n");
const successModal = document.querySelector(".success_modal");
const resultModal = document.querySelector(".result_modal");
const continueModal = document.querySelector(".modal_continue");
const notGenerated = document.querySelector(".not_generated");
const difficultyRange = document.querySelector(".difficulty_range");

let containerCards = document.querySelector(".container_cards");
generateCards();
const arrowUp = containerCards.querySelectorAll(".arrow_up");

function generateCards() {
  if (!generatedN.textContent) {
    generatedNumber.style.display = "none";
    notGenerated.style.display = "flex";
  }

  for (const card of cards) {
    let cardElem = document.createElement("div");

    cardElem.innerHTML = `
        <div class="card" data-id='${card.id}'>
          <div class="arrow_up">></div>
          <div class="card_bg">
            <div class="text">
              <span>${card.content}</span>
            </div>
          </div>
          <div class="arrow_down">></div>
        </div>
        `;

    containerCards.appendChild(cardElem);
  }
}

const numberUp = (event) => {
  const cardId = event.target.closest(".card").dataset.id;

  const card = cards.find((c) => c.id === Number(cardId));

  const cardContent = 1;
  card.content = cardContent;

  containerCards
    .querySelector(`[data-id="${cardId}"]`)
    .querySelector("span").textContent = cardContent;
};

const numberDown = (event) => {
  const cardId = event.target.closest(".card").dataset.id;

  const card = cards.find((c) => c.id === Number(cardId));

  const cardContent = 0;
  card.content = cardContent;

  containerCards
    .querySelector(`[data-id="${cardId}"]`)
    .querySelector("span").textContent = cardContent;
};

// Events
containerCards.addEventListener("click", (event) => {
  const classLst = event.target.classList;

  if (classLst.contains("arrow_up")) {
    numberUp(event);
    changeResult();
  } else if (classLst.contains("arrow_down")) {
    numberDown(event);
    changeResult();
  }

  if ((result.textContent === generatedN.textContent) != 0) {
    successModal.style.display = "flex";
    generatedN.textContent = null;

    generatedNumber.style.display = "none";
    notGenerated.style.display = "flex";

    let r = "";

    for (const c of cards) {
      r += c.content;
    }

    resultModal.textContent = Number(r);
  }
});

// Result
function changeResult() {
  let r = 0;

  for (const c of cards) {
    r += c.content * 2 ** (7 - c.id);
  }

  result.textContent = r;
}

// Number generator
numberGenerator.addEventListener("click", () => {
  const selectedRange = difficultyRange.querySelector(
    'input[name="range"]:checked',
  );
  generatedNumber.style.display = "flex";
  notGenerated.style.display = "none";

  let n;

  switch (selectedRange.value) {
    case "unset":
      n = Math.floor(Math.random() * 99) + 2;
      break;

    case "1":
      n = Math.floor(Math.random() * 9) + 1;
      break;

    case "2":
      n = Math.floor(Math.random() * 90) + 10;
      break;

    case "3":
      n = Math.floor(Math.random() * 156) + 100;
      break;

    default:
      break;
  }

  generatedN.textContent = n;
});

// Congrats modal
continueModal.addEventListener("click", (event) => {
  event.preventDefault();

  successModal.style.display = "none";
});
