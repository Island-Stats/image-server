const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.disable("x-powered-by");

// Cache images for 1 day
app.use(function (req, res, next) {
	res.set("Cache-Control", "public, max-age=86400");
	next();
});

// Serve images
app.use(express.static("public"));

// Send docs
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "/index.html"));
});

// Not found
app.use((req, res, next) => {
	res.set("Cache-Control", "public, max-age=0");
	res.status(404).end();
});

// Error
app.use((err, req, res, next) => {
	res.removeHeader("Cache-Control");
	console.error(err.stack);
	res.sendStatus(500);
});

app.listen(port, () => {
	console.log(`Image Server listening on port ${port}`);
});
