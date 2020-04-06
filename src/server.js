import express from 'express'
import Mongodb from 'mongodb'

const server = express()
const port = process.env.PORT || 5000 
const uri = 'mongodb://heroku_v868mw88:lfi13lqoa66h6bf56das06dthg@ds251799.mlab.com:51799/heroku_v868mw88'

const client = new Mongodb.MongoClient(uri, {
  useNewUrlParser: true
})

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  client.close();
});


server.listen(port, () => {
  console.info(`Server listening on http://localhost:${port}`)
})