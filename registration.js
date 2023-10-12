// export default function registrationNumbers() {
//   const pattern = /^(?:ca|ck|cj|cl|CA|CK|CJ|CL)-\d{3}-\d{3}$/i;
//   const caTest = /^(?:ca|CA)-\d{3}-\d{3}$/;
//   const ckTest = /^(?:ck|CK)-\d{3}-\d{3}$/;
//   const cjTest = /^(?:cj|CJ)-\d{3}-\d{3}$/;
//   const clTest = /^(?:cl|CL)-\d{3}-\d{3}$/;
//   const cityList = [];
//   var myRegNumbers = [];
//   var regNumber = "";
//   function setRegNum(Num) {
//     if (Num) {
//       var regNum = Num.trim();

//       if (pattern.test(regNum)) {
//         regNumber = regNum;
//         myRegNumbers.push(regNumber);
//         return true;
//       } else {
//         return error(regNum);
//       }
//     } else {
//       return error(regNum);
//     }
//   }
//   function error(regNum) {
//     if (!regNum || regNum === "") {
//       return "Please enter a registration number";
//     } else if (!pattern.test(regNum)) {
//       return "Error!registration number added is in an incorrect format";
//     }
//   }
//   function getRegNum() {
//     return regNumber;
//   }

//   function addRegNum() {
//     return myRegNumbers;
//   }

//   function cityFilter(city) {
//     for (var i = 0; i < myRegNumbers.length; i++) {
//       if (city === "Cape town") {
//         if (caTest.test(myRegNumbers[i])) {
//           cityList.push(myRegNumbers[i]);
//         }
//       } else if (city === "Malmesbury") {
//         if (ckTest.test(myRegNumbers[i])) {
//           cityList.push(myRegNumbers[i]);
//         }
//       } else if (city === "Stellenbosch") {
//         if (clTest.test(myRegNumbers[i])) {
//           cityList.push(myRegNumbers[i]);
//         }
//       } else if (city === "Paarl") {
//         if (cjTest.test(myRegNumbers[i])) {
//           cityList.push(myRegNumbers[i]);
//         }
//       }
//     }
//     return cityList;
//   }

//   return {
//     setRegNum,
//     getRegNum,
//     addRegNum,
//     cityFilter,
//     error,
//   };
// }
export default function registrationNumbers() {
  const pattern = /^(?:ca|ck|cj|cl|CA|CK|CJ|CL)-\d{3}-\d{3}$/i;
  const caTest = /^(?:ca|CA)-\d{3}-\d{3}$/;
  const ckTest = /^(?:ck|CK)-\d{3}-\d{3}$/;
  const cjTest = /^(?:cj|CJ)-\d{3}-\d{3}$/;
  const clTest = /^(?:cl|CL)-\d{3}-\d{3}$/;
  const cityList = [];
  var myRegNumbers = [];
  var regNumber = "";
  const pgp = require("pg-promise")();
  const db = pgp("postgres://username:password@localhost:5432/registration_db");
  async function setRegNum(Num) {
    if (Num) {
      const regNum = Num.trim();

      if (pattern.test(regNum)) {
        try {
          await db.none(
            "INSERT INTO registration_numbers (number_text, town_code) VALUES ($1, $2)",
            [regNum, regNum.split("-")[0].toLowerCase()]
          );
          myRegNumbers.push(regNum);
          return true;
        } catch (error) {
          return error.message;
        }
      } else {
        return error(regNum);
      }
    } else {
      return error();
    }
  }
  async function cityFilter(city) {
    try {
      const cityCode = city.toLowerCase();
      const result = await db.manyOrNone(
        "SELECT number_text FROM registration_numbers WHERE town_code = $1",
        [cityCode]
      );

      cityList = result.map((row) => row.number_text);
      return cityList;
    } catch (error) {
      return error.message;
    }
  }
  return {
    setRegNum,
    getRegNum,
    addRegNum,
    cityFilter,
    error,
  };
}
