"use strict";

/**
 * The main app object.
 */
var vanillaPress = {
  init: function init() {
    model.init();
    router.init();
    view.init();
  }
};

vanillaPress.init();