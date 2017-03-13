/**
 * Editor object
 *
 * @type {Object}
 */
const editor = {};

/**
 * Initialize the editor
 *
 * @method init
 */
editor.init = () => {
  editor.listener();
};

/**
 * Listens for the editor toggle button
 *
 * @return {Object} Main editor DOM object
 */
editor.listener = () => {
  let toggle = helpers.getEditorToggle();

  toggle.addEventListener('click', editor.toggle, false);
};

/**
 * Controls the toggle for the editor
 *
 * @return {Object} Main toggle element
 */
editor.toggle = () => {
  let editorEl = helpers.getEditorEl(),
      editorToggle = helpers.getEditorToggle();

  editorEl.classList.toggle('hidden');
  editorToggle.classList.toggle('hidden');

  event.preventDefault();
};
