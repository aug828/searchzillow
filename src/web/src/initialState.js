import {Map} from 'immutable';

export default Map({
   userInput: Map({
      "street": "2114 Bigelow Ave N",
      "zipcode": "98109",
      "city": "Seattle",
      "state": "WA",
   }),
   result: Map({
      "zpid": null,
      "links": Map({}),
      "address": Map({
         "street": "2114 Bigelow Ave N",
         "zipcode": "98109",
         "city": "Seattle",
         "state": "WA",
         "latitude": 47.637933,
         "longitude": -122.347938
      }),
      "useCode": null,
      "taxAssessmentYear": null,
      "taxAssessment": null,
      "yearBuilt": null,
      "lotSizeSqFt": null,
      "finishedSqFt": null,
      "bathrooms": null,
      "bedrooms": null,
      "totalRooms": null,
      "lastSoldDate": null,
      "lastSoldPrice": null,
      "zestimate": Map({}),
      "rentzestimate": null,
      "localRealEstate": Map({}),
      "fipscounty": null
   })
});
