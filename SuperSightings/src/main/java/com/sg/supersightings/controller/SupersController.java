/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.supersightings.controller;


import com.sg.supersightings.Dao.SupersDaoDB;
import com.sg.supersightings.entity.Supers;
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
public class SupersController {
    
    @Autowired
    SupersDaoDB superDao;
    
    @PostMapping("/super")
    public Supers addSuper(@RequestBody Supers aSuper) {
        return superDao.addSuper(aSuper);
    }
    
    @GetMapping("/supers")
    public List<Supers> getAllSupers() {
        return superDao.getAllSupers();
    }
    
    @GetMapping("/super/{super_id}")
    public Supers getSuperById(@PathVariable("super_id") int superId) {
        return superDao.getSuperById(superId);
    }
    
    @PutMapping("/super/{super_id}")
    public Supers updateSuper(@RequestBody Supers aSuper) {
        superDao.updateSuper(aSuper);   
        return new Supers();
    }
    
    @DeleteMapping("/super/{super_id}")
    @ResponseStatus(HttpStatus.OK)
    public Supers deleteSuper(@PathVariable("super_id") int superId) {
        superDao.deleteSuperById(superId);
        return new Supers();
    }
}
