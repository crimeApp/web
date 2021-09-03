import { Chip } from "@material-ui/core";
import React from "react";

const label = {
    policia: "background-color-green",
    admin: "background-color-violet",
    funcionario: "background-color-gray"
}

const ChipRoleAdmin = ({ value }: { value: "policia" | "admin" | "funcionario" }) => <Chip className={`${label[value]} color-white w500`} label={value} />

export default ChipRoleAdmin;