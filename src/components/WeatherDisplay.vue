<template>
    <div class="display-container">
        <div class="display-weather">
            <transition>
                <LocationHeader v-if="this.isLoaded" 
                :place="this.location" 
                :country="this.country"
                :region="this.region"/>
            </transition>

            <transition><img id="icon" v-if="this.isLoaded" :src="this.icon"/></transition>

            <transition>
                <WeatherInfo v-if="this.isLoaded" 
                name="Condition" 
                :str_value="this.condition"/>
            </transition>

            <transition>
                <WeatherInfo v-if="this.isLoaded" 
                name="Temperature" 
                :num_value="this.temperature"
                unit_value=" °F"/>
            </transition>

            <transition>
                <WeatherInfo v-if="this.isLoaded" 
                name="Wind Speed" 
                :num_value="this.windSpd"
                unit_value=" mph"/>
            </transition>

            <transition>
                <WeatherInfo v-if="this.isLoaded" 
                name="Humidity" 
                :num_value="this.humidity"
                unit_value="%"/>
            </transition>

            <transition>
                <WeatherInfo v-if="this.isLoaded" 
                name="Air Quality" 
                :num_value="this.airQuality"/>
            </transition>
            
            <transition>
                <WeatherInfo v-if="this.isLoaded" 
                name="UV Index" 
                :num_value="this.UVIndex"/>
            </transition>

        </div>
        <Toolbar @get-location="((city)=>run(city))"/>
    </div>
</template>

<script>
    import Toolbar from './ToolbarDisplay.vue'
    import LocationHeader from './LocationHeader.vue'
    import WeatherInfo from './WeatherInfo.vue'

    export default {
        data() {
            return {
                CLOUD_IMG:"https://media2.giphy.com/media/gWb7yHglwMZKovBllB/200w.webp?cid=ecf05e47kl5a93jlu7uh6fe6dmrcpn85eo3ywnfkn6uyvjy6&rid=200w.webp&ct=g",
                RAIN_IMG: "https://media2.giphy.com/media/PN23U6cVRWFFe/giphy.gif?cid=ecf05e47fsyunn7t8p60lhk3cl0w2ds7715tmi1hb3m9k10i&rid=giphy.gif&ct=g",
                NIGHT_RAIN_IMG: "https://media2.giphy.com/media/qHWAmPd3SWyY0/giphy.gif?cid=ecf05e47xk400mbkq85z123oqtf5i956mc5b0lq6xc0g71l3&rid=giphy.gif&ct=g",
                SNOW_IMG: "https://media2.giphy.com/media/3o7525lK1GdxxMELIY/giphy.gif?cid=ecf05e475l1io3c6mimrvdn29rlafp4xjn5tmqi09mx2ajar&rid=giphy.gif&ct=g",
                NIGHT_SNOW_IMG: "https://media1.giphy.com/media/1Z7Kvmxk9Iob6/giphy.gif?cid=ecf05e47nsb4nqyodlc5i9oisxa9jcpf3ysvq85fo6gedbhu&rid=giphy.gif&ct=g",
                STORM_IMG: "https://thumbs.gfycat.com/LiquidLeanDairycow-size_restricted.gif",
                SUNNY_IMG: "https://media1.giphy.com/media/0Styincf6K2tvfjb5Q/giphy.gif?cid=ecf05e47r4v0kig7p5mirh1mqfxq6qxlf0qcuyvy819u1urk&rid=giphy.gif&ct=g",
                STARS_IMG: "https://media3.giphy.com/media/aRJMSoJmD037wpHSOF/giphy.gif?cid=ecf05e47mgoadsmtux3cwo13fz2za1oexltkgmytt1ogm1q0&rid=giphy.gif&ct=g",
                API_URL: "https://api.weatherapi.com/v1/current.json?key=eba659c2c78e47aa8c0182048222106&aqi=yes&q=",
                isLoaded: false,
                toggleTemp: false, // false - farenheit; true - celcius
                weatherData: null,
                locationData: null,
                location: "",
                country: "",
                region: "",
                condition: "",
                icon: "",
                temperature: 0.0,
                humidity: 0,
                airQuality: 0,
                windSpd: 0,
                UVIndex: 0,
                isDay: 0,
            }
        },
        components: {
            Toolbar,
            LocationHeader,
            WeatherInfo,
        },
        methods: {
            getAPI(place) {
                return this.API_URL + place
            },
            async run(place) {
                // if weather information is loaded, change boolean and fetch new weather information. else, get weather for first time.
                this.isLoaded ? (this.isLoaded = !this.isLoaded,  await this.fetchWeather(this.getAPI(place))) : await this.fetchWeather(this.getAPI(place))
            },
            parseData() {
               this.location = this.locationData["name"]
               this.country = this.locationData["country"]
               this.region = this.locationData["region"]
               this.condition = this.weatherData.condition["text"]
               this.icon = this.weatherData.condition["icon"]
               this.temperature = this.weatherData["temp_f"]
               this.airQuality = this.weatherData.air_quality["us-epa-index"]
               this.windSpd = this.weatherData["wind_mph"]
               this.UVIndex = this.weatherData["uv"]
               this.humidity = this.weatherData["humidity"]
               this.isDay = this.weatherData["is_day"]
               this.isLoaded = true
               this.changeToolbar()
            },
            async fetchWeather(url) {
                return fetch(url)
                .then((res) => {
                    if (res.ok) {
                        return res.json()
                    } else {
                        throw new Error("Location does not exist!")
                    }
                })
                .then((data) => {
                    this.weatherData = data.current
                    this.locationData = data.location
                    this.parseData()
                    console.log(data); // TODO delete later
                })
                .catch((err) => {
                    console.log(err)
                    alert(err)
                })
            },
            changeToolbar() {
                document.getElementById('display-toolbar').style.backgroundImage=`url(${this.getImage()})`;
            },
            getImage() {
                if (this.condition.includes("Partly") || this.condition.includes("Sunny") || this.condition.includes("Clear"))  {
                    this.changeGradient("sunny")
                    return this.isDay ? this.SUNNY_IMG : this.STARS_IMG
                }  else if (this.condition.includes("thunder")) {
                    this.changeGradient("stormy")
                    return this.isDay ? this.STORM_IMG : this.STORM_IMG
                } else if (this.condition.includes("rain")) {
                    this.changeGradient("rainy")
                    return this.isDay ? this.RAIN_IMG : this.NIGHT_RAIN_IMG
                } else if (this.condition.includes("cloud") || this.condition.includes("Mist") || this.condition.includes("Overcast")){
                    this.changeGradient("cloudy")
                    return this.isDay ? this.CLOUD_IMG : this.CLOUD_IMG
                } else if (this.condition.includes("snow")) {
                    this.changeGradient("snow")
                    return this.isDay ? this.SNOW_IMG : this.NIGHT_SNOW_IMG
                }
            },
            changeGradient(c) {
                switch (c) {
                    case "sunny":
                        console.log(this.isDay);
                        if (this.isDay) {
                            document.getElementsByClassName("display-weather")[0].style.backgroundImage="linear-gradient(rgb(81, 164, 212), white)"
                            document.getElementsByClassName("display-weather")[0].style.color="black"
                        } else {
                            document.getElementsByClassName("display-weather")[0].style.backgroundImage="linear-gradient(rgb(50, 36, 175), rgb(82, 65, 150))"
                            document.getElementsByClassName("display-weather")[0].style.color="white"
                        }
                        document.getElementsByClassName("display-weather")[0].style.opacity="1"
                        break;

                    case "rainy":
                        if (this.isDay) {
                            document.getElementsByClassName("display-weather")[0].style.backgroundImage="linear-gradient(rgb(90, 90, 90), grey)"
                        } else {
                            document.getElementsByClassName("display-weather")[0].style.backgroundImage="linear-gradient(black, rgb(90, 90, 90))"
                        }
                        document.getElementsByClassName("display-weather")[0].style.opacity="1"
                        document.getElementsByClassName("display-weather")[0].style.color="white"
                        break
                    
                    case "cloudy":
                        if (this.isDay) {
                            document.getElementsByClassName("display-weather")[0].style.backgroundImage="linear-gradient(rgb(90, 90, 90), white)"
                            document.getElementsByClassName("display-weather")[0].style.color="black"
                        } else {
                            document.getElementsByClassName("display-weather")[0].style.backgroundImage="linear-gradient(rgb(41, 41, 41), rgb(107, 107, 107))"
                            document.getElementsByClassName("display-weather")[0].style.color="white"
                        }
                        document.getElementsByClassName("display-weather")[0].style.opacity="1"
                        break
                    case "stormy":
                        if (this.isDay) {
                            document.getElementsByClassName("display-weather")[0].style.backgroundImage="linear-gradient(rgb(90, 90, 90), grey)"
                        } else {
                            document.getElementsByClassName("display-weather")[0].style.backgroundImage="linear-gradient(black, rgb(90, 90, 90))"
                        }
                        document.getElementsByClassName("display-weather")[0].style.opacity="1"
                        document.getElementsByClassName("display-weather")[0].style.color="white"
                        break
                    case "snow":
                        if (this.isDay) {
                            document.getElementsByClassName("display-weather")[0].style.backgroundImage="linear-gradient(rgb(197, 239, 255), rgb(219, 219, 219))"
                            document.getElementsByClassName("display-weather")[0].style.color="black"
                        } else {
                            document.getElementsByClassName("display-weather")[0].style.backgroundImage="linear-gradient(black, rgb(197, 239, 255))"
                            document.getElementsByClassName("display-weather")[0].style.color="white"
                        }
                        document.getElementsByClassName("display-weather")[0].style.opacity="1"
                        break
                    default:
                        break;
                }
            },
        },
    }
</script>

<style scoped>
    .display-container {
        overflow: hidden;
        background-color: black;
        /* color: rgb(50, 36, 175); */
        display: grid;
        grid-template-columns: 70% 30%;
        grid-template-rows: none;
        grid-template-areas: "weather" "search";
        height: 100vh;
    }

    .display-weather {
        transition: opacity 2s ease-in-out;
        opacity: 0;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        height: inherit;
    }

    #icon {
        margin: auto;
        height: 100px;
        width: 100px;
    }

    .v-enter-active {
        transition: all 2.5s ease-out;
    }

    .v-leave-active {
        transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .v-enter-from,
    .v-leave-to {
        transform: translateY(20px);
        opacity: 0;
    }

    /* mobile view */
    @media (min-width: 320px) and (max-width: 480px) {
        .display-container {
            overflow: hidden;
            /* display: grid; */
            grid-template-columns: 100%;
            grid-template-rows: 60vh 40vh;
            height: 100%;
            min-height: 100%;
        }
    }
</style>