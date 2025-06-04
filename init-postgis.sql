-- Script de inicialización para habilitar PostGIS en la base de datos
-- Este script se ejecuta automáticamente cuando se inicializa el contenedor

-- Conectar a la base de datos BoleteriaDB
\c BoleteriaDB;

-- Crear la extensión PostGIS
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;
CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;
CREATE EXTENSION IF NOT EXISTS postgis_tiger_geocoder;

-- Verificar que PostGIS se instaló correctamente
SELECT PostGIS_version();
