export default {
  POST: {
    newUser: {
      schema: {
        confirmed: ['notNull', 'validBoolean'],
        email: ['notNull', 'validString'],
        firstname: ['notNull', 'validString'],
        lastname: ['notNull', 'validString'],
        location: {
          CAP: ['notNull', 'validString'],
          Comune: ['notNull', 'validString'],
          Indirizzo: ['notNull', 'validString'],
          Provincia: ['notNull', 'validString'],
          Regione: ['notNull', 'validString'],
        },
        moderator: ['notNull', 'validBoolean' ],
        password: ['notNull', 'validString'],
        username: ['notNull', 'validString'],   
      }
    }
  }
}