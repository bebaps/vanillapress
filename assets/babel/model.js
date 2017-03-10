// Set up the Model to work with the data
// -----------------------------------------------------------------------------
/**
* Main Model Object
*/
const model = {};

/**
* Initialize the Model
*/
model.init = () => {
  model.updateLocalStore(jsonData);
  console.log(model.getPosts());
};

/**
* Saves temporary data to local storage
*
* @param data {string} JSON string of data to store
*/
model.updateLocalStore = (data) => {
  localStorage.setItem('vanillaPress', data);
};

/**
* Gets content from local storage
*
* @return store {object} Object or array of objects of site data
*/
model.getLocalStore = () => {
  return JSON.parse(localStorage.getItem('vanillaPress'));
};

/**
* Gets posts from local storage
*
* @return posts {array} An array of post objects
*/
model.getPosts = () => {
  let posts = model.getLocalStore();

  return posts;
};

/**
* Deletes data from local storage
*/
model.removeLocalStorate = () => {
  localStorage.removeItem('vanillaPress');
};
