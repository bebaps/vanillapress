/**
 * Helpers object
 *
 * @type {Object}
 */
const helpers = {};

/**
 * Get the title of the current page
 *
 * @method getPageTitle
 * @return {Node} The title of the current page
 */
helpers.getPageTitle = () => {
  return document.getElementById('pageTitle');
}

/**
 * Get the content container of the current page
 *
 * @method getContentContainer
 * @return {Node} The content container for the current page
 */
helpers.getContentContainer = () => {
  return document.getElementById('pageContent');
}

/**
 * Get the main menu element
 *
 * @method getMenu
 * @return {Node} The main menu for the site
 */
helpers.getMenu = () => {
  return document.querySelector('#mainNav ul');
};

/**
 * Create a new list item for the main menu
 *
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
 *
 * @method createLink
 * @param  {Object} data The current post or page of the page
 * @return {Node} The complete anchor for the current post or page
 */
helpers.createLink = (data) => {
  let pageAnchor = document.createElement('a'),
      pageAnchorContent = document.createTextNode(data.title);

  pageAnchor.appendChild(pageAnchorContent);

  if ('home' === data.slug) {
    pageAnchor.href = '#';
  } else {
    pageAnchor.href = '#' + data.slug;
  }

  return pageAnchor;
};
