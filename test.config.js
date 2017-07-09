import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

global.chai = chai;
global.expect = chai.expect;
global.sinon = sinon;

chai.use(sinonChai);
chai.should();
chai.config.includeStack = true;

global.env = sinon.sandbox.create();
