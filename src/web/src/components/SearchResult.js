import React, {Component, PropTypes} from 'react';
import {Map} from 'immutable';
import GoogleMap from 'google-map-react';
// import {Column, Table} from 'react-virtualized';
import 'react-virtualized/styles.css';
import {search_zillow, handle_userinput} from '../action';

// check sampleData.json to see the structure

class Address extends Component {
   render() {
      const {address} = this.props;

      return (
         <div className="address">
            <table>
               <tbody>
                  {address.get('street') ? <tr><td className="table-left">Street</td><td>{address.get('street')}</td></tr> : null}
                  {address.get('city') ? <tr><td className="table-left">City</td><td>{address.get('city')}</td></tr> : null}
                  {address.get('state') ? <tr><td className="table-left">State</td><td>{address.get('state')}</td></tr> : null}
                  {address.get('zipcode') ? <tr><td className="table-left">Zipcode</td><td>{address.get('zipcode')}</td></tr> : null}
               </tbody>
            </table>
         </div>
      )
   }
}

class Zestimate extends Component {
   render() {
      const {zestimate} = this.props;

      return (
         <div className="address">
            <table>
               <tbody>
                  {zestimate.get('amount') ? <tr><td className="table-left">Zestimated Value</td><td>{zestimate.get('amount').get('value') + ' ' + zestimate.get('amount').get('currency')}</td></tr> : null}
                  {zestimate.get('lastUpdated') ? <tr><td className="table-left">State</td><td>{zestimate.get('lastUpdated')}</td></tr> : null}
               </tbody>
            </table>
         </div>
      )
   }
}

export default class extends Component {
   static propTypes = {
      results: PropTypes.instanceOf(Map)
   };

   static defaultProps = {
      center: {lat: 59.95, lng: 30.33},
      zoom: 11
   };

   render() {
      const {userInput, result, dispatch} = this.props;
      const address = result.get('address');
      const zestimate = result.get('zestimate');

      return (
         <div className="zillow_search">
            <div className="user_input">
               <form onSubmit={event => {
                  event.preventDefault();
                  dispatch(search_zillow(userInput.get("street"), userInput.get("city") + ", " + userInput.get("state") + " " + userInput.get("zipcode")));
               }}>
                  <label>Street: </label><input type="text" name="street" value={userInput.get('street')} onChange={e => dispatch(handle_userinput(e.target.name, e.target.value))} />
                  <label>City: </label><input type="text" name="city" value={userInput.get('city')} onChange={e => dispatch(handle_userinput(e.target.name, e.target.value))}/>
                  <label>State: </label><input type="text" name="state" value={userInput.get('state')} onChange={e => dispatch(handle_userinput(e.target.name, e.target.value))}/>
                  <label>Zipcode: </label><input type="text" name="zipcode" value={userInput.get('zipcode')} onChange={e => dispatch(handle_userinput(e.target.name, e.target.value))}/>
                  <input type="submit" value="Submit" />
               </form>
            </div>

            <div className="search_result">
               {result ?
                  <div>
                     <Address {...{address}}/>
                     <GoogleMap
                        bootstrapURLKeys={{key: 'AIzaSyD85hdfhYrwh5a6WWR1zH74VazV3mOjJxs', language: 'ru',}}
                        center={[59.95, 30.33]}
                        zoom={11}
                     />
                     <Zestimate {...{zestimate}}/>
                  </div> : <p>Sorry, Zillow search api is in a cranky mood.</p>
               }
            </div>
         </div>
      );
   }
}
