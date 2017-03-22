package com.searchzillow.biz;

import com.searchzillow.model.generated.Searchresults;

import java.util.Optional;

public interface ZillowSearchService {
   Optional<Searchresults> search(String address, String citystatezip);
}
