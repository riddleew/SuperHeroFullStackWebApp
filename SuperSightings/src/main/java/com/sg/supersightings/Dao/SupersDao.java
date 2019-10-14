/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.supersightings.Dao;

import com.sg.supersightings.entity.Supers;
import java.util.List;

/**
 *
 * @author EricR
 */
public interface SupersDao {
    
    Supers getSuperById(int id);
    List<Supers> getAllSupers();
    Supers addSuper(Supers aSuper);
    void updateSuper(Supers aSuper);
    void deleteSuperById(int id);
    
    //List<Powers> getPowersForSuper(Super super);
    //List<Course> getCoursesForStudent(Student student);
}
