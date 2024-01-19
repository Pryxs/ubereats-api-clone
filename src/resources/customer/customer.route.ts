import express, { Router } from "express";
import { createCustomer, getAllCustomers, verifyCustomer} from "./customer.controller";
import { validator } from "../../middlewares/validator"
import { customerSchema } from './customer.dto'
import { authentificator } from "../../middlewares/authentificator";

const router: Router = express.Router();

router.route('/signup').post(validator(customerSchema), createCustomer)
router.route('/verify').put(verifyCustomer)
router.route('').get(authentificator({ mustBeOwner: false}), getAllCustomers)

export const CustomerRouter = router;
