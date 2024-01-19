import { CustomerModel, ICustomer } from "./customer.model";
import { encrypt } from "../../utils/crypto";
import { ObjectId } from "mongoose";

export const CustomerService = () => {
    const create = async (newCustomer: ICustomer): Promise<ICustomer> => {
        const hashedPwd = await encrypt(newCustomer.password);
        const otp = Math.floor(Math.random() * 900000) + 100000;
        const currentDate = new Date();
        const otp_expire = new Date(currentDate.getTime() + (48 * 60 * 60 * 1000))
        
        const customer = new CustomerModel({
            ...newCustomer, 
            password: hashedPwd, 
            isVerify: false,
            otp,
            otp_expire
        })
        
        return await customer.save();
    }

    const verify = async (id: string, otp: number): Promise<boolean> => {
        const customer = await CustomerModel.findOne({ _id: id})

        if(!customer) throw new Error();
                
        if(customer.otp_expire < Date.now()) throw new Error()
        
        if(customer.otp === otp) {
            const modif = await CustomerModel.findByIdAndUpdate(id, { $set: { isVerify: true } });
            console.log(id)
            return true;
        }
        
        return false;
    }

    const getCustomers = async (): Promise<ICustomer[]> => await CustomerModel.find()

    return {
        create,
        verify,
        getCustomers,
    }
}
