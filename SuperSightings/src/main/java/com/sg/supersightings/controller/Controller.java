/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.supersightings.controller;

import com.sg.supersightings.Dao.LocationsDaoDB;
import com.sg.supersightings.Dao.OrganizationsDaoDB;
import com.sg.supersightings.Dao.PowersDaoDB;
import com.sg.supersightings.Dao.SightingsDaoDB;
import com.sg.supersightings.Dao.SupersDaoDB;
import com.sg.supersightings.entity.Locations;
import com.sg.supersightings.entity.Organizations;
import com.sg.supersightings.entity.Powers;
import com.sg.supersightings.entity.Sightings;
import com.sg.supersightings.entity.Supers;
import java.util.HashSet;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author riddl
 */
@RestController
@RequestMapping("/api")
public class Controller {
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
    
//    @GetMapping("/locations")
//    public List<Locations> getAllLocations() {
//        return locations.findAll();
//    }

//    @GetMapping("/orgs")
//    public List<Organizations> getAllOrganizations() {
//        return orgs.findAll();
//    }
    
//    @GetMapping("/sightings")
//    public List<Sightings> getAllSightings() {
//        return sightings.findAll();
//    }
    
//    @GetMapping("/powers")
//    public List<Powers> getAllPowers() {
//        return powers.findAll();
//    }
    
    @GetMapping("/supers")
    public List<Supers> getAllSupers() {
        return supers.getAllSupers();
    }
    
    @GetMapping("/super/{super_id}")
    public Supers getGameById(@PathVariable("super_id") int superId) {
        return supers.getSuperById(superId);
    }
    
    @PostMapping("/super")
    public Supers addSuper(@RequestBody Supers aSuper) {
        return supers.addSuper(aSuper);
    }
    
    @GetMapping("/powers")
    public List<Powers> getAllPowers() {
        return powers.getAllPowers();
    }
    
    @GetMapping("/orgs")
    public List<Organizations> getAllOrgs() {
        return orgs.getAllOrganizations();
    }
    
    @GetMapping("/org/{org_id}")
    public Organizations getOrganizationById(@PathVariable("org_id") int orgId) {
        return orgs.getOrganizationById(orgId);
    }
    
    @GetMapping("/locations")
    public List<Locations> getAllLocations() {
        return locations.getAllLocations();
    }
    
    @GetMapping("/sightings")
    public List<Sightings> getAllSightings() {
        return sightings.getAllSightings();
    }
    
    @GetMapping("/sighting/{sighting_id}")
    public Sightings getSightingById(@PathVariable("sighting_id") int sightingId) {
        return sightings.getSightingById(sightingId);
    }
    
    @GetMapping("/supersbylocation/{loc_id}")
    public List<Supers> getSupersByLocation(@PathVariable("loc_id") int locationId) {
        return sightings.getSupersByLocation(locationId);
    }
    
    @GetMapping("/locationsbysuper/{super_id}")
    public List<Locations> getLocationsBySuper(@PathVariable("super_id") int superId) {
        return sightings.getLocationsBySuper(superId);
    }
    
    @GetMapping("/sightingsbydate/{date}")
    public List<Sightings> getSightingsByDate(@PathVariable("date") String date) {
        return sightings.getSightingByDate(date);
    }
    
    @GetMapping("/location/{loc_id}")
    public Locations getLocationById(@PathVariable("loc_id") int locationId) {
        return locations.getLocationById(locationId);
    }
    
  
}
