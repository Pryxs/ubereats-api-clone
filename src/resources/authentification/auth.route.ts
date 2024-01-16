import express, { Router } from "express";
import { login } from "./auth.controller";


const router: Router = express.Router();

// retounre jwt token
router.route('').post(login)

export const AuthRouter = router