import { rest } from "msw";

export const handlers = [
  rest.post("http://localhost:3030/api/v1/user/signup", (req, res, ctx) => {
    return res(
      ctx.json({
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiMGQ1Y2ZmOTQtOWFjNC00ZGRlLTk2OGQtMDc4ODk2YTc1YjQxIn0sImlhdCI6MTYyMjA1NTg5MiwiZXhwIjoxNjIyMDU5NDkyfQ.OKeA9OJ4Yao9KPBKCZLG7BEd8u8mgmpJaN3adpJFkks",
        message: "Signup was successful",
        id: "0d5cff94-9ac4-4dde-968d-078896a75b41",
      })
    );
  }),
  rest.post("http://localhost:3030/api/v1/user/login", (req, res, ctx) => {
    const { email, password } = req.body;

    if (email === "testboi@test.com" && password === "Testpassword123") {
      return res(
        ctx.json({
          id: "fakeUserId",
          token: "fakeToken",
          message: "Login was successful",
        })
      );
    } else {
      return res(
        ctx.json({
          message: "invalid credentials",
        })
      );
    }
  }),
];
