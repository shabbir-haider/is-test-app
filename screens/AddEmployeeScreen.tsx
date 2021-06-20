import * as React from 'react';
import { StyleSheet,TextInput, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';



import { connect } from 'react-redux'; 

const Item = ({ title }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
};
class AddEmployeeScreen extends React.Component {

  state = {
    emp_name : '', 
    emp_age : 0
  }

  onAgeEnter = (age: string) => {
    if(!isNaN(age)){
      this.setState({
        emp_age : age
      })
    }
  }

  render () {
    const { emp_name, emp_age } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={{ height: 45, borderColor: '#ddd', borderWidth: 1, width : 300, fontSize: 32 }}
          onChangeText={text => this.setState({emp_name : text})}
          value={emp_name}
          autoCorrect={false}
          placeholder={"Employee Name"}
        />

        <TextInput
          style={{ height: 45, borderColor: '#ddd', borderWidth: 1, width : 300, fontSize: 32 }}
          onChangeText={text => this.onAgeEnter(text)}
          value={emp_age}
          autoCorrect={false}
          placeholder={"Employee Age"}
          keyboardType="numeric"
        />

        <TouchableOpacity onPress = {() => {
          const { emp_name, emp_age } = this.state; 
          let emp_item; 
          if(emp_age && emp_name) {
            emp_item = { 
              id : Math.floor(Math.random() * 100),
              name : emp_name,
              age : emp_age
            }

            this.props.addEmployee(emp_item);
            this.props.navigation.navigate('TabOneScreen')
          }
        }}>
          <View style={styles.buttonStyle}>
            <Text style={styles.title}>Submit</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapDispatchToProps (dispatch: (arg0: { type: string; }) => any) {
  return {
    addEmployee : (item) => dispatch({type : 'ADD_EMPLOYEE', payLoad : item}), 
  }
}

export default connect(null, mapDispatchToProps)(AddEmployeeScreen); 



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonStyle : {
    backgroundColor: Colors.light.tint,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius : 5
  },

  title: {
    fontSize: 32,
  },
});
