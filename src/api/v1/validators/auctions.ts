export default {
  POST: {
    newAuction: {
      schema: {
        auction: {
          book: {
            title: ['validString', 'notNull'],
            course: ['validString', 'notNull'],
            author: ['validString', 'notNull'],
            university: ['validString', 'notNull'],
          },
          currentPrice: ['validNumber', 'notNull'],
          expires: ['validNumber', 'notNull'],
          threshold: ['validNumber', 'notNull'],
        }
      }
    },
  }
}