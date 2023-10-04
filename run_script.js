#!/usr/bin/node
const { spawn } = require('node:child_process');
const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');
const fs = require('node:fs/promises');

// Define the commands
const runScript = spawn('python3', ['./read_write.py', 'file.txt']);
const rl = readline.createInterface({ input, output });

/**
 * ### check the output of the python file in stdout
 * - If `'True'`, then processing continues, otherwise it is stopped.
 * - If no output, processing is also stopped.
 * @param {*} dataChunk 
 * @returns 
 */
async function checkFileContent(dataChunk) {
    const data = dataChunk.toString('utf-8');
    if (data === 'False') {
        console.log('Content was not written to target');
        rl.close();
        return;
    }
    // Get name of file to save
    const answer = await rl.question('Name of file to save content: ');
    // Function is called recursively if an empty string is given in prompt
    if (answer === '') {
        console.log('answer cannot be empty. Please enter a filename');
        checkFileContent(dataChunk);
    } else {
        // rename file to user input
        await fs.rename('target.txt', answer);
        console.log(`Your file, ${answer}, is now available with content`);
        rl.close();

        return;
    }
}

runScript.stdout.on('data', checkFileContent);

runScript.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
});
