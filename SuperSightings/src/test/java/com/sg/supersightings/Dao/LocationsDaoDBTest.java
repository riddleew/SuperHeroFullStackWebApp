/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.supersightings.Dao;

import com.sg.supersightings.entity.Locations;
import java.util.List;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.junit4.SpringRunner;

/**
 *
 * @author EricR
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class LocationsDaoDBTest {
    
    @Autowired
    LocationsDaoDB locationsDao;
    
    @Autowired
    JdbcTemplate jdbc;
    
    public LocationsDaoDBTest() {
    }
    
    @BeforeClass
    public static void setUpClass() {
    }
    
    @AfterClass
    public static void tearDownClass() {
    }
    
    @Before
    public void setUp() {
        jdbc.execute("SET FOREIGN_KEY_CHECKS = 0;");
        jdbc.execute("TRUNCATE TABLE `SuperDBTest`.`sightings`;");
        jdbc.execute("TRUNCATE TABLE `SuperDBTest`.`locations`;");
        jdbc.execute("SET FOREIGN_KEY_CHECKS = 1;");
    }
    
    @After
    public void tearDown() {
    }

    @Test
    public void testAddAndGetLocation() {
        Locations location = new Locations();
        location.setName("Test Locations Name");
        location.setDescription("Test Location Description");
        location.setStreet("Test Street");
        location.setCity("Test City");
        location.setState("KY");
        location.setZip("41562");
        location.setLatitude("81.99999");
        location.setLongitude("-72.99991");
        location = locationsDao.addLocation(location);
        
        Locations fromDao = locationsDao.getLocationById(location.getId());
        assertEquals(location, fromDao);
    }
   
    
    @Test
    public void testGetAllLocations() {
        Locations location = new Locations();
        location.setName("Test Locations Name");
        location.setDescription("Test Location Description");
        location.setStreet("Test Street");
        location.setCity("Test City");
        location.setState("KY");
        location.setZip("41562");
        location.setLatitude("81.99999");
        location.setLongitude("-72.99991");
        location = locationsDao.addLocation(location);
        
        Locations location2 = new Locations();
        location2.setName("Test Locations Name 2");
        location2.setDescription("Test Location Description 2");
        location2.setStreet("Test Street 2");
        location2.setCity("Test City 2");
        location2.setState("TX");
        location2.setZip("41502");
        location2.setLatitude("81.99998");
        location2.setLongitude("-72.99901");
        location2 = locationsDao.addLocation(location2);
        
        List<Locations> locations = locationsDao.getAllLocations();
        
        assertEquals(2, locations.size());
        assertTrue(locations.contains(location));
        assertTrue(locations.contains(location2));
    }
    
    @Test
    public void testUpdateLocation() {
        Locations location = new Locations();
        location.setName("Test Locations Name");
        location.setDescription("Test Location Description");
        location.setStreet("Test Street");
        location.setCity("Test City");
        location.setState("KY");
        location.setZip("41562");
        location.setLatitude("81.99999");
        location.setLongitude("-72.99991");
        location = locationsDao.addLocation(location);
        
        Locations fromDao = locationsDao.getLocationById(location.getId());
        assertEquals(location, fromDao);
        
        location.setName("New Test Location");
        locationsDao.updateLocation(location);
        
        assertNotEquals(location, fromDao);
        
        fromDao = locationsDao.getLocationById(location.getId());
        
        assertEquals(location, fromDao);
    }
    
    @Test
    public void testDeleteLocationById() {
        Locations location = new Locations();
        location.setName("Test Locations Name");
        location.setDescription("Test Location Description");
        location.setStreet("Test Street");
        location.setCity("Test City");
        location.setState("KY");
        location.setZip("41562");
        location.setLatitude("81.99999");
        location.setLongitude("-72.99991");
        location = locationsDao.addLocation(location);
        
        Locations fromDao = locationsDao.getLocationById(location.getId());
        assertEquals(location, fromDao);
        
        locationsDao.deleteLocationById(location.getId());
        
        fromDao = locationsDao.getLocationById(location.getId());
        assertNull(fromDao);
    }
    
}
