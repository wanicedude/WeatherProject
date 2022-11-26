const express = require("express")

const https = require("https")


const app = express()

app.get("/", function(req, res){

    const query = "London";
    const apiKey = "d7695165721b869a623a5a1f68a40aac";
    const units = "metric"

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query+ "&appid=" + apiKey + "&units=" + units + ""
   

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            // console.log(weatherData)
            const temp = weatherData.main.temp
            const description = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageUrl  = "http://openweathermap.org/img/wn/" + icon +"@2x.png"
            // console.log(temp)
            // or use res.write() for everything you want to write and use res.send()
            res.write("<h1>The Temperature in london is " +  temp + " degrees Celsius")
            res.write("<h1>The weather is currently " + description)
            res.write("<img src=" + imageUrl +">")
            res.send()
          

            })
        })
    

    // res.send("App is running fine")
})

app.listen(3000, function(){
    console.log("Server is running on port 3000")
})