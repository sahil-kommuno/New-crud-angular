const express = require('express');
import { Request, Response } from 'express';
const Admin = require('../Models/admin.schema');
const bcrypt = require('bcrypt');
const {
  GenerateToken,
  jwtAuthMiddleware,
} = require('../Middleware/commonMiddleware/Authentication.JWT');
export const adminlogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const checkuser = await Admin.findOne({ email });

    if (!checkuser) {
      return res.status(401).json({ error: 'Unauthorized: User not found' });
    }

    const isMatch = await bcrypt.compare(password, checkuser.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ error: 'Unauthorized: Invalid credentials' });
    }

    const payload = { id: checkuser.id, email: checkuser.email };
    const token = GenerateToken(payload);
    res.status(200).json({
      token,
      payload,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error admin login', error });
  }
};
export const postadmindata = async (req: Request, res: Response) => {
  try {
    const admindata = req.body;
    console.log(req.body);
    const data = await new Admin(admindata).save();
    console.log('data', data);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error saving admin data', error });
  }
};
