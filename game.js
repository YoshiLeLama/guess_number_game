import { random, promptQuestion, readConfigFile, closePrompt, clearConsole } from "./utils.js";

const CONFIG_FILE_NAME = 'game_config.json';

export class GuessGame {
    constructor() {
        this.load_config();
        this.init();
    }

    init() {
        clearConsole();
        this.drawSecretNumber();
        this.count = 1;
    }

    start() {
        this.guess();
    }

    drawSecretNumber() {
        this.secret_number = random(0, this.max_number);
    }

    load_config() {
        const config = readConfigFile(CONFIG_FILE_NAME);
        this.guess_limit = config.guess_limit;
        this.max_number = config.max_number;
    }

    guess() {
        promptQuestion(`(${this.guess_limit - this.count + 1} essais restants) Entrez un nombre entre 0 et ${this.max_number} : `, (response) => {

            let user_number = parseInt(response);

            if (user_number == this.secret_number) {
                console.log(`Bravo ! Vous avez deviné le nombre après ${this.count} essais`);
                return this.gameover();
            } else if (user_number > this.max_number || user_number < 0) {
                game();
            } else if (this.count >= this.guess_limit) {
                console.log("Perdu ! Vous n'avez pas réussi à trouver le nombre :(");
                return this.gameover();
            } else if (user_number > this.secret_number) {
                console.log("Le nombre est plus petit");
            } else {
                console.log("Le nombre est plus grand");
            }

            this.count++;
            this.guess();
        });
    }

    gameover(displayMessage = true) {
        promptQuestion(displayMessage ? "Voulez-vous rejouer (O/N) ?" : "", (response) => {
            if (response === "O" || response === "o") {
                this.init();
                this.start();
            } else if (response === "N" || response === "n") {
                closePrompt();
            } else {
                this.gameover(false);
            }
        });
    }
}