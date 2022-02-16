import React, { useState, useRef } from "react";
import Button from "../../components/button/Button";
import Chip from '@material-ui/core/Chip';
import { Grid, GridSize } from '@material-ui/core';
import "./Tag.css";
import Input from "../input/Input";
import { BorderCA, ColorCA } from "../../style/type-style";
import { Label, TagFaces } from "@material-ui/icons";

interface TagsProps {
    id?: string;
    error?: boolean;
    error_msg?: string;
    className?: string;
    refChild?: any;
    maxTags?: number;
    tags?: string[];
    name?: string,
    icon?: React.ReactNode;
    options?: string[],
    onChange: (name: string, tags: string[]) => void;
    border?: BorderCA | undefined;
    label?: string;
    required?: boolean;
    buttonLabel?: string;
    color?: ColorCA;
    subtitle?: string;
    maxLenght?: number;
    msg?: string;
    xs?: GridSize;
    sm?: GridSize;
    md?: GridSize;
    lg?: GridSize;
    xl?: GridSize;
};

type FormElement = React.FormEvent<HTMLFormElement>

const Tags = ({
    className,
    refChild,
    id,
    label = "",
    maxLenght,
    icon = <Label />,
    buttonLabel,
    required,
    subtitle,
    maxTags = 15,
    color="light-gray",
    msg,
    tags = [],
    name = "",
    onChange,
    error,
    error_msg,
    xs,
    sm,
    md,
    lg,
    xl
}: TagsProps) => {

    const [value, set_value] = useState<string>(''),
        [input_value, set_input_value] = useState<string>("")

    const addTag = (value: string) => tags.length < maxTags && onChange(name, [...tags, value].filter(e => e.length > 0));

    const removeTag = (value: string) => {
        return onChange(name, tags.filter((element) => element !== value))
    }

    const handleSubmit = (e?: FormElement) => {
        e?.preventDefault();
        addTag(input_value);
        set_input_value('');
        set_value('');
    };

    return (
        <Grid container className={`m-top-1 ${className}`} id={id} xs={xs} md={md} sm={sm} lg={lg} xl={xl}  >
            <Grid item xs={12} container alignContent="center" alignItems="flex-end">
                <Input
                    iconLeft={icon}
                    refChild={refChild}
                    className="p-1"
                    onChange={(e) => set_input_value(e.target.value as string)}
                    onKeyDown={(e) => e.key === "Enter" ? handleSubmit() : undefined}
                    value={input_value}
                    error={error}
                    error_msg={error_msg}
                    border="small"
                    color={color}
                    maxlenght={maxLenght}
                    label={label}
                    msg={msg}
                    xs={12}
                />
            </Grid>
            <Grid item xs={12}>
                <p className="tags-subtitle">{subtitle}</p>
            </Grid>
            <Grid item xs={12}>
                {
                    tags?.filter(e => e.length > 0).map((t: string) => (
                        <Chip
                            className={`chip-item background-color-${color}`}
                            key={t}
                            label={t + (required ? "*" : "")}
                            size="small"
                            onDelete={() => removeTag(t)} />
                    ))
                }
            </Grid>

        </Grid>
    );
}

export default Tags;