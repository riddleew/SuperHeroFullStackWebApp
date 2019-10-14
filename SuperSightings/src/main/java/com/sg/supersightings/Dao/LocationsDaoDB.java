/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.supersightings.Dao;

import com.sg.supersightings.entity.Locations;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author riddl
 */
@Repository
public class LocationsDaoDB implements LocationsDao {

    @Autowired
    JdbcTemplate jdbc;
    
    @Override
    public Locations getLocationById(int id) {
        try {
            final String SELECT_LOCATION_BY_ID = "SELECT * FROM locations WHERE super_id = ?";
            Locations location = jdbc.queryForObject(SELECT_LOCATION_BY_ID, new LocationMapper(), id);
            return location;  
        } catch(DataAccessException ex) {
            return null;
        }
    }

    @Override
    public List<Locations> getAllLocations() {
        final String SELECT_ALL_LOCATIONS = "SELECT * FROM locations";
        return jdbc.query(SELECT_ALL_LOCATIONS, new LocationMapper());
    }

    @Override
    @Transactional
    public Locations addLocation(Locations location) {
    final String INSERT_LOCATION = "INSERT INTO locations(loc_name, loc_description, " + 
                "loc_street, loc_city, loc_state, loc_zip, loc_latitude, loc_longitude) " +
                 "VALUES(?,?,?,?,?,?,?,?)";
        jdbc.update(INSERT_LOCATION, 
                location.getName(), 
                location.getDescription(),
                location.getStreet(),
                location.getCity(),
                location.getState(),
                location.getZip(),
                location.getLatitude(),
                location.getLongitude());

        int newId = jdbc.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);
        location.setId(newId);
        return location;    }

    @Override
    public void updateLocation(Locations location) {
        final String UPDATE_LOCATION = "UPDATE locations SET loc_name = ?, "
                + "loc_description = ?, loc_street = ?, loc_city = ?, loc_state = ?, "
                + "loc_zip = ?, loc_latitude = ?, loc_longitude = ? WHERE id = ?";
       
        jdbc.update(UPDATE_LOCATION,
                location.getName(), 
                location.getDescription(),
                location.getStreet(),
                location.getCity(),
                location.getState(),
                location.getZip(),
                location.getLatitude(),
                location.getLongitude(),
                location.getId());
    }

    @Override
    @Transactional
    public void deleteLocationById(int id) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
    public static final class LocationMapper implements RowMapper<Locations> {

        @Override
        public Locations mapRow(ResultSet rs, int index) throws SQLException {
            Locations location = new Locations();
            location.setId(rs.getInt("loc_id"));
            location.setName(rs.getString("loc_name"));
            location.setDescription(rs.getString("loc_description"));
            location.setStreet(rs.getString("loc_street"));
            location.setCity(rs.getString("loc_city"));
            location.setState(rs.getString("loc_state"));
            location.setZip(rs.getString("loc_zip"));
            location.setLatitude(rs.getString("loc_latitude"));
            location.setLongitude(rs.getString("loc_longitude"));
            
            return location;
        }
    }
    
}
