package com.searchzillow.biz;

import com.searchzillow.model.generated.Searchresults;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ZillowSearchServiceImplTest {
   @Autowired
   ZillowSearchService searchService;

   @Before
   public void setup(){

   }

   @Test
   public void search() throws Exception {
      Optional<Searchresults> searchresultsOptional = searchService.search("abc", "def");
      assertTrue(searchresultsOptional.isPresent());
      assertNull(searchresultsOptional.get().getResponse());
      assertEquals(searchresultsOptional.get().getMessage().getCode().intValue(), 508);
   }
}