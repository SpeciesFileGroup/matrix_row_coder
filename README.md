# Matrix Row Coder

This project holds a Vue component that can edit a single row of a matrix in TaxonWorks.

## Technology

The component is meant to be imported and placed into your own Vue.

It uses a Vuex store to manage state and functions.

Testing framework used is Mocha. Assertion library is Chai. Nearly everything in Vuex store is being tested.

Bundle is created using Browserify with the transform Vueify. The Vue components are in [Single File Components](https://vuejs.org/v2/guide/single-file-components.html). So you will have to transform them if you want to use the Matrix Row Coder component in your own Vue.

Each Vue component's stylesheet is written in Stylus and included in the Single File Component (.vue). Make sure you've installed Stylus when transforming them.

## Setup

`npm install`

## Commands

`grunt test`: Runs the unit tests

`grunt serve-mock`: Builds a sample page with the Matrix Row Coder using mock data. Starts a local webserver. Opens a browser window with the page. Will rebuild the bundle if source changes occur.

`grunt serve-live`: The same as `serve-mock`, but uses a bundle with a request module that will make live requests to the api information given to the Matrix Row Coder component.