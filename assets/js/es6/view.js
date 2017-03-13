'use strict';

/**
 * View object
 *
 * @type {Object}
 */
var view = {};

/**
 * Initialize the View
 *
 * @method init
 */
view.init = function () {
  view.createMenu();
};

/**
 * Display the menu of pages
 *
 * @method createMenu
 */
view.createMenu = function () {
  var pages = model.getPages(),
      menuMarkup = document.createDocumentFragment(),
      menuEl = helpers.getMenu();

  for (var i = 0; i < pages.length; i++) {
    menuMarkup.appendChild(helpers.createMenuItem(pages[i]));
  }

  menuEl.appendChild(menuMarkup);
};

/**
 * Create the markup for the posts
 *
 * @method createPostMarkup
 * @param  {Object} post Post to create markup for
 * @return {Node} Final post markup
 */
view.createPostMarkup = function (post) {
  var articleEl = document.createElement('article'),
      titleEl = document.createElement('h2'),
      titleAnchor = document.createElement('a'),
      titleContent = document.createTextNode(post.title),
      postContent = document.createElement('div');

  titleAnchor.appendChild(titleContent);
  titleAnchor.href = '#' + post.slug;
  titleEl.appendChild(titleAnchor);

  postContent.appendChild(document.createTextNode(post.content));

  articleEl.appendChild(titleEl);
  articleEl.appendChild(postContent);

  return articleEl;
};

/**
 * Get the post data from local storage, create markup for each one, and append them to the page
 *
 * @method loadBlogPosts
 */
view.loadBlogPosts = function () {
  var posts = model.getPosts(),
      postsMarkup = document.createDocumentFragment(),
      contentContainer = helpers.getContentContainer();

  for (var i = 0; i < posts.length; i++) {
    postsMarkup.appendChild(view.createPostMarkup(posts[i]));
  }

  contentContainer.appendChild(postsMarkup);
};

/**
 * Load a single blog post
 *
 * @method loadSingle
 * @param  {String} slug The current URL slug
 */
view.loadSingle = function (slug) {
  var content = model.getPost(slug),
      titleEl = helpers.getPageTitle(),
      postContent = helpers.getContentContainer();

  if (null === content) {
    content = model.getPage(slug);
  }

  if (null === content) {
    content = {
      title: '404 Error',
      content: 'Content not found'
    };
  }

  titleEl.innerHTML = content.title;
  postContent.innerHTML = content.content;
};

/**
 * Clear the content from the page
 *
 * @method clearContent
 */
view.clearContent = function () {
  var titleEl = helpers.getPageTitle(),
      postContent = helpers.getContentContainer();

  titleEl.innerHTML = '';
  postContent.innerHTML = '';
};