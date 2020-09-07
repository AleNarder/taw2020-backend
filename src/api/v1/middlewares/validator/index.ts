import ErrorHandler from "../../../../helpers/ErrorHandler"

/**
 * Insieme delle regole di validazione
 */
const rules = {

  /**
   * Verifica che l'oggetto non sia nullo
   * @param test - oggetto su cui svolgere il test
   */
  notNull (test: any): boolean {
    return  test !== null && test !== undefined
  },
  
  /**
   * Verifica che l'oggetto sia una stringa valida
   * @param test - oggetto su cui svolgere il test
   */
  validString (test: any): boolean {
    return typeof test === 'string'
  },
  
  /**
   * Verifica che l'oggetto sia un numero valido
   * @param test - oggetto su cui svolgere il test
   */
  validNumber (test: any): boolean {
    return typeof test === 'number'
  },

  /**
   * Verifica che l'oggetto sia un booleano
   * @param test - oggetto su cui svolgere il test
   */
  validBoolean (test: any): boolean {
    return typeof test === 'boolean'
  }

}

/**
 * Helper di validate
 * Ricorsivamente verifica che tutte le proprietà dell'oggetto
 * rispettino lo schema
 * @param schema - schema di validazione
 * @param obj - oggetto da validare
 */
function test (schema, obj): boolean {
  return Object.keys(schema).map((subschema) => {
    if (Array.isArray(schema[subschema])) {
      return schema[subschema]
        .map(prop => rules[prop](obj[subschema]))
        .reduce((a,c) => a && c )
    } else {
      return test(schema[subschema], obj[subschema])
    }
  }).reduce((a,c) => a && c)
}


/**
 * Funzione di validazione
 * Middleware in express
 * Verifica che la richiesta sia valida
 * @param req - richiesta
 * @param res - risposta
 * @param next - callback successiva
 */
function validate (req, res, next) {
  if (test(this.schema, req.body)) {
    next()
  } else {
    next(new ErrorHandler(400, 'Richiesta invalida'))
  }
}

export { validate }