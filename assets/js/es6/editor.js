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
};