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
 * @author EricR
 */
@RestController
@RequestMapping("/")
public class LocationsController {
    
    @Autowired
    LocationsDaoDB locationsDao;
    
    @PostMapping("/location")
    public Locations addLocation(@RequestBody Locations location) {
        return locationsDao.addLocation(location);
    }
    
    @GetMapping("/locations")
    public List<Locations> getAllLocations() {
        return locationsDao.getAllLocations();
    }
    
    @GetMapping("/location/{loc_id}")
    public Locations getLocationById(@PathVariable("loc_id") int locationId) {
        return locationsDao.getLocationById(locationId);
    }
    
    @PutMapping("/location/{loc_id}")
    public Locations updateLocation(@RequestBody Locations location) {
        locationsDao.updateLocation(location);   
        return new Locations();
    }
    
    @DeleteMapping("/location/{loc_id}")
    @ResponseStatus(HttpStatus.OK)
    public Locations deleteLocation(@PathVariable("loc_id") int locationId) {
        locationsDao.deleteLocationById(locationId);
        return new Locations();
    }
}
