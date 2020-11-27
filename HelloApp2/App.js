import React, { useState } from 'react';
import { StyleSheet, View, StatusBar, SafeAreaView } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import Color from './constants/color';
export default function App() {
	const [userNumber, setUserNumber] = useState();
	const [guessRounds, setGuessRounds] = useState(0);
	const configureNewGamehandler = () => {
		setGuessRounds(0);
		setUserNumber(null);
	};
	const startGameHandler = selectedNumber => {
		setUserNumber(selectedNumber);
		setGuessRounds(0);
	};
	const gameOverHandler = numOfRounds => {
		setGuessRounds(numOfRounds);
	};
	let content = <StartGameScreen onStartGame={ startGameHandler } />;
	if (userNumber && guessRounds<=0) {
		content = <GameScreen userChoice={ userNumber } onGameOver={ gameOverHandler } />;
	} else if (guessRounds>0) {
		content = <GameOverScreen roundsNumber={ guessRounds } userNumber={ userNumber } onRestart={ configureNewGamehandler } />;
	}
	return (
		<View style={ styles.screen }>
			<StatusBar barStyle="light-content" />
			<Header title="Guess a number"/>
			{ content }
		</View>
		);
	}
	const styles = StyleSheet.create({
		screen: {
			flex: 1,
		},
	});