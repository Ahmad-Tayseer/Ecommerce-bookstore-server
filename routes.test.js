// const { sequelize } = require("./model/index");
// const supertest = require("supertest");
// const app = require("./server");
// const mockRequest = supertest(app);

// const bookRoute = require("./routes/book");
// app.use(bookRoute);

// beforeAll(async () => {
//   sequelize.sync();
// });

// afterAll(async () => {
//   await sequelize.drop();
// });

// describe("Routes test", () => {
//   it("Home route", async () => {
//     const res = await mockRequest.get("/");
//     expect(res.status).toBe(200);
//     expect("Welcome to my server");
//   });
//   it("Not found error", async () => {
//     const res = await mockRequest.get("/anything");
//     expect(res.status).toBe(404);
//   });
//   it("Sign up", async () => {
//     const res = await mockRequest.post("/signup").send({
//       username: "ahmad",
//       email: "ahmad95@gmail.com",
//       password: "12345",
//     });
//     expect(res.status).toBe(201);
//     expect({
//       username: "ahmad",
//       email: "ahmad95@gmail.com",
//       password: "12345",
//       role: "client",
//     });
//   });
//   // it("Create new book", async () => {
//   //   const book = {
//   //     name: "bookbook",
//   //     author: "author",
//   //     image: "image9",
//   //     price: "130",
//   //     description: "description9",
//   //     topSelling: false,
//   //     rating: "3",
//   //   };
//   //   const res = await mockRequest.get("/books");
//   //   expect(res.status).toBe(200);
//   // });
// });
