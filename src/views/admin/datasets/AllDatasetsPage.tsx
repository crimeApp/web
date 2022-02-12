import { Accordion, AccordionDetails, AccordionSummary, Grid, IconButton, Menu, MenuItem, Tooltip } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import HandlePetitions from "../../../components/handle-peticion/HandlePetions";
import Button from "../../../components/button/Button";
import useHandlePage from "../../../hooks/useHandlePage";
import useWindowSize from "../../../hooks/useWindows";
import { UnixToDay } from "../../../utils/time";
import { AdminContext } from "../../../context/admin-context";
import ScaffoldAdmin from "../component/ScaffoldAdmin";
import { useHistory } from "react-router";
import { HandleAPI } from "../../../utils/handle-api";
import Translate from "../../../assets/traslate";
import { BackButtonString } from "../component/BackButton";
import { StadisticModel } from "../../../models/stadistic.model";
import { Add, MoreVert, Public } from "@material-ui/icons";
import { TotalCasesByMonths } from "../../../utils/stadistcs-to";
import { Skeleton } from "@material-ui/lab";

const DatasetsPage = () => {

    const [handle_page, set_handle_page] = useHandlePage({ loading: true })
        , { admin_state, admin_dispatch } = useContext(AdminContext)
        , TRANSLATE = Translate["ES"]
        , history = useHistory()
        , [datasets, set_datasets] = useState<StadisticModel[]>([])
        , { xs } = useWindowSize()
        , [data_selected, set_data_selected] = useState<StadisticModel>()
        , loadMore = async () => {
            if (!datasets || datasets?.length < 1) return
            const request = await HandleAPI({
                method: "get",
                path: `/admin/stadistics?timestamp=${datasets[datasets.length - 1].createdAt}`,
                config: {
                    headers: {
                        Authorization: `Bearer ${admin_state.token}`
                    }
                }
            })

            if (!request) return set_handle_page({
                loading: false,
                error: true,
                notification: true,
                msg: TRANSLATE.ERRORS.INTERNAL_SERVER_ERROR
            })

            switch (request.status) {
                case 200:
                    set_datasets(prev => [...prev, request.data])
                    return set_handle_page(prev => ({
                        ...prev,
                        loading: false,
                        error: (request.data.length < 10)
                    }))
                case 401:
                    return set_handle_page({
                        loading: false,
                        error: true,
                        severity: "error",
                        color: "red",
                        msg: TRANSLATE.ERRORS.UNAUTH,
                        callback: () => history.push("/admin/login")
                    })
                default:
                    return set_handle_page({
                        loading: false,
                        error: true,
                        notification: true,
                        color: "red",
                        severity: "error",
                        msg: TRANSLATE.ERRORS.INTERNAL_SERVER_ERROR
                    })
            }
        }

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event, data: StadisticModel) => {
        set_data_selected(data)
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const makePublic = async () => {
        if (!data_selected) return
        set_handle_page(prev => ({ ...prev, loading: true }));

        const request = await HandleAPI({
            method: "post",
            path: `/admin/stadistic/${data_selected.id}`,
            config: {
                headers: {
                    Authorization: `Bearer ${admin_state.token}`
                }
            }
        })

        if (!request) return set_handle_page({
            loading: false,
            error: true,
            notification: true,
            severity: "error",
            color: "red",
            msg: TRANSLATE.ERRORS.INTERNAL_SERVER_ERROR
        })

        switch (request.status) {
            case 200:
                set_datasets(prev => prev?.map(data => data.id === data_selected.id ? { ...data, public: true } : data))
                set_handle_page(prev => ({
                    ...prev,
                    loading: false,
                    notification: true,
                    msg: TRANSLATE.OK.SAVE,
                    severity: "success",
                    color: "green",
                }))
                break;
            case 400:
                set_handle_page({
                    loading: false,
                    error: true,
                    severity: "error",
                    color: "red",
                    msg: TRANSLATE.ERRORS.BAD_REQUEST,
                    callback: () => history.push(TRANSLATE.ROUTES.ADMIN.LOGIN)
                })
                break;
            case 401:
                set_handle_page({
                    loading: false,
                    error: true,
                    severity: "error",
                    color: "red",
                    msg: TRANSLATE.ERRORS.UNAUTH,
                    callback: () => history.push(TRANSLATE.ROUTES.ADMIN.LOGIN)
                });
                break;
            case 403:
                set_handle_page({
                    loading: false,
                    error: true,
                    severity: "error",
                    color: "red",
                    msg: TRANSLATE.ERRORS.NOT_ADMIN,
                    callback: () => history.goBack()
                })
                break;
            default:
                set_handle_page({
                    loading: false,
                    error: true,
                    notification: true,
                    color: "red",
                    severity: "error",
                    msg: TRANSLATE.ERRORS.INTERNAL_SERVER_ERROR
                });
                break;
        }
        handleClose();
    }

    const deleteDataset = async () => {
        if (!data_selected) return
        set_handle_page(prev => ({ ...prev, loading: true }));

        const request = await HandleAPI({
            method: "delete",
            path: `/admin/stadistic/${data_selected.id}`,
            config: {
                headers: {
                    Authorization: `Bearer ${admin_state.token}`
                }
            }
        })

        if (!request) return set_handle_page({
            loading: false,
            error: true,
            notification: true,
            severity: "error",
            color: "red",
            msg: TRANSLATE.ERRORS.INTERNAL_SERVER_ERROR
        })

        switch (request.status) {
            case 200:
                set_datasets(prev => prev?.filter(data => data.id !== data_selected.id))
                set_handle_page(prev => ({
                    ...prev,
                    loading: false,
                    notification: true,
                    msg: TRANSLATE.OK.SAVE,
                    severity: "success",
                    color: "green",
                }))
                break;
            case 400:
                set_handle_page({
                    loading: false,
                    error: true,
                    severity: "error",
                    color: "red",
                    msg: TRANSLATE.ERRORS.BAD_REQUEST,
                    callback: () => history.push(TRANSLATE.ROUTES.ADMIN.LOGIN)
                })
                break;
            case 401:
                set_handle_page({
                    loading: false,
                    error: true,
                    severity: "error",
                    color: "red",
                    msg: TRANSLATE.ERRORS.UNAUTH,
                    callback: () => history.push(TRANSLATE.ROUTES.ADMIN.LOGIN)
                });
                break;
            case 403:
                set_handle_page({
                    loading: false,
                    error: true,
                    severity: "error",
                    color: "red",
                    msg: TRANSLATE.ERRORS.NOT_ADMIN,
                    callback: () => history.goBack()
                })
                break;
            default:
                set_handle_page({
                    loading: false,
                    error: true,
                    notification: true,
                    color: "red",
                    severity: "error",
                    msg: TRANSLATE.ERRORS.INTERNAL_SERVER_ERROR
                });
                break;
        }
        handleClose();
    }

    const useDataset = () => {
        admin_dispatch({
            type: "CHANGE_DB",
            payload: data_selected
        })
        return history.push(TRANSLATE.ROUTES.ADMIN.STADISTICS.HOME)
    }

    useEffect(() => {
        (async () => {
            const request = await HandleAPI({
                method: "get",
                path: "/admin/stadistics",
                config: {
                    headers: {
                        Authorization: `Bearer ${admin_state.token}`
                    }
                }
            })

            if (!request) return set_handle_page({
                loading: false,
                error: true,
                notification: true,
                severity: "error",
                color: "red",
                msg: TRANSLATE.ERRORS.INTERNAL_SERVER_ERROR
            })

            switch (request.status) {
                case 200:
                    set_datasets(request.data)
                    return set_handle_page(prev => ({
                        ...prev,
                        loading: false,
                        error: (request.data.length < 10)
                    }))
                case 401:
                    return set_handle_page({
                        loading: false,
                        error: true,
                        severity: "error",
                        color: "red",
                        msg: TRANSLATE.ERRORS.UNAUTH,
                        callback: () => history.push("/admin/login")
                    })
                default:
                    return set_handle_page({
                        loading: false,
                        error: true,
                        notification: true,
                        color: "red",
                        severity: "error",
                        msg: TRANSLATE.ERRORS.INTERNAL_SERVER_ERROR
                    })
            }
        })();
    }, [])

    return <ScaffoldAdmin className="p-left-2 p-right-2 p-bottom-4 m-bottom-4">
        <HandlePetitions
            handlePage={handle_page}
            setHandlePage={set_handle_page}
        />
        <BackButtonString className="p-left-1" />
        <Grid item xs>
            <h3 className="p-left-1">{TRANSLATE.DATASETS.TITLE}</h3>
        </Grid>
        <div className="button-hover-expand m-left-2" onClick={() => history.push(TRANSLATE.ROUTES.ADMIN.STADISTICS.NEW)}>
            <Add className="icon" />
            <span className="text">{TRANSLATE.DATASETS.CREATE}</span>
        </div>
        <Grid item xs={12}>
            <p className="p-left-1">{TRANSLATE.DATASETS.TITLE_HINT}</p>
        </Grid>
        <Grid item xs={12} container justify="center" className="m-top-1 p-1 background-color-white border-small shadow">
            <Grid item xs={12} className="p-1" container>
                <Grid item xs={4} sm={2} className="m-top-2" container justify="center">
                    <h5>
                        Nombre
                    </h5>
                </Grid>
                <Grid item xs={7} sm={5} className="m-top-2" container justify="center">
                    <h5>
                        Descripcion
                    </h5>
                </Grid>
                {
                    !xs && <>
                        <Grid item xs={2} className="m-top-2" container justify="center">
                            <h5>
                                CUIT Creador
                            </h5>
                        </Grid>
                        <Grid item xs={2} className="m-top-2" container justify="center" alignItems="center">
                            <h5>
                                Fecha
                            </h5>
                        </Grid>
                    </>
                }
            </Grid>
            <Grid item xs={12} container alignContent="center" alignItems="center" justify="center" className="m-top-2">
                {
                    datasets.length > 1 ?
                        datasets.map((data, index) =>
                            <Accordion elevation={0} style={{ width: '100%' }} className={` background-color-${index % 2 ? "white" : "light-gray"}`}>
                                <AccordionSummary >
                                    <Grid container key={data.name} xs={12} alignItems="center">
                                        <Grid item xs={4} sm={2} className="m-top-1 m-bottom-1" container justify="center" alignItems="center">
                                            <p>
                                                {data.name}
                                            </p>
                                        </Grid>
                                        <Grid item xs={7} sm={5} className="m-top-1 m-bottom-1" container justify="center" alignItems="center">
                                            <p>
                                                {data.description}
                                            </p>
                                        </Grid>
                                        {
                                            !xs &&
                                            <>
                                                <Grid item xs={2} className="m-top-1 m-bottom-1" container justify="center" alignItems="center" onClick={() => history.push(`/admin/users/${data.createdByID}`)}>
                                                    <p>
                                                        {data.createdByID}
                                                    </p>
                                                </Grid>
                                                <Grid item xs={2} className="m-top-1 m-bottom-1" container justify="center" alignItems="center">
                                                    <p>
                                                        {UnixToDay(data?.createdAt)}
                                                    </p>
                                                </Grid>
                                            </>
                                        }
                                        <Grid item xs={12} sm container justify="flex-end">
                                            {
                                                data.public &&
                                                <Tooltip title={TRANSLATE.DATASETS.PUBLIC}>
                                                    <IconButton>
                                                        <Public />
                                                    </IconButton>
                                                </Tooltip>
                                            }
                                            <IconButton onClick={(e) => handleClick(e, data)}>
                                                <MoreVert />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container key={data.name} xs={12} alignItems="center">
                                        <Grid item xs={12} className="background-color-grey border-small m-bottom-3" style={{ height: '3px' }} />
                                        <Grid className="p-left-2 p-right-2" item xs={12} container alignItems="flex-start">
                                            <Grid item xs={12}>
                                                <h4>Cantidad de casos reportados</h4>
                                            </Grid>
                                            {
                                                TotalCasesByMonths(data).map(struct => <Grid item xs={12} sm={6} md={3}>
                                                    <Grid item xs={12}>
                                                        <h5>{struct.year}</h5>
                                                    </Grid>
                                                    {
                                                        struct.months.map(month => <Grid item xs={12} container>
                                                            <p className="w500">{month.month}:</p><p>{month.total}</p>
                                                        </Grid>)
                                                    }
                                                </Grid>)
                                            }
                                        </Grid>
                                        <Grid item xs={12} className="p-left-2 p-right-2" container>
                                            <p className="w500">Cantidad de datos:</p><p> {data.total} </p>
                                        </Grid>
                                        <Grid item xs={12} className="p-left-2 p-right-2">
                                            <p>Creado el: {UnixToDay(data.createdAt)} </p>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        )
                        :
                        <Grid item xs={12} className='p-bottom-1' container >
                            {
                                Array.from({ length: 5 }).map(e =>
                                    <Skeleton className='m-top-1 border-small' height='74px' width='100%' variant="rect" />)
                            }
                        </Grid>
                }
            </Grid>
        </Grid>
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem onClick={makePublic}>{TRANSLATE.DATASETS.MAKE_PUBLIC}</MenuItem>
            <MenuItem onClick={useDataset}>{TRANSLATE.DATASETS.SELECT_DATASET}</MenuItem>
            <MenuItem onClick={deleteDataset}>{TRANSLATE.DATASETS.DELECT_DATASET}</MenuItem>
        </Menu>
        {
            !handle_page.error && <Button className="m-top-3" xs={12} sm={6} label="Cargar Mas" onClick={loadMore} />
        }
    </ScaffoldAdmin>
}

export default DatasetsPage;