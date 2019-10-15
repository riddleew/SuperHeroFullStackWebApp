/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.supersightings.Dao;

import com.sg.supersightings.entity.Sightings;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
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
    SupersDao supers;
    
    @Autowired
    LocationsDao locations;
    
    @Override
    public Sightings getSightingById(int id) {
        try {
            final String SELECT_SIGHTING_BY_ID = "SELECT * FROM sightings WHERE sighting_id = ?";
            Sightings sighting = jdbc.queryForObject(SELECT_SIGHTING_BY_ID, new SightingMapper(), id);
            
            sighting.setaSuper(supers.getSuperById(sighting.getSuperId()));
            sighting.setLocation(locations.getLocationById(sighting.getLocationId()));
            return sighting;
        } catch(DataAccessException ex) {
            return null;
        }
    }

    @Override
    public List<Sightings> getAllSightings() {
        final String SELECT_ALL_SIGHTINGS = "SELECT * FROM sightings";
        List<Sightings> sightings = jdbc.query(SELECT_ALL_SIGHTINGS, new SightingMapper());
        associateSupersAndLocations(sightings);
        return sightings;
    }
    
    private void associateSupersAndLocations(List<Sightings> sightings) {
        for (Sightings sighting : sightings) {
            sighting.setaSuper(supers.getSuperById(sighting.getSuperId()));
            sighting.setLocation(locations.getLocationById(sighting.getLocationId()));
        }
    }

    @Override
    @Transactional
    public Sightings addSighting(Sightings sighting) {
        final String INSERT_SIGHTING = "INSERT INTO sightings(super_id, loc_id, "
                + "sighting_time) VALUES(?,?,?)";
        jdbc.update(INSERT_SIGHTING,
                sighting.getSuperId(),
                sighting.getLocationId(),
                sighting.getSightingTime());

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
    
    public static final class SightingMapper implements RowMapper<Sightings> {

        @Override
        public Sightings mapRow(ResultSet rs, int index) throws SQLException {
            Sightings sighting = new Sightings();
            sighting.setSightingId(rs.getInt("sighting_id"));
            sighting.setSuperId(rs.getInt("super_id"));
            sighting.setLocationId(rs.getInt("loc_id"));
            
            Timestamp timestamp = rs.getTimestamp("sighting_time");
            System.out.println("yo");
            sighting.setSightingTime(timestamp.toLocalDateTime());

            return sighting;
        }
    }
    
}
