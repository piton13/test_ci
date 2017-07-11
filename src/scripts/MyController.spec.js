import MyController from './MyController.js';

describe('initial test', () => {
	let sut;
	let $http = {
		get: env.stub().returns({
			then: env.stub()
		})
	};
	let inheritanceService = {
        getSuperClass: env.stub().returns({ name: 'some name' })
	};

	beforeEach(() => {
		sut = new MyController(inheritanceService, $http);
	});
	
	it.skip('should alert message when click onto appropriate button', function() {
		window.alert = env.stub();
		sut.alertMessage();
		window.alert.should.called;
	});

	it('should make request to cross domain server', function() {
		sut.showData();
		$http.get.should.calledWith('https://192.168.1.137:7776/word');
	});
	
});
