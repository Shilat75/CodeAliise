

import tags from "../models/tags.js";

export const getTags = async (req, res) => {
    try {
      const tagsList = await tags.find();
      res.status(200).json(tagsList);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };