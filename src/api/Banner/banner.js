const Banner = require("../../Model/Banner");

const addBanner = async (req, res) => {
    try {
        const banner = req.body;
        const newBanner = new Banner(banner);
        await newBanner.save();
        res.status(200).json({ banner: newBanner });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllBanners = async (req, res) => {
    try {
        const banners = await Banner.find();
        res.status(200).json({ banners });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const setActiveBanner = async (req, res) => {
    try {
        const id = req.params.id;
        const banner = await Banner.findById(id);
        await Banner.updateMany({}, { isActive: false });
        await Banner.findByIdAndUpdate(id, { isActive: true });
        res.status(200).json({ message: "Banner updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getActivebanner = async (req, res) => {
    try {
        const banner = await Banner.findOne({ isActive: true });
        res.status(200).json({ banner });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addBanner, getAllBanners, setActiveBanner, getActivebanner };
