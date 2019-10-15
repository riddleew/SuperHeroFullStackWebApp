/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.supersightings.Dao;

import com.sg.supersightings.entity.Locations;
import com.sg.supersightings.entity.Organizations;
import com.sg.supersightings.entity.Powers;
import com.sg.supersightings.entity.Sightings;
import com.sg.supersightings.entity.Supers;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
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
        jdbc.execute("TRUNCATE TABLE `SuperDBTest`.`powers`;");
        jdbc.execute("TRUNCATE TABLE `SuperDBTest`.`organizations`;");
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
        List<Powers> powers = new ArrayList<>();
        aSuper.setPowers(powers);
        List<Organizations> orgs = new ArrayList<>();
        aSuper.setOrganizations(orgs);
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
        
        LocalDateTime timestamp = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        String text = timestamp.format(formatter);
        LocalDateTime parsedDateTime = LocalDateTime.parse(text, formatter);
        sighting.setSightingTime(parsedDateTime);
        sighting = sightingsDao.addSighting(sighting);
        
        Sightings fromDao = sightingsDao.getSightingById(sighting.getSightingId());
        assertEquals(sighting, fromDao);
    }
    
    @Test
    public void testGetAllSightings() {
        Supers aSuper = new Supers();
        aSuper.setName("Test Super Name");
        aSuper.setDescription("Test Super Description");
        aSuper.setIsHero(true);
        List<Powers> powers = new ArrayList<>();
        aSuper.setPowers(powers);
        List<Organizations> orgs = new ArrayList<>();
        aSuper.setOrganizations(orgs);
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
        
        LocalDateTime timestamp = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        String text = timestamp.format(formatter);
        LocalDateTime parsedDateTime = LocalDateTime.parse(text, formatter);
        sighting.setSightingTime(parsedDateTime);
        sighting = sightingsDao.addSighting(sighting);
        
        Supers aSuper2 = new Supers();
        aSuper2.setName("Test Super Name");
        aSuper2.setDescription("Test Super Description");
        aSuper2.setIsHero(true);
        aSuper2.setPowers(powers);
        aSuper2.setOrganizations(orgs);
        aSuper2 = supersDao.addSuper(aSuper2);
        
        Locations location2 = new Locations();
        location2.setName("Test Locations Name");
        location2.setDescription("Test Location Description");
        location2.setStreet("Test Street");
        location2.setCity("Test City");
        location2.setState("KY");
        location2.setZip("41562");
        location2.setLatitude("81.99999");
        location2.setLongitude("-72.99991");
        location2 = locationsDao.addLocation(location2);
        
        Sightings sighting2 = new Sightings();
        sighting2.setSuperId(2);
        sighting2.setLocationId(2);
        sighting2.setaSuper(aSuper2);
        sighting2.setLocation(location2);
         
        text = timestamp.format(formatter);
        parsedDateTime = LocalDateTime.parse(text, formatter);
        sighting2.setSightingTime(parsedDateTime);
        sighting2 = sightingsDao.addSighting(sighting2);
        
        List<Sightings> sightings = sightingsDao.getAllSightings();
        
        assertEquals(2, sightings.size());
        assertTrue(sightings.contains(sighting));
        assertTrue(sightings.contains(sighting2));
    }
    
    @Test
    public void testUpdateSighting() {
        Supers aSuper = new Supers();
        aSuper.setName("Test Super Name");
        aSuper.setDescription("Test Super Description");
        aSuper.setIsHero(true);
        List<Powers> powers = new ArrayList<>();
        aSuper.setPowers(powers);
        List<Organizations> orgs = new ArrayList<>();
        aSuper.setOrganizations(orgs);
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
        
        LocalDateTime timestamp = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        String text = timestamp.format(formatter);
        LocalDateTime parsedDateTime = LocalDateTime.parse(text, formatter);
        sighting.setSightingTime(parsedDateTime);
        sighting = sightingsDao.addSighting(sighting);
        
        
        Sightings fromDao = sightingsDao.getSightingById(sighting.getSightingId());
        assertEquals(sighting, fromDao);
        
        
        Supers aSuper2 = new Supers();
        aSuper2.setName("Test Super Name");
        aSuper2.setDescription("Test Super Description");
        aSuper2.setIsHero(true);
        aSuper2.setPowers(powers);
        aSuper2.setOrganizations(orgs);
        aSuper2 = supersDao.addSuper(aSuper2);
        
        Locations location2 = new Locations();
        location2.setName("Test Locations Name");
        location2.setDescription("Test Location Description");
        location2.setStreet("Test Street");
        location2.setCity("Test City");
        location2.setState("KY");
        location2.setZip("41562");
        location2.setLatitude("81.99999");
        location2.setLongitude("-72.99991");
        location2 = locationsDao.addLocation(location2);
        
        sighting.setSuperId(2);
        sighting.setLocationId(2);
        sighting.setaSuper(aSuper2);
        sighting.setLocation(location2);
        sightingsDao.updateSighting(sighting);
        
        assertNotEquals(sighting, fromDao);
        
        fromDao = sightingsDao.getSightingById(sighting.getSightingId());
        
        assertEquals(sighting, fromDao);
    }
    
    @Test
    public void testDeleteSightingById() {
        Supers aSuper = new Supers();
        aSuper.setName("Test Super Name");
        aSuper.setDescription("Test Super Description");
        aSuper.setIsHero(true);
        List<Powers> powers = new ArrayList<>();
        aSuper.setPowers(powers);
        List<Organizations> orgs = new ArrayList<>();
        aSuper.setOrganizations(orgs);
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
        
        LocalDateTime timestamp = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        String text = timestamp.format(formatter);
        LocalDateTime parsedDateTime = LocalDateTime.parse(text, formatter);
        sighting.setSightingTime(parsedDateTime);
        sighting = sightingsDao.addSighting(sighting);
        
        Sightings fromDao = sightingsDao.getSightingById(sighting.getSightingId());
        assertEquals(sighting, fromDao);
        
        sightingsDao.deleteSightingById(sighting.getSightingId());
        
        fromDao = sightingsDao.getSightingById(sighting.getSightingId());
        assertNull(fromDao);
    }

}
