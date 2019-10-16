USE SuperDB;

INSERT INTO Supers (super_name, super_description, super_is_hero) VALUES
	('Batman', 'He is a bat. He is a man. He is the Batman', TRUE),
    ('Iron Man', 'Made of iron and man.', TRUE),
    ('Thor', 'Lightning dude with a hammer.', TRUE),
    ('Thanos', 'Likes to snap his fingers', FALSE),
    ('Magneto', 'Likes to manipulate magnetic fields', FALSE);

INSERT INTO Powers (power_name, power_description) VALUES
	('Flight', 'Gives a super the ability to fly.'),
	('Super speed', 'The ability to move super fast.'),
	('X-ray vision', 'Ability to see through objects.'),
	('Superhuman strength', 'Makes you very strong.'),
	('Super resistence', 'Makes you very resistent.'),
    ('Magnetic field manipulation', 'The abilility to manipulate magnetic fields'),
    ('Money', 'Money buys power I hear.'),
    ('Thunder/Lightning', 'Can somehow wield thunder and lightning to their benefit'),
    ('Telekenesis', 'Psychic ability allowing a person to influence a physical system without physiscal interaction'),
    ('Telepathy', 'The ability to communicate through thoughts or ideas by means other than the known senses');

INSERT INTO Super_power (super_id, power_id) VALUES
	(1,7),
    (2,7),
    (2,1),
    (2,4),
    (2,5),
    (3,8),
    (3,5),
    (3,2),
    (4,4),
    (4,5),
    (4,9),
    (4,10),
    (5,6);
    
INSERT INTO Locations (loc_name, loc_description, loc_street, loc_city, loc_state, loc_zip, loc_latitude, loc_longitude) VALUES 
	("The Software Guild", "Where aspiring software developers go to learn.", "200 S 5th St Suite A-10", "Louisville", "KY", "40202", "38.255111", "-85.758835"),
	("Oxmoor Center", "Shopping mall for the Louisville area.", "7900 Shelbyville Road", "Louisville", "KY", "40222", "38.247121", "-85.610350"),
	("Times Square", "One of the most lively places in New York City.", "1528 Broadway", "New York", "NY", "10036", "40.757567", "-73.985208"),
	("Lincoln Memorial", "American national monument built to honor the 16th President of the United States.", "2 Lincoln Memorial Cir NW", "Washington", "DC", "20037", "38.889275", "-77.050117"),
	("Esports Arena", "The world's premier esports venue.", "255 2nd St", "Oakland", "CA", "94607", "37.794075", "-122.272382");
    
INSERT INTO Sightings (super_id, loc_id, sighting_time) VALUES
	(1, 3, "2020-08-11 15:51:32"),
	(2, 4, "2019-09-16 08:41:43"),
	(1, 1, "2020-03-08 08:58:22"),
	(5, 2, "2019-02-22 17:00:48"),
	(5, 4, "2020-05-24 04:10:21"),
	(4, 2, "2019-07-19 20:34:13"),
	(4, 4, "2020-07-22 15:49:35"),
    (4, 4, "2020-06-11 13:22:08"),
    (3, 5, "2018-11-16 17:01:21"),
    (3, 1, "2020-07-24 04:08:40"),
    (2, 5, "2020-03-04 09:11:18"),
    (5, 1, "2020-09-22 15:49:35");
    
INSERT INTO Organizations (org_name, org_description, org_hotline) VALUES 
	("The Avengers", "A team of superheroes assembled by Nick Fury", "(291) 553-0508"),
	("The Bad Guys", "Do you think you're bad enough to be a bad guy?", "(555) 555-1234"),
    ("The Good Guys", "Only good guys welcome here.", "(555) 555-0101"),
	("The Batman Club", "The Batman only allows the Batman to enter the Batman club.", "(800) 555-5678");
    
INSERT INTO Super_Organization (super_id, org_id) VALUES
	(1,4),
    (2,1),
    (4,2),
    (5,2),
    (3,1),
    (2,3);

	
    
    