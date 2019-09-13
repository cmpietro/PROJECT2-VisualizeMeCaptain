-- drop tables

CREATE TABLE FBI_UCR_Data (
    index INT NOT NULL,
    state VARCHAR (2) NOT NULL,
	offense_year VARCHAR (4) NOT NULL,
	offense_type VARCHAR (20) NOT NULL,
	offense_count INT not null
);

CREATE TABLE firearms_mfg (
	year INT not null,
	pistols INT not null,
	revolvers int not null,
	rilfes int not null,
	shotguns int not null,
	misc_firearms1 int not null,
	total_firearms int not null
);

CREATE TABLE gun_ownership_2019 (
	state varchar (14) not null,
	state_abv varchar (9) not null,
	gun_ownership float not null,
	pop float not null
);

create table mortality_data (
	index float not null,
	year float not null,
	month float not null,
	intent varchar (12) not null,
	police float not null,
	sex varchar (1) not null,
	age float,
	race varchar (30) not null,
	hispanic float not null,
	place varchar (23) not null,
	education varchar (12) not null
);

create table mother_jones (
	case varchar(45),
	location varchar (36),
	date varchar (10),
	summary varchar(908),
	fatalities float,
	injured float,
	total_victims float,
	location_desc varchar (10),
	shooter_age float,
	prior_signs_mental_health_issues varchar (8),
	mental_health_details varchar (619),
	weapons_obtained_legally varchar (131),
	where_weapon_obtained varchar (124),
	weapon_type varchar (389),
	weapon_details varchar (328),
	race varchar (15),
	gender varchar(13),
	sources varchar (951),
	mental_health_sources varchar (444),
	sources_additional_age varchar (951),
	latitude varchar (18),
	longitude varchar (19),
	type varchar (5),
	year float,
	city varchar (24),
	state varchar (2)
);

create table reg_weapons_by_state (
	state varchar(20),
	any_other float,
	weapon float,
	destructive_device float,
	machine_gun float,
	silencer float,
	short_barreled_rifle float,
	Short_barreled_shotgun float,
	total float,
	state_abbv varchar (6)
);