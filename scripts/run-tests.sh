#!/bin/bash

# Colores para la salida
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Función para mostrar ayuda
show_help() {
  echo -e "${YELLOW}Uso:${NC} ./scripts/run-tests.sh [opciones]"
  echo ""
  echo "Opciones:"
  echo "  -h, --help                 Muestra esta ayuda"
  echo "  -a, --all                  Ejecuta todas las pruebas unitarias"
  echo "  -c, --controllers          Ejecuta las pruebas de los controladores"
  echo "  -s, --services             Ejecuta las pruebas de los servicios"
  echo "  -m, --models               Ejecuta las pruebas de los modelos"
  echo "  -f, --file <archivo>       Ejecuta las pruebas de un archivo específico"
  echo "  -w, --watch                Ejecuta las pruebas en modo watch"
  echo "  --coverage                 Genera un reporte de cobertura"
  echo ""
  echo "Ejemplos:"
  echo "  ./scripts/run-tests.sh -a                  # Ejecuta todas las pruebas"
  echo "  ./scripts/run-tests.sh -c                  # Ejecuta las pruebas de los controladores"
  echo "  ./scripts/run-tests.sh -f test/company/controllers/dbServer.controller.spec.ts  # Ejecuta las pruebas de un archivo específico"
  echo "  ./scripts/run-tests.sh -a --coverage       # Ejecuta todas las pruebas y genera un reporte de cobertura"
}

# Variables por defecto
TEST_TYPE="all"
FILE_PATH=""
WATCH_MODE=false
COVERAGE=false

# Procesar argumentos
while [[ $# -gt 0 ]]; do
  case $1 in
    -h|--help)
      show_help
      exit 0
      ;;
    -a|--all)
      TEST_TYPE="all"
      shift
      ;;
    -c|--controllers)
      TEST_TYPE="controllers"
      shift
      ;;
    -s|--services)
      TEST_TYPE="services"
      shift
      ;;
    -m|--models)
      TEST_TYPE="models"
      shift
      ;;
    -f|--file)
      TEST_TYPE="file"
      FILE_PATH="$2"
      shift 2
      ;;
    -w|--watch)
      WATCH_MODE=true
      shift
      ;;
    --coverage)
      COVERAGE=true
      shift
      ;;
    *)
      echo -e "${RED}Error:${NC} Opción desconocida: $1"
      show_help
      exit 1
      ;;
  esac
done

# Construir el comando
CMD="npm run test:unit"

if [ "$TEST_TYPE" == "controllers" ]; then
  CMD="npm run test:unit:controllers"
elif [ "$TEST_TYPE" == "services" ]; then
  CMD="npm run test:unit:services"
elif [ "$TEST_TYPE" == "models" ]; then
  CMD="npm run test:unit:models"
elif [ "$TEST_TYPE" == "file" ]; then
  if [ -z "$FILE_PATH" ]; then
    echo -e "${RED}Error:${NC} Debes especificar un archivo con la opción -f"
    exit 1
  fi
  CMD="npm test -- $FILE_PATH"
fi

if [ "$WATCH_MODE" = true ]; then
  CMD="npm run test:watch"
fi

if [ "$COVERAGE" = true ]; then
  CMD="npm run test:cov"
fi

# Ejecutar el comando
echo -e "${GREEN}Ejecutando:${NC} $CMD"
eval $CMD 