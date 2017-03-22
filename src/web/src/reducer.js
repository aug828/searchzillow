import {Map} from 'immutable';
import {SEARCH_ZILLOW, HANDLE_USERINPUT} from './action';
import initialState from './initialState';

export const searchZillowReducer = (state = initialState, {type, payload, error}) => {
   if (error) {
      console.log(error);
      return state;
   }

   if (type === SEARCH_ZILLOW) {
      if (payload.result) {
         const {result} = payload;
         return state.merge({result}); // merge the newly received data into state
      }
      return initialState;
   } else if(type === HANDLE_USERINPUT) {
      if (payload) {
         const name = payload.name;

         return state.mergeDeep(Map({
            userInput: Map({
               [name]: payload.value
            })
         }));
      }
      return initialState;
   }

   return state;
};
