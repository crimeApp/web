import React, { Fragment, useEffect, useState } from "react";
import {
  Grid,
  Button,
  Card as CardMUI,
  CardContent,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Link,
  Chip
} from "@material-ui/core";
import traslate from "../../assets/traslate/es.json";
//import unitData from "../../assets/judicial-units.json";
import Scaffold from "../../components/scaffold/scaffold";
import "./HomePage.css";
import MapMarkers from "../../components/map/MapMarkers";

function HomePage() {

  const [user_position, set_position] = useState({
    lat: -31.42182659888641,
    lng: -64.18388759242008
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      set_position({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  return (
    <Scaffold>
      <Grid
        item
        xs={12}
        container
        className="p-1"
        justify="center"
        alignItems="center"
        alignContent="center"
      >
        <Grid item xs={12} md={10} className='p-1'>
          <Card>
            <Grid item xs={12} sm={6} className='p-left-1 p-right-1'>
              <h3>{traslate.FORM.INFO}</h3>
              <p className="home-subtitle">
                {traslate.FORM.EXPLANATION}
              </p>
              <img
                alt="CardPhoto"
                className="img-desktop"
                style={{
                  objectPosition: "center"
                }}
                src={process.env.PUBLIC_URL + "/assets/home_page.png"}
              />
            </Grid>
            <Grid item xs={12} sm={6} className='m-top-3' container justify="center" alignContent="center">
              <FlashAccess />
            </Grid>
          </Card>
          <Grid item xs={12} className='p-top-2 p-bottom-2'>
            <Card>
              <Grid item xs={12} sm={6} className='p-left-3'>
                <h4>{traslate.INSTRUCTIONS.INTRO}</h4>
                {explanation}
              </Grid>
              <Grid item xs={12} sm={6} className='p-right-3'>
                <MapMarkers
                  xs={12}
                  label={"Encontrá las unidades más cercanas acá."}
                  positionCenter={user_position}
                  positions={
                    [
                      { lat: -31.382232224204365, lng: -64.18447639101693, name: "casa de juan" },
                      { lat: -31.40385792696248, lng: -64.21283551834296, name: "casa de juan" },
                      { lat: -31.38536, lng: -64.17993, name: "casa de juan" },
                    ]
                  }
                />
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Scaffold>
  );
}

export default HomePage;

const explanation = (
  <Fragment>
    {[
      `${traslate.INSTRUCTIONS[1]}`,
      `${traslate.INSTRUCTIONS[2]}`,
      `${traslate.INSTRUCTIONS[3]}`,
      `${traslate.INSTRUCTIONS[4]}`,
    ].map((text, index) => {
      const labelId = `checkbox-list-label-${index}`;

      return (
        <ListItem key={index} role={undefined} dense>
          <ListItemAvatar>
            <Avatar>
              <Avatar>{index + 1}</Avatar>
            </Avatar>
          </ListItemAvatar>
          <ListItemText id={labelId}>
            {index === 0 ? (
              <div>
                {text}
                <Link
                  underline="none"
                  color="primary"
                  href="http://www.mpfcordoba.gob.ar/como-hacer-una-denuncia/"
                >
                  Ministerio Público Fiscal.
                </Link>
              </div>
            ) : (
                text
              )}
          </ListItemText>
        </ListItem>
      );
    })}
  </Fragment>
);

const Card = ({ children }: any) => (
  <CardMUI variant="elevation">
    <CardContent>
      <Grid
        container
        direction="row"
        justify="center"
        alignContent="center"
      >
        {children}
      </Grid>
    </CardContent>
  </CardMUI>
);

const FlashAccess = () => (
  <>

    {
      [
        {
          title: traslate.MENU.CURRENTCRIME,
          description: traslate["FORM"]["CURRENT-INTRO"],
          href: ""
        },
        {
          title: traslate.MENU.PASTCRIME,
          description: traslate["FORM"]["PAST-INTRO"],
          href: "/past-crime-form"
        }
      ].map(card => <Grid key={card.title}
        item xs={12}
        className="home-wrap p-top-2 p-bottom-2 m-top-2"
        container
        justify="center"
      >
        <Grid item xs={10}>
          <h3 className="m-0 m-top-1">{card.title} {card.title === traslate.MENU.CURRENTCRIME ?
            <Chip
              className='p-1 m-left-1'
              variant="outlined"
              color='primary'
              size="small"
              label="Próximamente"
            /> : null}</h3>
          
             <p className="home-subtitle m-0">{card.description}</p>
        </Grid>
  
        <Grid item xs={10} container justify="center" className="m-top-2">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            href={card.href}
          >
            {traslate.COMMON.START}
          </Button>
        </Grid>
      </Grid>)
    }
  </>
);