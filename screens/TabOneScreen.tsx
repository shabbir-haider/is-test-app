import * as React from 'react';
import { StyleSheet, FlatList, StatusBar, TouchableOpacity, Alert } from 'react-native';

import { Ionicons } from '@expo/vector-icons'; 

import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';



import { connect } from 'react-redux'; 
class TabOneScreen extends React.Component {

  renderItem (item) {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item.name}</Text>
        <TouchableOpacity onPress = {() => {
          Alert.alert(
            "Remove Employee",
            "Are you sure you want to delete this record",
            [
              {
                text: "No",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Yes", onPress: () => this.props.deleteEmployee(item.id) }
            ],
            { cancelable: false }
          );
        }}>
          <Ionicons name="ios-trash-bin-sharp" size={24} color="black" />
        </TouchableOpacity>
      </View>
    )
  }

  render () {
    const { employees } = this.props; 
    
    return (
      <View style={styles.container}>
        <FlatList 
          data={employees} 
          renderItem={({item}) => this.renderItem(item)}
          keyExtractor={item => item.id} 
        />

        <TouchableOpacity onPress = {() => {
          this.props.navigation.navigate('AddEmployee')
        }}>
          <View style={styles.buttonStyle}>
            <Text style={styles.title}>Add Employee +</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    employees : state.employees
  }
}

function mapDispatchToProps (dispatch: (arg0: { type: string; }) => any) {
  return {
    addEmployee : () => dispatch({type : 'ADD_EMPLOYEE'}), 
    deleteEmployee : (id) => dispatch({type : 'DELETE_EMPLOYEE', payLoad : id}), 
    updateEmployee : () => dispatch({type : 'UPDATE_EMPLOYEE'}), 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabOneScreen); 



const styles = StyleSheet.create({

  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#ddd',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius : 5, 
    flexDirection : 'row',
    justifyContent : 'space-between'
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
