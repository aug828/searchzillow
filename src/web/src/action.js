import fetch from 'isomorphic-fetch';

export const SEARCH_ZILLOW = 'SEARCH_ZILLOW';
export const HANDLE_USERINPUT = "HANDLE_USERINPUT";

// try to fetch data from url within a certain time; throw error if time out
const timeoutFetch = (url, opts) =>
   new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('TIMEOUT')), 60000);
      fetch(encodeURI(url), opts).then(resolve, reject);
   });

const fetchJson = (url, opts) => {
   return timeoutFetch(url, opts).then(response => {
      // clone the response and log
      response.clone().text().then(val => {
         console.log(val);
      });

      // success
      if (response.status >= 200 && response.status < 300) {
         return response.json();
      }

      return response.json().then(error => {
         const e = new Error(error);
         e.status = response.status;
         throw e;
      })
   }).catch(error => {
      const err = error;
      // if timeout happens
      if (err.message === 'TIMEOUT') {
         err.message = 'The request took too long to process.';
      }
      console.error(err);
      throw err;
   });
};

// FSA: Flux Standard Action
const action = (type, payload, meta) => ({type, payload, meta});

const url = (address, citystatezip) => `http://localhost:8081/api/v1/search?address=` + address + "&citystatezip=" + citystatezip;
export const search_zillow = (address, citystatezip) => action(SEARCH_ZILLOW, fetchJson(url(address, citystatezip), {method: 'GET', mode: 'cors'}));

export const handle_userinput = (name, value) => action(HANDLE_USERINPUT, {name, value});