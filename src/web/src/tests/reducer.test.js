import {Map} from 'immutable';
import {searchZillowReducer} from '../reducer';
import {SEARCH_ZILLOW} from '../action';

it('should change state if receives search result', () => {
   const oldState = Map({
      result: Map({
         "address": Map({
            "street": "2114 Bigelow Ave N",
            "zipcode": "98109",
            "city": "Seattle",
            "state": "WA",
            "latitude": 47.637933,
            "longitude": -122.347938
         })
      })
   });
   const newState = searchZillowReducer(oldState, {type: SEARCH_ZILLOW, payload: {result: null}});

   console.log(newState);
   expect(newState.get('result')).equals(null);
});
