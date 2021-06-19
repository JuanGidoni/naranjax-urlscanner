const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
router.get('/:domain', async (req, res) => {
 try {
  const domain = req.params.domain;
  const results = await searchController(domain)
  // After results found create file then upload it to Bucket S3 AWS
  res.status(200).send(results)
 } catch (error) {
  console.error(error)
 }
})

module.exports = router;