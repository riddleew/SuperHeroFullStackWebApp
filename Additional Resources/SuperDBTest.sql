DROP DATABASE IF EXISTS SuperDBTest;
CREATE DATABASE SuperDBTest;
USE SuperDBTest;

CREATE TABLE Supers (
	super_id INT PRIMARY KEY AUTO_INCREMENT,
    super_name VARCHAR(100) NOT NULL,
	super_description VARCHAR(500) NOT NULL,
    super_is_hero BOOLEAN NOT NULL
);
    
CREATE TABLE Powers (
	power_id INT PRIMARY KEY AUTO_INCREMENT,
    power_name VARCHAR(50) NOT NULL,
    power_description VARCHAR(500) NOT NULL
);
    
CREATE TABLE Super_Power (
    super_id INT NOT NULL,
    power_id INT NOT NULL,
    PRIMARY KEY pk_Super_Power (super_id , power_id),
    FOREIGN KEY (super_id)
        REFERENCES Supers (super_id),
    FOREIGN KEY (power_id)
        REFERENCES Powers (power_id)
);    

CREATE TABLE Locations (
	loc_id INT PRIMARY KEY AUTO_INCREMENT,
    loc_name VARCHAR(50) NOT NULL,
    loc_description VARCHAR(500) NOT NULL,
    loc_street VARCHAR(100) NOT NULL,
    loc_city VARCHAR(50) NOT NULL,
    loc_state CHAR(2) NOT NULL,
    loc_zip CHAR(5) NOT NULL,
    loc_latitude VARCHAR(12) NOT NULL,
    loc_longitude VARCHAR(12) NOT NULL
);

CREATE TABLE Sightings (
	sighting_id INT PRIMARY KEY AUTO_INCREMENT,
    super_id INT NOT NULL,
    loc_id INT NOT NULL,
    sighting_time TIMESTAMP,
    FOREIGN KEY (super_id) REFERENCES Supers (super_id),
    FOREIGN KEY (loc_id) REFERENCES Locations (loc_id)
);

CREATE TABLE Organizations (
	org_id INT PRIMARY KEY AUTO_INCREMENT,
    org_name VARCHAR(100) NOT NULL,
    org_description VARCHAR(500) NOT NULL,
    org_hotline CHAR(14) NOT NULL
);

CREATE TABLE Super_Organization (
	super_id INT NOT NULL,
    org_id INT NOT NULL,
    PRIMARY KEY pk_Super_Organization (super_id , org_id),
    FOREIGN KEY (super_id) REFERENCES Supers (super_id),
    FOREIGN KEY (org_id) REFERENCES Organizations (org_id)
);

