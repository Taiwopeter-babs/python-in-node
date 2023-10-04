## Python In Node

Using the `child_process` in [Node.js](https://nodejs.org/dist/latest-v20.x/docs/api/child_process.html), python scripts can be executed in JavaScript modules. This is a fairly basic module using `spawn`, `readline`, and `fs` modules to execute the file, read the output of the executed file into a buffer, and get input from the user.

### Executing the script

Assume the script prints `abcdefghijklmopqrst` to the stdout, the `chunk` will be represented as a `Buffer` i.e `<Buffer 61 62 63 64 65 66 67 68 69 6a 6b 6c 6d 6e 6f 70 71 72 73 74>`, so it would have to be converted to a human readable format by using the `js toString() ` method:

```js
// allocates memory to the buffer
const buf = Buffer.alloc(20);

// a = 97, b = 98 ... and so on in ascii format
for (let i = 0; i <= buf.length; i += 1) {
  buf[i] = i + 97;
}
console.log(buf);
// logs <Buffer 61 62 63 64 65 66 67 68 69 6a 6b 6c 6d 6e 6f 70 71 72 73 74>
console.log(buf.toString());
// logs abcdefghijklmopqrst
```

#### Excuting the script

```js
const { spawn } = require("node:child_process");
// define the command to run
const runScript = spawn("python3", ["./read_write.py", "file.txt"]);

runScript.stdout.on("data", (chunk) => {
  // do something with data chunk
});
```

### Use Case

This can be applicable to JavaScript applications that apply machine learning algorithms or require background workers.

For more info on Buffer, follow this link: [Buffers in node.js](https://nodejs.org/dist/latest-v20.x/docs/api/buffer.html)
