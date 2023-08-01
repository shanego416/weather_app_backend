const axios = require("axios").default;

const readline = require("readline");
const rl = readline.createInterface ({
    input: process.stdin,
    output: process.stdout
})

let userCity;
let weatherReport;

const API_BASE_URL = "https://api.weatherapi.com/v1/current.json";
const API_KEY = "49f8ea5a2aab4c20a4312456232206";

//*****User Interface and Logic****************//

function displayTitle(){
    console.log(" Current Weather By City ");
    console.log("**************************");
}

function getUserInput(){
    console.log("Enter City by name:");
    rl.question("Enter City > ", (userInput) => {
        userCity = userInput;
        getWeatherReport(userCity);
    })

}

//TEST FUNCTION
// function getWeatherReport(userCity) {
//     if (userCity != "") {
//         var weatherReport = "18 degrees Celsius";
//         displayWeatherReport(userCity, weatherReport);
//     }
//     else {
//     getUserInput();
//     }
// };

function getWeatherReport(userCity) {
    const weatherUrl = `${API_BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(userCity)}`;

    axios
        .get(weatherUrl)
        .then((response) => {
            const { temp_c, feelslike_c} = response.data.current;
            const weatherReport = `${temp_c} degrees Celsius, and feels like ${feelslike_c}.`;
            displayWeatherReport(userCity, weatherReport);
            //console.log(response.data);
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
        });
}

function displayWeatherReport(userCity, weatherReport) {
    console.log("The weather report from", userCity, "is",weatherReport);

    searchAgain();
}

function searchAgain() {
    console.log("Would you like to search another city?");
    rl.question("Yes or No >", yesOrNo => {
        if (yesOrNo === "yes" || yesOrNo === "Yes") {
            getUserInput();
        }   else if (yesOrNo === "no" || yesOrNo === "No") {
            process.exit();
        }       else {
            console.log("Invalid input");
            searchAgain();
        }
    })


}

function connectionError(){
    console.log("Connection Error");
}


displayTitle();
getUserInput();

// TODO 
// TEST ASK AGAIN FUNCTION WITH CONNECTION
// CREATE ERRORS FOR NON CONNECTED DEVICES (CHAT GPT)
// Incorperate different weather variables 