'use strict';

const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const path = require('path');

describe('reset css', () => {
  describe('reset-css', () => {
    before(() => {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .inDir(path.join(__dirname, '.tmp'))
        .withOptions({
          'skip-install': true,
          test: true
        })
        .withPrompts({resetCSS: 'reset-css'})
        .toPromise();
    });

    it('create expected files', () => {
      assert.fileContent([
        ['bower.json', 'reset-css']
      ]);
    });
  });

  describe('normalize-css', () => {
    before(() => {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .inDir(path.join(__dirname, '.tmp'))
        .withOptions({
          'skip-install': true,
          test: true
        })
        .withPrompts({resetCSS: 'normalize-css'})
        .toPromise();
    });

    it('create expected files', () => {
      assert.fileContent([
        ['bower.json', 'normalize-css']
      ]);
    });
  });

  describe('sanitiz-css', () => {
    before(() => {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .inDir(path.join(__dirname, '.tmp'))
        .withOptions({
          'skip-install': true,
          test: true
        })
        .withPrompts({resetCSS: 'sanitize-css'})
        .toPromise();
    });

    it('create expected files', () => {
      assert.fileContent([
        ['bower.json', 'sanitize-css']
      ]);
    });
  });
});

