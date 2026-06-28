import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from './constants/colors';
import { useColorScheme } from "react-native";
import { SpacerComponent } from './components/spacer';
import { useState, useEffect } from 'react';
import axios from 'axios';

function VerfT(t) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[t];
}

export default function App() {
  const atual = useColorScheme();
  const mode = Colors[atual];

  const [hours, setHours] = useState("00");
  const [min, setMin] = useState("00");
  const [sec, setSec] = useState(0);
  const [degress, setDegress] = useState(0);
  const [today, setToday] = useState('');
  const [city, setCity] = useState('');
  const [infoWeather, setInfoWeather] = useState("");


  function getDay() {
    const date = new Date;
    setHours(String(date.getHours()).padStart(2, "0"));
    setMin(String(date.getMinutes()).padStart(2, "0"));
    setSec(String(date.getSeconds()).padStart(2, "0"));
    const today2 = VerfT(date.getDay());
    setToday(today2);
  }


async function getWeatherInfo() {
  const coordLat = "-23.8464003"; //Latitude do lugar desejado
  const coordLon = "-46.7388715"; //Longitude do lugar desejado
  const api_key = "SuaApiKey";

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coordLat}&lon=${coordLon}&appid=${api_key}&units=metric`;

  const response = await axios.get(url);
  let degress2 = response.data.main.temp;
  setDegress(degress2.toFixed(1));
  setCity(response.data.name);
  setInfoWeather(response.data.weather[0].description);
}
  useEffect(() => {
    const interval = setInterval(() => {
      getWeatherInfo();
    }, 10000)

    return () => clearInterval(interval);
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      getDay();
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  return (
    <View style={[{ backgroundColor: mode.bg }, styles.container]}>
      <View style={styles.clock}>

          <Text style={[{ color: mode.text }, styles.text2]}>{today}</Text>
        <View style={styles.time}>
          <Text style={[{ color: mode.text }, styles.text]}>{hours}</Text>
          <Text style={[{ color: mode.text }, styles.text]}>:</Text>
          <Text style={[{ color: mode.text }, styles.text]}>{min}</Text>
          <Text style={[{ color: mode.text }, styles.text]}>:</Text>
          <Text style={[{ color: mode.text }, styles.text]}>{sec}</Text>
        </View>

          <View style={styles.separe}>
          <Text style={[{ color: mode.text }, styles.text3]}>{degress}°C</Text>
          <Text style={[{ color: mode.text}, styles.text3]}>{city}</Text>
          <Text style={[{color: mode.text}, styles.text3]}>{infoWeather}</Text>
          </View>

      </View>
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  
  clock: {
    position: "relative",
    backgroundColor: "#141414",
    display: "flex",

    justifyContent: "space-around",
    width: "85%",
    height: 220,
    borderRadius: 24,
    padding: 24,
    elevation: 8
  },

  separe: {
    display: "flex", 
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20
  },

  time: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },

  text: {
    fontWeight: 900,
    fontSize: "1.6rem",
    textAlign: "center",
  },

  text2: {
    fontWeight: 900,
    paddingLeft: 20,
    fontSize: "1.5rem",
    width: "50%",
  },

  text3: {
    width: "50%",
    textAlign: "center",
    fontSize: "1rem",
    fontWeight: 900
  },
  

  text4: {
    width: "100%",
    textAlign: "center",
    fontSize: "1.2rem",
    fontWeight: 900
  }
});
