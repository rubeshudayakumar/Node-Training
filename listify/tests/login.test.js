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
    sinon.fake.resolves({
      json: () => Promise.resolve(expectedResponse),
    });
    const actualResponse = await login(requestData);

    expect(actualResponse).toHaveProperty("token");
  });

  it("login with invalid password", async () => {
    const requestData = {
      userName: "hariharan",
      password: "1212121",
    };
    const expectedResponse = {
      message: "username and passwords are invalid format",
    };
    sinon.fake.resolves({
      json: () => Promise.resolve(expectedResponse),
    });
    const actualResponse = await login(requestData);

    expect(actualResponse).toEqual(expectedResponse);
  });

  it("login with invalid username", async () => {
    const requestData = {
      userName: "hari$%^&",
      password: "12121212",
    };
    const expectedResponse = {
      message: "username and passwords are invalid format",
    };
    sinon.fake.resolves({
      json: () => Promise.resolve(expectedResponse),
    });
    const actualResponse = await login(requestData);

    expect(actualResponse).toEqual(expectedResponse);
  });

  it("login with wrong username", async () => {
    const requestData = {
      userName: "hari",
      password: "12121212",
    };
    const expectedResponse = { message: "username incorrect!" };
    sinon.fake.resolves({
      json: () => Promise.resolve(expectedResponse),
    });
    const actualResponse = await login(requestData);

    expect(actualResponse).toEqual(expectedResponse);
  });

  it("login with wrong password", async () => {
    const requestData = {
      userName: "hariharan",
      password: "12121213",
    };
    const expectedResponse = { message: "password incorrect" };
    sinon.fake.resolves({
      json: () => Promise.resolve(expectedResponse),
    });
    const actualResponse = await login(requestData);

    expect(actualResponse).toEqual(expectedResponse);
  });

  it("wrong username and wrong password", async () => {
    const requestData = {
      userName: "harihavsr",
      password: "12121456",
    };
    const expectedResponse = { message: "username incorrect!" };
    sinon.fake.resolves({
      json: () => Promise.resolve(expectedResponse),
    });
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
