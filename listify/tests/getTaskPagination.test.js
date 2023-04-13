const sinon = require("sinon");
const fetch = require("node-fetch");

describe("Read All tasks API", () => {
  beforeEach(() => {
    fetchFake = sinon.fake.resolves({});
  });

  afterEach(() => {
    sinon.restore();
  });

  it("sorted order", async () => {
    const requestData = {
      "url" : "http://localhost:4000/tasks/tasks-get/?page=1&size=3&action=sort&option=title",
  };
    const actualResponse = await getTasks(requestData);
    expect(actualResponse).toHaveProperty("message");
  });

  it("filter option", async () => {
    const requestData = {
      "url" : "http://localhost:4000/tasks/tasks-get/?page=1&size=3&action=filter&option=title&value=complete java exercise yes",
  };
    const actualResponse = await getTasks(requestData);
    expect(actualResponse).toHaveProperty("message");
  });

  async function getTasks(requestData) {
    const response = await fetch(requestData.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImhhcmloYXJhbiIsImlhdCI6MTY4MTA2MDExOX0.0bxJMK3dK_TV7UbrndlTd5ztnRMWgxge9ybGiteev-s",
      },
      body: JSON.stringify(requestData),
    });
    return await response.json();
  }
});
