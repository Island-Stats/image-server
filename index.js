const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.disable('x-powered-by')

// Cache images for 1 day
app.use(function (req, res, next) {
	res.set('Cache-Control', 'public, max-age=86400');
	next();
})

// Serve images
app.use(express.static('public'))

// Redirect to main site
app.get('/', (req, res) => {
	res.redirect(301, "https://islandstats.xyz/")
})

// Not found
app.use((req, res, next) => {
	res.status(404).end();
})

// Error
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.sendStatus(500);
})

app.listen(port, () => {
  console.log(`Image Server listening on port ${port}`)
})