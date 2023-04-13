const sinon = require("sinon");
const fetch = require("node-fetch");

describe("Register API", () => {
  beforeEach(() => {
    fetchFake = sinon.fake.resolves({});
  });

  afterEach(() => {
    sinon.restore();
  });

  it("already existing user", async () => {
    const requestData = {
      userName: "hariharan",
      password: "12121212",
    };
    const expectedResponse = {
      "status": "WARNING",
    "message": "user already exists",
    "code": 400
    };
    const actualResponse = await register(requestData);

    expect(actualResponse).toEqual(expectedResponse);
  });

  it("invalid password", async () => {
    const requestData = {
      userName: "arun",
      password: "121",
    };
    const expectedResponse = {
      "status": "WARNING",
      "message": "username and passwords are invalid format",
      "code": 400
    };
    const actualResponse = await register(requestData);

    expect(actualResponse).toEqual(expectedResponse);
  });

  it("invalid username", async () => {
    const requestData = {
      userName: "hari%^&",
      password: "12121213",
    };

    const expectedResponse = {
      "status": "WARNING",
      "message": "username and passwords are invalid format",
      "code": 400
    };
    const actualResponse = await register(requestData);

    expect(actualResponse).toEqual(expectedResponse);
  });

    it('new user', async () => {
      const requestData = {
        userName : generateRandomUserName(6),
        password: '12121213'
      };
      const actualResponse = await register(requestData);

      expect(actualResponse).toHaveProperty("message");
    });

  async function register(requestData) {
    const response = await fetch("http://localhost:4000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    return await response.json();
  }

  function generateRandomUserName(length) {
    var letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var result = "";
    for (var i = 0; i < length; i++) {
      result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return result;
  }
});
