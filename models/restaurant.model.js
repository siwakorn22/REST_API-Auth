const sql = require("./db");
//Constructor
const Restaurant = function (restaurant) {
  //Attributes
  this.id = restaurant.id;
  this.name = restaurant.name;
  this.type = restaurant.type;
  this.imageurl = restaurant.imageurl;
};

//Method
// Insert Data
Restaurant.create = (newRestaurant, result) => {
  //INSERT INTO restaurants SET id, name, type, imageurl Values ("1", "KFC", "Fastfood", "url")
  sql.query("INSERT INTO restaurants SET ?", newRestaurant, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err, null);
      return;
    }
    console.log("created restaurant:", { id: res.id, ...newRestaurant });
    result(null, { id: res.id, ...newRestaurant });
  });
};
// Get Data by Id
Restaurant.getById = (restaurantId, result) => {
  //SELECT * FROM restaurants WHERE id = restaurantId
  sql.query(
    `SELECT * FROM restaurants WHERE id = ${restaurantId}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res[0]);
        return;
      }
      // Restaurant not found  with this Id
      result({ kind: "not_found" }, null);
    }
  );
};
//Get all Restaurant
Restaurant.getAll = (result) => {
  //SELECT * FROM restaurants
  sql.query("SELECT * FROM restaurants", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};
//Update Restaurant Data
Restaurant.updateById = (id, restaurant, result) => {
  //UPDATE restaurants SET name = "name", type="type", imageurl="imageurl WHERE id = "id"
  sql.query(
    "UPDATE restaurants SET name = ?, type=?, imageurl=? WHERE id = ?",
    [restaurant.name, restaurant.type, restaurant.imageurl, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      // Restaurant data is updated
      result(null, { id: id, ...restaurant });
    }
  );
};
//Delete Restaurant by Id
Restaurant.removeById = (id, result) => {
  //DELETE FROM restaurants WHERE id = ?
  sql.query("DELETE FROM restaurants WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("Deleted restaurant with id: ", id);
    result(null, res);
  });
};
Restaurant.removeAll = () => {};

module.exports = Restaurant;
