const Promo = require("../../model/Promo");

const getAllPromo = async (req, res) => {
    try {
        const promos = await Promo.find();
        res.status(200).json({ promos });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllPromo };
