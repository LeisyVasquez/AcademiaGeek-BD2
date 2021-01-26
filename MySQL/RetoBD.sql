CREATE DATABASE RetoBD; --Crear BD

USE RetoBD;
DROP TABLE IF EXISTS vehiculos;
DROP TABLE IF EXISTS tipo_linea;
DROP TABLE IF EXISTS tipo_marca;

CREATE TABLE tipo_marca(
    id_marca INT(5) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    desc_marca VARCHAR(100) UNIQUE  COMMENT 'La tabla puede funcionar correctamente sin una descripcion,
    lo que signifca que un campo vacio para la descripción no alteraría la transabilidad de la BD',
    activo ENUM('S','N') NOT NULL
);

CREATE TABLE tipo_linea(
    id_linea INT(5) UNSIGNED AUTO_INCREMENT,
    desc_linea VARCHAR(100) UNIQUE COMMENT 'La tabla puede funcionar correctamente sin una descripcion,
    lo que signifca que un campo vacio para la descripción no alteraría la transabilidad de la BD',
    id_marca INT UNSIGNED NOT NULL,
    activo ENUM('S','N') NOT NULL,
    PRIMARY KEY(id_linea),
    FOREIGN KEY(id_marca) REFERENCES tipo_marca(id_marca)
);

CREATE TABLE vehiculos(
    nro_placa VARCHAR(20),
    id_linea INT(5) UNSIGNED NOT NULL,
    modelo ENUM('2017','2018','2019','2020','2021') NOT NULL,
    fecha_ven_seguro DATE NOT NULL,
    fecha_ven_tecnomecanica DATE NOT NULL,
    fecha_ven_contrato DATE COMMENT 'No es estrictamente necesario porque se necesita cuando el auto se vende y es un bien pasivo', 
    PRIMARY KEY(nro_placa),
    FOREIGN KEY(id_linea) REFERENCES tipo_linea(id_linea)
);


INSERT INTO tipo_marca(desc_marca,activo) VALUES
('Toyota', 'S'),
('Ford', 'S'),
('Nissan', 'S'),
('Honda', 'S'),
('Jeep', 'S');

INSERT INTO tipo_linea(desc_linea, id_marca, activo) VALUES
('LandCruiser', 1, 'S'),
('Hilux', 1, 'S'),
('Prius', 1, 'N'),
('Verso', 1, 'N'),
('Fiesta', 2, 'N'),
('Mondeo', 2, 'N'),
('EcoSport', 2, 'S'),
('Mustang', 2, 'S'),
('Edge', 2, 'S'),
('Galaxy', 2, 'N'),
('Kuga', 2, 'N'),
('NOTE', 3, 'S'),
('Navara', 3, 'N'),
('Micra', 3, 'S'),
('JUKE', 3, 'N'),
('GT-R', 3, 'S'),
('HR-V', 4, 'S'),
('Jazz', 4, 'S'),
('Cherokee', 5, 'S'),
('Wrangler', 5, 'S');

INSERT INTO vehiculos (nro_placa, id_linea, modelo, fecha_ven_seguro, fecha_ven_tecnomecanica, fecha_ven_contrato) VALUES
('RTO456', 1, '2018', '2021-06-12', '2021-06-12', '2022-06-12'),
('FLH456', 3, '2017', '2020-07-01', '2020-07-01', '2021-07-12'),
('OPQ321', 1, '2017', '2017-05-11', '2017-05-11', '2018-05-11'),
('RTP456', 2, '2017', '2030-07-03', '2030-07-03', '2031-07-03'),
('YUT654', 4, '2019', '2015-04-12', '2015-04-12', '2016-04-12'),
('BHR432', 19, '2020', '2014-01-01', '2014-01-01', '2015-01-01'),
('GYU907', 3, '2021','2013-02-02', '2013-02-02', '2014-02-02'),
('OOO666', 5, '2021', '2014-03-14', '2014-03-14', '2015-03-14'),
('FRT567', 15, '2018', '2022-08-12', '2022-08-12', '2023-08-12'),
('YU5670', 20, '2021', '2022-05-31', '2022-05-31', '2023-05-31'),
('SOP432', 3, '2017', '2022-09-22', '2022-09-22', '2023-09-22'),
('RTP679', 12, '2018', '2022-05-30', '2022-05-30', '2023-05-30'),
('ETW321', 13, '2019', '2017-08-12', '2017-08-12', '2018-08-12'),
('RTQ567', 16, '2020', '2015-04-11', '2015-04-11', '2021-06-12'),
('PTW555', 12, '2018', '2014-06-13', '2014-06-13', '2015-06-13'),
('QWE123', 11, '2021', '2015-06-13', '2015-06-13', '2016-06-13'),
('RTY345', 16, '2020', '2021-06-12', '2021-06-12', '2021-06-12'),
('CRT276', 4, '2017','2021-06-12', '2021-06-12', '2021-06-12'),
('QVY432', 2, '2017', '2021-06-12', '2021-06-12', '2021-06-12'),
('UQP906', 5, '2018', '2014-03-14', '2014-03-14', '2015-03-14'),
('BNC231', 12, '2017', '2015-04-11', '2015-04-11', '2021-06-12'),
('CYQ453', 3, '2018', '2021-06-12', '2021-06-12', '2021-06-12'),
('ZYO965', 7, '2019', '2017-08-12', '2017-08-12', '2018-08-12'),
('XCV767', 5, '2021', '2021-06-12', '2021-06-12', '2021-06-12'),
('DFR765', 1, '2020','2014-03-14', '2014-03-14', '2015-03-14'),
('ERW321', 1, '2021', '2021-06-12', '2021-06-12', '2021-06-12'),
('OPV567', 3, '2021', '2014-06-13', '2014-06-13', '2015-06-13'),
('GYT675', 5, '2017', '2021-06-12', '2021-06-12', '2021-06-12'),
('VBT543', 4, '2021',  '2015-04-12', '2015-04-12', '2016-04-12'),
('GHT654', 5, '2017', '2021-06-12', '2021-06-12', '2021-06-12');