let game = {
    
    lockMode: false,
    firstCard: null,
    secondCard: null,

    tecs: ["bootstrap", 
        "css",
        "electron",
        "firebase",
        "html",
        "javascript",
        "jquery",
        "mongo",
        "node",
        "react"],

    cards: null,
// verfica a carta vazia e ela será o card. a função retornará true se uma nova carta for flipada
// ou false se nenhuma carta nova for flipada.
    setCard: function (id) {

        let card = this.cards.filter(card => card.id === id)[0];
        console.log(card);
        if (card.flipped || this.lockMode) {
            return false;
        }

        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }},

// verifica se já existem duas cartas flipadas e retorna se as cartas flipadas tem o mesmo icon (se são iguais)
        checkMatch: function(){
        if (!this.firstCard || !this.secondCard) {
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon;
    },

// zera as cartas selecionadas
    clearCards: function(){
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

// desflipa as cartas alterando a propriedade flipped
    unflipCards() {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

// verifica se o jogo acabou, quando no array filtrado de cards, nao houver carta sem o atributo flipped
    checkGameOver() {
        return this.cards.filter(card => !card.flipped).length == 0;
    },


// insere todas os objetos cards criados para dentro do array cards
    createcards: function (){
        this.cards = []; 
    
        for (tec of this.tecs){
            this.cards.push(this.createpair(tec));
        }
    
        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards();
        return this.cards;
    },
    
    //cria um array com duas cartas iguais, mas com ids diferentes
    createpair: function (tech){
        return [{
            id: this.createid(tech),
            icon: tech,
            flipped: false
        }, {
            id: this.createid(tech),
            icon: tech,
            flipped: false
        }]
    },
    
    //cria um id randomica para o objeto do tipo card
    createid: function (tech){
        return tech + parseInt(Math.random() * 1000);
    },

    //embaralha as cartas começando do fim
    shuffleCards: function (x){
        let currentNumber = this.cards.length;
        let randomIndex = 0;

        while(currentNumber != 0){

            randomIndex = Math.floor(Math.random() * currentNumber)
            currentNumber --;

            [this.cards[currentNumber], this.cards[randomIndex]] = [this.cards[randomIndex], this.cards[currentNumber]];
        }}}