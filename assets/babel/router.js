/**
 * Router object
 *
 * @type {Object}
 */
const router = {};

/**
 * Initialize the Router
 *
 * @method init
 * @return {method} The functions to call when the Router loads
 */
router.init = () => {
  router.loadContent();
  router.listenForChanges();
}

/**
 * Get the slug from the URL
 *
 * @method getSlug
 * @return {String} The slug for the current post or page
 */
router.getSlug = () => {
  const slug = window.location.hash;

  if ('' === slug) {
    return null;
  } else {
    return slug.substring(1);
  }
}

/**
 * Listen for changes to the URL hash
 *
 * @method listenForChanges
 */
router.listenForChanges = () => {
  window.addEventListener('hashchange', router.loadContent, false);
}

/**
 * Load content based upon the current slug
 *
 * @method loadContent
 * @return {method} The method to run based upon the URL hash
 */
router.loadContent = () => {
  const slug = router.getSlug();

  view.clearContent();

  if (null === slug) {
    view.loadSingle('home');
  } else if ('blog' === slug){
    view.loadBlogPosts();
  } else {
    view.loadSingle(slug);
  }
}
