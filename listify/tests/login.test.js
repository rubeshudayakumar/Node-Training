const sinon = require("sinon");
const fetch = require("node-fetch");

describe("Login API", () => {
  beforeEach(() => {
    fetchFake = sinon.fake.resolves({});
  });

  afterEach(() => {
    sinon.restore();
  });

  it("login success", async () => {
    const requestData = {
      userName: "hariharan",
      password: "12121212",
    };
    const actualResponse = await login(requestData);

    expect(actualResponse).toHaveProperty("message");
  });

  it("login with invalid password", async () => {
    const requestData = {
      userName: "hariharan",
      password: "1212121",
    };
    const expectedResponse = {
      "status": "WARNING",
      "message": "username and passwords are invalid format",
      "code": 400
    };
    const actualResponse = await login(requestData);

    expect(actualResponse).toEqual(expectedResponse);
  });

  it("login with invalid username", async () => {
    const requestData = {
      userName: "hari$%^&",
      password: "12121212",
    };
    const expectedResponse = {
      "status": "WARNING",
      "message": "username and passwords are invalid format",
      "code": 400
    };
    const actualResponse = await login(requestData);

    expect(actualResponse).toEqual(expectedResponse);
  });

  it("login with wrong username", async () => {
    const requestData = {
      userName: "hari",
      password: "12121212",
    };
    const expectedResponse = { 
    "status": "WARNING",
    "message": "username incorrect!",
    "code": 400 };
    const actualResponse = await login(requestData);

    expect(actualResponse).toEqual(expectedResponse);
  });

  it("login with wrong password", async () => {
    const requestData = {
      userName: "hariharan",
      password: "12121213",
    };
    const expectedResponse = { 
    "status": "WARNING",
    "message": "password incorrect",
    "code": 400 
    };
    const actualResponse = await login(requestData);

    expect(actualResponse).toEqual(expectedResponse);
  });

  it("wrong username and wrong password", async () => {
    const requestData = {
      userName: "harihavsr",
      password: "12121456",
    };
    const expectedResponse = { 
      "status": "WARNING",
      "message": "username incorrect!",
      "code": 400 };
    const actualResponse = await login(requestData);

    expect(actualResponse).toEqual(expectedResponse);
  });

  async function login(requestData) {
    const response = await fetch("http://localhost:4000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
    return await response.json();
  }
});
