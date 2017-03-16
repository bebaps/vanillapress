/**
 * Editor object
 *
 * @type {Object}
 */
const editor = {};

editor.currentContent = '';

/**
 * Initialize the editor
 *
 * @method init
 */
editor.init = () => {
  editor.listener();
};

/**
 * Update contentObj
 *
 * @method updateContent
 * @return {[type]}      [description]
 */
editor.updateContent = () => {
  model.updateContent(editor.currentContent);
};

/**
 * Fill the editor form with the content of the current post or page
 *
 * @method fillEditorForm
 * @param  {Obejct} content Content object for the current page or post
 */
editor.loadEditorForm = (content) => {
  let formTitle = helpers.getEditorTitleEl(),
      formContent = helpers.getEditorContentEl();

  formTitle.value = content.title;
  formContent.value = content.content;

  editor.addFormListeners();
};

/**
 * Listen to the form inputs for content changes
 */
editor.addFormListeners = () => {
  let formTitle = helpers.getEditorTitleEl(),
      formContent = helpers.getEditorContentEl(),
      formButton = helpers.getEditorUpdate();

  formTitle.addEventListener('input', view.updateTitleFromForm, false);
  formContent.addEventListener('input', view.updateContentFromForm, false);
  formButton.addEventListener('click', editor.updateContent, false);
};

/**
 * Listens for the editor toggle button
 *
 * @return {Object} Main editor DOM object
 */
editor.listener = () => {
  let toggle = helpers.getEditorToggle();

  toggle.addEventListener('click', function() {
    editor.toggle();
    event.preventDefault();
  }, false);
};

/**
 * Controls the toggle for the editor
 *
 * @return {Object} Main toggle element
 */
editor.toggle = () => {
  let editorEl = helpers.getEditorEl(),
      editorToggle = helpers.getEditorToggle();

  editor.currentContent = model.getCurrentContent();

  editorEl.classList.toggle('hidden');
  editorToggle.classList.toggle('hidden');

  if (false === editorToggle.classList.contains('hidden')) {
    editor.loadEditorForm(editor.currentContent);
  }
};
