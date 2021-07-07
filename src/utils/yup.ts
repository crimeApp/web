import * as yup from 'yup';

yup.setLocale({
    mixed: {
        required: ({ path } : any) => ({
            path,
            msg: `Por favor, complete el campo obligatorio.`
        }),
        oneOf: ({ path, values }: any) => ({
            path,
            msg: `Por favor, elija una de las opciones disponibles. `
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
            msg: `El campo no es válido.`
        })
    },
    date: {
        required: ({ path } : any) => ({
            path,
            msg: `Por favor, complete el campo obligatorio.`
        }),
    }
})

export default yup;