/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.supersightings.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;

/**
 *
 * @author EricR
 */
public class Sightings {
    
    private int sightingId;
    private int superId;
    private int locationId;
    private Supers aSuper;
    private Locations location;
    private LocalDate sightingTime;

    public Sightings() {
    }
    
    public Sightings(int sightingId, int superId, int locationId) {
        this.sightingId = sightingId;
        this.superId = superId;
        this.locationId = locationId;
    }

    public Sightings(int sightingId, int superId, int locationId, Supers aSuper, Locations location, LocalDate sightingTime) {
        this.sightingId = sightingId;
        this.superId = superId;
        this.locationId = locationId;
        this.aSuper = aSuper;
        this.location = location;
        this.sightingTime = sightingTime;
    }

    public int getSightingId() {
        return sightingId;
    }

    public void setSightingId(int sightingId) {
        this.sightingId = sightingId;
    }

    public int getSuperId() {
        return superId;
    }

    public void setSuperId(int superId) {
        this.superId = superId;
    }

    public int getLocationId() {
        return locationId;
    }

    public void setLocationId(int locationId) {
        this.locationId = locationId;
    }

    public Supers getaSuper() {
        return aSuper;
    }

    public void setaSuper(Supers aSuper) {
        this.aSuper = aSuper;
    }

    public Locations getLocation() {
        return location;
    }

    public void setLocation(Locations location) {
        this.location = location;
    }

    public LocalDate getSightingTime() {
        return sightingTime;
    }

    public void setSightingTime(LocalDate sightingTime) {
        this.sightingTime = sightingTime;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 53 * hash + this.sightingId;
        hash = 53 * hash + this.superId;
        hash = 53 * hash + this.locationId;
        hash = 53 * hash + Objects.hashCode(this.aSuper);
        hash = 53 * hash + Objects.hashCode(this.location);
        hash = 53 * hash + Objects.hashCode(this.sightingTime);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Sightings other = (Sightings) obj;
        if (this.sightingId != other.sightingId) {
            return false;
        }
        if (this.superId != other.superId) {
            return false;
        }
        if (this.locationId != other.locationId) {
            return false;
        }
        if (!Objects.equals(this.aSuper, other.aSuper)) {
            return false;
        }
        if (!Objects.equals(this.location, other.location)) {
            return false;
        }
        if (!Objects.equals(this.sightingTime, other.sightingTime)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Sightings{" + "sightingId=" + sightingId + ", superId=" + superId + ", locationId=" + locationId + ", aSuper=" + aSuper + ", location=" + location + ", sightingTime=" + sightingTime + '}';
    }
    
}
