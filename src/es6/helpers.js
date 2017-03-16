/**
 * Helpers object
 * @type {Object}
 */
const helpers = {};

/**
 * Create a new list item for the main menu
 * @method createMenuItem
 * @param  {Object} data The current post or page of the page
 * @return {Node} A new list item of the main menu
 */
helpers.createMenuItem = (data) => {
  let listItemEl = document.createElement('li');

  listItemEl.appendChild(helpers.createLink(data));

  return listItemEl;
};

/**
 * Create a new anchor
 * @method createLink
 * @param  {Object} data The current post or page of the page
 * @return {Node} The complete anchor for the current post or page
 */
helpers.createLink = (data) => {
  let pageAnchor = document.createElement('a'),
      pageAnchorContent = document.createTextNode(data.title);

  if ('home' === data.slug) {
    pageAnchor.href = '#';
  } else {
    pageAnchor.href = '#' + data.slug;
  }

  pageAnchor.appendChild(pageAnchorContent);

  return pageAnchor;
};

/**
 * Get the main menu element
 * @method getMenu
 * @return {Node} The main menu for the site
 */
helpers.getMenu = () => {
  return document.querySelector('#mainNav ul');
};

/**
 * Get the title of the current page
 * @method getPageTitle
 * @return {Node} The title of the current page
 */
helpers.getPageTitle = () => {
  return document.getElementById('pageTitle');
}

/**
 * Get the content container of the current page
 * @method getContentContainer
 * @return {Node} The content container for the current page
 */
helpers.getContentContainer = () => {
  return document.getElementById('pageContent');
}

/**
 * Gets the Editor element in the DOM
 * @method getEditorEl
 * @return {Object} Main editor DOM object
 */
helpers.getEditorEl = () => {
  return document.getElementById('editor');
};

/**
 * Gets Editor toggle element in the DOM
 * @method getEditorToggle
 * @return {Object} Main toggle element
 */
helpers.getEditorToggle = () => {
 return document.getElementById('editorToggle');
};

/**
 * Gets editor toggle link Element in the DOM
 * @method getEditorToggleLink
 * @return {Object} Main toggle link
 */
helpers.getEditorToggleLink = () => {
  return document.querySelector( '#editorToggle a' );
};

/**
 * Get the title input element from the editor
 * @method getEditorTitleEl
 * @return {Object} Editor title input
 */
helpers.getEditorTitleEl = () => {
  return document.getElementById('editTitle');
};

/**
 * Get the content textarea from the editor
 * @method getEditorContentEl
 * @return {Object} Editor textarea
 */
helpers.getEditorContentEl = () => {
  return document.getElementById('editContent');
};

/**
 * Get the editor button
 * @method getEditorUpdate
 * @return {Object} Editor button
 */
helpers.getEditorUpdate = () => {
  return document.getElementById('editUpdateBtn');
};
