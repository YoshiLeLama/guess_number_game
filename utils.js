import {readFileSync} from 'fs';

const CONFIG_FILE_NAME = 'game_config.json';

export const random = (min, max) => min + Math.floor(Math.random() * (max + 1));

export const load_config = () => {
    let game = {
        guess_limit: 0,
        max_number: 0,
        secret_number: 0,
        count: 1
    };

    const data = readFileSync(CONFIG_FILE_NAME)
    let config = JSON.parse(data);
    game.guess_limit = config.guess_limit;
    game.max_number = config.max_number;

    game.secret_number = random(0, game.max_number);

    return game;
}