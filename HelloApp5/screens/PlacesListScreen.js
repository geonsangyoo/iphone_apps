import React, { useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import CustomHeaderButton from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItem';
import * as placesActions from '../store/places-actions';

const PlacesListScreen = props => {
    const places = useSelector(state => state.places.places);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(placesActions.loadplaces());
    }, [dispatch])
    
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
    
    return (
        <FlatList
            data={places}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <PlaceItem
                    image={itemData.item.imageUri}
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