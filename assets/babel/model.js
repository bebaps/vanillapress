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
 * Deletes data from the browsers local storage
 *
 * @method deleteLocalStorage
 */
model.deleteLocalStorage = () => {
  localStorage.removeItem('vanillaPress');
};
