const fetch = require('node-fetch')
const searchController = async (domain) => {
 const response = await fetch(`https://urlscan.io/api/v1/search/?q=domain:${domain}`, {
  method: "GET",
  headers: {
   'Content-Type': 'application/json',
   'API-Key': ''
  }
 })
 const jsonResponse = await response.json()
 return jsonResponse
}

module.exports = searchController