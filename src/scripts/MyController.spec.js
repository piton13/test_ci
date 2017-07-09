import MyController from './MyController.js';

describe('initial test', () => {
	let sut;
	let $http = {
		get: env.stub().returns({
			then: env.stub()
		})
	};

	beforeEach(() => {
		sut = new MyController($http);
	});
	
	it('should alert message when click onto appropriate button', function() {
		window.alert = env.stub();
		sut.alertMessage();
		window.alert.should.called;
	});

	it('should make request to cross domain server', function() {
		sut.showData();
		$http.get.should.calledWith('http://192.168.1.119:7776/word');
	});
	
});
