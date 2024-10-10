const express = require("express");
const { generatenew } = require("../controllers/url");
const URL = require("../models/url"); 
const router = express.Router();

// Route for generating a new shortened URL
router.post('/', generatenew);

// Route for redirecting to the original URL
router.get('/:shortId', async (req, res) => {
    const { shortId } = req.params; // Extract the shortId from the request parameters

    try {
        const urlEntry = await URL.findOne({ shortId }); // Find the URL entry in the database
        if (!urlEntry) {
            return res.status(404).send("URL not found"); // Return 404 if not found
        }

        return res.redirect(urlEntry.redirectURL); // Redirect to the original URL
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error"); // Handle server errors
    }
});

module.exports = router;
