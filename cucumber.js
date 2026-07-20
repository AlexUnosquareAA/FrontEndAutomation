// module.exports = {
//   default: {
//     parallel: 1,
//     format: ['html:cucumber-report.html', 'summary'],
//     paths: ['features/**/*.feature'],
//     requireModule: ['ts-node/register'], // Permite leer TypeScript directamente sin compilar manualmente
//     require: [
//       'features/support/hooks.ts',
//       'features/step-definitions/**/*.ts'
//     ]
//   }
// }

module.exports = {
  default: {
    parallel: 1,
    format: ['html:cucumber-report.html', 'summary'],
    paths: ['features/**/*.feature'], 
    import: [ 
      'features/support/hooks.ts',
      'features/support/parameterTypes.ts',
      'features/step-definitions/**/*.ts'
    ]
  }
}