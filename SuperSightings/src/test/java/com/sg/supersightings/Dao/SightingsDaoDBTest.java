/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.supersightings.Dao;

import com.sg.supersightings.entity.Locations;
import com.sg.supersightings.entity.Sightings;
import com.sg.supersightings.entity.Supers;
import java.time.LocalDateTime;
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
public class SightingsDaoDBTest {
    
    @Autowired
    SupersDaoDB supersDao;
    
    @Autowired
    SightingsDaoDB sightingsDao;
    
    @Autowired
    LocationsDaoDB locationsDao;
   
    @Autowired
    OrganizationsDaoDB orgsDao;
    
    @Autowired
    PowersDaoDB powersDao;
    
    @Autowired
    JdbcTemplate jdbc;
    
    public SightingsDaoDBTest() {
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
        jdbc.execute("TRUNCATE TABLE `SuperDBTest`.`supers`;");
        jdbc.execute("TRUNCATE TABLE `SuperDBTest`.`locations`;");
        jdbc.execute("SET FOREIGN_KEY_CHECKS = 1;");
    }
    
    @After
    public void tearDown() {
    }

    @Test
    public void testAndGetSightings() {
        Supers aSuper = new Supers();
        aSuper.setName("Test Super Name");
        aSuper.setDescription("Test Super Description");
        aSuper.setIsHero(true);
        aSuper = supersDao.addSuper(aSuper);
        
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
        
        Sightings sighting = new Sightings();
        sighting.setSuperId(1);
        sighting.setLocationId(1);
        sighting.setaSuper(aSuper);
        sighting.setLocation(location);
        sighting = sightingsDao.addSighting(sighting);
        
        Sightings fromDao = sightingsDao.getSightingById(sighting.getSightingId());
        assertEquals(sighting, fromDao);
    }
    
}
