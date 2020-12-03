import { ADD_PLACE, SET_PLACES } from './places-actions';
import Place from '../models/place';

const initialState = {
    places: []
};

export default function placesReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PLACES:
            if (action.places.rows.length > 0) {
                let places = []
                let rows = action.places.rows;
                for (let i = 0; i < rows.length; i++) {
                  let item = rows.item(i);
                  places.push(new Place(item.id.toString(), item.title, item.imageUri))
                }
                return {
                    places: places
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