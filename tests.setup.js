'use strict';

const jsdom = require('jsdom');

// Mock the browser environment.
const document = jsdom.jsdom('<html />');
const window = document.defaultView;
const navigator = window.navigator;

// Expose the mocked browser environment.
global.document = document;
global.window = window;
global.navigator = navigator;
