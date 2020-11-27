import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, KeyboardAvoidingView, ScrollView } from 'react-native';
import Card from '../components/Card';
import Color from '../constants/color';
import Input from '../components/input';
import NumberContainer from '../components/NumberContainer';
import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';
const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get("window").width / 4);
    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get("window").width / 4);
        };
        Dimensions.addEventListener("change", updateLayout);
        return () => {
            Dimensions.removeEventListener("change", updateLayout);
        };
    });
    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };
    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };
    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
            'Invalid number!',
            'Number has to be a number between 1 and 99.',
            [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
            );
            return;
        }
            setConfirmed(true);
            setSelectedNumber(chosenNumber);
            setEnteredValue('');
            Keyboard.dismiss();
    };
    let confirmedOutput;
    if (confirmed) {
        confirmedOutput = (
            <Card style={ styles.summaryContainer }>
                <BodyText>You selected</BodyText>
                <NumberContainer>{ selectedNumber }</NumberContainer>
                <MainButton onPress={() => props.onStartGame(selectedNumber)}>Start Game</MainButton>
            </Card>
        );
    } else {
        confirmedOutput = (
            <Card style={styles.inputContainer}>
                <BodyText>Select a Number</BodyText>
                <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus={true}
                keyboardType="number-pad"
                returnKeyType="done"
                maxLength={2}
                placeholder="Enter your number here"
                onChangeText={numberInputHandler}
                onSubmitEditing={confirmInputHandler}
                value={enteredValue}
                />
                <View style={styles.buttonContainer}>
                    <View style={{width: buttonWidth}}>
                        <Button
                        title="Reset"
                        onPress={resetInputHandler}
                        color={Color.accent}
                        />
                    </View>
                    <View style={{width: buttonWidth}}>
                        <Button
                        title="Confirm"
                        onPress={confirmInputHandler}
                        color={Color.primary}
                        />
                    </View>
                </View>
            </Card>
        );
    }
    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss();
                    }}
                >
                    <View style={styles.screen}>
                        <TitleText>Start a New Game!</TitleText>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title_box: {
        fontFamily: 'OpenSans-Regular',
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        marginTop: Dimensions.get("window").height > 600 ? 30 : 10,
        maxWidth: '90%',
        justifyContent: 'space-around',
        paddingHorizontal: 15,
    },
    input: {
        width: 160,
        textAlign: 'center',
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
});
export default StartGameScreen;