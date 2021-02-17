window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDesciption = document.querySelector('.temperature-description')
    let temperatureDegree = document.querySelector('.temperature-degree')
    let locationTimezone = document.querySelector('.location-timezone')
    let locationimg = document.querySelector('.location img')
    let temperatureSection = document.querySelector('.temperature')
    let temperatureSpan = document.querySelector('.temperature span')

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;


            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=ccb0e4fcca97047035fc20363b1fd32c`

            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data=>{
                
                const dataMainTemperature = data.main.temp;
                const dataWeather = (data.weather[0].description).toUpperCase();
                const dataTimezone = data.name;
                const dataIcon = data.weather[0].icon;
                console.log(data)

                // FORMULA FOR CELSIUS
                let Celsius =(dataMainTemperature -273) ;

                // Set DOM Elements from API
                temperatureDegree.textContent = dataMainTemperature;
                temperatureDesciption.textContent = dataWeather;
                locationTimezone.textContent = dataTimezone;
                locationimg.src = `http://openweathermap.org/img/wn/${dataIcon}@2x.png`;

                console.log(data)

                
                //Change temperature to Celsius/Farenheit
                temperatureSection.addEventListener('click', ()=>{
                    if(temperatureSpan.textContent ==="K"){
                        temperatureSpan.textContent = "C"
                        temperatureDegree.textContent = Math.floor(Celsius);
                    }else{
                        temperatureSpan.textContent ="K"
                        temperatureDegree.textContent = Math.floor(dataMainTemperature);
                    }
                })
                
            })


        });

      
    }

    // function setIcons(icon, iconID){
    //     const skycons = new skycons({color: "white"});
        
    // }

});