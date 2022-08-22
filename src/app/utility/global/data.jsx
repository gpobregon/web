const Texts = [
  {
    id: 1,
    type: "title",
    text: 'Título',
    size: "h1",
    textAling: "text-center",
    fontWeight: "fw-normal",
    fontFamily: "fw-normal",
    textDecoration: ""
  },
  {
    id: 2,
    type: "paragraph",
    text: 'Párrafo',
    textAling: "text-center",
    fontWeight: "fw-normal",
    fontFamily: "fw-normal",
    textDecoration: ""
  },
  {
    id: 3,
    type: "list",
    text: 'Elemento',
    textAling: "text-star",
    fontWeight: "fw-normal",
    fontFamily: "fw-normal",
    textDecoration: "",
    typeList: "",
    item: [],
  }
]

const Information = [
  {
    id: 4,
    type: "curious-fact",
    text: 'Dato Curioso',
  },
  {
    id: 5,
    type: "regulation",
    text: 'Reglamento',
  },
  {
    id: 6,
    type: "schedule",
    text: 'Horario',
    startHour: '00:00',
    finalHour: '00:00',
    textAling: "text-center",
    fontWeight: "fw-normal",
    fontFamily: "fw-normal",
    textDecoration: ""
  },
  {
    id: 7,
    type: "calendar",
    text: 'Calendario',
  },
  {
    id: 8,
    type: "event",
    text: 'Evento',
  },
]

const Multimedia = [
  {
    id: 10,
    type: "image",
    text: 'Imagen',
  },
  {
    id: 11,
    type: "video",
    text: 'Video',
    borderRadius: 'rounded',
    BorderWidth: 'border border-1',
    BorderColor: 'border border-white'
  },
  {
    id: 12,
    type: "audio",
    text: 'Audio',
  },
  {
    id: 13,
    type: "carousel",
    text: 'Carrusel',
  },
  {
    id: 14,
    type: "image-360",
    text: 'Imagen 360°',
  },
]

const Others = [
  {
    id: 15,
    type: "url",
    text: 'Url',
  },
  {
    id: 16,
    type: "document",
    text: 'Documento',
  },
  {
    id: 17,
    type: "transportation",
    text: 'Transporte',
  },
  {
    id: 18,
    type: "map",
    text: 'Mapa',
  },
  {
    id: 19,
    type: "climate",
    text: 'Clima',
  },
  {
    id: 20,
    type: "ticket",
    text: 'Ticket',
  }
]

  export { Texts, Information, Multimedia, Others }