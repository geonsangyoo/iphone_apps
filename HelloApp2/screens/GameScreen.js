import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView, FlatList, Dimensions } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';
const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max-min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};
const renderListItem = (listLength, itemData) => (
    <View key={ itemData.item } style={ styles.listItem }>
        <BodyText>#{ listLength-itemData.index }</BodyText>
        <BodyText>{ itemData.item }</BodyText>
    </View>
);
const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get("window").width);
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get("window").height);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    const { userChoice, onGameOver } = props;
    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get("window").width);
            setAvailableDeviceHeight(Dimensions.get("window").height);
        };
        Dimensions.addEventListener("change",updateLayout);
        return () => {
            Dimensions.removeEventListener("change",updateLayout);
        };
    });
    useEffect(() => {
        if (currentGuess === props.userChoice) {
            props.onGameOver(pastGuesses.length);
        }
    },[currentGuess, userChoice, onGameOver]);
    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie!','You already know that this is wrong', [{ text: 'Sorry', style:'cancel' }]);
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess-1;
        } else {
            currentLow.current = currentGuess+1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setPastGuesses(currPastGuesses => [nextNumber.toString(), ...pastGuesses]);
    };
    if (availableDeviceHeight < 500) {
        return (
            <View style={ styles.screen }>
                <BodyText>You selected</BodyText>
                <View style={styles.controls}>
                    <MainButton onPress={ nextGuessHandler.bind(this,'lower') }>Lower</MainButton>
                    <NumberContainer>{ props.userChoice }</NumberContainer>
                    <Text style={ styles.title }>App's Guess</Text>
                    <NumberContainer>{ currentGuess }</NumberContainer>
                    <MainButton onPress={ nextGuessHandler.bind(this,'greater') }>Greater</MainButton>
                </View>
                <View style={ styles.listContainer }>
                    <FlatList
                    keyExtractor={ item => item } 
                    data={ pastGuesses } 
                    renderItem={ renderListItem.bind(null, pastGuesses.length) }
                    contentContainerStyle={ styles.list }
                    />
                </View>
            </View>
        );
    }
    return (
            <View style={ styles.screen }>
                <Card style={styles.summaryContainer}>
                    <BodyText>You selected</BodyText>
                    <NumberContainer>{ props.userChoice }</NumberContainer>
                    <Text style={ styles.title }>App's Guess</Text>
                    <NumberContainer>{ currentGuess }</NumberContainer>
                </Card>
                <Card style={ styles.buttonContainer }>
                    <MainButton onPress={ nextGuessHandler.bind(this,'lower') }>Lower</MainButton>
                    <MainButton onPress={ nextGuessHandler.bind(this,'greater') }>Greater</MainButton>
                </Card>
                <View style={ styles.listContainer }>
                    <FlatList
                    keyExtractor={ item => item } 
                    data={ pastGuesses } 
                    renderItem={ renderListItem.bind(null, pastGuesses.length) }
                    contentContainerStyle={ styles.list }
                    />
                </View>
            </View>
    );
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get("window").height > 600 ? 20 : 5,
        width: 450,
        maxWidth: '90%',
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%',
    },
    title: {
        fontFamily: 'OpenSans-Regular',
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    listContainer: {
        flex: 1,
        width: '60%',
    },
    list: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    },
});
export default GameScreen;