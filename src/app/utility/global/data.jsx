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
    ElementosMovil: [
      {
        title: 'Textos',
        items: [
          {
            id: 1,
            typeIcon: 'bi',
            icon: 'fonts',
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
            typeIcon: 'bi',
            icon: 'justify-left',
            type: "paragraph",
            text: 'Párrafo',
            textAling: "text-center",
            fontWeight: "fw-normal",
            fontFamily: "fw-normal",
            textDecoration: ""
          },
          {
            id: 3,
            typeIcon: 'bi',
            icon: 'list-ul',
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
      },
      {
        title: 'Información',
        items: [
          {
            id: 4,
            typeIcon: 'svg',
            icon: 'Event.svg',
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
            typeIcon: 'svg',
            icon: 'Time.svg',
            type: "event",
            text: 'Evento',
            startDate: '0000-00-00',
            finalDate: '0000-00-00'
          },
        ]
      },
      {
        title: 'Multimedia',
        items: [
          {
            id: 6,
            typeIcon: 'bi',
            icon: 'image',
            type: "image",
            text: 'Imagen',
            textAling: "text-center",
          },
          {
            id: 7,
            typeIcon: 'bi',
            icon: 'images',
            type: "video",
            text: 'Video',
            borderRadius: 'rounded',
            BorderWidth: 'border border-1',
            BorderColor: 'border border-white'
          },
          {
            id: 8,
            typeIcon: 'bi',
            icon: 'music-note',
            type: "audio",
            text: 'Audio',
            textAling: "text-center",
          },
          {
            id: 9,
            typeIcon: 'bi',
            icon: 'images',
            type: "carousel",
            text: 'Carrusel',
          },
          {
            id: 10,
            typeIcon: 'svg',
            icon: 'Panorama.svg',
            type: "image-360",
            text: 'Imagen 360°',
          },
        ]
      },
      {
        title: 'Otros',
        items: [
          {
            id: 11,
            typeIcon: 'bi',
            icon: 'link-45deg',
            type: "url",
            text: 'Url',
          },
          {
            id: 12,
            typeIcon: 'bi',
            icon: 'map',
            type: "map",
            text: 'Mapa',
          },
        ]
      }
    ],
    ElementosWeb: [
      {
        title: 'hero',
        items: [
          {
            text: 'Hero 1',
            type: "1-hero",
            typeIcon: 'svg',
            icon: 'Hero1.svg'
          },
          {
            text: 'Hero 2',
            type: "2-hero",
            typeIcon: 'svg',
            icon: 'Hero2.svg'
          }
        ]
      },
      {
        title: 'Contenido',
        items: [
          {
            text: 'Columna 1',
            text2: 'Columna 2',
            type: "contenido1",
            typeIcon: 'svg',
            icon: 'Contenido1.svg'
          },
          {
            text: 'Contenido 2',
            type: "contenido2",
            typeIcon: 'svg',
            icon: 'Contenido2.svg'
          }
        ]
      },
      {
        title: 'Galería',
        items: [
          {
            text: 'Galeria 1',
            type: "galeria1",
            typeIcon: 'svg',
            icon: 'Galeria1.svg'
          },
          {
            text: 'Galeria 2',
            type: "galeria2",
            typeIcon: 'svg',
            icon: 'Galeria2.svg'
          }
        ]
      },
      {
        title: 'Pie de Página',
        items: [
          {
            text: 'Footer 1',
            type: "footer1",
            typeIcon: 'svg'
          },
          {
            text: 'Footer 2',
            type: "footer2",
            typeIcon: 'svg'
          }
        ]
      }
    ]
  }
]

  export { Texts, Information, Multimedia, Others, testRecursos, meses, Element }