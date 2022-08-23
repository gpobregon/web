import { Fragment } from "react";
import { Pannellum } from "pannellum-react";

const Image360 = () => {
  return (
    <Fragment>
      <Pannellum
        width="100%"
        height="300px"
        image={'https://pannellum.org/images/cerro-toco-0.jpg'}
        pitch={10}
        yaw={180}
        hfov={110}
        autoLoad
        showZoomCtrl={false}
        onLoad={() => {
          console.log("panorama loaded");
        }}
      >
        <Pannellum.Hotspot
          type="custom"
          pitch={31}
          yaw={150}
          handleClick={(evt, name) => console.log(name)}
          name="hs1"
        />
      </Pannellum>
    </Fragment>
  );
}

export default Image360