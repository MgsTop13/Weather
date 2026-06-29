import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import { Colors } from './constants/colors';
import { useColorScheme } from "react-native";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid"

function VerfT(t) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[t];
}

const cities = [ 
  { name: "Embu Guaçu", lat: "-23.8464003", lon: "-46.7388715"},
  { name: "Taboão da Serra", lat: "-23.6452664", lon: "-46.7953603"},
  { name: "Itapecirica da Serra", lat: "-23.678347035312203", lon: "-46.820014951508064"},
]

function getImg(text){
  switch(text){
    case "clear sky":
      return <FontAwesomeFreeSolid name='' />
  }
}

export default function App() {
  const atual = useColorScheme();
  const mode = Colors[atual];

  const [hours, setHours] = useState("00");
  const [min, setMin] = useState("00");
  const [sec, setSec] = useState(0);
  const [today, setToday] = useState('');
  
  const [degress, setDegress] = useState(0);
  const [city, setCity] = useState('');
  const [infoWeather, setInfoWeather] = useState("");
   
  const [selectCity, setSelectCity] = useState("Embu Guaçu");



  function getDay() {
    const date = new Date;
    setHours(String(date.getHours()).padStart(2, "0"));
    setMin(String(date.getMinutes()).padStart(2, "0"));
    setSec(String(date.getSeconds()).padStart(2, "0"));
    const today2 = VerfT(date.getDay());
    setToday(today2);
  }


  async function getWeatherInfo() {
    let findCity = cities.find(cityName => cityName.name === selectCity);
    let coordLat = findCity.lat; //Latitude do lugar desejado
    let coordLon = findCity.lon; //Longitude do lugar desejado

    const api_key = "VaiPegarATuaRapax!!";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coordLat}&lon=${coordLon}&appid=${api_key}&units=metric`;

    try {
      const response = await axios.get(url);
      let degress2 = response.data.main.temp;
      setDegress(degress2.toFixed(1));
      setCity(response.data.name);
      setInfoWeather(response.data.weather[0].description);

    } catch (error) {
      console.error(error)
    }

  }
  useEffect(() => {
    getWeatherInfo();
  }, [selectCity]);

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


        <Picker
          selectedValue={selectCity}
          onValueChange={(itemValue) => { setSelectCity(itemValue) }}
          style={styles.select}
        >
          <Picker.Item label="Embu Guaçu" value="Embu Guaçu"/>
          <Picker.Item label="Taboão da Serra" value="Taboão da Serra" />
          <Picker.Item label="Itapecirica da Serra" value="Itapecirica da Serra" />

        </Picker>

        <View style={styles.separe}>
          <Text style={[{ color: mode.text }, styles.text3]}>{degress}°C</Text>
          <Text style={[{ color: mode.text }, styles.text3]}>{city}</Text>
          <Text style={[{ color: mode.text }, styles.text3]}>{infoWeather}</Text>
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

    alignItems: "center",
    justifyContent: "space-around",
    width: "85%",
    height: 220,
    borderRadius: 24,
    padding: 12,
    elevation: 8
  },

  select: {
    width: "70%",
    backgroundColor: "#2e2e2e",
    border: "none",
    height: 30,
    color: "#e1e1e1"
  },

  separe: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },

  time: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },

  text: {
    fontWeight: "900",
    fontSize: 28,
    textAlign: "center",
    marginHorizontal: 5,
  },
  
  text2: {
    fontWeight: "900",
    paddingLeft: 20,
    fontSize: 25,
    width: "100%",
  },

  text3: {
    fontSize: 14,
    fontWeight: "900"
  },

});