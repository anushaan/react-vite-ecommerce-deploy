const express = require("express");

const { addTocart,
    fetchCartItems,
    deleteCartItem,
    updateCartItems, } = require("../../controllers/shop/cartController");

const router = express.Router();

router.post("/add", addTocart);
router.get("/get/:userId", fetchCartItems);
router.put("/update-cart", updateCartItems);
router.delete("/:userId/:productId", deleteCartItem);

module.exports = router;