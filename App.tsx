import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStore } from 'redux'; 
import { Provider } from 'react-redux'; 

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

const initialState = {
  employees :  [
    {
      'id' : 1,
      'name' : 'Ali',
      'age' : 30,
    },
  
    {
      'id' : 2,
      'name' : 'Usman',
      'age' : 22
    },
  ],
}

const reducer = (state = initialState, action : object) => {
  switch(action.type){
    case 'ADD_EMPLOYEE': {
      console.log('AddEmployeeAction :', action);
      return { ...state,
        employees: [...state.employees, action.payLoad] }
    }
    
    case 'DELETE_EMPLOYEE': {
      console.log('DeleteEmployee : ', action); 
      // return { employees : }
      return { ...state,
        employees: state.employees.filter(item => item.id != action.payLoad) }
    }
  }
  return state; 
}

const store = createStore(reducer); 

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store = {store}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </Provider>
    );
  }
}
