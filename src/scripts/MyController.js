module.exports = function() {
    var vm = this;

    angular.extend(vm, {
        alertMessage: alertMessage
    });

    function alertMessage() {
        alert('message from ng-click');
    }
};