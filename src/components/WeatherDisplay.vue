<!-- notes -->
<!-- 
    Weather Info To Display:
    Name of city
    Temperature: Current, High, Low
    Condition: Sunny, Cloudy, Slightly Cloudy, etc
    Humidity
    Air Quality
    UV Index
 -->
<template>
    <div class="display-container">
        <div class="display-weather">
            <LocationHeader v-if="this.isLoaded" 
            :place="this.location" 
            :country="this.country"
            :region="this.region"/>

            <WeatherInfo v-if="this.isLoaded" 
            name="Condition" 
            :str_value="this.condition"/>
            

            <WeatherInfo v-if="this.isLoaded" 
            name="Air Quality" 
            :num_value="this.airQuality"/>
            
            <WeatherInfo v-if="this.isLoaded" 
            name="Humidity" 
            :num_value="this.humidity"/>

            <WeatherInfo v-if="this.isLoaded" 
            name="Temperature" 
            :num_value="this.temperature"/>

            <WeatherInfo v-if="this.isLoaded" 
            name="Wind Speed" 
            :num_value="this.windSpd"/>
            
            <WeatherInfo v-if="this.isLoaded" 
            name="UV Index" 
            :num_value="this.UVIndex"/>

            <img id="icon" v-if="this.isLoaded" :src="this.icon"/>

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
                await this.fetchWeather(this.getAPI(place))
                this.parseData()
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
            },
            async fetchWeather(url) {
                return fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    this.weatherData = data.current
                    this.locationData = data.location
                    console.log(data); // delete later
                })
            },
        },
    }
</script>

<style scoped>
    .display-container {
        display: grid;
        height: 100vh;
        grid-template-columns: 70% 30%;
        column-gap: 1px;
        overflow: hidden;
    }

    .display-weather {
        background-color: black;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);

    }

    #icon {
        margin: auto;
        height: 100px;
        width: 100px;
    }

</style>