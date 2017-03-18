/**
 * Editor object
 * @type {Object}
 */
const editor = {};

/**
 * The current content inside of the editor
 * @type {String}
 */
editor.currentContent = '';

/**
 * If there is unsaved content in the editor
 * @type {Boolean}
 */
editor.unsavedContent = false;

/**
 * Initialize the editor
 * @method init
 */
editor.init = () => {
  editor.listener();
};

/**
 * Save the content in the page with the content from the editor
 * @method updateContent
 */
editor.saveContent = () => {
  event.preventDefault();
  model.updateContent(editor.currentContent);
  editor.unsavedContent = false;
  editor.animateSaveButton();
};

/**
 * Inform the user that the content in the editor is not saved
 * @method protectUnsavedContent
 */
editor.protectUnsavedContent = () => {
  if (true === editor.unsavedContent) {
    const confirmed = window.confirm('You should save your changes first!');

    if (!confirmed) {
      event.preventDefault();
    } else {
      editor.unsavedContent = false;
    }
  }
};

/**
 * Update the content with the title from the editor
 * @method updateTitle
 */
editor.updateTitle = () => {
  const title = helpers.getEditorTitleEl().value;

  editor.currentContent.title = title;
  editor.unsavedContent = true;
  view.updateTitle(title);
}

/**
 * Update the content with the content from the editor
 * @method updateContent
 */
editor.updateContent = () => {
  const content = helpers.getEditorContentEl().value;

  editor.currentContent.content = content;
  editor.unsavedContent = true;
  view.updateContent(content);
}

/**
 * Fill the editor form with the content of the current post or page
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

editor.animateSaveButton = () => {
  const button = helpers.getEditorUpdate(),
        saving = () => {
          setTimeout(() => {
            button.innerText = 'Saved!';
            saved();
          }, 1000);
        },
        saved = () => {
          setTimeout(() => {
            button.innerText = 'Update';
          }, 900);
        };

  button.innerText = 'Saving...';
  saving();
};

/**
 * Listen to the form inputs for content changes
 * @method addFormListeners
 */
editor.addFormListeners = () => {
  let formTitle = helpers.getEditorTitleEl(),
      formContent = helpers.getEditorContentEl(),
      formButton = helpers.getEditorUpdate(),
      links = helpers.getLinks();

  formTitle.addEventListener('input', editor.updateTitle, false);
  formContent.addEventListener('input', editor.updateContent, false);
  formButton.addEventListener('click', editor.saveContent, false);

  links.forEach((link) => {
    link.addEventListener('click', editor.protectUnsavedContent, false);
  });
};

/**
 * Listens for the editor toggle button
 * @method listener
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
 * @method toggle
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
