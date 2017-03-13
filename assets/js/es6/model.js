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
 * @return {Object} JavaScript object or array containing the stored site data
 */
model.getLocalStorage = function () {
  return JSON.parse(localStorage.getItem('vanillaPress'));
};

/**
 * Get posts data from the browsers local storage, and sets to a variable for use
 *
 * @method getPosts
 * @return {Array} An array of post objects
 */
model.getPosts = function () {
  var posts = model.getLocalStorage().posts;

  return posts;
};

/**
 * Get a single post based upon the current URL slug
 *
 * @method getPost
 * @param  {String} slug The current URL slug
 * @return {Object}      The post object with a matching slug, or null if there is no match
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
 * @return {Array} An array of page objects
 */
model.getPages = function () {
  var pages = model.getLocalStorage().pages;

  return pages;
};

/**
 * Get a single page based upon the current URL slug
 *
 * @method getPage
 * @param  {String} slug The current URL slug
 * @return {Object}      The page object with a matching slug, or null if there is no match
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

/**
 * Get the content that is currently on the page
 *
 * @method getContent
 * @return {[type]} [description]
 */
model.getContent = function (slug) {
  var content = model.getPost(slug);

  if (null === content) {
    content = model.getPage(slug);
  }

  if (null === content) {
    content = {
      title: '404 Error',
      content: 'Content not found'
    };
  }

  return content;
};

/**
 * Determine what post or page is currently being viewed, and get the content for that page
 *
 * @method getCurrentContent
 * @return {Object} The content of the current post or page
 */
model.getCurrentContent = function () {
  var slug = router.getSlug(),
      content = void 0;

  if (null === slug) {
    slug = 'home';
  }

  content = model.getContent(slug);

  return content;
};