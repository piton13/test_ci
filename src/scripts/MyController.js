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
        this.http.get('https://192.168.1.137:7776/word')
            .then((response) => {
                this.dataFromServer = response;
            });
    }
};
