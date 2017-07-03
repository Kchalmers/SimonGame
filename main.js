function Game(){
    let self = this;
    let pattern = [];
    let started = false;
    let strict = false;
    let steps = 1;
    let currentColor = 0;
    let gameButton = $(".gameBtn");
    let currentPatternColor = 0;
    gameButton.attr("disabled", true);

    this.init = function () {
        gameButton.click(this.playerClick);
        $(".start").click(this.start);
        $(".restart").click(this.reset);
        $(".strict").click(this.toggleStrict);
    };
    this.start = function () {
        started = true;
        self.addToPattern();
    };
    this.playPattern = function () {
        currentPatternColor = 0;
        for (let i = 0; i < pattern.length; i++) {
            setTimeout(self.showPattern, 500 * i)
        }
        gameButton.attr("disabled", false);
    };
    this.showPattern = function () {
        document.getElementById(pattern[currentPatternColor]).play();
        $(`.${pattern[currentPatternColor]}`).animate({
            opacity: 0.2
        }, 300).animate({
            opacity: 1
        }, 100);
        currentPatternColor++;
    };
    this.addToPattern = function () {
        switch (Math.floor(Math.random()*(4-1+1)+1)){
            case 1:
                pattern.push("green");
                break;
            case 2:
                pattern.push("red");
                break;
            case 3:
                pattern.push("yellow");
                break;
            case 4:
                pattern.push("blue");
                break;
        }
        this.playPattern();
    };
    this.reset = function () {
        setTimeout(self.clearStatus, 3000);
        gameButton.attr("disabled", true);
        currentColor = 0;
        steps = 1;
        started = false;
        pattern = [];
        $(".level").empty().append(`Level: ${steps}`);
    };
    this.clearStatus = function () {
        $(".status").empty()
    };
    this.toggleStrict = function () {
        if(strict){
            return strict = false;
        }
        return strict = true;
    };
    this.playerClick = function () {
        if(started) {
            document.getElementById(this.classList["0"]).play();
            if (this.classList["0"] === pattern[currentColor]) {
                self.victoryCheck();
            }
            else if (strict) {
                $(".status").append("Defeat!");
                self.reset();
            }
            else if(this.classList["0"] !== pattern[currentColor]){
                $(".status").append("Incorrect!");
                setTimeout(self.clearStatus, 1000);
                self.playPattern();
            }
        }
    };
    this.victoryCheck = function () {
        if(steps === 20){
            $(".status").append("Victory!");
            self.reset();
        }
        else if(currentColor === pattern.length -1){
            gameButton.attr("disabled", true);
            currentColor = 0;
            steps++;
            $(".level").empty().append(`Level: ${steps}`);
            self.addToPattern();
        }
        else {
            currentColor++;
        }
    };
}

$(document).ready(function () {
    const start = new Game();
    start.init();
});