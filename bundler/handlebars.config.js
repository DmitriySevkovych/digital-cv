// Import Handlebars runtime lib
const fs = require('fs');
const handlebars = require('handlebars');
const layouts = require('handlebars-layouts');

// Register helpers
handlebars.registerHelper(layouts(handlebars));
// TODO: adjust helper to load context from a .json (or .yaml) file
handlebars.registerHelper('getJsonContext', (filepath, options) => {
    const data = fs.readFileSync(filepath, 'utf8');
    return options.fn(JSON.parse(data));
});

// Register partials
handlebars.registerPartial('layout', fs.readFileSync('src/templates/layouts/layout.hbs', 'utf8'));

/**
 * Handlebars runtime with custom helpers.
 * Used by handlebars-loader.
 */
module.exports = handlebars;
