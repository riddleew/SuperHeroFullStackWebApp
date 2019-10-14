/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.supersightings.entity;

import java.time.LocalDateTime;
import java.util.Objects;

/**
 *
 * @author EricR
 */
public class Sightings {
    
    private int sightingId;
    private Supers aSuper;
    private Locations location;
    private LocalDateTime sightingTime;

    public Sightings() {
    }

    public Sightings(int sightingId, Supers aSuper, Locations location, LocalDateTime sightingTime) {
        this.sightingId = sightingId;
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

    public LocalDateTime getSightingTime() {
        return sightingTime;
    }

    public void setSightingTime(LocalDateTime sightingTime) {
        this.sightingTime = sightingTime;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 17 * hash + this.sightingId;
        hash = 17 * hash + Objects.hashCode(this.aSuper);
        hash = 17 * hash + Objects.hashCode(this.location);
        hash = 17 * hash + Objects.hashCode(this.sightingTime);
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
        return "Sightings{" + "sightingId=" + sightingId + ", aSuper=" + aSuper + ", location=" + location + ", sightingTime=" + sightingTime + '}';
    }
}
