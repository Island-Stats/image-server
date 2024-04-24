const express = require("express");
const path = require("path");
const serveIndex = require("serve-index");
const app = express();
const port = process.env.PORT || 3000;

app.disable("x-powered-by");

// Cache control
app.use((req, res, next) => {
	if (!req.url.endsWith(".png")) {
		res.set("Cache-Control", "public, max-age=0");
	} else {
		res.set("Cache-Control", "public, max-age=86400");
	}
	next();
});

// Send docs
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "/index.html"));
});

// Serve images
app.use(
	express.static("public", {
		dotfiles: "deny",
		lastModified: false,
	}),
	serveIndex("public", { icons: true, view: "tiles" })
);

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
