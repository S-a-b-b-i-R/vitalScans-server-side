const router = require("express").Router();
const { getAllService } = require("../../api/Service/service");

router.get("/services", getAllService);

module.exports = router;
