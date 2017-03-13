"use strict";

/**
 * The primary VanillaPress application object
 *
 * @type {Object}
 */
var vanillaPress = {
  init: function init() {
    model.init();
    router.init();
    view.init();
    editor.init();
  }
};

vanillaPress.init();