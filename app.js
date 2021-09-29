import {createInterface} from 'readline'
import {random, load_config} from "./utils.js"

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

let guess_game = load_config();

const game = () => rl.question(`Entrez un nombre entre 0 et ${guess_game.max_number} : `, response => {
    let user_number = parseInt(response);

    if (user_number == guess_game.secret_number) {
        console.log(`Bravo ! Vous avez deviné le nombre après ${guess_game.count} essais`);
        return rl.close();
    } else if (user_number > guess_game.max_number || user_number < 0) {
        game();
        return;
    } else if (guess_game.count >= guess_game.guess_limit) {
        console.log("Perdu ! Vous n'avez pas réussi à trouver le nombre :(");
        return rl.close();
    } else if (user_number > guess_game.secret_number) {
        console.log("Le nombre est plus petit");
    } else {
        console.log("Le nombre est plus grand");
    }

    game();
    guess_game.count++;
});

game();