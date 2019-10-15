/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.supersightings.Dao;

import com.sg.supersightings.entity.Sightings;
import java.util.List;

/**
 *
 * @author EricR
 */
public interface SightingsDao {
    Sightings getSightingById(int id);
    List<Sightings> getAllSightings();
    Sightings addSighting(Sightings sighting);
    void updateSighting(Sightings sighting);
    void deleteSightingById(int id);
}
