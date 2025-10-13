const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();
const unitPairs = {
    "km": "mi",
    "mi": "km",
    "L": "gal",
    "gal": "L",
    "kg": "lbs",
    "lbs": "kg",
};
const unitSpelledOut = {
    "km": "kilometers",
    "mi": "miles",
    "L": "liters",
    "gal": "gallons",
    "kg": "kilograms",
    "lbs": "pounds",
}

suite('Unit Tests', function(){
    suite('Read Numbers', function() {
        test('Read whole number', function() {
            assert.equal(convertHandler.getNum("100kg"), 100);
        });
        test('Read decimal number', function() {
            assert.equal(convertHandler.getNum("0.5mi"), 0.5);
        });
        test('Read fractional input', function() {
            assert.equal(convertHandler.getNum("1/3lbs"), 1/3);
        });
        test('Read fractional input with a decimal', function() {
            assert.equal(convertHandler.getNum("0.5/2L"), 0.25);
        });
        test("Return error for double fraction", function() {
            assert.equal(convertHandler.getNum("3/2/3km"), "invalid number");
        });
        test("Return 1 for no number", function() {
            assert.equal(convertHandler.getNum("kg"), 1);
        });
    });

    suite('Check handler functions', function() {
        suite('Valid input units', function() {
            for (let key in unitPairs) {
                test(key, function() {
                    assert.equal(convertHandler.getUnit("2" + key), key);
                });
            };
        });
        test("Test invalid unit", function() {
            assert.equal(convertHandler.getUnit("10kmm"), "invalid unit");
        });
        suite('Check return units', function() {
            for (let [key, value] of Object.entries(unitPairs)) {
                test(key + " returns " + value, function() {
                    assert.equal(convertHandler.getReturnUnit(key), value);
                });
            };
        });
        suite("Check spelled out string", function() {
            for (let [key, value] of Object.entries(unitSpelledOut)) {
                test(key + " spells out to be " + value, function() {
                    assert.equal(convertHandler.spellOutUnit(key), value);
                });
            };
        });
    });
});