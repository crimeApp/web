import React from 'react';
import Navbar from '../navbar/navbar';
import { Grid } from "@material-ui/core";
import './scaffold.css';

interface ScaffoldProps {
    className?: string,
    children: React.ReactNode
}

export default function Scaffold({ className, children }: ScaffoldProps){
    return (
        <>
            <div className="layout-basic-header">
                <Navbar />
            </div>
            <Grid className={`layout-basic-content ${className}`} container justify="center">
                {children}
            </Grid>
        </>
    );
}