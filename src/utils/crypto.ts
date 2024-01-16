import { hash, compare } from 'bcrypt'

const saltRounds = 10

export const encrypt = async (myPlaintextPassword: string) => await hash(myPlaintextPassword, saltRounds)


export const check = async (myPlaintextPassword: string, hash: string) => await compare(myPlaintextPassword, hash)
