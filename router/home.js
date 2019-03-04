const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Wecome To Vidly the movie rental services');
});

module.exports = router;