const express = require("express")

const app = express() // express instance

app.get('/', (request, response) => {
  return response.json({
    "name": "Maurício"
  })
}) // create a new route

app.listen(3333) // listen to port 3333
