'use strict';

/**
 * The main app object.
 */

const vanillaPress = {
  init: function init() {
    // Add any functions here you want
    // to run to start the application
    // localStorage.setItem('JSON Data', jsonData);
    model.init();
  }
};

vanillaPress.init();

// Add your custom code starting here:
// const content = document.getElementById('pageContent');

// const getContent = function() {
//   let posts = JSON.parse(localStorage.getItem('JSON Data'));

//   for (let i = posts.length - 1; i >= 0; i--) {
//     let postsContainer = document.createElement('article'),
//         postTitle = document.createElement('h2'),
//         postAnchor = document.createElement('a'),
//         postContent = document.createElement('div');

//     // Build the elements
//     postAnchor.innerHTML = posts[i].title;
//     postAnchor.setAttribute('href', '#' + posts[i].slug);
//     postTitle.appendChild(postAnchor);
//     postContent.innerHTML = posts[i].content;

//     // Add the elements to the article
//     postsContainer.appendChild(postTitle);
//     postsContainer.appendChild(postContent);

//     // Insert that shit into the DOM
//     content.appendChild(postsContainer);
//   }
// };

// const showPost = function() {}

// getContent();
