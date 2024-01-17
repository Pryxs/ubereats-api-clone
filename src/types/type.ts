export type IResponse<TData> = {
    ok: true;
    data: TData
} | {
    ok: false;
    message: string;
}

export type IMulterFile = {
    buffer: Buffer, 
    encoding: string, 
    fieldname: string, 
    mimetype: string, 
    originalname: string, 
    size: number;
};