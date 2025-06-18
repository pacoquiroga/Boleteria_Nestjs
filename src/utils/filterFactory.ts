import { FindOptionsWhere, Like } from 'typeorm';

export class FilterFactory {
  static createFilter<T>(
    data: Partial<T> | Partial<T>[],
    likeAtributes: string[],
    objectAtributes?: string[][],
  ): FindOptionsWhere<T> {
    const filter: FindOptionsWhere<T> = {};

    // Primero, procesa los objectAtributes si existen
    if (objectAtributes && objectAtributes.length === 3) {
      const [flatKeys, objectKeys, nestedKeys] = objectAtributes;
      for (let i = 0; i < flatKeys.length; i++) {
        const flatKey = flatKeys[i];
        const objectKey = objectKeys[i];
        const nestedKey = nestedKeys[i];
        if (data[flatKey] !== undefined && data[flatKey] !== null) {
          if (!filter[objectKey]) filter[objectKey] = {};
          filter[objectKey][nestedKey] = data[flatKey];
        }
      }
    }

    // Luego, procesa los atributos normales y los LIKE
    for (const key in data) {
      if (data[key] !== undefined && data[key] !== null) {
        // Si ya fue procesado como objectAttribute, lo saltamos
        if (
          objectAtributes &&
          objectAtributes.length === 3 &&
          objectAtributes[0].includes(key)
        ) {
          continue;
        }
        if (likeAtributes.includes(key)) {
          filter[key] = Like(`%${data[key]}%`);
        } else {
          filter[key] = data[key];
        }
      }
    }
    return filter;
  }
}
