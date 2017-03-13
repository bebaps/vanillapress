/**
 * The primary VanillaPress application object
 *
 * @type {Object}
 */
const vanillaPress = {
  init: () => {
    model.init();
    router.init();
    view.init();
    editor.init();
  }
};

vanillaPress.init();
