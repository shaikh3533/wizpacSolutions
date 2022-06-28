import express from "express"
const app = express();
const router = express.Router();
import fs from "fs"
import fetch from 'node-fetch';
const port = 8000 || process.env.port;
setInterval(async ()=>{
    try {
        const response = await fetch("https://209.97.168.200/pacrawizpackv3/public/api/hamza-get-api?data");
    const body = await response.json();
    const data = await body.data
    var arr = [];
    for(let i in data){
        i = Number(i)
        data[i].sNo = "empty"
    }
    for(let i = 0; i <=15; i++){
        arr.push(data[i])
    }
    fs.writeFileSync("../src/outstanding_data.json", JSON.stringify(arr))
    console.log("file fetched and saved in file.json");
    } catch (error) {
        console.log(error);
    }
    
}, 5000000)


    
    app.listen(port, ()=>{
        console.log(`listening to Port Number: ${port}`);
    })

