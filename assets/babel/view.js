// View file for displaying content
// -----------------------------------------------------------------------------
/**
* View object
*/
const view = {};

/**
* Initialize the View
*/
view.init = () => {
  view.loadBlogPosts();
};

/**
* Create the markup for the posts
*
* @param object {post} Post to create markup for
* @return object {articleEl} Final post markup
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
