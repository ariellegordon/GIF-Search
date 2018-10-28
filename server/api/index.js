const router = require('express').Router();
const axios = require('axios');
let API_KEY = '9AJ46K9IWHWo9UeBLVrD6HGV7sXyNxfP';
module.exports = router;

router.get('/:search', async (req, res, next) => {
  try {
    let search = req.params.search;
    let { data } = await axios.get(
      `https://api.giphy.com/v1/gifs/search?q=+${search}&api_key=${API_KEY}`
    );
    res.json(data);
  } catch (e) {
    next(e);
  }
});
