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
 * @author EricR
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class OrganizationsDaoDBTest {
   
    @Autowired
    OrganizationsDaoDB orgsDao;
    
    @Autowired
    JdbcTemplate jdbc;
    
    public OrganizationsDaoDBTest() {
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
    public void testAddAndGetOrganization() {
           
        Organizations org = new Organizations();
        org.setName("Test Organization Name");
        org.setDescription("Test Organization Description");
        org.setHotline("(555) 555-5555");
        List<Supers> members = new ArrayList();
        org.setMembers(members);
        org = orgsDao.addOrganization(org);

        Organizations fromDao = orgsDao.getOrganizationById(org.getId());
        assertEquals(org, fromDao);
    }
    
    @Test
    public void testGetAllOrganizations() {
        Organizations org = new Organizations();
        org.setName("Test Organization Name");
        org.setDescription("Test Organization Description");
        org.setHotline("(555) 555-5555");
        List<Supers> members = new ArrayList();
        org.setMembers(members);
        org = orgsDao.addOrganization(org);
        
        Organizations org2 = new Organizations();
        org2.setName("Test Organization Name 2");
        org2.setDescription("Test Organization Description 2");
        org2.setHotline("(555) 505-5555");
        List<Supers> members2 = new ArrayList();
        org2.setMembers(members2);
        org2 = orgsDao.addOrganization(org2);
        
        List<Organizations> orgs = orgsDao.getAllOrganizations();
        
        assertEquals(2, orgs.size());
        assertTrue(orgs.contains(org));
        assertTrue(orgs.contains(org2));
    }
    
    @Test
    public void testUpdateOrganization() {
        Organizations org = new Organizations();
        org.setName("Test Organization Name");
        org.setDescription("Test Organization Description");
        org.setHotline("(555) 555-5555");
        List<Supers> members = new ArrayList();
        org.setMembers(members);
        org = orgsDao.addOrganization(org);
        
        Organizations fromDao = orgsDao.getOrganizationById(org.getId());
        assertEquals(org, fromDao);
        
        org.setName("New Test Org Name");
        orgsDao.updateOrganization(org);
        
        assertNotEquals(org, fromDao);
        
        fromDao = orgsDao.getOrganizationById(org.getId());
        
        assertEquals(org, fromDao);
    }
    
    @Test
    public void testDeleteOrganizationById() {
        Organizations org = new Organizations();
        org.setName("Test Organization Name");
        org.setDescription("Test Organization Description");
        org.setHotline("(555) 555-5555");
        List<Supers> members = new ArrayList();
        org.setMembers(members);
        org = orgsDao.addOrganization(org);
        
        Organizations fromDao = orgsDao.getOrganizationById(org.getId());
        assertEquals(org, fromDao);
        
        orgsDao.deleteOrganizationById(org.getId());
        
        fromDao = orgsDao.getOrganizationById(org.getId());
        assertNull(fromDao);
    }
}
