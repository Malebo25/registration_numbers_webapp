function registrationNumbers() {
  const pattern = /^(?:ca|ck|cj|cl|CA|CK|CJ|CL)-\d{3}-\d{3}$/i;
  const caTest = /^(?:ca|CA)-\d{3}-\d{3}$/;
  const ckTest = /^(?:ck|CK)-\d{3}-\d{3}$/;
  const cjTest = /^(?:cj|CJ)-\d{3}-\d{3}$/;
  const clTest = /^(?:cl|CL)-\d{3}-\d{3}$/;
  const cityList = [];
  var myRegNumbers = [];
  var regNumber = "";
  function setRegNum(Num) {
    if (Num) {
      var regNum = Num.trim();

      if (pattern.test(regNum)) {
        regNumber = regNum;
        myRegNumbers.push(regNumber);
        return true;
      } else {
        return error(regNum);
      }
    } else {
      return error(regNum);
    }
  }
  function error(regNum) {
    if (!regNum || regNum === "") {
      return "Please enter a registration number";
    } else if (!pattern.test(regNum)) {
      return "Error!registration number added is in an incorrect format";
    }
  }
  function getRegNum() {
    return regNumber;
  }

  function addRegNum() {
    return myRegNumbers;
  }

  function cityFilter(city) {
    for (var i = 0; i < myRegNumbers.length; i++) {
      if (city === "Cape town") {
        if (caTest.test(myRegNumbers[i])) {
          cityList.push(myRegNumbers[i]);
        }
      } else if (city === "Malmesbury") {
        if (ckTest.test(myRegNumbers[i])) {
          cityList.push(myRegNumbers[i]);
        }
      } else if (city === "Stellenbosch") {
        if (clTest.test(myRegNumbers[i])) {
          cityList.push(myRegNumbers[i]);
        }
      } else if (city === "Paarl") {
        if (cjTest.test(myRegNumbers[i])) {
          cityList.push(myRegNumbers[i]);
        }
      }
    }
    return cityList;
  }

  return {
    setRegNum,
    getRegNum,
    addRegNum,
    cityFilter,
    error,
  };
}
