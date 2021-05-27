import { rest } from "msw";

const handlers = [
  rest.post("http://localhost:3030/api/v1/user/signup", (res, req, ctx) => {
    return res(
      ctx.status(201),
      json({
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiMGQ1Y2ZmOTQtOWFjNC00ZGRlLTk2OGQtMDc4ODk2YTc1YjQxIn0sImlhdCI6MTYyMjA1NTg5MiwiZXhwIjoxNjIyMDU5NDkyfQ.OKeA9OJ4Yao9KPBKCZLG7BEd8u8mgmpJaN3adpJFkks",
        message: "Signup was successful",
        id: "0d5cff94-9ac4-4dde-968d-078896a75b41",
      })
    );
  }),
];

export default handlers;
