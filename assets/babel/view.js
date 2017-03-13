/**
 * View object
 *
 * @type {Object}
 */
const view = {};

/**
 * Initialize the View
 *
 * @method init
 */
view.init = () => {
  view.createMenu();
};

/**
 * Display the menu of pages
 *
 * @method createMenu
 */
view.createMenu = () => {
  let pages = model.getPages(),
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
view.createPostMarkup = (post) => {
  let articleEl = document.createElement('article'),
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
view.loadBlogPosts = () => {
  let posts = model.getPosts(),
      postsMarkup = document.createDocumentFragment(),
      contentContainer = helpers.getContentContainer();

  for (let i = 0; i < posts.length; i++) {
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
view.loadSingle = (slug) => {
  let content = model.getContent(slug),
      titleEl = helpers.getPageTitle(),
      postContent = helpers.getContentContainer();

  titleEl.innerHTML = content.title;
  postContent.innerHTML = content.content;
};

/**
 * Clear the content from the page
 *
 * @method clearContent
 */
view.clearContent = () => {
  let titleEl = helpers.getPageTitle(),
      postContent = helpers.getContentContainer();

  titleEl.innerHTML = '';
  postContent.innerHTML = '';
};
