import angular from  'angular';
import inheritanceService from './inheritanceService';

export default angular.module('inheritance', [])
    .service('inheritanceService', inheritanceService)
    .name;