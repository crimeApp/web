import { useState, useEffect } from 'react';


interface windowsState {
    width: number | undefined,
    height: number | undefined,
    // Material UI Breackpoint xs < 600
    xs: boolean | undefined,
    // Material UI Breackpoint sm < 960
    sm: boolean | undefined,
    // Material UI Breackpoint md < 1200
    md: boolean | undefined,
    // Material UI Breackpoint lg < 1980
    lg: boolean | undefined,
    // Material UI Breackpoint xl > 1980
    xl: boolean | undefined
}

const useWindowSize = () => {

    const [windowSize, setWindowSize] = useState<windowsState>({
        width: undefined,
        height: undefined,
        xs: undefined,
        sm: undefined,
        md: undefined,
        lg: undefined,
        xl: undefined
    });

    useEffect(() => {

        const handleResize = () => setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
            xs: window.innerWidth < 600,
            sm: window.innerWidth < 960,
            md: window.innerWidth < 1280,
            lg: window.innerWidth < 1920,
            xl: window.innerWidth > 1920
        });

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => window.removeEventListener("resize", handleResize);

    }, []);

    return windowSize;
}

export default useWindowSize;