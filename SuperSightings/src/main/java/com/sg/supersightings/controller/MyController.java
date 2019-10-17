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
@RequestMapping("/")
public class MyController {
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

}
