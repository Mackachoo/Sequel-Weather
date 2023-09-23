import * as functions from "firebase-functions";
import * as http from "node:http";
import * as https from "node:https";
import geoAPIKey from "../.keys";
import {Client} from "@googlemaps/google-maps-services-js";


// Geocoding API
const geocodingClient = new Client({});

/**
 * Fetches coordinates for a given address.
 * @param {string} address - The address to fetch coordinates for.
 * @return {Promise} A promise that resolves with the coordinates.
 */
async function fetchCoordinates(address: string) {
  try {
    const response = await geocodingClient.geocode({
      params: {
        address: address,
        key: geoAPIKey,
      },
    });
    if (response.data.results.length > 0) {
      const {lat, lng} = response.data.results[0].geometry.location;
      return {lat, lng};
    } else {
      throw new Error("No results found");
    }
  } catch (error) {
    throw new Error("Geocoding API request failed");
  }
}

// Open Meteo API
export const getWeatherAtLocation = functions.https.onRequest(
  async (request, response) => {
    const address: any = request.query.address;
    try {
      const coordinates = await fetchCoordinates(address);
      const options = {};
      https.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.lng}&hourly=temperature_2m,weathercode,windspeed_10m&daily=temperature_2m_max,temperature_2m_min&current_weather=true`,
        options,
        (res: http.IncomingMessage) => {
          response.setHeader("Content-Type", "application/json; charset=utf-8");
          res.pipe(response);
        }
      );
    } catch (error) {
      console.error(error);
      response.status(500).json({error: "Failed to get weather data"});
    }
  });

export const getWeather = functions.https.onRequest(
  async (request, response) => {
    const options = {};
    https.get(
      "https://api.open-meteo.com/v1/forecast?latitude=51.51&longitude=-0.13&hourly=temperature_2m&current_weather=true",
      options,
      (res: http.IncomingMessage) => {
        response.setHeader("Content-Type", "application/json; charset=utf-8");
        res.pipe(response);
      }
    );
  });
