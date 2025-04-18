import express from "express";
const router = express.Router();
import upload from "../middleware/upload.middleware.js";
import {
  getAllBrands,
  getBrandById,
  createBrand,
  deleteBrand,
  updateBrand,
  getBrandNames,
} from "../controllers/brand.controller.js";

router.get("/get_all_brands", getAllBrands);
router.get("/get_brand/:id", getBrandById);
router.post("/create_brand", upload.single("logo"), createBrand);
router.put("/update_brand/:id", upload.single("logo"), updateBrand);
router.delete("/delete_brand/:id", deleteBrand);
router.get("/brand_names", getBrandNames);

export default router;
