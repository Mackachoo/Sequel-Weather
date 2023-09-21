import * as functions from "firebase-functions";
import * as http from "node:http";
import * as https from "node:https";

export const getWeather = functions.https.onRequest(async (request, response) => {
  const options = {};
  https.get(
    'https://api.open-meteo.com/v1/forecast?latitude=51.51&longitude=-0.13&hourly=temperature_2m&current_weather=true',
    options,
    (res: http.IncomingMessage) => {
      response.setHeader("Content-Type", "application/json; charset=utf-8");
      res.pipe(response);
    }
  );
});
