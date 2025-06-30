const express = require('express');
import { Request, Response } from 'express';
const User = require('../Models/User.schema');

export const searchbyname = async (req: Request, res: Response) => {
  try {
    const { search, searchby } = req.body;

    if (!search || !searchby) {
      return res
        .status(400)
        .json({ message: 'Both search and searchby are required.' });
    }

    const allowedFields = ['fullname', 'email', 'password'];
    if (!allowedFields.includes(searchby)) {
      return res.status(400).json({ message: 'Invalid searchby field.' });
    }

    const query = {
      [searchby]: { $regex: search, $options: 'i' },
    };

    const data = await User.find(query);
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error searching user data', error });
  }
};
