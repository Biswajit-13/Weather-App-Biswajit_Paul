import React, { useEffect, useState } from "react";
// import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  StatusBar,
  SafeAreaView,
} from "react-native";
import Searchbar from "./components/Searchbar";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// const im =  require("./assets/Sun.png");
const image = require("./assets/background_clear.jpg");
export default function App() {
  //declaring all the state variables
  const [search, setSearch] = useState("kolkata, India");
  const [data, setData] = useState([]);
  const [country, setCountry] = useState([]);
  const [city, setCity] = useState([]);
  const [weather, setWeather] = useState(" ");
  const [weathericon, setWeathericon] = useState([]);
  const [temp, setTemp] = useState([]);
  const [mintemp, setMintemp] = useState([]);
  const [maxtemp, setMaxtemp] = useState([]);
  const [wind, setWind] = useState([]);
  const [pressure, setPressure] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //quotes funcions
  const getWeather = () => {
    setIsLoading(true);
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        search +
        "&appid=fa9e65bbcec2dadc812d17d6b057a746"
    )
      .then((res) => res.json())
      .then((result) => {
        // console.log(result.weather[0].description);
        setData(result.main);
        setTemp(parseInt(result.main.temp - 273));
        setMintemp(parseInt(result.main.temp_min - 273));
        setMaxtemp(parseInt(result.main.temp_max - 273));
        setWeather(result.weather[0].description);
        setWeathericon(result.weather[0].main);
        setHumidity(result.main.humidity);
        setPressure(result.main.pressure);
        setWind(result.wind.speed);
        setCountry(result.sys.country);
        setCity(result.name);
        console.log(weathericon);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getWeather();
  }, []);
  var im = require("./assets/Sun.png");
  if (weathericon === "Clear") {
    im = require("./assets/Sun.png");
  } else if (weathericon === "Snow") {
    im = require("./assets/Snow.png");
  } else if (weathericon === "Haze" || weathericon === "Clouds") {
    im = require("./assets/Haze.png");
  } else if (weathericon === "Rain") {
    im = require("./assets/Rain.png");
  } else {
    im = require("./assets/Sun.png");
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        <Searchbar
          search={search}
          setSearch={setSearch}
          onSubmit={getWeather}
        />
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            padding: 15,
            marginTop: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <Ionicons
              name="location-outline"
              size={12}
              color="white"
              style={{ padding: 5 }}
            />
            <Text style={{ fontSize: 14, color: "white", alignSelf: "center" }}>
              {city}, {country}
            </Text>
          </View>

          <View style={{ marginTop: 30 }}>
            <Image
              style={{
                alignSelf: "center",
                width: 150,
                height: 150,
                padding: 40,
              }}
              source={im}
            />
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              padding: 10,
              alignSelf: "center",
            }}
          >
            <Text style={{ fontSize: 75, color: "white" }}>{temp}</Text>
            <Entypo
              name="circle"
              size={14}
              color="white"
              style={{ marginTop: 10, padding: 5 }}
            />
            <Text style={{ fontSize: 50, marginTop: 25, color: "white" }}>
              C
            </Text>
          </View>
          <View
            style={{
              padding: 10,
              marginTop: -20,
              marginBottom: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{ alignSself: "center", color: "white", fontSize: 30 }}
            >
              {weather}
            </Text>
            <Text style={{ alignSelf: "center", fontSize: 14, color: "white" }}>
              minimum {mintemp}, maximum {maxtemp}
            </Text>
          </View>
          <View
            style={{
              width: "90%",
              // backgroundColor: "red",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              padding: 10,
              //  borderWidth:2,
              borderTopWidth: 1,
              borderColor: "white",
              marginTop: 15,
            }}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                padding: 10,
                width: "33%",
              }}
            >
              <MaterialCommunityIcons
                name="sun-thermometer-outline"
                size={35}
                color="white"
                style={{ alignSelf: "center" }}
              />
              <Text style={{ marginTop: 5, color: "white" }}>{pressure}</Text>
              <Text style={{ marginTop: 5, color: "white" }}>Pressure</Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                padding: 10,
                width: "33%",
              }}
            >
              <Feather
                name="wind"
                size={35}
                color="white"
                style={{ alignSelf: "center" }}
              />
              <Text style={{ marginTop: 5, color: "white" }}>{wind} km/hr</Text>
              <Text style={{ marginTop: 5, color: "white" }}>Windy Fur</Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                padding: 10,
                width: "33%",
              }}
            >
              <Feather
                name="sun"
                size={35}
                color="white"
                style={{ alignSelf: "center" }}
              />
              <Text style={{ marginTop: 5, color: "white" }}>{humidity} %</Text>
              <Text style={{ marginTop: 5, color: "white" }}>Humidity</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue",
    maxHeight: "100%",
    marginTop: StatusBar.currentHeight,
    height: "100%",
  },
});
