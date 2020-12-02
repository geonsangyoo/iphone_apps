import { ADD_PLACE, SET_PLACES } from './places-actions';
import Place from '../models/place';

const initialState = {
    places: []
};

export default function placesReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PLACES:
            if (action.places.length > 0) {
                return {
                    places: action.places.map(
                        pl => new Place(pl.id.toString(), pl.title, pl.imageUri)
                    )
                }
            } else {
                return state;
            };
        case ADD_PLACE:
            const newPlace = new Place(
                action.placeData.id.toString(), 
                action.placeData.title,
                action.placeData.image
            );
            return {
                places: state.places.concat(newPlace)
            };
        default:
            return state;
    }
};