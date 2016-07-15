import MyController from './MyController.js';

describe('initial test', () => {
	let sut;

	beforeEach(() => {
		sut = new MyController;
	});
	
	it('should alert message when click onto appropriate button', function() {
		window.alert = env.stub();
		sut.alertMessage();
		window.alert.should.called;
	});
	
});
