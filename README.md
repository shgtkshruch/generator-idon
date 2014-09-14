[![NPM version](https://badge.fury.io/js/generator-idon.svg)](http://badge.fury.io/js/generator-idon)
[![Build Status](https://travis-ci.org/shgtkshruch/generator-idon.svg?branch=master)](https://travis-ci.org/shgtkshruch/generator-idon)
[![Daivid](https://david-dm.org/shgtkshruch/generator-idon.png)](https://david-dm.org/shgtkshruch/generator-idon.png)

# Yo idon

Yeoman generator for starting sketch HTML, CSS, and JavaScript

## Requirements

- [Yeoman](http://yeoman.io/)
- [gulp](http://gulpjs.com/)

If you want to use JavaScript and Sass libraries, the following require.

- [Bower](http://bower.io/) 

## Features

- CSS Autoprefixing
- Automagically complie Jade, Sass, CoffeeScript
- Built-in server with Browser-sync
- Choose jQuery, velocity, Three.js from JavaScript library (Optional)
- Bourbon and Breakpoint for Sass (Optional)
- Automagically wire up your Bower components with wiredep
- Easy publish to Github Pages

## Getting Start

Install `generator-idon`:

    npm install -g generator-idon
    
Make a new directory, and `cd` into it:

    mkdir my_project
    cd my_project
    
Run `yo idon`:

    yo idon
    
Run `gulp` and start your coding!

### Third-Party Dependencies
To install dependencies, run `bower install --[save|save-dev] package-name` to get the files, then run `gulp wiredep` to add dependencies to your source code.

## Github Pages

If you want to use Github Pages, you can use it with one command.
With coding, the page is complete, please hit the following command.

    npm run publish

And then, your Project Pages site will be available at `http://username.github.io/projectname`

## Options

- `--skip-install`: Skip the automatic exectution of `bower` and `npm` after scaffolding has finished.

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
