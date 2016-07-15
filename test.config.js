import 'angular';
import 'angular-mocks/angular-mocks';
import chai from 'chai';
window.chai = chai;

function loadSpecs() {
	var context = require.context('./src', true, /\.spec\.js$/);
	context.keys().forEach(context);
}

beforeEach(function() {
	window.env = sinon.sandbox.create();
});

afterEach(function() {
	window.env.restore();
});

loadSpecs();
