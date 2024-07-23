import CryptoES from 'crypto-es'
import jsMD5 from 'js-md5';
import md5 from 'md5'
import md5js from 'md5.js'

const inputElement = document.getElementById("fileInput");
inputElement.addEventListener("change", handleFile, false);

async function time(func) {
    const t0 = performance.now() // milliseconds
    return func().then(() => {
        return performance.now() - t0
    })
}

function cryptoESmd5(arraybuffer) {
    console.log(CryptoES.MD5(CryptoES.lib.WordArray.create(arraybuffer)).toString(
        CryptoES.enc.Base64,
    ))
}

function jsmd5(arraybuffer) {
    var x = jsMD5.md5.create();
    x.update(arraybuffer);
    console.log(x.base64())
}

function puremd5(arraybuffer) {
    console.log(Buffer.from(md5(new Uint8Array(arraybuffer)), 'hex').toString('base64'))
}

function md5jstest(arraybuffer) {
    console.log(new md5js().update(Buffer.from(arraybuffer)).digest('base64'))
}

function chunkjsmd5(currentFile) {
    const fileSize = currentFile.size
    return new Promise(function (resolve, reject) {
        let x = jsMD5.md5.create();
        let offset = 0
        let chunkSize = 1024 * 1024
        const reader = new FileReader()

        function keepReading(){
            reader.readAsArrayBuffer(currentFile.slice(offset, offset+chunkSize))
       }

        reader.onerror = function onerror(e) {
            reject(e.target.error)
        }

        reader.onload = function onload(e) {
            if (reader.error) {
                return reject(reader.error);
            }
            x.update(reader.result)
            offset += reader.result.byteLength;
            if (offset >= fileSize) {
                const value = x.base64()
                console.log(value)
                return resolve(value);
            } else{
                keepReading()
            }
        }
        keepReading()
    })
}


async function test(func, label = "", numTimes = 10) {
    const results = await Promise.all(Array(numTimes).fill(1).map((i) => time(func)))
    return (`${label} = ${results.reduce((a, b) => a += b, 0) / numTimes}`)
}

function fileToArrayBuffer(file) {
    return new Promise(function (resolve, reject) {
        const reader = new FileReader()

        reader.onerror = function onerror(e) {
            reject(e.target.error)
        }

        reader.onload = function onload(e) {
            resolve(e.target.result)
        }

        reader.readAsArrayBuffer(file)
    })
}

function append(text) {
    const e = document.createElement('div')
    e.textContent = text
    document.getElementById('results').appendChild(e)
}

async function handleFile() {
    const [currentFile] = this.files; /* now you can work with the file list */
    append('-----------')
    append(`${currentFile.name} Size: ${currentFile.size / 1000000}MB`)
    await test(() => fileToArrayBuffer(currentFile), "Convert file to buffer").then(append)
    const ab = await fileToArrayBuffer(currentFile)
    await test(async () => jsmd5(ab), "jsmd5 excl fileToArrayBuffer").then(append)
    await test(async () => fileToArrayBuffer(currentFile).then(jsmd5), "jsmd5 incl fileToArrayBuffer").then(append)
    await test(async () => chunkjsmd5(currentFile) , "jsmd5 read file in chunks").then(append)
    await test(async () => md5jstest(ab), 'md5.js').then(append)
    await test(async () => puremd5(ab), "md5").then(append)
    await test(async () => cryptoESmd5(ab), "crypto-es").then(append)
}


