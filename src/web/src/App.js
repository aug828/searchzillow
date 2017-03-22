import React, {Component} from 'react';
import {connect} from 'react-redux';
import logo from './style/logo.svg';
import SearchResult from './components/SearchResult';
import './style/App.css';

class App extends Component {
   render() {
      const {userInput, result, dispatch} = this.props;

      return (
         <div className="App">
            <div className="App-header">
               <img src={logo} className="App-logo" alt="logo" />
               <h2>Zillow Search API is FUN!</h2>
            </div>
            <SearchResult {...{userInput, result, dispatch}}/>
         </div>
      );
   }
}

export default connect(state => state.toObject())(App);
