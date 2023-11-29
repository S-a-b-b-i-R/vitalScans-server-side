const Banner = require("../../model/Banner");

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

const getDiscountByCoupon = async (req, res) => {
    try {
        const coupon = req.params.coupon;
        const banner = await Banner.findOne({ coupon: coupon });
        res.status(200).json({ discount: banner.discount });
    } catch (error) {
        res.status(200).json({ discount: 0 });
    }
};

module.exports = {
    addBanner,
    getAllBanners,
    setActiveBanner,
    getActivebanner,
    getDiscountByCoupon,
};
