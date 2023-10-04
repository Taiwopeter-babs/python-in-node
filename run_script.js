#!/usr/bin/node
const { spawn } = require('node:child_process');
const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');
const fs = require('node:fs/promises')

// Define the commands
const ls = spawn('python3', ['./read_write.py', 'file.txt'])
const rl = readline.createInterface({ input, output });

async function checkFileContent(dataChunk) {
    if (!dataChunk) {
        console.log('Content was not written to target');
        rl.close();
        return;
    }
    // Get name of file to save
    const answer = await rl.question('Name of file to save content: ');
    // Function is called recursively if an empty string is given in prompt
    if (answer === '') {
        console.log('answer cannot be empty. Run command again');
        checkFileContent(dataChunk);
    }

    // rename file to user input
    await fs.rename('target.txt', answer);
    console.log(`Your file, ${answer}, is now available with content`);
    rl.close();
    ls.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
    return;
}

ls.stdout.on('data', checkFileContent)

ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
});

