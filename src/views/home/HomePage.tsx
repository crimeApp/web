import React from "react";
import { useState } from "react";
import { Grid } from "@material-ui/core";
import Scaffold from "../../components/scaffold/scaffold";
import Selector from "../../components/selector/selector";
import { Menu } from "@material-ui/icons";
import Input from "../../components/input/Input";


const HomePage: React.FC = () => {
    return <Scaffold>
        <Grid item xs={12}>
            <h3>HomePage</h3>
        </Grid>
        <Input xs={12} label="Normal" />
        <Selector
            xs={12}
            label="Categoria"
            icon={<Menu />}
            options={["goku", "veggeta", "kuliado"]}
            className="m-top-3 m-bottom-3"
            msg="La categoria te permitira ser conocido por la comunidad"
        />
    </Scaffold>
}

export default HomePage;