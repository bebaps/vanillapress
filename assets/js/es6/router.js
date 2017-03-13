'use strict';

/**
 * Router object
 *
 * @type {Object}
 */
var router = {};

/**
 * Initialize the Router
 *
 * @method init
 * @return {method} The functions to call when the Router loads
 */
router.init = function () {
  router.loadContent();
  router.listenForChanges();
};

/**
 * Get the slug from the URL
 *
 * @method getSlug
 * @return {String} The slug for the current post or page
 */
router.getSlug = function () {
  var slug = window.location.hash;

  if ('' === slug) {
    return null;
  } else {
    return slug.substring(1);
  }
};

/**
 * Listen for changes to the URL hash
 *
 * @method listenForChanges
 */
router.listenForChanges = function () {
  window.addEventListener('hashchange', router.loadContent, false);
};

/**
 * Load content based upon the current slug
 *
 * @method loadContent
 * @return {method} The method to run based upon the URL hash
 */
router.loadContent = function () {
  var slug = router.getSlug();

  view.clearContent();

  if (null === slug) {
    view.loadSingle('home');
  } else if ('blog' === slug) {
    view.loadBlogPosts();
  } else {
    view.loadSingle(slug);
  }
};