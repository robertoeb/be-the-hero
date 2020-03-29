const connection = require("../database/connection");

module.exports = {
  async index(request, response) {
    const ong_id = request.headers.authorization;

    const ong = await connection("ongs")
      .where("id", ong_id)
      .first();

    if (!ong) {
      return response.status(400).json({
        error: "This ONG does not exists."
      });
    }

    const incidents = await connection("incidents")
      .where("ong_id", ong_id)
      .select("*");

    return response.json(incidents);
  }
};
