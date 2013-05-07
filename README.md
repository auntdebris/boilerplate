# HTML Boilerplate
Front-end boilerplate for faster and easier web development.

## Components
* Initializr 4.0
* Twitter Bootstrap 2.3.1 (grid, layouts, visibility classes and media queries)
* Modernizr 2.6.2
* jQuery 1.9.1
* Grunt 0.4.0  
  * livereload - Reload assets live in the browser
  * connect - Start a connect web server
  * regarde - Observe files for changes and run tasks
  * less - Compile LESS files to CSS
  * csslint - Lint CSS files
  * cssmin - Compress CSS files
  * jshint - Validate files with JSHint
  * concat - Concatenate files
  * uglify - Minify files with UglifyJS
  * imagemin - Minify PNG and JPEG images
  * copy - Copy files and folders
  * clean - Clean files and folders

## Installation
    git clone https://github.com/s3rgiosan/boilerplate.git YOUR-APP-NAME  
    npm install  
    grunt server

## Usage

### Development
`grunt server` creates a static server at port 9001 that watches for file changes and enables the livereload snippet.  
`grunt` is the same that running `grunt styles` and `grunt scripts` individually.  
`grunt styles` compiles LESS files to CSS and lints all the generated files.  
`grunt scripts` validates JS files with JSHint and concatenates different files into one.  
`grunt images` minifies PNG and JPEG images.  

### Production
`grunt dist` cleans the dist folder, compiles LESS, validates and minifies CSS and JS, compresses images and copies selected files to dist folder.  

## Browser Support
* Mozilla Firefox 5+
* Google Chrome 14+
* Safari 5+
* Opera 11+
* Internet Explorer 8+

## Authors and Contributors
Sérgio Santos (@s3rgiosan)