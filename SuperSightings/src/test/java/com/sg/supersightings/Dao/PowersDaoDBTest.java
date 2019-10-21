/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.supersightings.Dao;

import com.sg.supersightings.entity.Powers;
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
public class PowersDaoDBTest {
   
    @Autowired
    PowersDaoDB powersDao;
    
    @Autowired
    JdbcTemplate jdbc;
    
    public PowersDaoDBTest() {
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
        jdbc.execute("TRUNCATE TABLE `SuperDBTest`.`super_power`;");
        jdbc.execute("SET FOREIGN_KEY_CHECKS = 1;");
    }
    
    @After
    public void tearDown() {
    }

    @Test
    public void testAddAndGetPower() {
        Powers power = new Powers();
        power.setName("Test Power Name");
        power.setDescription("Test Power Description");
        power = powersDao.addPower(power);
        
        Powers fromDao = powersDao.getPowerById(power.getId());
        assertEquals(power, fromDao);
    }
    
    @Test
    public void testGetAllPowers() {
        Powers power = new Powers();
        power.setName("Test Power Name");
        power.setDescription("Test Power Description");
        power = powersDao.addPower(power);
        
        Powers power2 = new Powers();
        power2.setName("Test Power Name 2");
        power2.setDescription("Test Power Description 2");
        power2 = powersDao.addPower(power2);
        
        List<Powers> powers = powersDao.getAllPowers();
        
        assertEquals(2, powers.size());
        assertTrue(powers.contains(power));
        assertTrue(powers.contains(power2));
    
    }
    
    @Test
    public void testUpdatePower() {
        Powers power = new Powers();
        power.setName("Test Power Name");
        power.setDescription("Test Power Description");
        power = powersDao.addPower(power);
        
        Powers fromDao = powersDao.getPowerById(power.getId());
        assertEquals(power, fromDao);
        
        power.setName("New Test Power Name");
        powersDao.updatePower(power);
        
        assertNotEquals(power, fromDao);
        
        fromDao = powersDao.getPowerById(power.getId());
        
        assertEquals(power, fromDao);
    }
    
    @Test
    public void testDeletePowerById() {
        Powers power = new Powers();
        power.setName("Test Power Name");
        power.setDescription("Test Power Description");
        power = powersDao.addPower(power);
        
        Powers fromDao = powersDao.getPowerById(power.getId());
        assertEquals(power, fromDao);
        
        powersDao.deletePowerById(power.getId());
        
        fromDao = powersDao.getPowerById(power.getId());
        assertNull(fromDao);
    }
    
    
}
