import React from 'react';
import { Tooltip } from "@material-ui/core"

const MAP = {
    'Pendiente': 'pending.png',
    'Cancelado': 'cancel.png',
    'Revisado': 'verify.png'
};

const StateSiniester = ({ state='Pendiente', size='40px' } : { state: string, size?: string}) =>
    <Tooltip title={`Estado del siniestro: ${state}`}>
        <img 
            src={`${process.env.PUBLIC_URL}/assets/states/${MAP[state]}`}
            style={{
                objectFit: 'contain',
                width: size,
                height: size
            }}
        />
    </Tooltip>

export default StateSiniester;