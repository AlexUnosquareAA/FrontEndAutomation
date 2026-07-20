import { defineParameterType } from '@cucumber/cucumber';
import { Contants } from '@utils/Constants';

defineParameterType({
  name: 'constant',
  // Expresión regular que captura texto entre comillas o palabras que inicien con Contants
  regexp: /"([^"\\]*)"|Contants\.[A-Z0-9_]+/,
  transformer: function (value: string) {
    // Si el valor viene como Contants.NOMBRE_VARIABLE, lo extraemos y buscamos
    if (value.startsWith('Contants.')) {
      const key = value.split('.')[1] as keyof typeof Contants;
      if (Contants[key] !== undefined) {
        return Contants[key];
      }
      throw new Error(`La constante ${value} no existe en tu archivo Constants.ts`);
    }
    // Si viene entre comillas normales (ej: "Sauce Labs Backpack"), quita las comillas y úsalo literal
    return value.replace(/^"|"$/g, '');
  }
});