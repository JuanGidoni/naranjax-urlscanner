const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const createController = require('../controllers/createController');

router.get('/:domain', async (req, res) => {
 try {
  const domain = req.params.domain;
  const results = await searchController(domain)
  createController(results, 2000).then(
   r => res.status(200).send(r)
  ).catch(
   err => console.log(err)
  )

 } catch (error) {
  console.error(error)
 }
})

module.exports = router;