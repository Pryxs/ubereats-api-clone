import { Twilio } from "twilio";

export const sendNotification = (phone: string, otp: number) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const phoneNumber = process.env.TWILIO_FROM_TEL
    const client = new Twilio(accountSid, authToken);
    
    if(client && phoneNumber) {
        client.messages.create({
            body: `this is your otp : ${otp}`,
            to: phone,
            from: phoneNumber,
        })
        .then((message: any) => console.log(message));
    } else {
        console.error('Miss config')
    }
}

