'use strict';

// View file for displaying content
// -----------------------------------------------------------------------------
/**
* View object
*/
var view = {};

/**
* Initialize the View
*/
view.init = function () {};

/**
* Create the markup for the posts
*
* @param object {post} Post to create markup for
* @return object {articleEl} Final post markup
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

// Clear the content from the page
view.clearContent = function () {
  var titleEl = helpers.getPageTitle(),
      postContent = helpers.getContentContainer();

  titleEl.innerHTML = '';
  postContent.innerHTML = '';
};