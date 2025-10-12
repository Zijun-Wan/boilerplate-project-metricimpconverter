function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    const regex = /(^[\d/\.]+)(?=[a-zA-Z]+$)/;
    const match = input.match(regex);

    // if no number is detected, set number as 1
    if (!match) {
      // console.log("no match")
      result = 1;
    // else calculate the expression
    } else {
      const number = match[0];
      if (number.includes('/')) {
        const numbers = number.split("/");
        if (numbers.length != 2) {
          result = "invalid number";
          return result;
        }
        result = parseFloat(numbers[0]) / parseFloat(numbers[1]);
      } else {
        result = parseFloat(number);
      }
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    result = input.match(/[a-zA-Z]+/)[0];
    result = result.toLowerCase();
    for (let unit of ["kg", "lbs", "l", "gal", "km", "mi"]) {
      if (result === unit) {
        return result;
      }
    }
    result = "invalid unit";
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch(initUnit.toLowerCase()) {
      case 'gal':
        result = 'L';
        break;
      case 'l':
        result = 'gal';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
      default:
        result = "invalid unit";
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch(unit.toLowerCase()) {
      case "gal":
        result = "gallons";
        break;
      case "l":
        result = "liters";
        break;
      case "mi":
        result = "miles";
        break;
      case "km":
        result = "kilometers";
        break;
      case "lbs":
        result = "pounds";
        break;
      case "kg":
        result = "kilograms";
        break;
      default:
        result = "invalid unit";
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    if (initNum === "invalid number") return "invalid number";
    switch(initUnit.toLowerCase()) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;  
      default:
        result = "invalid unit";
    }
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = initNum.toString() + " " + initUnit + " converts to " + returnNum.toString() + " " + returnUnit;
    return result;
  };
  
}

module.exports = ConvertHandler;
