const fs = require('node:fs');

fs.copyFile('styles.css', 'dist/styles.css', (error) => {
  if (error) {
    console.error('Failed to copy styles.css.');
    throw error;
  }

  console.log('Copied styles.css successfully.');
});
