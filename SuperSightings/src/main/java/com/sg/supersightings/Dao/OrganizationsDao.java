/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.supersightings.Dao;

import com.sg.supersightings.entity.Organizations;
import java.util.List;

/**
 *
 * @author EricR
 */
public interface OrganizationsDao {
    
    Organizations getOrganizationById(int id);
    List<Organizations> getAllOrganizations();
    Organizations addOrganization(Organizations org);
    void updateOrganization(Organizations org);
    void deleteOrganizationById(int id);
    
}
