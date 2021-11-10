const Validator = async (values: any, schema: any): Promise<{ err: boolean, data: any }> => {
    try {
        const data = await schema.validateSync(values, { abortEarly: false, stripUnknown: true })
        return {
            err: false,
            data: data
        }
    } catch (err) {
        let object = {}
        // @ts-ignore
        err.errors.map((value: any) => {
            object = {
                ...object,
                [value.path]: {
                    msg: value.msg,
                    type: value.type,
                    error: true
                }
            }
        });
        return {
            err: true,
            data: object
        };
    }
}

export default Validator;