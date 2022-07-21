<!-- notes -->
<!-- 
    
 -->
<template>
    <div class="display-container">
        <div class="display-weather">
            <transition>
                <LocationHeader v-if="this.isLoaded" 
                :place="this.location" 
                :country="this.country"
                :region="this.region"/>
            </transition>

            <transition>
                <WeatherInfo v-if="this.isLoaded" 
                name="Condition" 
                :str_value="this.condition"/>
            </transition>


            <transition>
                <WeatherInfo v-if="this.isLoaded" 
                name="Air Quality" 
                :num_value="this.airQuality"/>
            </transition>
            
            <transition>
                <WeatherInfo v-if="this.isLoaded" 
                name="Humidity" 
                :num_value="this.humidity"
                unit_value="%"/>
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
                name="UV Index" 
                :num_value="this.UVIndex"/>
            </transition>

            <transition><img id="icon" v-if="this.isLoaded" :src="this.icon"/></transition>
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
                CLOUD_IMG:"https://media0.giphy.com/media/qMa7c1HPdN7rO/giphy.gif",
                RAIN_IMG: "https://s-media-cache-ak0.pinimg.com/originals/91/2a/2a/912a2a3e04f3099b700d09a8d351ac6d.gif",
                SNOW_IMG: "https://64.media.tumblr.com/62046c4b6db824973a063782f8b08ddb/1de13aef03064f7e-24/s540x810/f3133611fc8e87c44f124f7af5b346d434ed1bd1.gifv",
                STORM_IMG: "https://thumbs.gfycat.com/LiquidLeanDairycow-size_restricted.gif",
                SUNNY_IMG: "https://thumbs.gfycat.com/FrenchSecondaryEnglishpointer-max-1mb.gif",
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
                if (this.isLoaded) {
                    this.isLoaded = false
                    await this.fetchWeather(this.getAPI(place))
                    setTimeout(()=>this.parseData(), 1000) // for css (goofy fix but whatever)
                    this.sunWarning()
                } else {
                    await this.fetchWeather(this.getAPI(place))
                    this.parseData()
                    // this.sunWarning()
                }
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
               this.isLoaded = true
               this.changeToolbar()
            },
            async fetchWeather(url) {
                return fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    this.weatherData = data.current
                    this.locationData = data.location
                    console.log(data); // TODO delete later
                })
            },
            sunWarning() {
                // console.log(this.$refs.UV.innerText)
            },
            changeToolbar() {
                document.getElementById('display-toolbar').style.backgroundImage=`url(${this.getImage()})`;
            },
            getImage() {
                if (this.condition.includes("Partly") || this.condition.includes("Sunny")) {
                    return this.SUNNY_IMG
                } else if (this.condition.includes("rain")) {
                    return this.RAIN_IMG
                } else if (this.condition.includes("cloud") || this.condition.includes("Mist")) {
                    return this.CLOUD_IMG
                }
            }
            
        },
    }
</script>

<style scoped>
    .display-container {
        display: grid;
        grid-template-columns: 70% 30%;
        grid-template-rows: none;
        grid-template-areas: "weather" "search";
        column-gap: 1px;
        height: 100vmax;
        overflow: hidden;
    }

    .display-weather {
        background-image: linear-gradient(rgb(0, 81, 202), darkblue);
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
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

    @media only screen and (max-width:550px) {
        .display-container {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr;
        }
    }
</style>