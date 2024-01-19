import { Request, Response } from 'express';
import { CustomerService } from './customer.service';
import type { IResponse } from '../../types';
import type { ICustomer } from './customer.model';
import { sendNotification } from '../../utils/notification';
import jwt from 'jsonwebtoken';

const customerService = CustomerService()

type TokenType = {
  email: string;
  _id: string;
  role: string;
  isVerfy: boolean;
}

export const createCustomer = async (req: Request, res: Response<IResponse<{token: string}>>) => {
  const secretKey = process.env.SECRET_KEY
  if (!secretKey) return res.status(500).send({ ok: false, message: 'Internal server error' })

  try {
    const customer = await customerService.create(req.body)

    const { otp, phone, email, _id, isVerify} = customer as ICustomer & { _id: string};

    sendNotification(phone, otp)

    const token = jwt.sign({ email, _id, isVerify, role: 'customer' }, secretKey);

    res.status(201).send({ ok: true, data: {token} });
  } catch (error) {
    res.status(500).send({ ok: false, message: 'Internal server error' });
  }
}

export const verifyCustomer = async (req: Request, res: Response<IResponse<{token: string}>>) => {
  const secretKey = process.env.SECRET_KEY
  if (!secretKey) return res.status(500).send({ ok: false, message: 'Internal server error' })

  const token = req.headers?.authorization;

  if (!token) throw new Error();

  const { email, _id } = jwt.verify(token, secretKey) as TokenType;

  try {
    const isVerify = await customerService.verify(_id, req.body.otp)

    if(!isVerify) return res.status(400).send({ok: false, message: 'invalid otp'})

    const token = jwt.sign({ email, _id, isVerify, role: 'customer' }, secretKey);

    res.status(200).send({ ok: true, data: {token} });
  } catch (error) {
    res.status(500).send({ ok: false, message: 'Internal server error' });
  }
}

export const getAllCustomers = async (req: Request, res: Response<IResponse<ICustomer[]>>) => {
  try {
    const customers = await customerService.getCustomers()
    res.status(200).send({ ok: true, data: customers });
  } catch (error) {
    res.status(500).send({ ok: false, message: 'Internal server error' });
  }
}
