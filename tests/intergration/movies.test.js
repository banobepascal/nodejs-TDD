const request = require("supertest");
const mongoose = require("mongoose");
const { Movie } = require("../../models/movie");
const { User } = require("../../models/user");

let server;

describe("api/movies", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    server.close();
    await Movie.remove({});
  });
  describe("GET /", () => {
    it("should return all movies", async () => {
      await Movie.collection.insertMany([
        {
          title: "star wars",
          genre: "action",
          numberInStock: 4,
          dailyRentalRate: 10
        },
        {
          title: "star wars 2",
          genre: "action",
          numberInStock: 4,
          dailyRentalRate: 10
        }
      ]);

      const res = await request(server).get("/api/movies");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    });
  });

  describe("POST /", () => {
    let title;
    let genre;
    let numberInStock;
    let dailyRentalRate;

    const exec = async () => {
      return await request(server)
        .post("/api/movies")
        .send({ title, genre, numberInStock, dailyRentalRate });
    };

    beforeEach(() => {
      (title = "star trek"),
        (genreId = "action"),
        (numberInStock = 4),
        (dailyRentalRate = 10);
    });

    it("should return 400 if title is less than 5 characters", async () => {
      title = "124";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if title is more than 50 characters", async () => {
      title = new Array(53).join("a");

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if genreId is invalid", async () => {
      genreId = 1;

      const res = await exec();
      expect(res.status).toBe(400);
    });
  });
});
