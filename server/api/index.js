const router = require('express').Router();
const axios = require('axios');
const { API_KEY } = require('../../secrets');
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
