const express = require('express')
const router = express.Router();

const {handleGenerateNewShortURL, handleGetAnaytics} = require('../controller/urlcontrol')

// Route is: /url/analytics/jDNBdLT2
router.get('/analytics/:shortID',handleGetAnaytics)

// Route is: /url/
router.post('/', handleGenerateNewShortURL)

module.exports = router;