import { Schema, model } from "mongoose";

export type ICustomer = {
    name: string;
    email: string;
    phone: string;
    password:string;
    isVerify: boolean;
    otp: number;
    otp_expire: number;
}

const validateEmail = (email: string) => {
    const rgx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return rgx.test(email)
};

export const CustomerSchema = new Schema<ICustomer>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        validate: [validateEmail],
        required: true
    },
    phone: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true,
        select: false
    },
    isVerify: {
        type: Boolean,
        required: true
    }, 
    otp: Number,
    otp_expire: Number,
});

export const CustomerModel = model('Customer', CustomerSchema);
