import React from "react";
import { useState } from "react";
import { Grid } from "@material-ui/core";
import Scaffold from "../../components/scaffold/scaffold";
import Selector from "../../components/selector/selector";
import { Menu } from "@material-ui/icons";
import Input from "../../components/input/Input";


const HomePage: React.FC = () => {
    return <Scaffold>
        <h3>HomePage</h3>
        <Input />
        <Selector
            label="Categoria"
            icon={<Menu />}
            options={["goku", "veggeta", "kuliado"]}
            className="m-top-3 m-bottom-3"
            msg="La categoria te permitira ser conocido por la comunidad"
            />
    </Scaffold>
}

        export default HomePage;