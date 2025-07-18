const express = require('express');
import { Request, Response } from 'express';
const User = require('../Models/User.schema');
import upload from '../Image.Upload/user.Upload.Image';
const mongoose = require('mongoose');
export const postdata = async (req: Request, res: Response) => {
  try {
    const userdata = {
      fullname: req.body.fullname,
      email: req.body.email,
      password: req.body.password,
      image: req.file?.filename,
      regid: req.body.regid,
    };
    const data = await new User(userdata).save();
    console.log(data);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error saving user data', error });
  }
};
export const getdata = async (req: Request, res: Response) => {
  try {
    const { regid } = req.body;

    if (!mongoose.Types.ObjectId.isValid(regid)) {
      return res.status(400).json({ message: 'Invalid regid' });
    }

    const regidObj = new mongoose.Types.ObjectId(regid);

    const data = await User.aggregate([
      {
        $match: {
          regid: regid,
        },
      },
      {
        $addFields: {
          regidObj: { $toObjectId: '$regid' },
        },
      },
      {
        $lookup: {
          from: 'adminlogindatas',
          localField: 'regidObj',
          foreignField: '_id',
          as: 'userInfo',
        },
      },
      {
        $unwind: '$userInfo',
      },
      {
        $project: {
          fullname: 1,
          email: 1,
          image: 1,
          createdAt: 1,
          'userInfo.email': 1,
        },
      },
    ]);

    res.status(200).json(data);
  } catch (error) {
    console.error('Aggregation error:', error);
    res.status(400).json({ message: 'Error getting user data', error });
  }
};

export const deletedata = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deletedata = await User.findByIdAndDelete(id);
    res.status(200).json(deletedata);
  } catch (error) {
    res.status(400).json({ message: 'Error deleting user data', error });
  }
};
export const updatedata = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const userdata = {
      fullname: req.body.fullname,
      email: req.body.email,
      password: req.body.password,
      image: req.file?.filename,
    };
    const updatedata = await User.findByIdAndUpdate(id, userdata, {
      new: true,
    });
    res.status(200).json(updatedata);
  } catch (error) {
    res.status(400).json({ message: 'Error deleting user data', error });
  }
};
