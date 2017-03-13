/**
 * Model object
 *
 * @type {Object}
 */
const model = {};

/**
 * Initialize the Model
 *
 * @method init
 */
model.init = () => {
  model.setLocalStorage(data);
};

/**
 * Save the temporary data to the browsers local storage
 *
 * @method setLocalStorage
 * @param  {sting} data JSON string of the data to be stored
 */
model.setLocalStorage = (data) => {
  localStorage.setItem('vanillaPress', JSON.stringify(data));
};

/**
 * Get content from the browsers local storage
 *
 * @method getLocalStorage
 * @return {Object} JavaScript object or array containing the stored site data
 */
model.getLocalStorage = () => {
  return JSON.parse(localStorage.getItem('vanillaPress'));
};

/**
 * Get posts data from the browsers local storage, and sets to a variable for use
 *
 * @method getPosts
 * @return {Array} An array of post objects
 */
model.getPosts = () => {
  let posts = model.getLocalStorage().posts;

  return posts;
};

/**
 * Get a single post based upon the current URL slug
 *
 * @method getPost
 * @param  {String} slug The current URL slug
 * @return {Object}      The post object with a matching slug, or null if there is no match
 */
model.getPost = (slug) => {
  let posts = model.getLocalStorage().posts;

  for (let i = 0; i < posts.length; i++) {
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
model.getPages = () => {
  let pages = model.getLocalStorage().pages;

  return pages;
};

/**
 * Get a single page based upon the current URL slug
 *
 * @method getPage
 * @param  {String} slug The current URL slug
 * @return {Object}      The page object with a matching slug, or null if there is no match
 */
model.getPage = (slug) => {
  let pages = model.getLocalStorage().pages;

  for (let i = 0; i < pages.length; i++) {
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
model.deleteLocalStorage = () => {
  localStorage.removeItem('vanillaPress');
};

/**
 * Get the content that is currently on the page
 *
 * @method getContent
 * @return {[type]} [description]
 */
model.getContent = (slug) => {
  let content = model.getPost(slug);

  if (null === content) {
    content = model.getPage(slug);
  }

  if ( null === content ) {
    content = {
      title: '404 Error',
      content: 'Content not found'
    }
  }

  return content;
};

/**
 * Determine what post or page is currently being viewed, and get the content for that page
 *
 * @method getCurrentContent
 * @return {Object} The content of the current post or page
 */
model.getCurrentContent = () => {
  let slug = router.getSlug(),
      content;

  if (null === slug) {
    slug = 'home';
  }

  content = model.getContent(slug);

  return content;
};
