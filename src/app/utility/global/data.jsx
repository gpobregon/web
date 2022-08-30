import { toAbsoluteUrl } from '../../../_metronic/helpers'
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
    id: 5,
    type: "event",
    text: 'Evento',
  },
]

const Multimedia = [
  {
    id: 6,
    type: "image",
    text: 'Imagen',
  },
  {
    id: 7,
    type: "video",
    text: 'Video',
    borderRadius: 'rounded',
    BorderWidth: 'border border-1',
    BorderColor: 'border border-white'
  },
  {
    id: 8,
    type: "audio",
    text: 'Audio',
    textAling: "text-center",
  },
  {
    id: 9,
    type: "carousel",
    text: 'Carrusel',
  },
  {
    id: 10,
    type: "image-360",
    text: 'Imagen 360°',
  },
]

const Others = [
  {
    id: 11,
    type: "url",
    text: 'Url',
  },
  {
    id: 12,
    type: "map",
    text: 'Mapa',
  },
]


const testRecursos = [
  {
    name: 'Marimba',
    preview : `${toAbsoluteUrl(`/media/audio/test.webm`)}`,
    type: 'audio'
  },
  {
    name: 'Guatemala' ,
    preview: 'https://www.youtube.com/watch?v=pAE5vJBTbRY&t=12s',
    type: 'video'
  },
  {
    name: 'Marimba',
    preview: 'https://www.youtube.com/watch?v=GV-b6wSBUGc',
    type: 'video'
  }
]
  export { Texts, Information, Multimedia, Others, testRecursos }