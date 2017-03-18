/**
 * Model object
 * @type {Object}
 */
const model = {};

/**
 * Initialize the Model
 * @method init
 */
model.init = () => {
  if (!model.checkLocalStorage()) {
    model.setLocalStorage(data);
  }
  model.getEditorSettings();
};

/**
 * Get the content that is currently on the page or generate 404 text
 * @method getContent
 * @return {Object} Object containing the content for the current page
 */
model.getContent = (slug) => {
  let content = model.getPost(slug);

  if (null === content) {
    content = model.getPage(slug);
  }

  if (null === content) {
    content = {
      title: '404 Error',
      content: 'Content not found'
    }
  }

  return content;
};

/**
 * Determine what post or page is currently being viewed, and get the content for that page
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

/**
 * Get posts data from the browsers local storage, and sets to a variable for use
 * @method getPosts
 * @return {Array} An array of post objects
 */
model.getPosts = () => {
  let posts = model.getLocalStorage().posts;

  return posts;
};

/**
 * Get a single post based upon the current URL slug
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
 * @method getPages
 * @return {Array} An array of page objects
 */
model.getPages = () => {
  let pages = model.getLocalStorage().pages;

  return pages;
};

/**
 * Get a single page based upon the current URL slug
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
 * Update the content in the page with the content from the editor
 * @method updateContent
 * @param  {Object}      content The content from the editor
 */
model.updateContent = (content) => {
  let storage = model.getLocalStorage(),
      date = new Date();

  if ('post' === content.type) {
    storage.posts.forEach(function(post) {
      if (content.id === post.id) {
        post.title = content.title;
        post.content = content.content;
        post.modified = date.toISOString();
      }
    });
  }

  if ('page' === content.type) {
    storage.pages.forEach(function(page) {
      if (content.id === page.id) {
        page.title = content.title;
        page.content = content.content;
        page.modified = date.toISOString();
      }
    });
  }

  model.setLocalStorage(storage);
};

model.getEditorSettings = () => {
  const storage = model.getLocalStorage();

  return storage.settings.openEditor;
};

model.updateEditorSettings = (editorState) => {
  const storage = model.getLocalStorage();

  storage.settings.openEditor = editorState;
  model.setLocalStorage(storage);
};
/**
 * Check if there is data in the browsers local storage
 * @method checkLocalStorage
 * @return {Boolean}        True or false
 */
model.checkLocalStorage = () => {
  let storage = model.getLocalStorage();

  if (null === storage) {
    return false;
  }

  return true;
};

/**
 * Get content from the browsers local storage
 * @method getLocalStorage
 * @return {Object} JavaScript object or array containing the stored site data
 */
model.getLocalStorage = () => {
  return JSON.parse(localStorage.getItem('vanillaPress'));
};

/**
 * Save the temporary data to the browsers local storage
 * @method setLocalStorage
 * @param  {sting} data JSON string of the data to be stored
 */
model.setLocalStorage = (data) => {
  localStorage.setItem('vanillaPress', JSON.stringify(data));
};

/**
 * Deletes data from the browsers local storage
 * @method deleteLocalStorage
 */
model.deleteLocalStorage = () => {
  localStorage.removeItem('vanillaPress');
};
