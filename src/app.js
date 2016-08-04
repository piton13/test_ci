'use strict';

require('./styles/main.scss');

import angular from 'angular';
import inheritance from './scripts/inheritance/inheritance.module';

import MyController from './scripts/MyController';

angular.module('app', [
        inheritance
    ])
    //.config(($urlRouterProvider) => {
    //    $urlRouterProvider.otherwise('/webpack-dev-server');
    //})
    .controller('myController', MyController);