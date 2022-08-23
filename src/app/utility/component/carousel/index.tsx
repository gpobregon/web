import Carousel from 'react-bootstrap/Carousel';

const  CustomCarusel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://viajes.nationalgeographic.com.es/medio/2018/03/15/templo-del-gran-jaguar-tikal-guatemala_5c6cb341_1280x720.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.prensalibre.com/wp-content/uploads/2021/07/viajar-a-guatemala.jpg?quality=52&w=760&h=430&crop=1"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/latin-america/guatemala.jpg?crop=0%2C90%2C1555%2C855&wid=4000&hei=2200&scl=0.38875"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CustomCarusel;