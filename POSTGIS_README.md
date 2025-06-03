# PostgreSQL con PostGIS - Setup

Este proyecto ahora incluye PostgreSQL con la extensión PostGIS habilitada para manejo de datos geoespaciales.

## Archivos creados

- `Dockerfile.postgres`: Dockerfile personalizado que instala PostgreSQL 15 con PostGIS 3
- `init-postgis.sql`: Script de inicialización que habilita las extensiones PostGIS
- `docker-compose.yml`: Actualizado para usar el Dockerfile personalizado

## Cómo usar

### 1. Construir y ejecutar los contenedores

```bash
docker-compose up --build -d
```

### 2. Verificar que PostGIS está instalado

```bash
# Conectar a la base de datos
docker exec -it postgres_boleteria_postgis psql -U admin -d BoleteriaDB

# Ejecutar en psql:
SELECT PostGIS_version();
```

### 3. Detener los contenedores

```bash
docker-compose down
```

### 4. Limpiar volúmenes (si necesitas empezar desde cero)

```bash
docker-compose down -v
```

## Extensiones PostGIS incluidas

- **postgis**: Funcionalidades principales de PostGIS
- **postgis_topology**: Soporte para topología
- **fuzzystrmatch**: Funciones de coincidencia aproximada de cadenas
- **postgis_tiger_geocoder**: Geocodificador TIGER

## Notas importantes

1. El contenedor ahora se llama `postgres_boleteria_postgis`
2. PostGIS se inicializa automáticamente al crear el contenedor
3. Los datos persisten en el volumen `postgres_data`
4. El script `init-postgis.sql` solo se ejecuta la primera vez que se crea el contenedor
