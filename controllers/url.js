const shortid = require("shortid");
const URL = require('../models/url');

async function generatenew(req, res) {
    const body = req.body;

    // Check if the URL is provided
    if (!body.url) return res.status(400).json({ error: "URL IS REQUIRED" });

    // Generate a short ID using shortid
    const shortID = shortid.generate();

    // Create the new URL document in the database
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: []
    });

    // Render the 'home' template, passing the short ID
    return res.render("home", { id: shortID });
}

console.log("generatenew:", generatenew); // This should not be undefined

module.exports = { generatenew }; // Ensure you're exporting the function correctly
