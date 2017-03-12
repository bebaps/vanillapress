'use strict';

/**
 * Router obeject
 */
var router = {};

/**
 * Initialize the Router
 *
 * @method init
 * @return {[type]} [description]
 */
router.init = function () {
  router.loadContent();
  router.listenForChanges();
};

/**
 * Get the slug from the URL
 *
 * @method getSlug
 * @return {string} The slug for the current post or page
 */
router.getSlug = function () {
  var slug = window.location.hash;

  if ('' === slug) {
    return null;
  } else {
    return slug.substring(1);
  }
};

// Listen for URL changes
router.listenForChanges = function () {
  window.addEventListener('hashchange', router.loadContent, false);
};

// Load content
router.loadContent = function () {
  var slug = router.getSlug();

  view.clearContent();

  if (null === slug) {
    view.loadBlogPosts();
  } else {
    console.log('Load the post ' + slug);
  }
};