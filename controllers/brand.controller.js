import { connectToDatabase } from "../config/db.js";
import { promises as fs } from "fs";
import { Op } from "sequelize";

// get all brands by store id
const getAllBrands = async (req, res) => {
  try {
    const { Brand } = await connectToDatabase();
    const brands = await Brand.findAll({
      where: {
        is_active: true,
        store_id: req.params.store_id,
      },
    });
    return res.status(200).json(brands);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// get brand by id
const getBrandById = async (req, res) => {
  try {
    const { Brand } = await connectToDatabase();
    const brand = await Brand.findOne({
      where: {
        brand_id: req.params.id,
        is_active: true,
        store_id: req.params.store_id,
      },
    });
    return res.status(200).json({
      brand,
      message: brand ? "Brand found" : "Brand not found",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// add brand with logo
const createBrand = async (req, res) => {
  try {
    const { Brand } = await connectToDatabase();
    let logoBase64 = null;

    // Check if brand already exists
    const brandExists = await Brand.findOne({
      where: {
        brand: req.body.brand,
        is_active: true,
        store_id: req.params.store_id,
      },
    });

    if (brandExists) {
      if (brandExists.is_active) {
        // If file was uploaded, delete it
        if (req.file) {
          await fs.unlink(req.file.path).catch(console.error);
        }
        return res.status(400).json({
          message: "Brand already exists",
          brand: brandExists,
        });
      } else {
        await brandExists.update({
          is_active: true,
          status: req.body.status === "false" ? false : true,
          logo: logoBase64,
          updated_on: new Date(),
        });
        return res.status(200).json({
          message: "Brand activated successfully",
          brand: brandExists,
        });
      }
    }

    if (req.file) {
      // Read the file and convert to base64
      const fileData = await fs.readFile(req.file.path);
      logoBase64 = `data:${req.file.mimetype};base64,${fileData.toString(
        "base64"
      )}`;

      // Delete the uploaded file after conversion
      await fs.unlink(req.file.path).catch(console.error);
    }

    const created_on = new Date();

    const brand = await Brand.create({
      brand: req.body.brand,
      logo: logoBase64,
      status: req.body.status === "false" ? false : true,
      created_on,
      store_id: req.params.store_id,
    });

    return res.status(201).json({
      message: "Brand added successfully",
      brand,
    });
  } catch (error) {
    // Clean up uploaded file if there's an error
    if (req.file) {
      await fs.unlink(req.file.path).catch(console.error);
    }
    return res.status(500).json({ error: error.message });
  }
};

// delete brand
const deleteBrand = async (req, res) => {
  let transaction;
  try {
    const { Brand, Product, sequelizeDatabase } = await connectToDatabase();
    transaction = await sequelizeDatabase.transaction();

    const brand = await Brand.findOne({
      where: {
        brand_id: req.params.id,
      },
      transaction,
    });
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    await brand.update({ is_active: false }, { transaction });

    await Product.update(
      {
        is_active: false,
        brand_id: null,
      },
      {
        where: {
          brand_id: req.params.id,
        },
        transaction,
      }
    );
    await transaction.commit();
    return res.status(200).json({ message: "Brand deleted successfully" });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    return res.status(500).json({ error: error.message });
  }
};

// Update existing brand controller to handle logo updates
const updateBrand = async (req, res) => {
  try {
    const { Brand } = await connectToDatabase();
    const brand = await Brand.findOne({
      where: {
        brand_id: req.params.id,
      },
    });

    if (!brand) {
      // Clean up uploaded file if brand not found
      if (req.file) {
        await fs.unlink(req.file.path).catch(console.error);
      }
      return res.status(404).json({ message: "Brand not found" });
    }

    // Check if new brand name exists
    if (req.body.brand) {
      const existingBrand = await Brand.findOne({
        where: {
          brand: req.body.brand,
          brand_id: { [Op.ne]: brand.brand_id },
        },
      });

      if (existingBrand) {
        if (req.file) {
          await fs.unlink(req.file.path).catch(console.error);
        }
        return res.status(400).json({
          message: existingBrand.is_active
            ? "Brand is already active"
            : "Brand is already inactive",
          existingBrand,
        });
      }
    }

    // Handle logo update if file is uploaded
    let logoBase64 = brand.logo; // Keep existing logo by default
    if (req.file) {
      // Read the file and convert to base64
      const fileData = await fs.readFile(req.file.path);
      logoBase64 = `data:${req.file.mimetype};base64,${fileData.toString(
        "base64"
      )}`;

      // Delete the uploaded file after conversion
      await fs.unlink(req.file.path).catch(console.error);
    }

    // Update fields
    if (req.body.brand) brand.brand = req.body.brand;
    brand.logo = logoBase64;
    if (req.body.status !== undefined) {
      brand.status = req.body.status === "false" ? false : true;
    }

    await brand.save();

    return res.status(200).json({
      message: "Brand updated successfully",
      brand,
    });
  } catch (error) {
    // Clean up uploaded file if there's an error
    if (req.file) {
      await fs.unlink(req.file.path).catch(console.error);
    }
    return res.status(500).json({ error: error.message });
  }
};

// get all brandnames
const getBrandNames = async (req, res) => {
  try {
    const { Brand } = await connectToDatabase();
    const brands = await Brand.findAll({
      attributes: ["brand_id", "brand"],
      where: { is_active: true, status: true },
    });
    return res.status(200).json(brands);
  } catch {
    return res
      .status(500)
      .json({ error: error.message, message: "Error getting brand names" });
  }
};

export {
  getAllBrands,
  getBrandById,
  createBrand,
  deleteBrand,
  updateBrand,
  getBrandNames,
};
