/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.supersightings.controller;


import com.sg.supersightings.Dao.SightingsDaoDB;
import com.sg.supersightings.entity.Locations;
import com.sg.supersightings.entity.Sightings;
import com.sg.supersightings.entity.Supers;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
public class SightingsController {
    
   
    
    @Autowired
    SightingsDaoDB sightingsDao;
    
    @PostMapping("/sighting")
    public Sightings addOrganizations(@RequestBody Sightings sighting) {
        return sightingsDao.addSighting(sighting);
    }
    
    @GetMapping("/sightings")
    public List<Sightings> getAllSightings() {
        return sightingsDao.getAllSightings();
    }
    
    @GetMapping("/recentsightings")
    public List<Sightings> getRecentSightings() {
        return sightingsDao.getRecentSightings();
    }
    
    @GetMapping("/sighting/{sighting_id}")
    public Sightings getSightingById(@PathVariable("sighting_id") int sightingId) {
        return sightingsDao.getSightingById(sightingId);
    }
    
    @PutMapping("/sighting/{sighting_id}")
    public Sightings updateSighting(@RequestBody Sightings sighting) {
        System.out.println("hey");
        System.out.println(sighting.toString());
        sightingsDao.updateSighting(sighting);
        System.out.println("hi");
        return new Sightings();
    }
    
    @GetMapping("/supersbylocation/{loc_id}")
    public List<Supers> getSupersByLocation(@PathVariable("loc_id") int locationId) {
        return sightingsDao.getSupersByLocation(locationId);
    }
    
    @GetMapping("/sightingsbydate/{date}")
    public List<Sightings> getSightingsByDate(@PathVariable("date") String date) {
        return sightingsDao.getSightingByDate(date);
    }
    
    @GetMapping("/locationsbysuper/{super_id}")
    public List<Locations> getLocationsBySuper(@PathVariable("super_id") int superId) {
        return sightingsDao.getLocationsBySuper(superId);
    }
    
    @DeleteMapping("/sighting/{sighting_id}")
    @ResponseStatus(HttpStatus.OK)
    public Sightings deleteSighting(@PathVariable("sighting_id") int sightingId) {
        sightingsDao.deleteSightingById(sightingId);
        return new Sightings();
    }
    
}
