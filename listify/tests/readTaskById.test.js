const sinon = require("sinon");
const fetch = require("node-fetch");

describe("Read task by id", () => {
  beforeEach(() => {
    fetchFake = sinon.fake.resolves({});
  });

  afterEach(() => {
    sinon.restore();
  });

  it("task with this id found", async () => {
    const requestData = {
        "taskId" : 51738,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImhhcmloYXJhbiIsImlhdCI6MTY4MTA2MDExOX0.0bxJMK3dK_TV7UbrndlTd5ztnRMWgxge9ybGiteev-s",
    };
    sinon.fake.resolves({
      json: () => Promise.resolve(expectedResponse),
    });
    const actualResponse = await readTasks(requestData);
    expect(actualResponse).toHaveProperty("taskId");
  });

  it("task with this id found", async () => {
    const requestData = {
        "taskId" : 70297679,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImhhcmloYXJhbiIsImlhdCI6MTY4MTA2MDExOX0.0bxJMK3dK_TV7UbrndlTd5ztnRMWgxge9ybGiteev-s",
    };
    const expectedResponse = {message : "task not found"};
    sinon.fake.resolves({
      json: () => Promise.resolve(expectedResponse),
    });
    const actualResponse = await readTasks(requestData);
    expect(actualResponse).toEqual(expectedResponse);
  });

  async function readTasks(requestData) {
    const response = await fetch("http://localhost:4000/tasks/"+requestData.taskId, {
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
