'use strict';

// Set up the Model to work with the data
// -----------------------------------------------------------------------------
/**
* Main Model Object
*/
var model = {};

/**
* Initialize the Model
*/
model.init = function () {
  model.updateLocalStore(jsonData);
  console.log(model.getPosts());
};

/**
* Gets posts from local storage
*
* @return posts {array} An array of post objects
*/
model.getPosts = function () {
  var posts = model.getLocalStore();

  return posts;
};

/**
* Gets content from local storage
*
* @return store {object} Object or array of objects of site data
*/
model.getLocalStore = function () {
  return JSON.parse(localStorage.getItem('vanillaPress'));
};

/**
* Saves temporary data to local storage
*
* @param data {string} JSON string of data to store
*/
model.updateLocalStore = function (data) {
  localStorage.setItem('vanillaPress', data);
};

/**
* Deletes data from local storage
*/
model.removeLocalStorate = function () {
  localStorage.removeItem('vanillaPress');
};