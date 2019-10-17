/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.supersightings.controller;

import com.sg.supersightings.Dao.OrganizationsDaoDB;
import com.sg.supersightings.entity.Organizations;
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
public class OrganizationsController {
    
    @Autowired
    OrganizationsDaoDB orgsDao;
    
    @PostMapping("/org")
    public Organizations addOrganizations(@RequestBody Organizations org) {
        return orgsDao.addOrganization(org);
    }
    
    @GetMapping("/orgs")
    public List<Organizations> getAllOrganizations() {
        return orgsDao.getAllOrganizations();
    }
    
    @GetMapping("/org/{org_id}")
    public Organizations getOrganizationsById(@PathVariable("org_id") int orgId) {
        return orgsDao.getOrganizationById(orgId);
    }
    
    @PutMapping("/org/{org_id}")
    public Organizations updateOrganizations(@RequestBody Organizations org) {
        orgsDao.updateOrganization(org);   
        return new Organizations();
    }
    
    @DeleteMapping("/org/{org_id}")
    @ResponseStatus(HttpStatus.OK)
    public Organizations deleteSighting(@PathVariable("org_id") int orgId) {
        orgsDao.deleteOrganizationById(orgId);
        return new Organizations();
    }
}
