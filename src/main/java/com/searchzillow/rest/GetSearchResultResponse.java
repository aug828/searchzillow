package com.searchzillow.rest;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.searchzillow.model.generated.SimpleProperty;

public class GetSearchResultResponse extends GenericResponse {
   @JsonInclude(JsonInclude.Include.NON_EMPTY)
   SimpleProperty result;

   public SimpleProperty getResult() {
      return result;
   }

   public void setResult(SimpleProperty result) {
      this.result = result;
   }
}
