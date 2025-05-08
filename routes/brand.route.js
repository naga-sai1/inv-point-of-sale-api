import express from "express";
const router = express.Router();
import upload from "../middleware/upload.middleware.js";
import {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
  getBrandNames,
} from "../controllers/brand.controller.js";

router.get("/get_all_brands/:store_id", getAllBrands);
router.get("/get_brand/:id", getBrandById);
router.post("/create_brand/:store_id", upload.single("logo"), createBrand);
router.delete("/delete_brand/:id", deleteBrand);
router.get("/brand_names", getBrandNames);
router.put("/update_brand/:id", upload.single("logo"), updateBrand);

export default router;
