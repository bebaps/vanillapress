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
  if ( !model.checkLocalStorage() ) {
    model.setLocalStorage( data );
  }
};

/**
 * Get the content that is currently on the page or generate 404 text
 * @method getContent
 * @return {Object} Object containing the content for the current page
 */
model.getContent = ( slug ) => {
  let content = model.getPost( slug );

  if ( null === content ) {
    content = model.getPage( slug );
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
 * Determine what post/page is currently being viewed, and get its content
 * @method getCurrentContent
 * @return {Object} The content of the current post/page
 */
model.getCurrentContent = () => {
  const slug = router.getSlug();

  return model.getContent( slug );
};

/**
 * Get the posts data from the browsers local storage, and sets to a variable for use
 * @method getPosts
 * @return {Array} An array of post objects
 */
model.getPosts = () => {
  return model.getLocalStorage().posts;
};

/**
 * Get a single post based upon the current URL slug
 * @method getPost
 * @param  {String} slug The current URL slug
 * @return {Object}      The post object with a matching slug, or null if there is no match
 */
model.getPost = ( slug ) => {
  const posts = model.getLocalStorage().posts;

  for ( let i = 0; i < posts.length; i++ ) {
    if ( slug === posts[ i ].slug ) {
      return posts[ i ];
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
  return model.getLocalStorage().pages;
};

/**
 * Get a single page based upon the current URL slug
 * @method getPage
 * @param  {String} slug The current URL slug
 * @return {Object}      The page object with a matching slug, or null if there is no match
 */
model.getPage = ( slug ) => {
  const pages = model.getLocalStorage().pages;

  if ( null === slug ) slug = 'home';

  for ( let i = 0; i < pages.length; i++ ) {
    if ( slug === pages[ i ].slug ) {
      return pages[ i ];
    }
  }

  return null;
};

/**
 * Update the content in the post/page with the content from the editor
 * @method updateContent
 * @param  {Object}      content The content from the editor
 */
model.updateContent = ( content ) => {
  const storage = model.getLocalStorage(),
        date    = new Date();

  if ( 'post' === content.type ) {
    storage.posts.forEach( ( post ) => {
      if ( content.id === post.id ) {
        post.title = content.title;
        post.content = content.content;
        post.modified = date.toISOString();
      }
    } );
  }

  if ( 'page' === content.type ) {
    storage.pages.forEach( ( page ) => {
      if ( content.id === page.id ) {
        page.title = content.title;
        page.content = content.content;
        page.modified = date.toISOString();
      }
    } );
  }

  model.setLocalStorage( storage );
};

/**
 * Update the editor settings in local storage
 * @method updateEditorSettings
 * @param  {Boolean} editorState
 */
model.updateEditorSettings = ( editorState ) => {
  const storage = model.getLocalStorage();

  storage.settings.openEditor = editorState;
  model.setLocalStorage( storage );
};

/**
 * Get the editor settings from local storage
 * @method getEditorSettings
 * @return {Boolean}
 */
model.getEditorSettings = () => {
  const storage = model.getLocalStorage();

  return storage.settings.openEditor;
};

/**
 * Check if there is data in the browsers local storage
 * @method checkLocalStorage
 * @return {Boolean}        True or false
 */
model.checkLocalStorage = () => {
  const storage = model.getLocalStorage();

  if ( null === storage ) {
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
  return JSON.parse( localStorage.getItem( 'vanillaPress' ) );
};

/**
 * Save the temporary data to the browsers local storage
 * @method setLocalStorage
 * @param  {Object} data JSON string of the data to be stored
 */
model.setLocalStorage = ( data ) => {
  localStorage.setItem( 'vanillaPress', JSON.stringify( data ) );
};

/**
 * Deletes data from the browsers local storage
 * @method deleteLocalStorage
 */
model.deleteLocalStorage = () => {
  localStorage.removeItem( 'vanillaPress' );
};
