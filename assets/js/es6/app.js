"use strict";

/**
 * The application object
 *
 * @type {Object}
 */
var vanillaPress = {
  init: function init() {
    model.init();
    router.init();
  }
};

vanillaPress.init();