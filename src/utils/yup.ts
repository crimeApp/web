import * as yup from 'yup';

yup.setLocale({
    mixed: {
        required: ({ path } : any) => ({
            path,
            msg: `Por favor, complete el campo obligatorio.`,
            type: "required"
        }),
        oneOf: ({ path, values }: any) => ({
            path,
            msg: `Por favor, elija una de las opciones disponibles.`,
            type: "oneOf"
        })
    },
    number: {
        min: ({ path, min }: any) => ({
            path,
            msg: `Debe ser mayor o igual a ${min}`,
            type: "min"
        }),
        max: ({ path, max }: any) => ({
            path,
            msg: `Debe ser menor o igual a ${max}`,
            type: "max"
            
        }),
        required: ({ path } : any) => ({
            path,
            msg: `Este campo es obligatorio`,
            type: "required"
        }),
    },
    string: {
        email: ({ path }: any) => ({
            path,
            msg: `El email no es válido.`,
            type: "email"
        }),
        min: ({ path, min }: any) => ({
            path,
            msg: `Debe ser mayor o igual a ${min}`,
            type: "min"
        }),
        max: ({ path, max }: any) => ({
            path,
            msg: `Debe ser menor o igual a ${max}`,
            type: "max"
        }),
        matches: ({ path } : any) => ({
            path,
            msg: `Por favor, ingrese el formato correcto.`,
            type: 'matches'
        })
    },
    object: {
        required: ({ path } : any) => ({
            path,
            msg: `Es un campo obligatorio`,
            type: "required"
        }),
    },
    date: {
        required: ({ path } : any) => ({
            path,
            msg: `Por favor, complete el campo obligatorio.`,
            type: "required"
        }),
        max: ({ path, max }: any) => ({
            path,
            msg: `La fecha debe ser anterior a ${max}`,
            type: "max"
        }),
        min: ({ path, min }: any) => ({
            path,
            msg: `La fecha debe ser posterior a ${min}`,
            type: "min"
        })
    }
})

export default yup;