package com.searchzillow.rest;

import com.searchzillow.biz.ZillowSearchService;
import com.searchzillow.model.generated.Searchresults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class GetSearchResultsController {
   @Autowired
   private ZillowSearchService searchService;

   /**
    * Search Zillow and return the search result
    */
   @CrossOrigin(origins = "*")
   @RequestMapping(value = "/search", method = RequestMethod.GET, produces = "application/json; charset=UTF-8")
   public ResponseEntity<GenericResponse> search(@RequestParam String address, @RequestParam String citystatezip){
      Optional<Searchresults> searchResultsOptional = searchService.search(address, citystatezip);

      GetSearchResultResponse response = new GetSearchResultResponse();
      if(searchResultsOptional.isPresent()){
         Searchresults searchresults = searchResultsOptional.get();
         switch (searchresults.getMessage().getCode().intValue()){
            case 0: // successful case
               // to make things simple, here we only return the first result.
               response.setResult(searchresults.getResponse().getResults().getResult().get(0));
               return new ResponseEntity<>(response, HttpStatus.OK);
            case 2: // no zws-id or invalid zws-id
               response.setError(searchresults.getMessage().getText());
               return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
            case 500: // address is missing
            case 501: // city/state/zip is missing
               response.setError(searchresults.getMessage().getText());
               return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            case 508: // no address found
               response.setError(searchresults.getMessage().getText());
               return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
         }
      }

      // other internal server error
      GenericResponse errorResponse = GenericResponse.fromError("Something is wrong. Our engineers are working very hard to figure out the reason. Please be patient.");
      return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
   }
}
