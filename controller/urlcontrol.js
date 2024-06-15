const { nanoid } = require('nanoid');

const URL = require('../model/urlmodel');

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "enter the url" });

    const shortURL = nanoid(8);
    await URL.create({
        shortID: shortURL,
        redirectURL: body.url,
        visitHistory: []
    })
    return res.render('home', {id: shortURL})
    // return res.json({ id: shortURL });
}

async function handleGetAnaytics(req, res) {
    const shortID = req.params.shortID;
    const result = await URL.findOne({ shortID });
    if (!result) {
        return res.status(404).json({ message: 'Short URL not found' });
    }
    return res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory })
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnaytics
}