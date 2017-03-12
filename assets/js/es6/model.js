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
  model.setLocalStorage(data);
};

/**
 * Save the temporary data to the browsers local storage
 *
 * @method setLocalStorage
 * @param  {sting} data JSON string of the data to be stored
 */
model.setLocalStorage = function (data) {
  localStorage.setItem('vanillaPress', JSON.stringify(data));
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
 * Get posts data from the browsers local storage, and sets to a variable for use
 *
 * @method getPosts
 * @return {array} An array of post objects
 */
model.getPosts = function () {
  var posts = model.getLocalStorage().posts;

  return posts;
};

/**
 * Get a single post based upon the current URL slug
 *
 * @method getPost
 * @param  {string} slug The current URL slug
 * @return {object}      The post object with a matching slug, or null if there is no match
 */
model.getPost = function (slug) {
  var posts = model.getLocalStorage().posts;

  for (var i = 0; i < posts.length; i++) {
    if (slug === posts[i].slug) {
      return posts[i];
    }
  }

  return null;
};

/**
 * Get pages data from the browsers local storage, and sets to a variable for use
 *
 * @method getPages
 * @return {array} An array of page objects
 */
model.getPages = function () {
  var pages = model.getLocalStorage().pages;

  return pages;
};

/**
 * Get a single page based upon the current URL slug
 *
 * @method getPage
 * @param  {string} slug The current URL slug
 * @return {object}      The page object with a matching slug, or null if there is no match
 */
model.getPage = function (slug) {
  var pages = model.getLocalStorage().pages;

  for (var i = 0; i < pages.length; i++) {
    if (slug === pages[i].slug) {
      return pages[i];
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