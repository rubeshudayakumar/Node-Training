const sinon = require("sinon");
const fetch = require("node-fetch");

describe("Read task by id", () => {
  beforeEach(() => {
    fetchFake = sinon.fake.resolves({});
  });

  afterEach(() => {
    sinon.restore();
  });

  it("task with this id updated", async () => {
    const requestData = {
        "taskId" : 51738,
        data : {
            "taskId": "51738",
            "title": "complete UI of exercises"+generateRandomText(5),
            "description": "complete all the java related exerciese",
            "priority": "MEDIUM",
            "dueDate": "18-04-2023",
            "taskComments": [
                {
                    "timeStamp": "1680631060977",
                    "comment": "follow proper code semantics hariharan"
                },
                {
                    "timeStamp": "1680631079499",
                    "comment": "naming convention should be followed"
                }
            ]
        },
    };
    const expectedResponse = {status : "SUCCESS", message : { message : "task was updated successfully"},code : 200};

    sinon.fake.resolves({
      json: () => Promise.resolve(expectedResponse),
    });
    const actualResponse = await updateTask(requestData);
    expect(actualResponse).toEqual(expectedResponse);
  });

  it("task with invalid title", async () => {
    const requestData = {
        "taskId" : "51738",
        data : {
            "taskId": "51738",
            "title": "complete UI of exercise $%^s"+generateRandomText(5),
            "description": "complete all the java related exerciese",
            "priority": "MEDIUM",
            "dueDate": "18-04-2023",
            "taskComments": [
                {
                    "timeStamp": "1680631060977",
                    "comment": "follow proper code semantics hariharan"
                },
                {
                    "timeStamp": "1680631079499",
                    "comment": "naming convention should be followed"
                }
            ]
        },
    };
    const expectedResponse = { status: "WARNING", message: "tasks details are invalid" ,code : 400};

    sinon.fake.resolves({
      json: () => Promise.resolve(expectedResponse),
    });
    const actualResponse = await updateTask(requestData);
    expect(actualResponse).toEqual(expectedResponse);
  });

  it("task with invalid description", async () => {
    const requestData = {
        "taskId" : "51738",
        data : {
            "taskId": "51738",
            "title": "complete UI of exercise"+generateRandomText(5),
            "description": "com$%^&*plete all the java related exerciese",
            "priority": "MEDIUM",
            "dueDate": "18-04-2023",
            "taskComments": [
                {
                    "timeStamp": "1680631060977",
                    "comment": "follow proper code semantics hariharan"
                },
                {
                    "timeStamp": "1680631079499",
                    "comment": "naming convention should be followed"
                }
            ]
        },
    };
    const expectedResponse = { status: "WARNING", message: "tasks details are invalid" ,code : 400};
    const actualResponse = await updateTask(requestData);
    expect(actualResponse).toEqual(expectedResponse);
  });

  it("task with invalid priority", async () => {
    const requestData = {
        "taskId" : "51738",
        data : {
            "taskId": "51738",
            "title": "complete UI of exercise"+generateRandomText(5),
            "description": "complete all the java related exerciese",
            "priority": "DFGHJ",
            "dueDate": "18-04-2023",
            "taskComments": [
                {
                    "timeStamp": "1680631060977",
                    "comment": "follow proper code semantics hariharan"
                },
                {
                    "timeStamp": "1680631079499",
                    "comment": "naming convention should be followed"
                }
            ]
        },
    };
    const expectedResponse = { status: "WARNING", message: "tasks details are invalid" ,code : 400};
    const actualResponse = await updateTask(requestData);
    expect(actualResponse).toEqual(expectedResponse);
  });

  it("task with invalid due date", async () => {
    const requestData = {
        "taskId" : "51738",
        data : {
            "taskId": "51738",
            "title": "complete UI of exercise "+generateRandomText(5),
            "description": "complete all the java related exerciese",
            "priority": "MEDIUM",
            "dueDate": "18-04-RT(*&2023",
            "taskComments": [
                {
                    "timeStamp": "1680631060977",
                    "comment": "follow proper code semantics hariharan"
                },
                {
                    "timeStamp": "1680631079499",
                    "comment": "naming convention should be followed"
                }
            ]
        },
    };
    const expectedResponse = { status: "WARNING", message: "tasks details are invalid" ,code : 400};
    const actualResponse = await updateTask(requestData);
    expect(actualResponse).toEqual(expectedResponse);
  });
  
  it("task with this id doesn't exists", async () => {
    const requestData = {
        "taskId" : "DFGH",
        data : {
            "taskId": "5173856",
            "title": "complete UI of exercises"+generateRandomText(5),
            "description": "complete all the java related exerciese",
            "priority": "MEDIUM",
            "dueDate": "18-04-2023",
            "taskComments": [
                {
                    "timeStamp": "1680631060977",
                    "comment": "follow proper code semantics hariharan"
                },
                {
                    "timeStamp": "1680631079499",
                    "comment": "naming convention should be followed"
                }
            ]
        },
    };

    const expectedResponse = { status: "WARNING", message:  "task doesn't exists" ,code : 400};
    const actualResponse = await updateTask(requestData);
    expect(actualResponse).toEqual(expectedResponse);
  });

  async function updateTask(requestData) {
    const response = await fetch("http://localhost:4000/tasks/"+requestData.taskId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImhhcmloYXJhbiIsImlhdCI6MTY4MTA2MDExOX0.0bxJMK3dK_TV7UbrndlTd5ztnRMWgxge9ybGiteev-s",
      },
      body : JSON.stringify(requestData.data),
    });
    return await response.json();
  }

  function generateRandomText(length) {
    var letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var result = "";
    for (var i = 0; i < length; i++) {
      result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return result;
  }
  
});
