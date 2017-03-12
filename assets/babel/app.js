/**
 * The application object
 *
 * @type {Object}
 */
const vanillaPress = {
  init: () => {
    model.init();
    router.init();
    view.init();
  }
};

vanillaPress.init();
