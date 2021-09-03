export type UserModel = {
    name: string,
    surname: string,
    cuit: string,
    phone: string,
    mail: string,
    role: "policia" |"admin" |"funcionario",
    password: string,
    place: string,
    createdAt: number
}