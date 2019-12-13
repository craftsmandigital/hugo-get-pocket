const GetPocket = require('node-getpocket');

// ./credentials.js looks like this
// module.exports = {
//     consumer_key: 'YOUR CONSUMER KEY',
//     access_token: 'YOUR ACCESS TOKEN'
// };
const config = require('./credentials.js');
    
console.log(config)
const pocket = new GetPocket(config);


const params = {
    // get/retrieve/search parameters
count: 10,
detailType: 'complete'
};
pocket.get(params, function(err, resp) {
    // check err or handle the response
    console.log(resp)
});