export default {
  POST: {
    login: {
      schema: {
        username: ['notNull', 'validString'],
        password: ['notNull', 'validString']
      },
    },
    moderator: {
      schema: {
        email: ['notNull', 'validString'],
      }
    },
    reset: {
      schema: {
        email: ['notNull', 'validString']
      }
    }
  },
}





