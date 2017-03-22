package com.searchzillow.biz;

import com.searchzillow.model.generated.Searchresults;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Unmarshaller;
import java.net.URL;
import java.util.Optional;

@Service
public class ZillowSearchServiceImpl implements ZillowSearchService {
   private static final String API_KEY = "X1-ZWz1dyb53fdhjf_6jziz";
   private static final String STATIC_URL = "http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=" + API_KEY;

   @Override
   @Cacheable("search_results")
   public Optional<Searchresults> search(String address, String citystatezip) {
      // example of address: 2114 Bigelow Ave
      // example of citystatezip: Seattle, WA
      // Todo this part of code can be more efficient
      address = address.replace(" ", "+").replace(",", "%2C");
      citystatezip = citystatezip.replace(" ", "+").replace(",", "%2C");
      String urlStr = STATIC_URL + "&address=" + address + "&citystatezip=" + citystatezip;

      Searchresults searchresults = null;
      try {
         URL url = new URL(urlStr);
         JAXBContext jaxbContext = JAXBContext.newInstance(Searchresults.class);

         Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
         searchresults = (Searchresults) jaxbUnmarshaller.unmarshal(url);
      } catch (Exception e){
         e.printStackTrace();
      }

      return Optional.ofNullable(searchresults);
   }
}
