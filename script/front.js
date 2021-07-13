const front = "cardFront";
const back = "cardBack";

startGame();

// inicia o jogo roando as funções de criação das cartas e do tabuleiro
function startGame(){
        initializeCards(game.createcards());
}

// insere as cartas no html e já deixa a função flipCard para ser ativada quando o elemento for clicado
function initializeCards(cartas){
    let gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = '';
    game.cards.forEach(element => {

        let newCard = document.createElement("div")
        newCard.id = element.id;
        newCard.classList.add("card");
        newCard.dataset.icon = element.icon
        createCardContent(element, newCard)
        newCard.addEventListener("click", flipCard)
        gameBoard.appendChild(newCard);
    });
}

// cria os conteúdos da carta, front e back
function createCardContent(carta, cardElement){

    createCardFace(front, carta, cardElement)
    createCardFace(back, carta, cardElement)
}

//cria quaisquer das faces da carta, se for a frente, haverá a imagem da tecnologia do jogo da memória
// se for a parte traseira, haverá o símbolo </>
function createCardFace(face, carta, cardElement){

    let cardElementFace = document.createElement("div");
    cardElementFace.classList.add(face)
    if(face == front){
        let iconElement = document.createElement("img");
        iconElement.classList.add("icon");
        iconElement.src = "./images/" + carta.icon + ".png";
        cardElementFace.appendChild(iconElement);
    }else{
        cardElementFace.innerHTML = "&lt/&gt"
    }
    cardElement.appendChild(cardElementFace);
}

// funçõa que faz uma série de verificações se o jogo já acabou ou se já existe outra carta flipada para, depois compará-las e verificar se formou par
function flipCard() {

    if (game.setCard(this.id)) {

        this.classList.add("flip");
        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards();
                if (game.checkGameOver()) {
                    let gameOverLayer = document.getElementById("gameOver");
                    gameOverLayer.style.display = 'flex';
                }
            } else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);

                    firstCardView.classList.remove('flip');
                    secondCardView.classList.remove('flip');
                    game.unflipCards();
                }, 1000);
            };
        }
    }
}

// reseta o jogo
function jogarNovamente() {
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById("gameOver");
    gameOverLayer.style.display = 'none';
}