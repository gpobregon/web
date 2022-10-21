import { FC } from 'react'
import Carousel from 'react-bootstrap/Carousel';
type Model = {
  list: any
}

const CustomCarusel: FC<Model> = ({ list }) => {

  return (
    <div className="h-50 my-2">
      <Carousel fade>
        {
          list.map((item: any, index: number) => {
            return (
              <Carousel.Item key={index} className="d-flex justify-content-center">
                <img
                  className="d-block h-100 w-100"
                  src={item.url}
                  alt={item.titulo}
                  style={{ maxHeight: '540px' }}
                />
                <Carousel.Caption>
                  <h3 className="text-white">{item.titulo}</h3>
                  <p>{item.descripcion}</p>
                </Carousel.Caption>
              </Carousel.Item>
            )
          })
        }
      </Carousel>
    </div>
  );
}

export default CustomCarusel;