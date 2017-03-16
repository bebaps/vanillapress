/**
 * The primary VanillaPress application object
 * @type {Object}
 */
const vanillaPress = {};

/**
 * Initialize the app
 * @method init
 */
vanillaPress.init = () => {
  model.init();
  router.init();
  view.init();
  editor.init();
};

vanillaPress.init();
