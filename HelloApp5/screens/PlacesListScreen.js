import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import CustomHeaderButton from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItem';

const PlacesListScreen = props => {
    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: 'All Places',
            headerRight: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={ CustomHeaderButton }>
                        <Item 
                            title="Add Places"
                            iconName="add"
                            onPress={() => {
                                props.navigation.navigate("newPlace");
                            }}
                        />
                    </HeaderButtons>
                );
            }
        });
    });
    const places = useSelector(state => state.places.places);
    return (
        <FlatList
            data={places}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <PlaceItem
                    image={null}
                    title={itemData.item.title}
                    address={null}
                    onSelect={() => {
                        props.navigation.navigate("placeDetail", {
                            placeTitle: itemData.item.title,
                            placeId: itemData.item.id
                        });
                    }}
                />
            )}
        />
    );
};
const styles = StyleSheet.create({});
export default PlacesListScreen;