import React from 'react';
import { Text, View } from 'react-native';
import MyMealsNavigator from './navigation/MealsNavigator';
import { enableScreens } from 'react-native-screens';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import mealsReducer from './store/reducers/meals';
enableScreens();
const rootReducer = combineReducers({
  meals: mealsReducer
});
const store = createStore(rootReducer);
export default function App() {
  return (
    <Provider store={ store }>
      <MyMealsNavigator />
    </Provider>
  );
};