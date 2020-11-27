import React from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView } from 'react-native';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Color from '../constants/color';
import MainButton from '../components/MainButton';
const GameOverScreen = props => {
    return (
        <ScrollView>
            <View style={ styles.screen }>
                <TitleText>The Game is Over!</TitleText>
                <View style={ styles.ImageContainer }>
                    <Image 
                    fadeDuration={1000}
                    source={require('../assets/success.png')} 
                    // source={{uri: 'https://www.blueeyetour.com/assets_user/img/mission.jpg'}} 
                    style={ styles.Image }
                    resizeMode='cover'
                    />
                </View>
                <View style={ styles.resultText } >
                    <BodyText style={ styles.resultText }>
                        Your phone needed <Text style={ styles.highlight }>{ props.roundsNumber }</Text> rounds to guess your number <Text style={ styles.highlight }>{ props.userNumber }</Text>
                    </BodyText>
                </View>
                <MainButton onPress={ props.onRestart }>Start a new game</MainButton>
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    Image: {
        width: '100%',
        height: '100%',
    },
    ImageContainer: {
        width: Dimensions.get("window").width * 0.7,
        height: Dimensions.get("window").width * 0.7,
        borderRadius: Dimensions.get("window").width * 0.7 / 2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get("window").height / 30,
        
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: Dimensions.get("window").height / 40,
    },
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get("window").height < 400 ? 16 : 20,
        marginBottom: 20,
    },
    highlight: {
        color: Color.primary,
        fontFamily: 'OpenSans-Bold',
    },
});
export default GameOverScreen;