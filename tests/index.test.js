var app = require("../app");
var request = require("supertest");
const mongoose = require("mongoose");

test("check signIn detail- Right data", async () => {
  await request(app)
    .post("/users/sign-in")
    .send({ emailFromFront: "nico@gmail.com", passwordFromFront: "007" })
    .expect(200)
    .then((response) => {
      expect(response.body.dataUser.token).toBe("5b8GdVtMdk9H5yYUDr9acVpM7qyoCOD3");
    });
});

describe("Get userDetail", () => {
  test("Wrong token", async () => {
    await request(app)
      .get("/home/userDetail")
      .query({ token: "badToken" })
      .then((response) => {
        expect(response.body.result).toBe(false);
      });
  });

  test("Correct token", async () => {
    await request(app)
      .get("/home/userDetail")
      .query({ token: "mCwTMKjgkxTo7BFeAoio_Omi3KW_KTTx" })
      .expect(200)
      .then((response) => {
        expect(response.body.result).toBe(true);
      });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
