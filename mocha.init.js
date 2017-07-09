beforeEach(function() {
    global.env = sinon.sandbox.create();
});

afterEach(function() {
    global.env.restore();
});