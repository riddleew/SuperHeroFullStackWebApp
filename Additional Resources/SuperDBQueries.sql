USE SuperDB;

SELECT
	sup.super_name,
    s.sighting_time
FROM Supers sup
INNER JOIN Sightings s ON sup.super_id = s.super_id
INNER JOIN locations l ON  s.loc_id = l.loc_id
WHERE l.loc_id = 4;

SELECT
	super_name,
    s.sighting_time
FROM Supers sup
INNER JOIN Sightings s ON sup.super_id = s.super_id
INNER JOIN locations l ON  s.loc_id = l.loc_id
WHERE l.loc_id = 4;

SELECT
	l.loc_name,
    s.sighting_time
FROM Supers sup
INNER JOIN Sightings s ON sup.super_id = s.super_id
INNER JOIN locations l ON  s.loc_id = l.loc_id
WHERE sup.super_id = 4;

SELECT
	sup.super_name,
	l.loc_name,
    s.sighting_time
FROM Supers sup
INNER JOIN Sightings s ON sup.super_id = s.super_id
INNER JOIN locations l ON  s.loc_id = l.loc_id
WHERE DATE(s.sighting_time) = '2019-09-16';

select * from sightings;
select * from powers;