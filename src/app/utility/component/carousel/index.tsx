import { FC } from 'react'
import Carousel from 'react-bootstrap/Carousel';
type Model = {
  list: any
}

const  CustomCarusel: FC<Model> = ({ list }) => {

  return (
    <Carousel>
      {
        list.map((item: any, index: number) => {
          return (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={item.url}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>{item.titulo}</h3>
                <p>{item.descripcion}</p>
              </Carousel.Caption>
            </Carousel.Item>
          )
        })
      }
    </Carousel>
  );
}

export default CustomCarusel;