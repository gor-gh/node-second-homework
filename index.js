const fs = require('fs');

function makeAnObject(path) {
    return new Promise(resolve => {
        if(fs.lstatSync(path).isDirectory()) {
            fs.readdir(path, (err, files) => {
                let tempObj = {};
                for(let dir of files) {
                    makeAnObject(`${path}/${dir}`)
                        .then(obj => {
                            tempObj[`${dir}`] = obj;
                            if(files.indexOf(dir) === files.length - 1) {
                                resolve(tempObj);
                            }
                        })
                }
            })
        } else {
            resolve(true)
        }
    })
}


// console.log(makeAnObject(process.argv[2]));
makeAnObject(process.argv[2])
    .then(res => {
        console.log(res)
    })
