/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.supersightings.Dao;

import com.sg.supersightings.Dao.OrganizationsDaoDB.OrgMapper;
import com.sg.supersightings.Dao.PowersDaoDB.PowerMapper;
import com.sg.supersightings.entity.Organizations;
import com.sg.supersightings.entity.Powers;
import com.sg.supersightings.entity.Supers;
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
 * @author EricR
 */
@Repository
public class SupersDaoDB implements SupersDao {

    @Autowired
    JdbcTemplate jdbc;
    
    @Override
    public Supers getSuperById(int id) {
        try {
            final String SELECT_SUPER_BY_ID = "SELECT * FROM supers WHERE super_id = ?";
            Supers aSuper = jdbc.queryForObject(SELECT_SUPER_BY_ID, new SuperMapper(), id);
            aSuper.setPowers(getPowersForSuper(id));
            aSuper.setOrganizations(getOrganizationsForSuper(id));
            return aSuper;
        } catch(DataAccessException ex) {
            return null;
        }
    }

    @Override
    public List<Supers> getAllSupers() {
        final String SELECT_ALL_SUPERS = "SELECT * FROM supers";
        List<Supers> supers = jdbc.query(SELECT_ALL_SUPERS, new SuperMapper());
        associatePowersAndOrgs(supers);
        return supers;
    }
    
    private List<Powers> getPowersForSuper(int id) {
        final String SELECT_POWERS_FOR_SUPER = "SELECT p.* FROM powers p "
                + "JOIN super_power sp ON sp.power_id = p.power_id WHERE sp.super_id = ?";
        return jdbc.query(SELECT_POWERS_FOR_SUPER, new PowerMapper(), id);
    }
    
    private List<Organizations> getOrganizationsForSuper(int id) {
        final String SELECT_ORGS_FOR_SUPER = "SELECT o.* FROM organizations o "
                + "JOIN super_organization so ON so.org_id = o.org_id WHERE so.super_id = ?";
        return jdbc.query(SELECT_ORGS_FOR_SUPER, new OrgMapper(), id);
    }
    
    private void associatePowersAndOrgs(List<Supers> supers) {
        for (Supers aSuper : supers) {
            aSuper.setPowers(getPowersForSuper(aSuper.getId()));
            aSuper.setOrganizations(getOrganizationsForSuper(aSuper.getId()));
        }
    }
    
    @Override
    @Transactional
    public Supers addSuper(Supers aSuper) {
        final String INSERT_SUPER = "INSERT INTO supers(super_name, super_description, "
                + "super_is_hero) VALUES(?,?,?)";
        jdbc.update(INSERT_SUPER,
                aSuper.getName(),
                aSuper.getDescription(),
                aSuper.isIsHero());

        int newId = jdbc.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);
        aSuper.setId(newId);
        insertSuperPower(aSuper);
        insertSuperOrganization(aSuper);
        return aSuper;
    }
    
    private void insertSuperPower(Supers aSuper) {
        final String INSERT_SUPER_POWER = "INSERT INTO "
                + "super_power(super_id, power_id) VALUES(?,?)";
        for(Powers power : aSuper.getPowers()) {
            jdbc.update(INSERT_SUPER_POWER, 
                    aSuper.getId(),
                    power.getId());
        }
    }
    
    private void insertSuperOrganization(Supers aSuper) {
        final String INSERT_SUPER_ORGANIZATION = "INSERT INTO "
                + "super_organization(super_id, org_id) VALUES(?,?)";
        for(Organizations org : aSuper.getOrganizations()) {
            jdbc.update(INSERT_SUPER_ORGANIZATION, 
                    aSuper.getId(),
                    org.getId());
        }
    }

    @Override
    @Transactional
    public void updateSuper(Supers aSuper) {
        final String UPDATE_SUPER = "UPDATE supers SET super_name = ?, super_description = ?, "
                + "super_is_hero = ? WHERE id = ?";
        jdbc.update(UPDATE_SUPER, 
                aSuper.getName(), 
                aSuper.getDescription(), 
                aSuper.isIsHero(),
                aSuper.getId());
        
        final String DELETE_SUPER_POWER = "DELETE FROM super_power WHERE super_id = ?";
        jdbc.update(DELETE_SUPER_POWER, aSuper.getId());
        insertSuperPower(aSuper);
        final String DELETE_SUPER_ORGANIZATION = "DELETE FROM super_organization WHERE super_id = ?";
        jdbc.update(DELETE_SUPER_ORGANIZATION, aSuper.getId());
        insertSuperOrganization(aSuper);
    }

    @Override
    @Transactional
    public void deleteSuperById(int id) {
        final String DELETE_SUPER_POWER = "DELETE FROM super_power WHERE super_id = ?";
        jdbc.update(DELETE_SUPER_POWER, id);
        
        final String DELETE_SUPER_ORG = "DELETE FROM super_organization WHERE super_id = ?";
        jdbc.update(DELETE_SUPER_ORG, id);
        
        final String DELETE_SIGHTING = "DELETE FROM sightings WHERE super_id = ?";
        jdbc.update(DELETE_SIGHTING, id);
        
        final String DELETE_SUPER = "DELETE FROM supers WHERE id = ?";
        jdbc.update(DELETE_SUPER, id);
    }
    
    public static final class SuperMapper implements RowMapper<Supers> {

        @Override
        public Supers mapRow(ResultSet rs, int index) throws SQLException {
            Supers aSuper = new Supers();
            aSuper.setId(rs.getInt("super_id"));
            aSuper.setName(rs.getString("super_name"));
            aSuper.setDescription(rs.getString("super_description"));
            aSuper.setIsHero(rs.getBoolean("super_is_hero"));
            return aSuper;
        }
    }
    
}
