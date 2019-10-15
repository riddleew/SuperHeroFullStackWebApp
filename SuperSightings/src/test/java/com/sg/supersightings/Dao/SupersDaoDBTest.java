/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.supersightings.Dao;

import com.sg.supersightings.entity.Organizations;
import com.sg.supersightings.entity.Powers;
import com.sg.supersightings.entity.Supers;
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
 * @author riddl
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class SupersDaoDBTest {
    
    @Autowired
    SupersDaoDB supers;
    @Autowired
    SightingsDaoDB sightings;
    @Autowired
    PowersDaoDB powers;
    @Autowired
    LocationsDaoDB locations;
    @Autowired
    OrganizationsDaoDB orgs;
    @Autowired
    JdbcTemplate jdbc;
    
    public SupersDaoDBTest() {
    }
    
    @BeforeClass
    public static void setUpClass() {
    }
    
    @AfterClass
    public static void tearDownClass() {
    }
    
    @Before
    public void setUp() throws Exception {
        jdbc.execute("SET FOREIGN_KEY_CHECKS = 0;");
        jdbc.execute("TRUNCATE TABLE `SuperDBTest`.`powers`;");
        jdbc.execute("TRUNCATE TABLE `SuperDBTest`.`supers`;");
        jdbc.execute("TRUNCATE TABLE `SuperDBTest`.`super_power`;");
        jdbc.execute("TRUNCATE TABLE `SuperDBTest`.`organizations`;");
        jdbc.execute("TRUNCATE TABLE `SuperDBTest`.`super_organization`;");
        jdbc.execute("SET FOREIGN_KEY_CHECKS = 1;");
    }
    
    @After
    public void tearDown() {
    }

    @Test
    public void testAddAndGetSuper() {
        Powers power = new Powers();
        power.setName("Test Powers Name");
        power.setDescription("Test Powers Description");
        power = powers.addPower(power);
        
        Organizations org = new Organizations();
        org.setName("Test Organization Name");
        org.setDescription("Test Organization Description");
        org.setHotline("(555) 555-5555");
        org = orgs.addOrganization(org);
        
        List<Powers> powersList = new ArrayList<>();
        powersList.add(power);
        
        List<Organizations> orgList = new ArrayList<>();
        orgList.add(org);
        
        Supers aSuper = new Supers();
        aSuper.setName("Test Super Name");
        aSuper.setDescription("Test Super Description");
        aSuper.setIsHero(true);
        aSuper.setPowers(powersList);
        aSuper.setOrganizations(orgList);
        aSuper = supers.addSuper(aSuper);
        
        Supers fromDao = supers.getSuperById(aSuper.getId());
        assertEquals(aSuper, fromDao);
    }
    
    @Test
    public void testGetAllSupers() {
        Powers power = new Powers();
        power.setName("Test Powers Name");
        power.setDescription("Test Powers Description");
        power = powers.addPower(power);
        
        Organizations org = new Organizations();
        org.setName("Test Organization Name");
        org.setDescription("Test Organization Description");
        org.setHotline("(555) 555-5555");
        org = orgs.addOrganization(org);
        
        List<Powers> powersList = new ArrayList<>();
        powersList.add(power);
        
        List<Organizations> orgList = new ArrayList<>();
        orgList.add(org);
        
        Supers aSuper = new Supers();
        aSuper.setName("Test Super Name");
        aSuper.setDescription("Test Super Description");
        aSuper.setIsHero(true);
        aSuper.setPowers(powersList);
        aSuper.setOrganizations(orgList);
        aSuper = supers.addSuper(aSuper);
        
        Supers aSuper2 = new Supers();
        aSuper2.setName("Test Super Name 2");
        aSuper2.setDescription("Test Super Description 2");
        aSuper2.setIsHero(false);
        aSuper2.setPowers(powersList);
        aSuper2.setOrganizations(orgList);
        aSuper2 = supers.addSuper(aSuper2);
        
        List<Supers> superList = supers.getAllSupers();
        assertEquals(2, superList.size());
        assertTrue(superList.contains(aSuper));
        assertTrue(superList.contains(aSuper2));
    }
    
    @Test
    public void testUpdateSuper() {
        Powers power = new Powers();
        power.setName("Test Powers Name");
        power.setDescription("Test Powers Description");
        power = powers.addPower(power);
        
        Organizations org = new Organizations();
        org.setName("Test Organization Name");
        org.setDescription("Test Organization Description");
        org.setHotline("(555) 555-5555");
        org = orgs.addOrganization(org);
        
        List<Powers> powersList = new ArrayList<>();
        powersList.add(power);
        
        List<Organizations> orgList = new ArrayList<>();
        orgList.add(org);
        
        Supers aSuper = new Supers();
        aSuper.setName("Test Super Name");
        aSuper.setDescription("Test Super Description");
        aSuper.setIsHero(true);
        aSuper.setPowers(powersList);
        aSuper.setOrganizations(orgList);
        aSuper = supers.addSuper(aSuper);
        
        Supers fromDao = supers.getSuperById(aSuper.getId());
        assertEquals(aSuper, fromDao);
        
        aSuper.setName("New Test Super Name");
        aSuper.setDescription("New Test Super Description");
        aSuper.setIsHero(false);
        Powers power2 = new Powers();
        power2.setName("New Power Name");
        power2.setDescription("New Description Power");
        power2 = powers.addPower(power2);
        
        Organizations org2 = new Organizations();
        org2.setName("New Test Organization Name");
        org2.setDescription("New Test Organization Description");
        org2.setHotline("(551) 555-5555");
        org2 = orgs.addOrganization(org2);
        powersList.add(power2);
        orgList.add(org2);
        aSuper.setPowers(powersList);
        aSuper.setOrganizations(orgList);
        
        supers.updateSuper(aSuper);
        
        assertNotEquals(aSuper, fromDao);
        
        fromDao = supers.getSuperById(aSuper.getId());
        assertEquals(aSuper, fromDao);
    }
    
    @Test
    public void testDeleteCourseById() {
        Powers power = new Powers();
        power.setName("Test Powers Name");
        power.setDescription("Test Powers Description");
        power = powers.addPower(power);
        
        Organizations org = new Organizations();
        org.setName("Test Organization Name");
        org.setDescription("Test Organization Description");
        org.setHotline("(555) 555-5555");
        org = orgs.addOrganization(org);
        
        List<Powers> powersList = new ArrayList<>();
        powersList.add(power);
        
        List<Organizations> orgList = new ArrayList<>();
        orgList.add(org);
        
        Supers aSuper = new Supers();
        aSuper.setName("Test Super Name");
        aSuper.setDescription("Test Super Description");
        aSuper.setIsHero(true);
        aSuper.setPowers(powersList);
        aSuper.setOrganizations(orgList);
        aSuper = supers.addSuper(aSuper);
        
        Supers fromDao = supers.getSuperById(aSuper.getId());
        assertEquals(aSuper, fromDao);
        
        supers.deleteSuperById(aSuper.getId());
        
        fromDao = supers.getSuperById(aSuper.getId());
        assertNull(fromDao);
    }
    
}
