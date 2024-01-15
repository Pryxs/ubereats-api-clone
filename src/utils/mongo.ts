import mongoose from "mongoose";

const mongoConnection = async (): Promise<typeof mongoose | undefined> => {
    const url: string | undefined = process.env.DB_URL;

    try {
        if (!url) throw new Error('Empty database url')

        return await mongoose.connect(url);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message)
        } else {
            console.error('Unknown error')
        }
    }
}

export default mongoConnection;