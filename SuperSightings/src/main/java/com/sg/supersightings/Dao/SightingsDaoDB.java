/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.supersightings.Dao;

import com.sg.supersightings.entity.Locations;
import com.sg.supersightings.entity.Sightings;
import com.sg.supersightings.entity.Supers;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author EricR
 */
@Repository
public class SightingsDaoDB implements SightingsDao {

    @Autowired
    JdbcTemplate jdbc;
    
    @Autowired
    SupersDao supersDao;
    
    @Autowired
    LocationsDao locationsDao;
    
    List<String> supersByLocation = new ArrayList<>();
    
    @Override
    public Sightings getSightingById(int id) {
        try {
            final String SELECT_SIGHTING_BY_ID = "SELECT * FROM sightings WHERE sighting_id = ?";
            Sightings sighting = jdbc.queryForObject(SELECT_SIGHTING_BY_ID, new SightingMapper(), id);
            
            sighting.setaSuper(supersDao.getSuperById(sighting.getSuperId()));
            sighting.setLocation(locationsDao.getLocationById(sighting.getLocationId()));
            return sighting;
        } catch(DataAccessException ex) {
            return null;
        }
    }

    @Override
    public List<Sightings> getAllSightings() {
        final String SELECT_ALL_SIGHTINGS = "SELECT * FROM sightings ORDER BY sighting_time DESC";
        List<Sightings> sightings = jdbc.query(SELECT_ALL_SIGHTINGS, new SightingMapper());
        associateSupersAndLocations(sightings);
        return sightings;
    }
    
    private void associateSupersAndLocations(List<Sightings> sightings) {
        for (Sightings sighting : sightings) {
            sighting.setaSuper(supersDao.getSuperById(sighting.getSuperId()));
            sighting.setLocation(locationsDao.getLocationById(sighting.getLocationId()));
        }
    }

    @Override
    @Transactional
    public Sightings addSighting(Sightings sighting) {
        final String INSERT_SIGHTING = "INSERT INTO sightings(super_id, loc_id) VALUES(?,?)";
        jdbc.update(INSERT_SIGHTING,
                sighting.getSuperId(),
                sighting.getLocationId());

        int newId = jdbc.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);
        sighting.setSightingId(newId);
        
        return sighting;
    }

    @Override
    public void updateSighting(Sightings sighting) {
       final String UPDATE_SIGHTING = "UPDATE sightings SET super_id = ?, loc_id = ?, " +
                "sighting_time = ? WHERE sighting_id = ?";
        jdbc.update(UPDATE_SIGHTING,
                sighting.getSuperId(),
                sighting.getLocationId(),
                sighting.getSightingTime(),
                sighting.getSightingId()); 
    }

    @Override
    public void deleteSightingById(int id) { 
        final String DELETE_SIGHTING = "DELETE FROM sightings WHERE sighting_id = ?";
        jdbc.update(DELETE_SIGHTING, id);
    }
    
 
    public List<Supers> getSupersByLocation(int locationId) {
        final String SELECT_SUPERS_BY_LOCATION = "SELECT * FROM sightings WHERE loc_id = ?";
        List<Sightings> sightings = jdbc.query(SELECT_SUPERS_BY_LOCATION, new SightingMapper(), locationId);
        associateSupersAndLocations(sightings);
        HashSet<Integer> superIds = new HashSet<>();
        for (Sightings sighting : sightings) {
            superIds.add(sighting.getSuperId());
        }
        List<Supers> supers = new ArrayList<>();
        
        for (int supId : superIds) {
            supers.add(supersDao.getSuperById(supId));
        }
        
        return supers;
    }
    
    public List<Locations> getLocationsBySuper(int superId) {
        final String SELECT_LOCATIONS_BY_SUPERS = "SELECT * FROM sightings WHERE super_id = ?";
        List<Sightings> sightings = jdbc.query(SELECT_LOCATIONS_BY_SUPERS, new SightingMapper(), superId);
        associateSupersAndLocations(sightings);
        HashSet<Integer> locationIds = new HashSet<>();
        for (Sightings sighting : sightings) {
            locationIds.add(sighting.getLocationId());
        }
        List<Locations> locations = new ArrayList<>();
        
        for (int locId : locationIds) {
            locations.add(locationsDao.getLocationById(locId));
        }
        
        return locations;
    }
    
    public List<Sightings> getSightingByDate(String date) {
        final String SELECT_SIGHTINGS_BY_DATE = "SELECT * FROM sightings WHERE DATE(sighting_time) = ?";
        List<Sightings> sightings = jdbc.query(SELECT_SIGHTINGS_BY_DATE, new SightingMapper(), date);
        associateSupersAndLocations(sightings);
        return sightings;
    }
    
    public List<Sightings> getRecentSightings() {
        final String SELECT_ALL_SIGHTINGS = "SELECT * FROM sightings ORDER BY sighting_time DESC LIMIT 10";
        List<Sightings> sightings = jdbc.query(SELECT_ALL_SIGHTINGS, new SightingsDaoDB.SightingMapper());
        associateSupersAndLocations(sightings);
        return sightings;
    }
    
    
    
    public static final class SightingMapper implements RowMapper<Sightings> {

        @Override
        public Sightings mapRow(ResultSet rs, int index) throws SQLException {
            Sightings sighting = new Sightings();
            sighting.setSightingId(rs.getInt("sighting_id"));
            sighting.setSuperId(rs.getInt("super_id"));
            sighting.setLocationId(rs.getInt("loc_id"));
            
            Timestamp timestamp = rs.getTimestamp("sighting_time");
            sighting.setSightingTime(timestamp.toLocalDateTime());

            return sighting;
        }
    }
    
}
