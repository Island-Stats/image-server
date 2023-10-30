const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.disable('x-powered-by')

app.use(express.static('public'))

app.get('/', (req, res) => {
	res.redirect("https://islandstats.xyz/")
})

app.use((req, res, next) => {
	res.status(404).end();
})

app.use((err, req, res, next) => {
	res.sendStatus(500);
})

app.listen(port, () => {
  console.log(`Image Server listening on port ${port}`)
})