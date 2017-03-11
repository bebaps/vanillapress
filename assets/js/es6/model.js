'use strict';

// Set up the Model to work with the data
// -----------------------------------------------------------------------------
/**
* Model object
*/
var model = {};

/**
* Initialize the Model
*/
model.init = function () {
  model.setLocalStorage(jsonData);
};

/**
* Save the temporary data to the browsers local storage
*
* @param data {string} JSON string of the data to be stored
*/
model.setLocalStorage = function (data) {
  localStorage.setItem('vanillaPress', data);
};

/**
* Get content from the browsers local storage
*
* @return store {object} JavaScript object or array containing the stored site data
*/
model.getLocalStorage = function () {
  return JSON.parse(localStorage.getItem('vanillaPress'));
};

/**
* Gets data from the browsers local storage, and sets to a variable for use
*
* @return posts {array} An array of post objects
*/
model.getPosts = function () {
  var posts = model.getLocalStorage();

  return posts;
};

/**
* Deletes data from the browsers local storage
*/
model.deleteLocalStorage = function () {
  localStorage.removeItem('vanillaPress');
};