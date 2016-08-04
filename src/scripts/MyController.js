import angular from 'angular';

export default class MyController {

    constructor(inheritanceService) {
        'ngInject';
        this.inheritanceService = inheritanceService;
    }

    alertMessage() {
        console.log(this.inheritanceService.getSuperClass());
        alert('the name of superClass is:' + this.inheritanceService.getSuperClass().name);
    }
};