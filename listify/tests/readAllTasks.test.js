const sinon = require("sinon");
const fetch = require("node-fetch");

describe("Read All tasks API", () => {
  beforeEach(() => {
    fetchFake = sinon.fake.resolves({});
  });

  afterEach(() => {
    sinon.restore();
  });

  it("no tasks to display", async () => {
    const requestData = {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImVtcHR5dXNlciIsImlhdCI6MTY4MTM4MzUyMX0.xjNIoAgGvcmDvDUUOi1AwLpjyxVrSLebEIkX1vJd_zw",
    };
    const expectedResponse = {status: "SUCCESS","message": {
      "message": "there are no tasks to display"
  },code: 200};
    const actualResponse = await readTasks(requestData);
    expect(actualResponse).toEqual(expectedResponse);
  });

  it("tasks are available to display", async () => {
    const requestData = {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImhhcmloYXJhbiIsImlhdCI6MTY4MTA2MDExOX0.0bxJMK3dK_TV7UbrndlTd5ztnRMWgxge9ybGiteev-s",
    };
    const actualResponse = await readTasks(requestData);
    expect(actualResponse).toHaveProperty("message");
  });

  async function readTasks(requestData) {
    const response = await fetch("http://localhost:4000/tasks/tasks-list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization:
          "Bearer "+requestData.token,
      }
    });
    return await response.json();
  }
});
