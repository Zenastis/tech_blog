const router = require("express").Router();
const apiRoute = require("./api/");
const homeRoute = require("./homeroutes.js");
const dashboardRoute = require("./dashboardroutes.js");

router.use("/", homeRoute);
router.use("/dashboard", dashboardRoute);
router.use("/api", apiRoutes);

module.exports = router;