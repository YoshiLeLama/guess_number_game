import { createInterface, cursorTo, clearScreenDown } from 'readline';
import { readFileSync } from 'fs';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

export const random = (min, max) => min + Math.floor(Math.random() * (max + 1));

/**
 * 
 * @param {string} question 
 * @param {Function} callback Fonction de callback qui prend un string en paramètre
 */
export const promptQuestion = (question, callback) => {
    rl.question(question, res => callback(res));
}

/**
 * 
 * @param {string} name 
 * @returns {object}
 */
export const readConfigFile = (name) => {
    const data = readFileSync(name)
    return JSON.parse(data);
}

export const closePrompt = () => rl.close();

export const clearConsole = () => {
    cursorTo(process.stdout, 0, 0);
    clearScreenDown(process.stdout);
}