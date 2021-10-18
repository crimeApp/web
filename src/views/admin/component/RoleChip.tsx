import { Chip } from "@material-ui/core";
import React from "react";

const label = {
    policia: "background-color-green",
    admin: "background-color-violet",
    funcionario: "background-color-gray",
    not: "background-color-white"
}

const ChipRoleAdmin = ({ value = "not" }: { value: "policia" | "admin" | "funcionario" | "not" | undefined }) => <Chip className={`${label[value]} color-white w500`} label={value} />

export default ChipRoleAdmin;