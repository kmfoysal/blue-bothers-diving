'use strict';

/**
 * courses-collection service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::courses-collection.courses-collection');
