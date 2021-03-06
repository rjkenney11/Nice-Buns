const express = require("express");
const router = express.Router();
// Import the model (cat.js) to use its database functions.
const burger = require("../models/burger.js");


// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burger.selectAll(function(data) {
    const hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {

  burger.createOne([
    "burger_name", "devoured",
  ], [
    req.body.burger_name, req.body.devoured,

  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId});
  });
});

router.put("/api/burgers/:id", function(req, res) {
 const condition = "id = " + req.params.id;

  console.log("my body ", req.params.body);
  // console.log("my body ", req.params.body);
  console.log("condition", condition);

  burger.updateOne(
    { devoured: req.body.devoured},
     condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/burgers/:id", function(req, res) {
  const condition = "id = " + req.params.id;

  burger.deleteOne(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
