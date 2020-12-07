/*
const test = require('./test.js') //don't forget to add the module.export in the file test.js
console.log(test);
console.log(test.sum(1, 1)); 
*/


// -------------------EVENT -----------------------------
/*
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.on('test', (num1, num2) => {
    console.log(num1 + num2)
    console.log("tutorial event occured")
});

eventEmitter.emit('test', 1, 2);

class Person extends EventEmitter { //Extend the propreties from EventEmitter
    constructor(name) { // creat with a constructor
        super(); //need to use this function each time with class to have the possibility to use this keyword. Without that, we can have error
        this._name = name;
    }

    get name() { // get allow to transform a function into a property. See getter and setter. without the get, we need to add the parenthesis and doesn't allow to modify.
        return this._name;
    }
}

let antho = new Person('Antho');
antho.on('name', () => {
    console.log("my name is " + antho.name);
})

antho.emit('name');

*/

// ===============ReadLine module =================================
// used to get a user input

/*
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let num1 = Math.floor((Math.random() * 10) + 1);
let num2 = Math.floor((Math.random() * 10) + 1);
let answer = num1 + num2;

rl.question(`What is ${ num1 } + ${num2} ? \n`, (userInput) => {
    if (userInput.trim() == answer) {
        rl.close();
    } else {
        rl.setPrompt('Incorrect response, please try again \n'); //set the answer to the prompt if the answer isn't correct
        rl.prompt();
        rl.on('line', (userInput) => {
            if (userInput.trim() == answer) {
                rl.close();
            } else {
                rl.setPrompt(`your input ${userInput} is incorrect \n`);
                rl.prompt();
            }
        })
    }
});

rl.on('close', () => { // .on listen to the close (rl.close)
    console.log("hey, you found the correct answer");
})

*/

// ====================== File system module ===============================
// This is used to creat file, read file, creat foler, ....


//const fs = require('fs');
// ======working with file==========
/*
//creat file

fs.writeFile('example.txt', 'Hello world', (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('file successfuly created');
        fs.readFile('example.txt', 'utf8', (err, file) => {
            if (err) {
                console.log(err);
            } else {
                console.log(file);
            }
        })
    }
})

*/

//rename a file

/*
fs.rename('example2.txt', 'example3.txt', (err) => {
    (err) ? console.log(err): console.log('file successfuly renamed');
})
*/

//add content into a file (append)

/*
fs.appendFile('example3.txt', "I'm a developper", (err) => {
    (err) ? console.log(err): console.log("content successfuly added to the file \n");
})

*/

//delet a file
/*
fs.unlink('example3.txt', (err) => {
    (err) ? console.log(err): console.log("file successfully deleted");
})
*/


// ================== working with folder ===========================

// creat folder
/*
fs.mkdir("tutorial01", (err) => {
        (err) ? console.log(err): console.log("folder successfuly created");
    })
    // delete folder (must be empty, if not, delet the file first)
fs.rmdir("tutorial", (err) => {
        (err) ? console.log(err): console.log("folder successfully deleted");
    })
*/
// creat folder and add a file inside

/*
fs.mkdir('createdFolder', (err) => {
    (err) ?
    console.log(err):
        console.log('folder created');
    fs.writeFile('./createdFolder/exemple-test', 'this is a test', (err) => {
        (err) ? console.log(err): console.log("file added to the folder");
    })
})
*/

// delete a folder with a file inside => delet the file inside and then delet the folder

// delete multiple file inside a folder
/*
fs.readdir('testToDelet', (err, files) => { //we check the files inside the folder
    if (err)
        console.log(err)
    else
        for (let file of files) { //we make a loop to delet all the file inside the folder
            fs.unlink('./testToDelet/' + file, (err) => {
                (err) ?
                console.log(err):
                    console.log('files successfuly delete');
            })
        }
})
*/


// ================== working with readable and writable streams ================================
// read and write data more efficiently
/*
const fs = require('fs');

const readStream = fs.createReadStream('./example.txt', 'utf8'); // we creat a readable stream( we put previously text inside the document example.txt and we saved it in a variable
const writeStream = fs.createWriteStream('example2.txt'); //this is to crea a file named example2.txt
readStream.on('data', (chunk) => { // chunk is a buffer. This is a way for node js to save data in binary. If I need to read it, I need to convert it to string by append or by .toString methode. BUT we can also set the second argument with utf8 like we did
    writeStream.write(chunk); //with this function, I creat a file named example2.txt(fs.creatWriteStream('example2.txt')) and then I add the content from example.txt
    //console.log(chunk);
    // te purpose of the chunk and steam is to make stuff simultanetly. We don't need to wait for the full load of the document to manipulate it.
    //Here, we have readStream chunk and writeStream chunk. I start to write chunk with writeStream BEFORE the readStream has finished to load.
    //This is like I'm during a lesson, the teach explain and write on the black board and during that time I copy the info from the blackboard.

})
*/

//========================= why we should use stream ? ==============================
/*
const fs = require('fs');
fs.readFile('./largeFile.txt', (err, file) => {
    if (err)
        console.log(err);
    else
        console.log(file);
})

//if we have a big file like 2Gb, with the readFile methode, we need to load inside the buffer 2Gb before reading it. So we need to have a buffer of 2Gb to use it.
//so we will get an error that the file is too big
*/
/*
const fs = require('fs');
const readStream = fs.createReadStream("./largeFile.txt", "utf8");
readStream.on('data', (chunk) => {
    console.log(chunk);
})

//stream allow to  have a small buffer. I did load the entire document inside the buffer.

*/

//============================= Pipe and pipe chaining =====================================
//pipe allow to take a source stream which is a readble stream and send it to it's destination which is a writable stream
/*
const fs = require('fs');
const readStream = fs.createReadStream('./example.txt', "utf8");
const writeStream = fs.createWriteStream('./example2.txt');
// with the following methode, we copy the content from readStream to writeStream but it's take some line code.

readStream.on('data', (chunk) => {
    writeStream.write(chunk);
})

// with the pipe methode, we can take the content from readStream and send it to writStream with less code
readStream.pipe(writeStream);
*/
/*
const fs = require('fs');
const zlib = require('zlib'); // this is a module that compress file
const gzip = zlib.createGzip(); // this function will manipulate data to compress the file. See after
const gunzip = zlib.createGunzip();
const readStream = fs.createReadStream('./example.txt');
const writeStream = fs.createWriteStream('./exemple3.txt.gz'); //the file created here will be a compressed file .gz
readStream.pipe(gzip).pipe(writeStream); //here, we compress the data with gzip before sending to writeStream
// if we want to unzip, we need to do the same but with gunzip
*/

//=================================== Creat a HTTP server with http ================================
/*
const http = require('http');
const server = http.createServer((req, res) => { //req == request, this is what the client request . res == response, this is the reply from the request
    res.write('Hello from nodejs'); //respons set
    res.end(); //send the respons
})

server.listen('3000'); // we need to tell the server which port to listen . Here, we can try by set the server with node server in the terminal (node + file name) and then, write localhost:3000 in a browser
*/
/*
const http = require("http");
const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.write('hello world from node js');
        res.end();
    } else {
        res.write('using some other domain');
        res.end();
    }
})

server.listen('8080');

*/

//================================ Serving static files with http and file system module ======================================
/*
const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
    const readStream = fs.createReadStream('./myFolder/index.html');
    res.writeHead(200, {
            'content-type': 'text/html' //need to fill according to the kind of document to open
        }) //creating a head. Here the head 200 mean that all is ok. There is also the know 404 for error 404. For more info check https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
    readStream.pipe(res);
}).listen(3000)
*/

//================================= creat package.json using npm init ==================================
// package.json contain the package with the meta data
// with npm in the terminal, we can see the differents command that we can use.
// to initialise the package, we need to type npm init and then follow the instruction.

//================================= installing package using nom =======================================
// a package is a kind of folder we properties that we can use
// we can go on the site npmjs.com and find the package that we need and follow the instruction
// to see if the package has been installed normaly, we can go in the package.json that we created and then check dependencie. Exemple: "dependencies": {"lodash": "^4.17.20"}
// to install a package, we need to write in the terminal npm install <package name>
// here an example with the package lodash
/*
const _ = require('lodash');
let exemple = _.fill([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], "banana", 1, 4);
console.log(exemple);
*/

// to remove a package, we need to write in the terminal npm uninstall <package name>

//================================= Sementic versionning =================================================
// it is a way of working that people who creat package follow. With that, we can know the update, ... about the package
/* exemple:
"dependencies": {
    "lodash": "^4.17.20"  //major.minor.patch
  }
  major: there is a breaking change. Not compatible with the other version. Need to upgrade the code
  minor: add new functionnalities and depraciate some old. we can still use it, it won't break the application
  patch: they fixed bug
  ^ is used to allow minor and patch update 
  ~ is used to allow only patch update
  if we remove both ^ and ~, the only version that we will have is the one present. here it's 4.17.20
*/
//================================ express web framework ==================================================
// with express, we can do the same stuff as http and FS with much less code
/*
const express = require('express');
const app = express(); //we need to call the variable because this is an object with function inside

app.get('/', (req, res) => {
    res.send('hello world'); // display hello world on the webpage port 3000
})

app.listen(3000);

*/

//================================= express get request =====================================================
/*
const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.send('hello world');
})

app.get('/example', (req, res) => {
    res.send('hitting example rout');
})

app.get('/example/:name/:age', (req, res) => { //with the slash and the parameter (here name and age), we can have an object with thos parameter and use them. CF amazon url
    console.log(req.params);
    console.log(req.query); // the query allow us to add parameter inside the url directly instead of the params who need to be set before with /example/:name/:age.
    //to use it, we need to put a ? THEN an object name THEN = and THEN an object value. All attached of course. For exemple, the url above (/example/:name/:age) will be /example/anthony/27?tutorial=number01
    //use params when the info is mandatory and query while it's an option
    res.send('hello ' + req.params.name); //the name and age are params' object
})

app.listen(3000);
*/

//============================= static file with express =============================================
// static file == javascript, html, css, image, video, .....
/*
const express = require('express');
const path = require('path');

const app = express();
app.use('/public', express.static(path.join(__dirname, 'static')));
// first argument from use methode is an alias. It mean that we will rename the document with the content to be sure that it doesn't appear in public.
// second argument is a methode to localise the folder. __dirname is where the actual file is located. Here we are on the server.js file and we can say that this file is inside __dirname. Static is the name of the folder where the index.html is located. exemple here we have ./premier server test nodejs/static OR ./__dirname/static
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
})

app.listen(3000);
*/
// here we have a path with a folder named static but the name will change in public on the client side

//================================== http post request w/ express and body parser module ==============================
// Here we will show how to use post request (I'm the login to a server where we ask admin and password)
/*
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); //to be able to parse info, we need to install a body parser => npm install body-parser

const app = express();
app.use('/public', express.static(path.join(__dirname, 'myFolder')));
app.use(bodyParser.urlencoded({ extended: false })); // allow us to parse encoded url form. NB the extended is set to false because we don't use complicated option. Just an email and a password here. Here it part the data for use and return an object
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'myFolder', 'index.html')); //file to send while we connect to the server
})

app.post('/', (req, res) => { // the forward slash here is the action in the form
    console.log(req.body);
    // database work here
    res.send('successfully posted data');
})

app.listen(3000);

// NEED to check why it isn't working 1:53:46 => solved. I writted in the html methode instead of method

*/

//============================= Working with JSON Data - Express and body parser =========================================================
// Here, we will take the last form and post methode and transform in json data
/*
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use('/public', express.static(path.join(__dirname, "myFolder"))); //url translator to transform the folder "myFolder" to "public folder"
app.use(bodyParser.urlencoded({ extended: false })); //how to handel url
app.use(bodyParser.json()); //how to handel JSON
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "myFolder", 'index.html'));
})

app.post('/', (req, res) => {
    console.log(req.body);
    //database work here
    res.json({ success: true }); //response from the server inside the console
})

app.listen(3000);

*/

//============================== user input validation with express and JOI =================================================================
// Here, we will creat tool to be sure that the info that the user use are correct
// check in the documentation the last way of working with Joi because a lot of are not in use anymore for exemple : Joi.object().keys() => Joi.object();
// Joi.validate() => schema.validate()