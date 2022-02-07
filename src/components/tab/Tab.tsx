import { Grid, GridSize, Paper, Tab, Tabs as TabsM } from "@material-ui/core";
import React, { useState } from "react";
import "./Tab.css"

interface TabPanelProps {
    children: React.ReactNode;
    index: any;
    value: any;
    padding?: any;
    className?: string;
}

function TabPanel({ children, value, index, padding = 1, className, ...other }: TabPanelProps) {
    return (value === index ? <> {children} </> : null);
}

interface TabProps {
    padding?: any;
    className?: string;
}

interface TabsProps {
    labels: string[];
    className?: string,
    xs?: GridSize;
    sm?: GridSize;
    md?: GridSize;
    lg?: GridSize;
    xl?: GridSize;
    children: React.ReactNode[];
    tabProps?: TabProps;
    variant?: "scrollable" | "fullWidth" | "standard";
}

const Tabs = ({
    labels,
    xs,
    sm,
    md,
    lg,
    xl,
    children,
    className,
    variant = "fullWidth",
    tabProps }: TabsProps) => {

    const [value, setValue] = useState<number>(0);

    if (labels.length != children.length) {
        console.error("Labels lenght and children lenght should be equals")
    }

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return <>
        <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl} className={`tab shadow ${className}`}>
            <Paper>
                <TabsM style={{ borderRadius: "5px 5px 0px 0px" }} value={value} variant={variant} onChange={handleChange}>
                    {
                        labels.map((label, index) => <Tab key={index.toString()} label={label} value={index} />)
                    }
                </TabsM>
            </Paper>
        </Grid>
        {
            children.map((child, index) => <TabPanel {...tabProps} key={index} index={index} value={value} >{child}</TabPanel>)
        }
    </>

}

export default Tabs;