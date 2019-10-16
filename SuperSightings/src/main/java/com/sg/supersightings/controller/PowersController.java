/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.supersightings.controller;

import com.sg.supersightings.Dao.PowersDaoDB;
import com.sg.supersightings.entity.Powers;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author riddl
 */
@RestController
@RequestMapping("/")
public class PowersController {
    
    @Autowired
    PowersDaoDB powersDao;
    
    @GetMapping("/powers")
    public List<Powers> getAllPowers() {
        return powersDao.getAllPowers();
    }
    
    @GetMapping("/power/{power_id}")
    public Powers getPowerById(@PathVariable("power_id") int powerId) {
        return powersDao.getPowerById(powerId);
    }
    
    @PutMapping("/power/{power_id}")
    public Powers updatePower(@RequestBody Powers power) {
        powersDao.updatePower(power);   
        return new Powers();
    }
    
    @DeleteMapping("/power/{power_id}")
    @ResponseStatus(HttpStatus.OK)
    public Powers deleteSighting(@PathVariable("power_id") int powerId) {
        powersDao.deletePowerById(powerId);
        return new Powers();
    }
}
