import React from 'react';
import Navbar from '../navbar/navbar';
import { Grid } from "@material-ui/core";
import './scaffold.css';

interface ScaffoldProps {
    children: React.ReactNode
}

export default function Scaffold({ children }: ScaffoldProps){
    return (
        <>
            <div className="layout-basic-header">
                <Navbar />
            </div>
            <Grid className="layout-basic-content" container justify="center">
                {children}
            </Grid>
        </>
    );
}