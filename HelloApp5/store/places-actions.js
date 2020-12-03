import * as FileSystem from 'react-native-fs';
import { insertPlace, fetchPlaces } from '../helpers/db';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addPlace = (title, image) => {
    return async dispatch => {
        const fileName = image.split('/').pop();
        const newPath = FileSystem.DocumentDirectoryPath + '/' + fileName;
        try {
            console.log('Newpath ' + newPath);
            await FileSystem.moveFile(image, newPath);
            const dbResult = await insertPlace(
                title,
                newPath,
                'Dummy address',
                15.6,
                12.3
            );
            console.log('Result Insert : ' + JSON.stringify(dbResult));
            dispatch({
                type: ADD_PLACE,
                placeData: {
                    id: dbResult.insertId,
                    title: title,
                    image: newPath
                }
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const loadplaces = () => {
    return async dispatch => {
        try {
            console.log("Fetch Start!")
            const dbResult = await fetchPlaces();
            dispatch({
                type: SET_PLACES,
                places: dbResult
            });
        } catch (err) {
            throw err;
        }
    };
};