'use strict';

/**
 * Editor object
 *
 * @type {Object}
 */
var editor = {};

/**
 * Initialize the editor
 *
 * @method init
 */
editor.init = function () {
  editor.listener();
};

/**
 * Listens for the editor toggle button
 *
 * @return {Object} Main editor DOM object
 */
editor.listener = function () {
  var toggle = helpers.getEditorToggle();

  toggle.addEventListener('click', editor.toggle, false);
};

/**
 * Controls the toggle for the editor
 *
 * @return {Object} Main toggle element
 */
editor.toggle = function () {
  var editorEl = helpers.getEditorEl(),
      editorToggle = helpers.getEditorToggle();

  editorEl.classList.toggle('hidden');
  editorToggle.classList.toggle('hidden');

  event.preventDefault();

  if (false === editorToggle.classList.contains('hidden')) {
    editor.loadEditorForm(model.getCurrentContent());
  }
};

/**
 * Fill the editor form with the content of the current post or page
 *
 * @method fillEditorForm
 * @param  {[type]} content [description]
 * @return {[type]} [description]
 */
editor.loadEditorForm = function (content) {
  var formTitle = helpers.getEditorTitleEl(),
      formContent = helpers.getEditorContentEl();

  formTitle.value = content.title;
  formContent.value = content.content;
};