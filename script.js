// data
const data = [
    {
        id: 0,
        name: "horsehead",
        src: "https://lh3.googleusercontent.com/TMBC6XLgXVb-_neTalQqADxVtbZ5kCSNbLlBr4JJp6Li4MCtrn9oq_tffy_QPxJg9pBBXj5zF3E_KYGEXEKGO0yQjkofvLohlQ0yCyCigy7tOoYNrPwib9qHrPV2VWza4kxoFMq8rg=w2400",
        alt: "Gassy clouds form a shape mimicking the head of a horse, named the Horsehead Nebula.",
        count: 0
    },
    {
        id: 1,
        name: "sombrero",
        src: "https://lh3.googleusercontent.com/Ccv-1bMsaPkL7o60Gtc0As8g7S1926yq0_DVbNyveeojQmwW-YhLdO2TScXRfnurSPNc9RmgTFAKKgH979T4K4YmSPsYdTywFpYnramRr6oZ7aPW_kbFsFz_WNfUmVNw33GVq_t7xw=w2400",
        alt: "",
        count: 0
    },
    {
        id: 2,
        name: "andromeda",
        src: "https://lh3.googleusercontent.com/cW_M9KfJrafSoFvDCE8w2cLraWBW3c7xU_smw9500ZdUWIDgX2uSrB-S5W5wpjrHCLj3_plV8K6FPnKKVgX5-q9CYS4pKXyFYCLcP0QE2MhH0r9fUMTXTap89X-cBbcjgqEZxn1Nkg=w2400",
        alt: "",
        count: 0
    },
    {
        id: 3,
        name: "crab",
        src: "https://lh3.googleusercontent.com/nH9lyiiV8OplYi5jzH7d3i5XnWkVRGsfbiX1DuFtRe4k8BDajU_82ZL1bcvrBx3aLS5XQg0XUBTWuXaGmfF9y8sUKBLwAhOM_EcTnrSZHnptS5-rFtmvgpDmW7f_xvMAERYhR9kp-w=w2400",
        alt: "",
        count: 0
    },
    {
        id: 4,
        name: "sisters",
        src: "https://lh3.googleusercontent.com/4SKw2QdsMBDla304v-3_o0kx0P17LC_z4O5oyPHb8k6A8kMvYB7m6jABwE06MnWokejoHlze6Rs5Vj8kCnT7Lwr6slQe9J417b9f4dIdT1zr-NHgSxe7NFU2ie0vMPbnFviUO4D22A=w2400",
        alt: "",
        count: 0
    },
    {
        id: 5,
        name: "v838",
        src: "https://lh3.googleusercontent.com/VtA2OyRBj5P1N1LNbjfGy04AJqp0AN4IyFN7sZqf5sathzsOKCsgcXkQt-mMF2Ytl_Q7isiO8jzytJ71-okJdIHRTKXy4pE_RltuQ4g06jE_xrtjIXFtzqT7nZaE6akssF5acS21wQ=w2400",
        alt: "",
        count: 0
    },
    {
        id: 6,
        name: "ant",
        src: "https://lh3.googleusercontent.com/sv1F_VE00x_u6dV_NojeD2IIthdWluXYR2UcVdSSukdAiitXA2mp92NIcyLYOZWo-rekZrO7mezO5IV6QO7Q8T6O4nNAHI-DqCvAZ4UY74V7lP2RXo5R5kcd5cVQ7HLLRjrhMOXaww=w2400",
        alt: "",
        count: 0
    },
    {
        id: 7,
        name: "rover",
        src: "https://lh3.googleusercontent.com/0tHm0d1IG1ApcvREI1BqM-fdY3gk_yDQASyC3NasArVexaiGN3CHq-BwI7CeG1tq738Em2OuWJY7PHL8XBTMjxG_LcLjuAKbdVcIYEb5MI0gUag4l9EdBeSS1MBTEQW_FuVaKq7rxw=w2400",
        alt: "",
        count: 0
    }
];

let movesDisplay = document.querySelector("#moves");
let highScoreDisplay = document.querySelector("#highScore");
let flipCount = 0;
let flippedCards = [];
let matchTotal = 0;
let imgID = [];
let moves = 0;
let score = 0;
let highScore = 0;

// create card elements
function createCards(num) {
    // create elements
    for (let i = 0; i < num; i++) {
        const cardContainer = document.createElement("div");
        const cardDiv = document.createElement("div");
        const front = document.createElement("figure");
        const back = document.createElement("figure");
        const img = document.createElement("img");
        // append created elements
        gameboard.append(cardContainer);
        cardContainer.append(cardDiv);
        cardDiv.append(front, back);
        back.append(img);
    
        // add attributes to appended elements
        cardContainer.classList.add("card-container");
        cardDiv.classList.add("card", "back-click");
        front.classList.add("front");
        back.classList.add("back");

        // randomize src attribute for img
        function randomImg() {
            let i = Math.floor((Math.random() * 8));
            data[i].count++;
            if (data[i].count <= 2) {
                img.setAttribute("src", data[i].src);
                front.setAttribute("data-picID", data[i].id);
            }
            else {
                randomImg();
            }
        }  
        randomImg();     
    }
    if (localStorage.getItem("high-score") > 0) {
        highScoreDisplay.innerText = localStorage.getItem("high-score");
    }
};

// generate cards in body
const gameboard = document.querySelector("#gameboard");
createCards(16);

// card and score counters
let card = document.querySelectorAll(".card");

// reset count
function resetCount() {
    flipCount = 0;
    flippedCards = [];
    imgID = [];
}

// click listener on cards
gameboard.addEventListener("click", function(e) {
    const target = e.target;
    function guess() {
        if (target.tagName === "FIGURE") {
            imgID.push(target.getAttribute("data-picID"));
            flippedCards.push(target.parentElement);
            target.parentElement.classList.replace("back-click", "front-click");
            flipCount++;
        }
    }
    if (flipCount < 2) {
        guess();
    }
    // register a match
    if (flipCount === 2) {
        moves++;
        movesDisplay.innerText = moves;
        if (imgID[0] === imgID[1]) {
            matchTotal++;
            resetCount();
            // set high score
            if (matchTotal === 8) {
                if (moves > highScore) {
                    highScore = moves;
                    localStorage.setItem("high-score", highScore); 
                    highScoreDisplay.innerText = highScore;                  
                }
            }
        }
        // register a non match
        else {
            setTimeout(function() {
                flippedCards[0].classList.replace("front-click", "back-click");
                flippedCards[1].classList.replace("front-click", "back-click");
                flipCount = 0;
                flippedCards = [];
                imgID = [];
            }, 1250);  
        } 
    }
});

// new game
const newGame = document.querySelector("button");
newGame.addEventListener("click", function(e) {
    window.location.reload();
});

// reset high score
let resetScore = document.querySelector("a");
resetScore.addEventListener("click", function() {
    prompt("Are you sure you want to reset the high score?");
    highScore = 0;
    localStorage.setItem("high-score", 0);
    highScoreDisplay.innerText = localStorage.getItem("high-score");
})

// pos = myArray.map(function(e) { return e.hello; }).indexOf('stevie');


// highScoreDisplay.innerText = localStorage.getItem("high-score");