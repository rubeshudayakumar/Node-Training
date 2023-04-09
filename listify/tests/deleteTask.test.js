const sinon = require("sinon");
const fetch = require("node-fetch");

describe("Delete task by id", () => {
  beforeEach(() => {
    fetchFake = sinon.fake.resolves({});
  });

  afterEach(() => {
    sinon.restore();
  });

    it("task deleted successfully", async () => {
      const requestData = {
          "taskId" : "48167",
      };
      const expectedResponse = {message : "task was deleted successfully"};

      sinon.fake.resolves({
        json: () => Promise.resolve(expectedResponse),
      });
      const actualResponse = await deleteTask(requestData);
      expect(actualResponse).toEqual(expectedResponse);
    });

  it("can't delete the task which doesn't exists", async () => {
    const requestData = {
      taskId: "48167",
    };
    const expectedResponse = { message: "can't delete the task which doesn't exists"};

    sinon.fake.resolves({
      json: () => Promise.resolve(expectedResponse),
    });
    const actualResponse = await deleteTask(requestData);
    expect(actualResponse).toEqual(expectedResponse);
  });

  async function deleteTask(requestData) {
    const response = await fetch(
      "http://localhost:4000/tasks/" + requestData.taskId,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImhhcmloYXJhbiIsImlhdCI6MTY4MTA2MDExOX0.0bxJMK3dK_TV7UbrndlTd5ztnRMWgxge9ybGiteev-s",
        },
      }
    );
    return await response.json();
  }
});
