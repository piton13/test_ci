export default class MyController {

    constructor(inheritanceService, $http) {
        'ngInject';
        this.dataFromServer = '';
        this.inheritanceService = inheritanceService;
        this.http = $http;
    }

    alertMessage() {
        console.log(this.inheritanceService.getSuperClass());
        alert('the name of superClass is:' + this.inheritanceService.getSuperClass().name);
    }

    showData() {
        this.http.get('http://192.168.1.119:7776/word')
            .then((response) => {
                this.dataFromServer = response;
            });
    }
};