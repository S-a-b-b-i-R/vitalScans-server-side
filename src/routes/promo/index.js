const router = require("express").Router();
const { getAllPromo } = require("../../api/Promo/promo");

router.get("/promos", getAllPromo);

module.exports = router;
