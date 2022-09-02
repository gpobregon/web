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
    startDate: '0000-00-00',
    finalDate: '0000-00-00'
  },
]

const Multimedia = [
  {
    id: 6,
    type: "image",
    text: 'Imagen',
    textAling: "text-center",
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

const meses=["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sept","Oct","Nov","Dic"];

const Element = [
  {
    ElementosWeb: [
      {
        title: 'hero',
        items: [
          {
            text: 'Hero 1',
            type: "url"
          },
          {
            text: 'Hero 2',
            type: "url"
          }
        ]
      },
      {
        title: 'Contenido',
        items: [
          {
            text: 'Contenido 1',
            type: "url"
          },
          {
            text: 'Contenido 2',
            type: "url"
          }
        ]
      },
      {
        title: 'Galería',
        items: [
          {
            text: 'Contenido 1',
            type: "url"
          },
          {
            text: 'Contenido 2',
            type: "url"
          }
        ]
      },
      {
        title: 'Pie de Página',
        items: [
          {
            text: 'Footer 1',
            type: "url"
          },
          {
            text: 'Footer 2',
            type: "url"
          }
        ]
      }
    ]
  }
]

  export { Texts, Information, Multimedia, Others, testRecursos, meses, Element }