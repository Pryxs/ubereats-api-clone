export type IResponse<TData> = {
    ok: true;
    data: TData
} | {
    ok: false;
    message: string;
}