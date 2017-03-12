'use strict';

/**
 * Model object
 *
 * @type {Object}
 */
var model = {};

/**
 * Initialize the Model
 *
 * @method init
 */
model.init = function () {
  model.setLocalStorage(jsonData);
};

/**
 * Save the temporary data to the browsers local storage
 *
 * @method setLocalStorage
 * @param  {sting} data JSON string of the data to be stored
 */
model.setLocalStorage = function (data) {
  localStorage.setItem('vanillaPress', data);
};

/**
 * Get content from the browsers local storage
 *
 * @method getLocalStorage
 * @return {object} JavaScript object or array containing the stored site data
 */
model.getLocalStorage = function () {
  return JSON.parse(localStorage.getItem('vanillaPress'));
};

/**
 * Gets data from the browsers local storage, and sets to a variable for use
 *
 * @method getPosts
 * @return {array} An array of post objects
 */
model.getPosts = function () {
  var posts = model.getLocalStorage();

  return posts;
};

// Get a single post based upon the current URL slug
model.getPost = function (slug) {
  var posts = model.getLocalStorage();
  console.log(posts);
  console.log(slug);

  for (var i = 0; i < posts.length; i++) {
    if (slug === posts[i].slug) {
      return posts[i];
    }
  }

  return null;
};

/**
 * Deletes data from the browsers local storage
 *
 * @method deleteLocalStorage
 */
model.deleteLocalStorage = function () {
  localStorage.removeItem('vanillaPress');
};