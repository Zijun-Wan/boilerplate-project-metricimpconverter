const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    this.timeout(5000);
    test("Convert a valid input (10L)", function(done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=10L')
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, 
                    {
                        "initNum":10,
                        "initUnit":"l",
                        "returnNum":2.6417217685798895,
                        "returnUnit":"gal",
                        "string":"10 l converts to 2.6417217685798895 gal"
                    })
                done()
            })
    });
    test("Convert an invalid input (32g)", function(done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=32g')
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, 32);
                assert.equal(res.body.initUnit, "invalid unit");
                assert.equal(res.body.returnNum, "invalid unit");
                assert.equal(res.body.returnUnit, "invalid unit");
                done();
            })
    });
    test("Convert an invalid number (3/7.2/4kg)", function(done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=3/7.2/4kg')
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, "invalid number");
                assert.equal(res.body.initUnit, "kg");
                assert.equal(res.body.returnNum, "invalid number");
                assert.equal(res.body.returnUnit, "lbs");
                done();
            })
    })
    test("Convert an invalid number AND unit (3/7.2/4kilomegagram)", function(done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=3/7.2/4kilomegagram')
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, "invalid number");
                assert.equal(res.body.initUnit, "invalid unit");
                assert.equal(res.body.returnNum, "invalid number");
                assert.equal(res.body.returnUnit, "invalid unit");
                done();
            })
    })
    test("Convert with no number (kg)", function(done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=kg')
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, 1);
                assert.equal(res.body.initUnit, "kg");
                assert.equal(res.body.returnNum, 2.2046244201837775);
                assert.equal(res.body.returnUnit, "lbs");
                done();
            })
    })
});
