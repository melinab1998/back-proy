import { createProductsMock } from "../services/productsfake.services.js";

export const createProductsCtr = async (req, res) => {
    const { cant } = req.query;
    try {
      const response = await createProductsMock(cant)
      res.status(200).json({ products: response });
    } catch (error) {
      console.log(error);
    }
  };