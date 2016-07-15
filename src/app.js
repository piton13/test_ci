'use strict';

require('./styles/main.scss');
var angular = require('angular');

var MyController = require('./scripts/MyController');
//require('./scripts/main.es6');
console.log('app loaded');

angular.module('app', [])
    //.config(($urlRouterProvider) => {
    //    $urlRouterProvider.otherwise('/webpack-dev-server');
    //})
    .controller('myController', MyController);