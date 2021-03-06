# Matrix Row Coder

This project holds a Vue component that can edit a single row of a matrix in TaxonWorks.

## Technology

The component is meant to be imported and placed into your own Vue.

It uses a Vuex store to manage state and functions.

Testing framework used is Mocha. Assertion library is Chai. Nearly everything in Vuex store is being tested.

Bundle is created using Browserify with the transform Vueify. The Vue components are in [Single File Components](https://vuejs.org/v2/guide/single-file-components.html). So you will have to transform them if you want to use the Matrix Row Coder component in your own Vue.

Each Vue component's stylesheet is written in Stylus and included in the Single File Component (.vue).

Mocha and Browserify are using Babel to translate the ES2015 module style into something that Node and browsers can use. Using `require` will still work, but if we use a tree-shaking transform such as `rollup` you will lose that benefit on CommonJS modules.

## Setup

`npm install`

To use the live version, you should copy `props.js.dist` and change the properties to match a TaxonWorks app.

Quick copy: `cp src/props.js.dist src/props.js`.

## Commands

`grunt test`: Runs the unit tests

`grunt serve-mock`: Builds a sample page with the Matrix Row Coder using mock data. Starts a local webserver. Opens a browser window with the page. Will rebuild the bundle if source changes occur.

`grunt serve-live`: The same as `serve-mock`, but uses a bundle with a request module that will make live requests to the api information given to the Matrix Row Coder component.


# Support

Support for this project came from NSF DEB 15-55053 with additional development in the TaxonWorks codebase supported by NSF ABI-1356381.  Any opinions, findings and conclusions or recommendations expressed in this material are those of the author(s) and do not necessarily reflect the views of the National Science Foundation. 
