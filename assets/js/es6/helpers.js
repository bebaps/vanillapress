'use strict';

/**
 * Helpers object
 *
 * @type {Object}
 */
var helpers = {};

/**
 * Get the title of the current page
 *
 * @method getPageTitle
 * @return {node} The title of the current page
 */
helpers.getPageTitle = function () {
  return document.getElementById('pageTitle');
};

/**
 * Get the content container of the current page
 *
 * @method getContentContainer
 * @return {node} The content container for the current page
 */
helpers.getContentContainer = function () {
  return document.getElementById('pageContent');
};