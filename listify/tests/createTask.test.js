const sinon = require("sinon");
const fetch = require("node-fetch");

describe("Create Task API", () => {
  beforeEach(() => {
    fetchFake = sinon.fake.resolves({});
  });

  afterEach(() => {
    sinon.restore();
  });

  it('create task', async () => {
    const requestData = {
      "taskId": generateRandomTaskId(5),
      "title": "complete java exercise yes",
      "description": "complete all the java related exerciese",
      "priority": "MEDIUM",
      "dueDate": "19-04-2023",
      "taskComments": [
          {
              "timeStamp": "1680631060977",
              "comment": "follow proper code semantics"
          },
          {
              "timeStamp": "1680631079499",
              "comment": "naming convention should be followed"
          }
      ]
  };
    const expectedResponse = {message: "task was created successfully"};

      sinon.fake.resolves({
          json: () => Promise.resolve(expectedResponse)
      });
    const actualResponse = await createTask(requestData);

    expect(actualResponse).toEqual(expectedResponse);
  });

  it("tasks id is invalid", async () => {
    const requestData = {
      taskId: "3456#$%",
      title: "complete java exercise yes",
      description: "complete all the java related exerciese",
      priority: "MEDIUM",
      dueDate: "19-04-2023",
      taskComments: [
        {
          timeStamp: "1680631060977",
          comment: "follow proper code semantics",
        },
        {
          timeStamp: "1680631079499",
          comment: "naming convention should be followed",
        },
      ],
    };

    const expectedResponse = { message: "tasks details are invalid" };

    sinon.fake.resolves({
      json: () => Promise.resolve(expectedResponse),
    });
    const response = await createTask(requestData);
    const actualResponse = await response.json();
    expect(actualResponse).toEqual(expectedResponse);
    expect(response.status).toBe(403);
  });

  it("tasks title is invalid", async () => {
    const requestData = {
      taskId: generateRandomTaskId(4),
      title: "#$%^&*(",
      description: "complete all the java related exerciese",
      priority: "MEDIUM",
      dueDate: "19-04-2023",
      taskComments: [
        {
          timeStamp: "1680631060977",
          comment: "follow proper code semantics",
        },
        {
          timeStamp: "1680631079499",
          comment: "naming convention should be followed",
        },
      ],
    };

    const expectedResponse = { message: "tasks details are invalid" };

    sinon.fake.resolves({
      json: () => Promise.resolve(expectedResponse),
    });
    const response = await createTask(requestData);
    const actualResponse = await response.json();
    expect(response.status).toEqual(403);
    expect(actualResponse).toEqual(expectedResponse);
  });

  it("tasks description is invalid", async () => {
    const requestData = {
      taskId: generateRandomTaskId(4),
      title: "dfghj dfghjk dfghj",
      description: "@#$%^&*",
      priority: "MEDIUM",
      dueDate: "19-04-2023",
      taskComments: [
        {
          timeStamp: "1680631060977",
          comment: "follow proper code semantics",
        },
        {
          timeStamp: "1680631079499",
          comment: "naming convention should be followed",
        },
      ],
    };

    const expectedResponse = { message: "tasks details are invalid" };

    sinon.fake.resolves({
      json: () => Promise.resolve(expectedResponse),
    });
    const response = await createTask(requestData);
    const actualResponse = await response.json();
    expect(response.status).toEqual(403);
    expect(actualResponse).toEqual(expectedResponse);
  });

  it("tasks priority is invalid", async () => {
    const requestData = {
      taskId: generateRandomTaskId(4),
      title: "dfghj dfghjk dfghj",
      description: "dfghj dfghj dfghjk dfghj fghj",
      priority: "ASDFGHJ",
      dueDate: "19-04-2023",
      taskComments: [
        {
          timeStamp: "1680631060977",
          comment: "follow proper code semantics",
        },
        {
          timeStamp: "1680631079499",
          comment: "naming convention should be followed",
        },
      ],
    };

    const expectedResponse = { message: "tasks details are invalid" };

    sinon.fake.resolves({
      json: () => Promise.resolve(expectedResponse),
    });
    const response = await createTask(requestData);
    const actualResponse = await response.json();
    expect(response.status).toEqual(403);
    expect(actualResponse).toEqual(expectedResponse);
  });

  it("task due date is invalid", async () => {
    const requestData = {
      taskId: generateRandomTaskId(4),
      title: "dfghj dfghjk dfghj",
      description: "dfghj dfghj dfghjk dfghj fghj",
      priority: "ASDFGHJ",
      dueDate: "19 fghj 04-2023",
      taskComments: [
        {
          timeStamp: "1680631060977",
          comment: "follow proper code semantics",
        },
        {
          timeStamp: "1680631079499",
          comment: "naming convention should be followed",
        },
      ],
    };

    const expectedResponse = { message: "tasks details are invalid" };

    sinon.fake.resolves({
      json: () => Promise.resolve(expectedResponse),
    });
    const response = await createTask(requestData);
    const actualResponse = await response.json();
    expect(response.status).toEqual(403);
    expect(actualResponse).toEqual(expectedResponse);
  });

  async function createTask(requestData) {
    const response = await fetch("http://localhost:4000/tasks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImhhcmloYXJhbiIsImlhdCI6MTY4MDg2Njk3MX0.XCmsxnUde27QwM9sh5MkgpFtPEOE40uYdUblnik-EVE",
      },
      body: JSON.stringify(requestData),
    });

    return await response;
  }

  function generateRandomTaskId(length) {
    var letters = "0987654321";
    var result = "";
    for (var i = 0; i < length; i++) {
      result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return result;
  }
});
