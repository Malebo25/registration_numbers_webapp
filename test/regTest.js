import assert from "assert";
import registrationNumbers from "../registration";
import pgPromise from "pg-promise";
import dotenv from "dotenv";
dotenv.config();
const pgp = pgPromise();
describe("set registration numbers", function () {
  it("It should set registration numbers", function () {
    let registration = registrationNumbers();
    registration.setRegNum("ca-250-889");
    assert.equal("ca-250-889", registration.getRegNum());
  });
  it("It should not set registration numbers in a wrong format", function () {
    let registration = registrationNumbers();
    registration.setRegNum("ck2508");
    assert.equal(
      "Error!registration number added is in an incorrect format",
      registration.setRegNum("ck2508")
    );
    assert.equal(false, registration.getRegNum());
  });
  it("It should set registration numbers", function () {
    let registration = registrationNumbers();
    registration.setRegNum("cl-250-898");
    assert.equal("cl-250-898", registration.getRegNum());
  });
  it("It should set registration numbers", function () {
    let registration = registrationNumbers();
    registration.setRegNum("CJ-250-800");
    assert.equal("CJ-250-800", registration.getRegNum());
  });
  it("It should not set an empty registration number", function () {
    let registration = registrationNumbers();

    assert.equal(
      "Please enter a registration number",
      registration.setRegNum("")
    );
  });
});

describe("Put valid registration numbers into a list", function () {
  it("It should display list of registration numbers", function () {
    let registration = registrationNumbers();
    registration.setRegNum("ca-250-889");
    registration.setRegNum("CJ-250-800");
    registration.setRegNum("CJ-250-800");

    assert.deepEqual(
      ["ca-250-889", "CJ-250-800", "CJ-250-800"],
      registration.addRegNum()
    );
  });
  it("It should display list of registration numbers", function () {
    let registration = registrationNumbers();
    registration.setRegNum("ca-250-889");
    registration.setRegNum("CJ-250-800");
    registration.setRegNum("Cpp-250-800");

    assert.deepEqual(["ca-250-889", "CJ-250-800"], registration.addRegNum());
  });
});
describe("Choose a city whose registration numbers you want to display", function () {
  it("It should display registration numbers from cape town", function () {
    let registration = registrationNumbers();
    registration.setRegNum("ca-250-889");
    registration.setRegNum("CJ-250-800");
    assert.deepEqual(["ca-250-889"], registration.cityFilter("capetown"));
  });
  it("It should display registration numbers from malmesbury", function () {
    let registration = registrationNumbers();
    registration.setRegNum("ca-250-889");
    registration.setRegNum("CK-250-890");
    registration.setRegNum("CK-250-800");
    registration.setRegNum("CK-250-890");
    assert.deepEqual(
      ["CK-250-890", "CK-250-800", "CK-250-890"],
      registration.cityFilter("malmesbury")
    );
  });
  it("It should display registration numbers from stellenbosch", function () {
    let registration = registrationNumbers();
    registration.setRegNum("ca-250-889");
    registration.setRegNum("CL-250-890");
    registration.setRegNum("CL-250-800");
    registration.setRegNum("CL-250-890");
    assert.deepEqual(
      ["CL-250-890", "CL-250-800", "CL-250-890"],
      registration.cityFilter("stellenbosch")
    );
  });
  it("It should display registration numbers from paarl", function () {
    let registration = registrationNumbers();
    registration.setRegNum("ca-250-889");
    registration.setRegNum("CJ-250-890");
    registration.setRegNum("CJ-250-800");
    registration.setRegNum("CJ-250-890");
    assert.deepEqual(
      ["CJ-250-890", "CJ-250-800", "CJ-250-890"],
      registration.cityFilter("paarl")
    );
  });
});
