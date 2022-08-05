import React, { useState, useEffect,FC } from 'react';
import { Container, Row, Col, Button, Card, ListGroup, Form, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Select from 'react-select';
import makeAnimated from 'react-select/animated'
import {Link, Navigate, useLocation, useNavigate} from 'react-router-dom'
import { Site } from '../../models/site';
import { getData, sitesMethod, deleteData,postData,categorysMethod,statesMethod } from '../../services/api'
import {Tag }from '../../models/tag';
import {status }from '../../models/status';
const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
    item => ({ label: item, value: item })
);


type sitio = {
    id_sitio: number
    nombre: string
    descripcion: string
    ubicacion: string
    geoX: string
    geoY: string
    portada_path: string
    estado: number
    creado: Date
    editado: Date
    categorias: [
      {
        id_categoria: number
        nombre: string
        estado: number
      }
    ]
    id_municipio: number
    favorito: boolean
    publicado: boolean
    oculto: boolean
  }

const options = [
    { label: "Grapes", value: "grapes" },
    { label: "Mango", value: "mango" },
    { label: "Strawberry ", value: "strawberry"},
    { label: "Strawberry1 ", value: "strawberry1"},
    { label: "Strawberry2 ", value: "strawberry2"},
    { label: "Strawberry3 ", value: "strawberry3"},
    { label: "Strawberry4 ", value: "strawberry4"},
  ];

 
  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      background: '#1b1b29',
      borderRadius: state.isFocused ? '3px 3px 0 0' : 3,
      borderColor: state.isFocused ? '#565674' : '#1b1b29',
      boxShadow: state.isFocused ? '#474761' : '#1b1b29',
      color: '#1b1b29',
      '&:hover': {
        borderColor: state.isFocused ? 'white' : 'white',
      },
   
    }),
    option: (base:any,state: any) => ({
        ...base,
        borderBottom: '1px dotted pink',
        color: state.isSelected ? 'red' : 'gray',
        padding: 10,
      }),
      multiValue: (base:any, ) => {
       
        return {
          ...base,
          backgroundColor: '#white',
        };
      },
      multiValueRemove: (base:any ) => ({
        ...base,
        color: 'gray',
        // ':hover': {
        //   backgroundColor: data.color,
        //   color: 'white',
        // },
      }),
    
    multiValueLabel: (base:any) => ({
        ...base,
        color: 'white',
      }),
    menu: (base: any) => ({
      ...base,
      borderRadius: 0,
      marginTop: 0,
     color:'white',
      background: '#1b1b29',
    }),
    menuList: (base: any) => ({
      ...base,
      padding: 0,
      color: 'white',   
    }),
  }
  const animatedComponents = makeAnimated()

  
  
//   async function postSite() {
//     console.log('posting');
//   }

// const {state} = useLocation();



    



const ConfSite = () => {
    useEffect(() => {
        getCategorys();
    }, []);

    const [categorys, setCategorys] = useState<Tag[]>([])
    const [site, setSite] = useState({
        id_sitio: 1,
        nombre: '',
        descripcion: '',
        ubicacion: '',
        geoX: '',
        geoY: '',
        portada_path: 'https://picsum.photos/200/200',
        estado: 0,
        creado: new Date(),
        editado: new Date(),
        categorias: [{id_categoria: 1, nombre: 's', estado: 0}],
        id_municipio: 1,
        favorito: false,
        publicado: false,
        oculto: false,
    });
    const [status, setStatus] = useState<status>({
        id_sitio: site.id_sitio,
        favorito: site.favorito,
        publicado: site.favorito,
        oculto: site.oculto,
      })


    async function getCategorys() {
        const category: any = await getData(categorysMethod)
        category.map((cat: any) => {
          categorys.push({value: cat.id_categoria, label: cat.nombre})
        })
        console.log(category)
      }
      //methods to post data to api

  async function postSite(sitee: any) {
    const sit: any = await postData(sitesMethod, sitee)
   console.log(sitee)
 }
 async function postDefault(route: string, object: any) {
    const sit: any = await postData(route, object)
  }
 const changeStatus = (favorito: boolean, publicado: boolean, oculto: boolean) => {
    setStatus({
      id_sitio: site.id_sitio,
      favorito: favorito,
      publicado: publicado,
      oculto: oculto,
    })
    console.log(status)
    postDefault(statesMethod, status)
    const getSites = async () => {
      const site: any = await getData(sitesMethod)
      console.log(site)
    }
  }
    return (
        <Container fluid>
            <Navbar collapseOnSelect expand="lg" style={{ background: '#1A1A27' }}  >
                <Navbar.Brand href="../sitios">
                    <div style={{ color: '#2B2B40' }}>
                        <i className="bi fa-less-than background-button" style={{ color: '#FFFFFF', fontSize: '20px' }}></i>

                    </div>
                </Navbar.Brand>
                <Navbar.Text style={{ color: 'white', fontSize: '22px', fontFamily: 'Lato' }}>Texto De prueba</Navbar.Text>
                <div style={{ width: '250px', height: '17px', position: 'relative', left: '20px' }}>
                    <Navbar.Text style={{ color: '#565674', fontSize: '14px', fontFamily: 'Lato' }} > Última vez editado el 15/07/22 por </Navbar.Text>
                </div>
                <div style={{ width: '100px', height: '17px', position: 'relative', left: '20px' }}>
                    <Navbar.Text style={{ color: '#92929F', fontSize: '14px', fontFamily: 'Lato' }} >Usuario 01</Navbar.Text>
                </div>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <Nav.Link href="#"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.760563 0C0.340516 0 0 0.360845 0 0.805969V7.25372C0 7.69885 0.340516 8.05969 0.760563 8.05969H6.84507C7.26511 8.05969 7.60563 7.69885 7.60563 7.25372V0.805969C7.60563 0.360845 7.26511 0 6.84507 0H0.760563ZM1.52113 6.44775V1.61194H6.0845V6.44775H1.52113ZM0.760563 9.6716C0.340516 9.6716 0 10.0324 0 10.4776V16.9253C0 17.3704 0.340516 17.7313 0.760563 17.7313H6.84507C7.26511 17.7313 7.60563 17.3704 7.60563 16.9253V10.4776C7.60563 10.0324 7.26511 9.6716 6.84507 9.6716H0.760563ZM1.52113 16.1194V11.2835H6.0845V16.1194H1.52113ZM2.78871 2.95524H4.81688V5.10449H2.78871V2.95524ZM10.9014 0C10.4813 0 10.1408 0.360845 10.1408 0.805969V7.25372C10.1408 7.69885 10.4813 8.05969 10.9014 8.05969H16.9859C17.4059 8.05969 17.7465 7.69885 17.7465 7.25372V0.805969C17.7465 0.360845 17.4059 0 16.9859 0H10.9014ZM11.662 6.44775V1.61194H16.2253V6.44775H11.662ZM2.78871 12.6268H4.81688V14.7761H2.78871V12.6268ZM10.9014 9.40295H9.88733V10.4776H10.9014H10.9014H11.9155V9.40295H10.9014H10.9014ZM9.88733 16.9254H10.9014V18H9.88733V16.9254ZM15.9718 15.8507H14.9577V18H15.9718V15.8507ZM9.88733 13.7015H10.9014H10.9014H11.9155V14.7761V14.7761V15.8507H10.9014V14.7761H9.88733V13.7015ZM11.9155 10.4776H12.9296V11.5522H12.9296V12.6269H10.9014V11.5522H11.9155V10.4776ZM14.9577 9.40295H13.9436V10.4776H14.9577V9.40295ZM12.9296 15.8507H13.9437V18H12.9296V15.8507ZM18 9.40295H16.9859V10.4776H18V9.40295ZM15.9718 10.4776H16.9859V11.5522H18V13.7015H16.9859V11.5522H15.9718V10.4776ZM18 16.9254H16.9859V18H18V16.9254ZM14.9577 11.5522H13.9436V12.6268H12.9296V13.7015H13.9437V12.6269H14.9577V13.7015H15.9718V12.6268H14.9577V11.5522ZM12.9296 13.7015H13.9437V14.7761H15.9718V13.7015H16.9859V14.7761H16.9859V15.8507H13.9436V14.7761H12.9296V15.8507H11.9155V14.7761H12.9296V13.7015ZM14.9577 2.95524H12.9296V5.10449H14.9577V2.95524Z" fill="#92929F" />
                        </svg>
                        </Nav.Link>
                        <i
                  className={
                    status.oculto == false
                      ? 'fa-solid fa-eye-slash background-button'
                      : 'fa-solid fa-eye background-button'
                  }
                  id='center2'
                  onClick={() => {
                    status.oculto == false
                      ? changeStatus(status.favorito, status.publicado, true)
                      : changeStatus(status.favorito, status.publicado, false)
                  }}
                ></i>
                        <Nav.Link href="../sitios"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.40994 6.99994L12.7099 2.70994C12.8982 2.52164 13.004 2.26624 13.004 1.99994C13.004 1.73364 12.8982 1.47825 12.7099 1.28994C12.5216 1.10164 12.2662 0.99585 11.9999 0.99585C11.7336 0.99585 11.4782 1.10164 11.2899 1.28994L6.99994 5.58994L2.70994 1.28994C2.52164 1.10164 2.26624 0.99585 1.99994 0.99585C1.73364 0.99585 1.47824 1.10164 1.28994 1.28994C1.10164 1.47825 0.995847 1.73364 0.995847 1.99994C0.995847 2.26624 1.10164 2.52164 1.28994 2.70994L5.58994 6.99994L1.28994 11.2899C1.19621 11.3829 1.12182 11.4935 1.07105 11.6154C1.02028 11.7372 0.994141 11.8679 0.994141 11.9999C0.994141 12.132 1.02028 12.2627 1.07105 12.3845C1.12182 12.5064 1.19621 12.617 1.28994 12.7099C1.3829 12.8037 1.4935 12.8781 1.61536 12.9288C1.73722 12.9796 1.86793 13.0057 1.99994 13.0057C2.13195 13.0057 2.26266 12.9796 2.38452 12.9288C2.50638 12.8781 2.61698 12.8037 2.70994 12.7099L6.99994 8.40994L11.2899 12.7099C11.3829 12.8037 11.4935 12.8781 11.6154 12.9288C11.7372 12.9796 11.8679 13.0057 11.9999 13.0057C12.132 13.0057 12.2627 12.9796 12.3845 12.9288C12.5064 12.8781 12.617 12.8037 12.7099 12.7099C12.8037 12.617 12.8781 12.5064 12.9288 12.3845C12.9796 12.2627 13.0057 12.132 13.0057 11.9999C13.0057 11.8679 12.9796 11.7372 12.9288 11.6154C12.8781 11.4935 12.8037 11.3829 12.7099 11.2899L8.40994 6.99994Z" fill="#92929F" />
                        </svg>
                        </Nav.Link>
                        <Nav.Link href="#"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.71 5.71002L9 3.41002V13C9 13.2652 9.10536 13.5196 9.29289 13.7071C9.48043 13.8947 9.73478 14 10 14C10.2652 14 10.5196 13.8947 10.7071 13.7071C10.8946 13.5196 11 13.2652 11 13V3.41002L13.29 5.71002C13.383 5.80375 13.4936 5.87814 13.6154 5.92891C13.7373 5.97968 13.868 6.00582 14 6.00582C14.132 6.00582 14.2627 5.97968 14.3846 5.92891C14.5064 5.87814 14.617 5.80375 14.71 5.71002C14.8037 5.61706 14.8781 5.50645 14.9289 5.3846C14.9797 5.26274 15.0058 5.13203 15.0058 5.00002C15.0058 4.86801 14.9797 4.7373 14.9289 4.61544C14.8781 4.49358 14.8037 4.38298 14.71 4.29002L10.71 0.290018C10.6149 0.198978 10.5028 0.127613 10.38 0.0800184C10.1365 -0.0199996 9.86346 -0.0199996 9.62 0.0800184C9.49725 0.127613 9.3851 0.198978 9.29 0.290018L5.29 4.29002C5.19676 4.38326 5.1228 4.49395 5.07234 4.61577C5.02188 4.73759 4.99591 4.86816 4.99591 5.00002C4.99591 5.13188 5.02188 5.26245 5.07234 5.38427C5.1228 5.50609 5.19676 5.61678 5.29 5.71002C5.38324 5.80326 5.49393 5.87722 5.61575 5.92768C5.73757 5.97814 5.86814 6.00411 6 6.00411C6.13186 6.00411 6.26243 5.97814 6.38425 5.92768C6.50607 5.87722 6.61676 5.80326 6.71 5.71002ZM19 10C18.7348 10 18.4804 10.1054 18.2929 10.2929C18.1054 10.4804 18 10.7348 18 11V17C18 17.2652 17.8946 17.5196 17.7071 17.7071C17.5196 17.8947 17.2652 18 17 18H3C2.73478 18 2.48043 17.8947 2.29289 17.7071C2.10536 17.5196 2 17.2652 2 17V11C2 10.7348 1.89464 10.4804 1.70711 10.2929C1.51957 10.1054 1.26522 10 1 10C0.734784 10 0.48043 10.1054 0.292893 10.2929C0.105357 10.4804 0 10.7348 0 11V17C0 17.7957 0.316071 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20H17C17.7956 20 18.5587 19.6839 19.1213 19.1213C19.6839 18.5587 20 17.7957 20 17V11C20 10.7348 19.8946 10.4804 19.7071 10.2929C19.5196 10.1054 19.2652 10 19 10Z" fill="#50CD89" />
                        </svg>
                        </Nav.Link>
                        <Nav.Link eventKey={2} href="#"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.32 7.55L17.43 6.92L18.32 5.14C18.4102 4.95369 18.4404 4.74397 18.4064 4.53978C18.3723 4.33558 18.2758 4.14699 18.13 4L16 1.87C15.8522 1.72209 15.6618 1.62421 15.4555 1.59013C15.2493 1.55605 15.0375 1.58748 14.85 1.68L13.07 2.57L12.44 0.680003C12.3735 0.482996 12.2472 0.311629 12.0787 0.189751C11.9102 0.0678737 11.7079 0.00154767 11.5 3.33354e-06H8.5C8.29036 -0.000537828 8.08585 0.0648223 7.91537 0.186845C7.7449 0.308868 7.61709 0.481382 7.55 0.680003L6.92 2.57L5.14 1.68C4.95369 1.58978 4.74397 1.55961 4.53978 1.59364C4.33558 1.62767 4.14699 1.72423 4 1.87L1.87 4C1.72209 4.14777 1.62421 4.33818 1.59013 4.54446C1.55605 4.75074 1.58748 4.96251 1.68 5.15L2.57 6.93L0.680003 7.56C0.482996 7.62654 0.311629 7.75283 0.189751 7.92131C0.0678737 8.08979 0.00154767 8.29207 3.33354e-06 8.5V11.5C-0.000537828 11.7096 0.0648223 11.9142 0.186845 12.0846C0.308868 12.2551 0.481382 12.3829 0.680003 12.45L2.57 13.08L1.68 14.86C1.58978 15.0463 1.55961 15.256 1.59364 15.4602C1.62767 15.6644 1.72423 15.853 1.87 16L4 18.13C4.14777 18.2779 4.33818 18.3758 4.54446 18.4099C4.75074 18.444 4.96251 18.4125 5.15 18.32L6.93 17.43L7.56 19.32C7.62709 19.5186 7.7549 19.6911 7.92537 19.8132C8.09585 19.9352 8.30036 20.0005 8.51 20H11.51C11.7196 20.0005 11.9242 19.9352 12.0946 19.8132C12.2651 19.6911 12.3929 19.5186 12.46 19.32L13.09 17.43L14.87 18.32C15.0551 18.4079 15.2628 18.4369 15.4649 18.4029C15.667 18.3689 15.8538 18.2737 16 18.13L18.13 16C18.2779 15.8522 18.3758 15.6618 18.4099 15.4555C18.444 15.2493 18.4125 15.0375 18.32 14.85L17.43 13.07L19.32 12.44C19.517 12.3735 19.6884 12.2472 19.8103 12.0787C19.9321 11.9102 19.9985 11.7079 20 11.5V8.5C20.0005 8.29036 19.9352 8.08585 19.8132 7.91537C19.6911 7.7449 19.5186 7.61709 19.32 7.55ZM18 10.78L16.8 11.18C16.5241 11.2695 16.2709 11.418 16.0581 11.6151C15.8452 11.8122 15.6778 12.0533 15.5675 12.3216C15.4571 12.5899 15.4064 12.879 15.419 13.1688C15.4315 13.4586 15.5069 13.7422 15.64 14L16.21 15.14L15.11 16.24L14 15.64C13.7436 15.5122 13.4627 15.4411 13.1763 15.4313C12.89 15.4215 12.6049 15.4734 12.3403 15.5834C12.0758 15.6934 11.8379 15.8589 11.6429 16.0688C11.4479 16.2787 11.3003 16.5281 11.21 16.8L10.81 18H9.22L8.82 16.8C8.73049 16.5241 8.58203 16.2709 8.3849 16.0581C8.18778 15.8452 7.94671 15.6778 7.67842 15.5675C7.41014 15.4571 7.12105 15.4064 6.83123 15.419C6.5414 15.4315 6.25777 15.5069 6 15.64L4.86 16.21L3.76 15.11L4.36 14C4.4931 13.7422 4.56852 13.4586 4.58105 13.1688C4.59358 12.879 4.5429 12.5899 4.43254 12.3216C4.32218 12.0533 4.15478 11.8122 3.94195 11.6151C3.72912 11.418 3.47595 11.2695 3.2 11.18L2 10.78V9.22L3.2 8.82C3.47595 8.73049 3.72912 8.58203 3.94195 8.3849C4.15478 8.18778 4.32218 7.94671 4.43254 7.67842C4.5429 7.41014 4.59358 7.12105 4.58105 6.83123C4.56852 6.5414 4.4931 6.25777 4.36 6L3.79 4.89L4.89 3.79L6 4.36C6.25777 4.4931 6.5414 4.56852 6.83123 4.58105C7.12105 4.59358 7.41014 4.5429 7.67842 4.43254C7.94671 4.32218 8.18778 4.15478 8.3849 3.94195C8.58203 3.72912 8.73049 3.47595 8.82 3.2L9.22 2H10.78L11.18 3.2C11.2695 3.47595 11.418 3.72912 11.6151 3.94195C11.8122 4.15478 12.0533 4.32218 12.3216 4.43254C12.5899 4.5429 12.879 4.59358 13.1688 4.58105C13.4586 4.56852 13.7422 4.4931 14 4.36L15.14 3.79L16.24 4.89L15.64 6C15.5122 6.25645 15.4411 6.53735 15.4313 6.82369C15.4215 7.11003 15.4734 7.39513 15.5834 7.65969C15.6934 7.92424 15.8589 8.16207 16.0688 8.35708C16.2787 8.5521 16.5281 8.69973 16.8 8.79L18 9.19V10.78ZM10 6C9.20888 6 8.43552 6.2346 7.77772 6.67413C7.11993 7.11365 6.60724 7.73836 6.30448 8.46927C6.00173 9.20017 5.92252 10.0044 6.07686 10.7804C6.2312 11.5563 6.61217 12.269 7.17158 12.8284C7.73099 13.3878 8.44372 13.7688 9.21964 13.9231C9.99557 14.0775 10.7998 13.9983 11.5307 13.6955C12.2616 13.3928 12.8864 12.8801 13.3259 12.2223C13.7654 11.5645 14 10.7911 14 10C14 8.93914 13.5786 7.92172 12.8284 7.17158C12.0783 6.42143 11.0609 6 10 6ZM10 12C9.60444 12 9.21776 11.8827 8.88886 11.6629C8.55996 11.4432 8.30362 11.1308 8.15224 10.7654C8.00087 10.3999 7.96126 9.99778 8.03843 9.60982C8.1156 9.22186 8.30608 8.86549 8.58579 8.58579C8.86549 8.30608 9.22186 8.1156 9.60982 8.03843C9.99778 7.96126 10.3999 8.00087 10.7654 8.15224C11.1308 8.30362 11.4432 8.55996 11.6629 8.88886C11.8827 9.21776 12 9.60444 12 10C12 10.5304 11.7893 11.0391 11.4142 11.4142C11.0391 11.7893 10.5304 12 10 12Z" fill="#92929F" />
                        </svg>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>

            </Navbar>
            <Row className='pb-10'>
            </Row>
            <Row >

                <Col xs={6} md={4}><h1 style={{ fontFamily: 'Lato' }}>Configuracion del Sitio</h1></Col>


            </Row>
            <Row className='pb-10'>
                <Col xs={6} md={4}><p className='text-muted' style={{ fontFamily: 'Lato' }} >Lista de Sitios - Configuraciuon del Sitio</p></Col>
            </Row>
            <Row >

                <ListGroup horizontal>

                    <ListGroup.Item style={{ backgroundColor: '#1e1e2d', padding: 20 }} >

                        <Row className="justify-content-md-center">
                            <Col xs={6}>
                                <Row className="justify-content-md-center">
                                    <img src='https://picsum.photos/200/200' className='img-fluid shadow-2-strong mb-5' alt='' height='auto' width='100%' />
                                    <Col xs lg="auto">
                                        <i className="bi bi-arrow-left-right background-button" style={{ color: '#009EF7', fontSize: '20px' }}></i>
                                    </Col>
                                    <Col md="auto">
                                        <i className="bi bi-crop background-button" style={{ color: '#009EF7', fontSize: '20px' }}></i></Col>
                                    <Col xs lg="2">
                                        <i className="bi bi-trash3 background-button" style={{ color: '#F1416C', fontSize: '20px' }}></i>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={6}>
                                <Row >


                                    <Col xs={10}>
                                        <input
                                            type='text'
                                            className='form-control'
                                            style={{ border: '0', fontFamily: 'Lato', fontSize: '22px', color: '#FFFFFF' }}
                                            onChange={(e) => {
                                                setSite({
                                                  id_sitio: site.id_sitio,
                                                  nombre: e.target.value,
                                                  descripcion: site.descripcion,
                                                  ubicacion: site.ubicacion,
                                                  geoX: site.geoX,
                                                  geoY: site.geoY,
                                                  portada_path: site.portada_path,
                                                  estado: site.estado,
                                                  creado: site.creado,
                                                  editado: site.editado,
                                                  categorias: [{id_categoria: 1, nombre: '', estado: 0}],
                                                  id_municipio: site.id_municipio,
                                                  favorito: site.favorito,
                                                  publicado: site.publicado,
                                                  oculto: site.oculto,
                                                })
                                            }}
                                        ></input>
                                    </Col>
                                    <Col style={{ position: 'relative', left: '10px', top: '15px' }}>

                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.3332 5.03331C17.3338 4.92363 17.3128 4.81492 17.2713 4.71338C17.2299 4.61185 17.1688 4.51951 17.0915 4.44164L13.5582 0.908307C13.4803 0.831072 13.388 0.769968 13.2864 0.728497C13.1849 0.687027 13.0762 0.666006 12.9665 0.66664C12.8568 0.666006 12.7481 0.687027 12.6466 0.728497C12.5451 0.769968 12.4527 0.831072 12.3749 0.908307L10.0165 3.26664L0.908184 12.375C0.83095 12.4528 0.769846 12.5452 0.728375 12.6467C0.686905 12.7482 0.665884 12.857 0.666518 12.9666V16.5C0.666518 16.721 0.754315 16.933 0.910595 17.0892C1.06688 17.2455 1.27884 17.3333 1.49985 17.3333H5.03318C5.14979 17.3397 5.26643 17.3214 5.37553 17.2798C5.48464 17.2381 5.58378 17.174 5.66652 17.0916L14.7249 7.98331L17.0915 5.66664C17.1676 5.58587 17.2296 5.49292 17.2749 5.39164C17.2829 5.32522 17.2829 5.25806 17.2749 5.19164C17.2788 5.15285 17.2788 5.11376 17.2749 5.07497L17.3332 5.03331ZM4.69152 15.6666H2.33318V13.3083L10.6082 5.03331L12.9665 7.39164L4.69152 15.6666ZM14.1415 6.21664L11.7832 3.85831L12.9665 2.68331L15.3165 5.03331L14.1415 6.21664Z" fill="#565674" />
                                        </svg>

                                    </Col>
                                    
                                </Row>
                                <hr style={{ position: 'relative', top: '-20px' }}></hr>



                             
                                <label>Ubicación</label>
                                <br></br>
                                <input
                                            type='text'
                                            className='form-control'
                                            style={{ border: '0', fontFamily: 'Lato', fontSize: '22px', color: '#FFFFFF' }}
                                            onChange={(e) => {
                                                setSite({
                                                  id_sitio: site.id_sitio,
                                                  nombre: site.nombre,
                                                  descripcion: site.descripcion,
                                                  ubicacion: e.target.value,
                                                  geoX: site.geoX,
                                                  geoY: site.geoY,
                                                  portada_path: site.portada_path,
                                                  estado: site.estado,
                                                  creado: site.creado,
                                                  editado: site.editado,
                                                  categorias: [{id_categoria: 1, nombre: '', estado: 0}],
                                                  id_municipio: site.id_municipio,
                                                  favorito: site.favorito,
                                                  publicado: site.publicado,
                                                  oculto: site.oculto,
                                                })
                                            }}
                                        ></input>
                                            <hr style={{ position: 'relative', top: '-20px' }}></hr>
                                <br></br>
                                <label>Etiquetas</label>



                    <Select
                    
                    closeMenuOnSelect={false}
                    styles={customStyles}
                    components={animatedComponents}
                    // defaultValue={[options[4], options[5]]}
                    isMulti
                    options={categorys}
                  />

                            </Col>

                        </Row>

                    </ListGroup.Item>


                    <ListGroup.Item style={{ backgroundColor: '#1e1e2d', padding: 20 }}>

                        <Row className="justify-content-md-center">
                            <Col xs={6}>
                                <Card style={{ backgroundColor: '#1e1e2d', padding: 20 }} >
                                    <Card.Title style={{ whiteSpace: 'nowrap', textOverflow: ' ellipsis', overflow: 'hidden', textAlign: 'center', fontFamily: 'Lato' }} className='pb-10'>Versión Web</Card.Title>
                                    <a href="#" style={{ whiteSpace: 'nowrap', textOverflow: ' ellipsis', overflow: 'hidden', textAlign: 'center' }} className='pb-10'>
                                        <svg width="74" height="105" viewBox="0 0 74 105" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M40.6978 74.8438L39.9165 74.2188C39.6262 74.0217 39.3109 73.864 38.979 73.75L38.0415 73.3334C37.1968 73.1568 36.3215 73.1928 35.4942 73.4383C34.6669 73.6837 33.9136 74.1309 33.3019 74.7396C32.8419 75.2459 32.4719 75.8272 32.2082 76.4584C31.814 77.4073 31.7094 78.4517 31.9074 79.46C32.1055 80.4683 32.5974 81.3955 33.3212 82.1249C34.045 82.8543 34.9684 83.3532 35.9752 83.559C36.9819 83.7648 38.027 83.6681 38.979 83.2813C39.6014 82.9793 40.1796 82.5938 40.6978 82.1354C41.4205 81.403 41.91 80.473 42.1047 79.4626C42.2993 78.4522 42.1904 77.4069 41.7915 76.4584C41.5318 75.8561 41.1607 75.3083 40.6978 74.8438ZM57.8332 0.416687H16.1665C12.0225 0.416687 8.04822 2.06289 5.11796 4.99314C2.18771 7.9234 0.541504 11.8977 0.541504 16.0417V88.9584C0.541504 93.1024 2.18771 97.0766 5.11796 100.007C8.04822 102.937 12.0225 104.583 16.1665 104.583H57.8332C61.9772 104.583 65.9515 102.937 68.8817 100.007C71.812 97.0766 73.4582 93.1024 73.4582 88.9584V16.0417C73.4582 11.8977 71.812 7.9234 68.8817 4.99314C65.9515 2.06289 61.9772 0.416687 57.8332 0.416687ZM63.0415 88.9584C63.0415 90.3397 62.4928 91.6645 61.516 92.6412C60.5393 93.618 59.2145 94.1667 57.8332 94.1667H16.1665C14.7852 94.1667 13.4604 93.618 12.4837 92.6412C11.5069 91.6645 10.9582 90.3397 10.9582 88.9584V16.0417C10.9582 14.6604 11.5069 13.3356 12.4837 12.3588C13.4604 11.3821 14.7852 10.8334 16.1665 10.8334H57.8332C59.2145 10.8334 60.5393 11.3821 61.516 12.3588C62.4928 13.3356 63.0415 14.6604 63.0415 16.0417V88.9584Z" fill="#009EF7" />
                                        </svg>


                                    </a>
                                    <p style={{ fontSize: '12px', lineHeight: '14.4px', width: '196px', textAlign: 'justify', fontFamily: 'Lato' }}> Maquetar los elementos del sitio para versión móvil</p>
                                    <div style={{ whiteSpace: 'nowrap', textOverflow: ' ellipsis', overflow: 'hidden', textAlign: 'center' }}>
                                        <Button style={{
                                            whiteSpace: 'nowrap', textOverflow: ' ellipsis', overflow: 'hidden', width: '156px', height: '44px', fontFamily: 'Lato'
                                        }}    onClick={(event) => {
                                             postSite(site);
                                          }}>
                                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20 5.24002C20.0008 5.10841 19.9756 4.97795 19.9258 4.85611C19.876 4.73427 19.8027 4.62346 19.71 4.53002L15.47 0.290017C15.3766 0.197335 15.2658 0.12401 15.1439 0.0742455C15.0221 0.0244809 14.8916 -0.000744179 14.76 1.67143e-05C14.6284 -0.000744179 14.4979 0.0244809 14.3761 0.0742455C14.2543 0.12401 14.1435 0.197335 14.05 0.290017L11.22 3.12002L0.290017 14.05C0.197335 14.1435 0.12401 14.2543 0.0742455 14.3761C0.0244809 14.4979 -0.000744179 14.6284 1.67143e-05 14.76V19C1.67143e-05 19.2652 0.105374 19.5196 0.29291 19.7071C0.480446 19.8947 0.7348 20 1.00002 20H5.24002C5.37994 20.0076 5.51991 19.9857 5.65084 19.9358C5.78176 19.8858 5.90073 19.8089 6.00002 19.71L16.87 8.78002L19.71 6.00002C19.8013 5.9031 19.8757 5.79155 19.93 5.67002C19.9397 5.59031 19.9397 5.50973 19.93 5.43002C19.9347 5.38347 19.9347 5.33657 19.93 5.29002L20 5.24002ZM4.83002 18H2.00002V15.17L11.93 5.24002L14.76 8.07002L4.83002 18ZM16.17 6.66002L13.34 3.83002L14.76 2.42002L17.58 5.24002L16.17 6.66002Z" fill="#2B2B40" />
                                            </svg>

                                            Crear
                                        </Button>

                                    </div>

                                </Card>
                            </Col>

                            <Col xs={6}>
                                <Card style={{ backgroundColor: '#1e1e2d', padding: 20 }} >
                                    <Card.Title style={{ whiteSpace: 'nowrap', textOverflow: ' ellipsis', overflow: 'hidden', textAlign: 'center', fontFamily: 'Lato' }} className='pb-10'>Versión Web</Card.Title>
                                    <a href="#" style={{ whiteSpace: 'nowrap', textOverflow: ' ellipsis', overflow: 'hidden', textAlign: 'center' }} className='pb-10'>
                                        <svg width="106" height="105" viewBox="0 0 106 105" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M89.4582 0.416687H16.5415C12.3975 0.416687 8.42322 2.06289 5.49296 4.99314C2.56271 7.9234 0.916504 11.8977 0.916504 16.0417V68.125C0.916504 72.269 2.56271 76.2433 5.49296 79.1736C8.42322 82.1038 12.3975 83.75 16.5415 83.75H30.2915L27.2707 88.9584C26.3564 90.5419 25.8751 92.3382 25.8751 94.1667C25.8751 95.9952 26.3564 97.7915 27.2707 99.375C28.1928 100.972 29.5225 102.296 31.1239 103.211C32.7253 104.126 34.5409 104.6 36.3853 104.583H70.0311C71.8578 104.581 73.6519 104.099 75.2334 103.185C76.8149 102.271 78.1282 100.957 79.0415 99.375C79.9558 97.7915 80.4371 95.9952 80.4371 94.1667C80.4371 92.3382 79.9558 90.5419 79.0415 88.9584L75.9686 83.75H89.4582C93.6022 83.75 97.5765 82.1038 100.507 79.1736C103.437 76.2433 105.083 72.269 105.083 68.125V16.0417C105.083 11.8977 103.437 7.9234 100.507 4.99314C97.5765 2.06289 93.6022 0.416687 89.4582 0.416687ZM36.1769 94.1667L42.5832 83.75H63.4165L69.6665 94.1667H36.1769ZM94.6665 68.125C94.6665 69.5064 94.1178 70.8311 93.141 71.8079C92.1643 72.7846 90.8395 73.3334 89.4582 73.3334H16.5415C15.1602 73.3334 13.8354 72.7846 12.8587 71.8079C11.8819 70.8311 11.3332 69.5064 11.3332 68.125V62.9167H94.6665V68.125ZM94.6665 52.5H11.3332V16.0417C11.3332 14.6604 11.8819 13.3356 12.8587 12.3588C13.8354 11.3821 15.1602 10.8334 16.5415 10.8334H89.4582C90.8395 10.8334 92.1643 11.3821 93.141 12.3588C94.1178 13.3356 94.6665 14.6604 94.6665 16.0417V52.5Z" fill="#92929F" />
                                        </svg>
                                    </a>
                                    <p style={{ fontSize: '12px', lineHeight: '14.4px', width: '196px', textAlign: 'justify', fontFamily: 'Lato' }}> Maquetar los elementos del sitio para versión web.</p>
                                    <div style={{ whiteSpace: 'nowrap', textOverflow: ' ellipsis', overflow: 'hidden', textAlign: 'center' }}>

                                        <Button style={{ whiteSpace: 'nowrap', textOverflow: ' ellipsis', overflow: 'hidden', width: '150px', height: '44px', fontFamily: 'Lato' }}>
                                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20 5.24002C20.0008 5.10841 19.9756 4.97795 19.9258 4.85611C19.876 4.73427 19.8027 4.62346 19.71 4.53002L15.47 0.290017C15.3766 0.197335 15.2658 0.12401 15.1439 0.0742455C15.0221 0.0244809 14.8916 -0.000744179 14.76 1.67143e-05C14.6284 -0.000744179 14.4979 0.0244809 14.3761 0.0742455C14.2543 0.12401 14.1435 0.197335 14.05 0.290017L11.22 3.12002L0.290017 14.05C0.197335 14.1435 0.12401 14.2543 0.0742455 14.3761C0.0244809 14.4979 -0.000744179 14.6284 1.67143e-05 14.76V19C1.67143e-05 19.2652 0.105374 19.5196 0.29291 19.7071C0.480446 19.8947 0.7348 20 1.00002 20H5.24002C5.37994 20.0076 5.51991 19.9857 5.65084 19.9358C5.78176 19.8858 5.90073 19.8089 6.00002 19.71L16.87 8.78002L19.71 6.00002C19.8013 5.9031 19.8757 5.79155 19.93 5.67002C19.9397 5.59031 19.9397 5.50973 19.93 5.43002C19.9347 5.38347 19.9347 5.33657 19.93 5.29002L20 5.24002ZM4.83002 18H2.00002V15.17L11.93 5.24002L14.76 8.07002L4.83002 18ZM16.17 6.66002L13.34 3.83002L14.76 2.42002L17.58 5.24002L16.17 6.66002Z" fill="#2B2B40" />
                                            </svg>
                                            Crear
                                        </Button>

                                    </div>

                                </Card>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>
            </Row>

        </Container>



    );
}

export default ConfSite;