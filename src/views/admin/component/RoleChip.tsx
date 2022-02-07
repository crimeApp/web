import { Chip, Tooltip } from "@material-ui/core";
import React from "react";

const label = {
    policia: "background-color-green",
    admin: "background-color-violet",
    funcionario: "background-color-gray",
    not: "background-color-white"
}

const helper = {
    policia: "Permiso de lectura",
    admin: "Permiso de lectura/escritura",
    funcionario: "Permiso de lectura",
    not: "Sin permisos"
}

const ChipRoleAdmin = ({ value = "not" }: { value: "policia" | "admin" | "funcionario" | "not" | undefined }) => 
    <Tooltip title={helper[value]}>
        <Chip className={`${label[value]} color-white w500`} label={value} />
    </Tooltip>

export default ChipRoleAdmin;