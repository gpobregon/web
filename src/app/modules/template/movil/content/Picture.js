import { useDrag } from "react-dnd";

function Picture({ data }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: data.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <img
      alt=""
      ref={drag}
      src={data.url}
      width="150px"
      style={{ border: isDragging ? "5px solid pink" : "0px" }}
    />
  );
}

export default Picture;
