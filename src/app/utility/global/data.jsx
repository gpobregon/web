/* eslint-disable no-template-curly-in-string */
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
            textDecoration: "",
            typeElement: 'texts'
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
            textDecoration: "",
            typeElement: 'texts'
          },
          {
            id: 3,
            typeIcon: 'bi',
            icon: 'list-ul',
            type: "list",
            text: 'Elemento',
            content: '<ul class="list-group list-group-bg list-group-numbered"><li class="list-group-item">Elemento 1</li></ul>',
            textAling: "text-star",
            fontWeight: "fw-normal",
            fontFamily: "fw-normal",
            textDecoration: "",
            typeList: "list-group-numbered",
            item: [],
            typeElement: 'texts'
          },
          {
            typeIcon: 'bi',
            icon: 'distribute-vertical',
            text: 'Salto de Línea',
            type: "space",
            typeElement: 'texts'
          },
          {
            typeIcon: 'bi',
            icon: 'dash-lg',
            text: 'Separador',
            type: "divider",
            typeElement: 'texts'
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
            textDecoration: "",
            fontWeight: "fw-normal",
            fontFamily: "fw-normal",
            textAling: "text-center",
            typeElement: 'information'
          },
          {
            id: 5,
            typeIcon: 'svg',
            icon: 'Time.svg',
            type: "event",
            text: 'Evento',
            startDate: '0000-00-00',
            finalDate: '0000-00-00',
            typeElement: 'information'
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
            typeElement: 'multimedia',
            textAling: "text-center"
          },
          {
            id: 7,
            typeIcon: 'bi',
            icon: 'film',
            type: "video",
            text: 'Video',
            typeElement: 'multimedia',
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
            typeElement: 'multimedia',
            textAling: "text-center"
          },
          {
            id: 9,
            typeIcon: 'bi',
            icon: 'images',
            type: "carousel",
            text: 'Carrusel',
            list: [],
            typeElement: 'multimedia'
          },
          {
            id: 10,
            typeIcon: 'svg',
            icon: 'Panorama.svg',
            type: "image-360",
            text: 'Imagen 360°',
            typeElement: 'multimedia',
            url:''
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
            typeElement: 'others'
          },
          {
            id: 12,
            typeIcon: 'bi',
            icon: 'map',
            type: "map",
            text: 'Mapa',
            typeElement: 'others'
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
            icon: 'Hero1.svg',
            typeElement: 'hero',
            section1: [],
            section2: []
          },
          {
            text: 'Hero 2',
            type: "2-hero",
            typeIcon: 'svg',
            icon: 'Hero2.svg',
            typeElement: 'hero',
            section1: [],
            section2: [],
            section3: []
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
            icon: 'Contenido1.svg',
            typeElement: 'contenido'
          },
          {
            text: 'Contenido 2',
            type: "contenido2",
            typeIcon: 'svg',
            icon: 'Contenido2.svg',
            typeElement: 'contenido',
            textAling: "text-center"
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
            icon: 'Galeria1.svg',
            typeElement: 'galeria',
            section1: [],
            section2: []
          },
          {
            text: 'Galeria 2',
            type: "galeria2",
            typeIcon: 'svg',
            icon: 'Galeria2.svg',
            typeElement: 'galeria',
            section1: [],
            section2: []
          }
        ]
      },
      {
        title: 'Pie de Página',
        items: [
          {
            text: `© ${new Date().getFullYear()} Copyright:`,
            type: "footer1",
            typeIcon: 'svg',
            icon: 'footer1.svg',
            typeElement: 'footer'
          },
          {
            text: `© ${new Date().getFullYear()} Copyright:`,
            type: "footer2",
            facebook: '',
            twitter: '',
            instagram: '',
            youtube: '',
            tiktok: '',
            typeIcon: 'svg',
            icon: 'footer2.svg',
            typeElement: 'footer'
          }
        ]
      }
    ]
  }
]

  export { meses, Element }