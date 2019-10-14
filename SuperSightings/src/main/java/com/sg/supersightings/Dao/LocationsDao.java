/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.supersightings.Dao;

import com.sg.supersightings.entity.Locations;
import java.util.List;

/**
 *
 * @author EricR
 */
public interface LocationsDao {
   
    Locations getLocationById(int id);
    List<Locations> getAllLocations();
    Locations addLocation(Locations location);
    void updateLocation(Locations location);
    void deleteLocationById(int id);
}
