/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.supersightings.controller;

import com.sg.supersightings.Dao.LocationsDaoDB;
import com.sg.supersightings.entity.Locations;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author EricR
 */
@RestController
@RequestMapping("/")
public class LocationsController {
    
    @Autowired
    LocationsDaoDB locationsDao;
    
    @GetMapping("/locations")
    public List<Locations> getAllLocations() {
        return locationsDao.getAllLocations();
    }
    
    @GetMapping("/location/{loc_id}")
    public Locations getLocationById(@PathVariable("loc_id") int locationId) {
        return locationsDao.getLocationById(locationId);
    }
}
