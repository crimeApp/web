import * as yup from 'yup';

yup.setLocale({
    mixed: {
        required: ({ path } : any) => ({
            path,
            msg: `Es un campo obligatorio`
        }),
        oneOf: ({ path, values }: any) => ({
            path,
            msg: `Deberia de ser alguno de los opciones`
        })
    },
    number: {
        min: ({ path, min }: any) => ({
            path,
            msg: `Debe ser mayor o igual a ${min}`
        }),
        max: ({ path, max }: any) => ({
            path,
            msg: `Debe ser menor o igual a ${max}`,
        })
    },
    string: {
        email: ({ path }: any) => ({
            path,
            msg: `El campo no es valido`
        })
    }
})

export default yup;