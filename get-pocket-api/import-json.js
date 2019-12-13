// returns a promise with an object as argument.
// the object is a javascript version of the pocketdata readed
//
// how to use: this module
//
// const impJSON = require("./import-json.js");
// impJSON.importJSONfile().then(result => {
//   console.log(result);
// });



const GetPocket = require("node-getpocket");

// ./credentials.js looks like this
// module.exports = {
//     consumer_key: 'YOUR CONSUMER KEY',
//     access_token: 'YOUR ACCESS TOKEN'
// };
const config = require("./credentials.json");
// module.exports.importJSONfile = function () {

const params = {
  // get/retrieve/search parameters
  // count: 10,
  detailType: "complete"
};

// exports.myDateTime = function () {
//   return Date();
// };
exports.importJSONfile = function () {
  return new Promise(function(resolve, reject) {
    const pocket = new GetPocket(config);

    pocket.get(params, (err, returnObj) => {
      resolve(returnObj);
    });
  });
}
// importJSONfile().then(result => {
//   console.log(JSON.stringify(result));
// });
// let b = JSON.parse(JSON.stringify(a));

// const x = require('./import-json');
// let y = x.importJSONfile();
//     console.log(y);

// let cleanRoom = () => {
//   return new Promise(function(resolve, reject) {
//     setTimeout(() => {
//        resolve('Cleaned The Room');
//     }, 1000);
//   });
// };

// let removeGarbage = (message) =>  {
//   return new Promise(function(resolve, reject) {
//    setTimeout(() => {
//       resolve(message + ' remove Garbage');
//    }, 500);
//   });
// };

// let winIcecream = (message) => {
//   return new Promise(function(resolve, reject) {
//    setTimeout(() => {
//       resolve( message + ' won Icecream');
//    }, 250);
//   });
// };

// cleanRoom().then(function(result){
// 	return removeGarbage(result);
// }).then(function(result){
// 	return winIcecream(result);
// }).then(function(result){
// 	console.log('finished ' + result);
// })

// 	console.log('this is the end');
// // Promise.all([cleanRoom(),removeGarbage(result),winIcecream(result)]).then((result) => {console.log('finished')})
// // -----------------------------------------------------------------------------------------------

// let promiseToCleanTheRoom = new Promise(function(resolve, reject) {

//   //cleaning the room

//   let isClean = false;

//   if (isClean) {
//     resolve('Clean');
//   } else {
//     reject('not Clean');
//   }

// });

// promiseToCleanTheRoom.then(function(fromResolve) {
//   console.log('the room is' + fromResolve);
// }).catch(function(fromReject){
// 	console.log('the room is' + fromReject);
// })
