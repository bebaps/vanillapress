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
  model.setLocalStorage(jsonData);
};

/**
 * Save the temporary data to the browsers local storage
 *
 * @method setLocalStorage
 * @param  {sting} data JSON string of the data to be stored
 */
model.setLocalStorage = (data) => {
  localStorage.setItem('vanillaPress', data);
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
 * Gets data from the browsers local storage, and sets to a variable for use
 *
 * @method getPosts
 * @return {array} An array of post objects
 */
model.getPosts = () => {
  let posts = model.getLocalStorage();

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
  let posts = model.getLocalStorage();
  console.log(posts);
  console.log(slug);

  for (let i = 0; i < posts.length; i++) {
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
model.deleteLocalStorage = () => {
  localStorage.removeItem('vanillaPress');
};
