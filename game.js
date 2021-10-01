import { random, promptQuestion, readConfigFile, closePrompt, clearConsole } from "./utils.js";

const CONFIG_FILE_NAME = 'game_config.json';
const DEFAULT_MIN = 0;
const DEFAULT_MAX = 9;
export class GuessGame {
    constructor() {
        this.load_config();
        this.init();
    }

    init() {
        clearConsole();
        this.drawSecretNumber();
        this.turn = 1;
    }

    start() {
        this.guess();
    }

    drawSecretNumber() {
        this.secret_number = random(0, this.max_number);
    }

    load_config() {
        const { guess_limit, min_number, max_number } = readConfigFile(CONFIG_FILE_NAME);
        this.guess_limit = guess_limit;
        this.min_number = min_number ? min_number : DEFAULT_MIN;
        this.max_number = max_number ? max_number : DEFAULT_MAX;
    }

    guess() {
        promptQuestion(`(${this.guess_limit - this.turn + 1} essais restants) Entrez un nombre entre ${this.min_number} et ${this.max_number} : `,
            (response) => {
                let user_number = parseInt(response);

                if (user_number > this.max_number || user_number < this.min_number || isNaN(user_number)) {
                    this.guess();
                    return;
                } else if (user_number == this.secret_number) {
                    console.log(`Bravo ! Vous avez deviné le nombre après ${this.turn} essais`);
                    return this.gameover();
                } else if (this.turn >= this.guess_limit) {
                    console.log(`Perdu ! Le nombre était ${this.secret_number}`);
                    return this.gameover();
                } else if (user_number > this.secret_number) {
                    console.log("Le nombre est plus petit");
                } else {
                    console.log("Le nombre est plus grand");
                }

                this.turn++;
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