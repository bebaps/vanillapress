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
 * @return {object} JavaScript object or array containing the stored site data
 */
model.getLocalStorage = () => {
  return JSON.parse(localStorage.getItem('vanillaPress'));
};

/**
 * Get posts data from the browsers local storage, and sets to a variable for use
 *
 * @method getPosts
 * @return {array} An array of post objects
 */
model.getPosts = () => {
  let posts = model.getLocalStorage().posts;

  return posts;
};

/**
 * Get a single post based upon the current URL slug
 *
 * @method getPost
 * @param  {string} slug The current URL slug
 * @return {object}      The post object with a matching slug, or null if there is no match
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
 * @return {array} An array of page objects
 */
model.getPages = () => {
  let pages = model.getLocalStorage().pages;

  return pages;
};

/**
 * Get a single page based upon the current URL slug
 *
 * @method getPage
 * @param  {string} slug The current URL slug
 * @return {object}      The page object with a matching slug, or null if there is no match
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
