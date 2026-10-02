const express = require("express");
const Message = require("../services/message");
const GraphApi = require("../services/graph-api");

const testRouter = express.Router();

testRouter.get("/", (req, res) => {
  res.json("Test route is working!");
});

testRouter.get("/message", async (req, res) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    "Bearer EAAdqTCnVTkYBR8FGaVHtiOWBOlZCs2UKuVAdft7PAF5KpNxGNIPUjVZBZCWyVOZCBmVNBSH5Uc9mYtDaYVuUyM6JGCWKe76RaK2lNLnRezCeaHe4iMyqrYX6UlXnzKYknA7qdzXZChensZAa0kCe92ZAPo50DjU5KjPD73nq6L6VYmi6P380COJGv3v9NGXHdV2YXQ7HmeaZAQE3CvufufvgfmDKdafNsVM6Pbdu"
  );

  const raw = JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: "916299341908",
    type: "template",
    template: {
      name: "template-name",
      language: {
        code: "language-and-locale-code"
      },
      components: [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: "text-string"
            },
            {
              type: "currency",
              currency: {
                fallback_value: "$100.99",
                code: "USD",
                amount_1000: 100990
              }
            },
            {
              type: "date_time",
              date_time: {
                fallback_value: "February 25, 1977",
                day_of_week: 5,
                year: 1977,
                month: 2,
                day_of_month: 25,
                hour: 15,
                minute: 33,
                calendar: "GREGORIAN"
              }
            }
          ]
        }
      ]
    }
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch(
    "https://graph.facebook.com/v25.0/1110156185524361/messages",
    requestOptions
  )
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.error(error));

  res.json("Test message route is working!");
});

module.exports = testRouter;
