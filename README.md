[![NPM version](https://badge.fury.io/js/generator-idon.svg)](http://badge.fury.io/js/generator-idon)
[![Build Status](https://travis-ci.org/shgtkshruch/generator-idon.svg?branch=master)](https://travis-ci.org/shgtkshruch/generator-idon)
[![Daivid](https://david-dm.org/shgtkshruch/generator-idon.png)](https://david-dm.org/shgtkshruch/generator-idon)

# Yo idon

Yeoman generator for starting sketch HTML, CSS, and JavaScript

## Requirements

- [Yeoman](http://yeoman.io/)
- [gulp](http://gulpjs.com/)
- [Yarn](https://yarnpkg.com/en/)

If you want to use JavaScript and CSS libraries, the following require.

- [Bower](http://bower.io/)

## Features

- Automagically complie Pug, Sass, Babel
- Built-in server with Browser-sync
- CSS Autoprefixing with [autoprefixer](https://github.com/postcss/autoprefixer)
- Sorts CSS properties fast and automatically with [postcss-sorting](https://github.com/hudochenkov/postcss-sorting)
- Automatically formats CSS with [stylefmt](https://github.com/morishitter/stylefmt)
- Enable ES2015 features using [Babel](https://babeljs.io/)
- Eslint with [eslint-config-airbnb](https://github.com/airbnb/javascript)
- Efficiently bundle JavaScript files up into a single file with [rollup](http://rollupjs.org/)
- Automagically wire up your Bower components with [wiredep](https://github.com/taptapship/wiredep)
- Awesome image optimization
- Easy publish to GitHub Pages

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

## Build

After the coding is completed, please hit this command.

    gulp build

Then, you can finished product in the `dist` folder.

## GitHub Pages

If you want to use GitHub Pages, you can use it with one command.
With coding, the page is complete, please hit the following command.

    gulp publish

And then, your Project Pages site will be available at `https://username.github.io/projectname`

## Options

- `--skip-install`: Skip the automatic exectution of `bower` and `npm` after scaffolding has finished.

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
