import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import SQLite from 'react-native-sqlite-storage';

import NavigationContainerApp from './navigation/PlacesNavigator';
import placesReducer from './store/places-reducer';
import { init } from './helpers/db';

global.db = SQLite.openDatabase(
	{
	  name: 'places.db',
	  location: 'default',
	  createFromLocation: '~SQLite.db',
	},
	() => { console.log("DB is initialized!")},
	error => {
	  console.log("ERROR: " + error);
	}
);

const rootReducer = combineReducers({
	places: placesReducer
});
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

init();

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainerApp />
		</Provider>
	);
}