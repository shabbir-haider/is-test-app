import * as React from 'react';
import { StyleSheet , Image, ActivityIndicator} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, } from '../components/Themed';

import Axios from 'axios'; 

export default class TabTwoScreen extends React.Component {

  state = {
    weather : null,
    loading : true
  }

  componentDidMount () {
    // get weather data
    this.setState({
      loading : true
    })
    Axios.get('https://www.metaweather.com/api/location/1940345/').then (res => {
      this.setState({
        weather : res.data,
        loading : false
      }).catch(e => {
        this.setState({
          loading : false
        })
        Alert('Unable to fetch data,' ,e);
      })
    })
  }


  render () {
    const { weather , loading } = this.state;
    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator />}
        {weather && <Image 
          source={{ uri: `https://www.metaweather.com/static/img/weather/png/${weather.consolidated_weather[0].weather_state_abbr}.png` }} 
          style={{ width: 305, height: 350 }} 
          resizeMode={"contain"}
          />
        }
        {weather && <Text style={styles.title}>{weather.consolidated_weather[0].the_temp}</Text>}
        {weather && <Text> {weather.consolidated_weather[0].weather_state_name}</Text>}
        
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent : 'space-evenly'
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
