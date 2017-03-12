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
view.init = function () {};

/**
 * Create the markup for the posts
 *
 * @method createPostMarkup
 * @param  {object} post Post to create markup for
 * @return {node} Final post markup
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

// Display the menu of pages
view.createMenu = function () {
  var listItemEl = document.createElement('li'),
      pageAnchor = document.createElement('a'),
      pageAnchorContent = document.createTextNode(pages.title);

  pageAnchor.appendChild(pageAnchorContent);
  pageAnchor.href = '#' + pages.slug;
  listItemEl.appendChild(pageAnchor);

  return listItemEl;
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
 * @method loadPost
 * @param  {string} slug The current URL slug
 */
view.loadPost = function (slug) {
  var post = model.getPost(slug),
      titleEl = helpers.getPageTitle(),
      postContent = helpers.getContentContainer();

  titleEl.innerHTML = post.title;
  postContent.innerHTML = post.content;
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