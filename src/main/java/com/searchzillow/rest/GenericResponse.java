package com.searchzillow.rest;

import com.fasterxml.jackson.annotation.JsonInclude;

public class GenericResponse {
   @JsonInclude(JsonInclude.Include.NON_EMPTY)
   String error;

   public String getError() {
      return error;
   }

   public void setError(String error) {
      this.error = error;
   }

   public static GenericResponse fromError(String error){
      GenericResponse errorResponse = new GenericResponse();
      errorResponse.setError(error);
      return errorResponse;
   }
}
