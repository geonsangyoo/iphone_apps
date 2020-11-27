import * as FileSystem from 'react-native-fs';
export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addPlace = (title, image) => {
    return async dispatch => {
        const fileName = image.split('/').pop();
        const newPath = FileSystem.DocumentDirectoryPath + fileName;
        try {
            await FileSystem.moveFile(image, newPath);
        } catch (err) {
        }
    };
};