import moment from 'moment'
import {Auth} from 'aws-amplify'
import Moment from 'moment'
import {jsPDF} from 'jspdf'
import autoTable from 'jspdf-autotable'

const PDF = (data: any) => {
    var date_report = new Date()
    var date_report_format = moment(date_report).format('DD/MM/YYYY')
    var hour_report_format = moment(date_report).format('HH:mm:ss')
    var dataUser = {
        name: '',
        lastName: '',
    }

    // useEffect(() => {
    Auth.currentUserInfo().then((user) => {
        dataUser.name = user.attributes.given_name
        dataUser.lastName = user.attributes.family_name
    })
    // }, [])
    console.log(data)
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text(data.name + ' (' + data.site.id_sitio + ')', 105, 10, {align: 'center'})
    doc.setLineWidth(0.5)
    doc.line(10, 15, 200, 15)

    doc.setFontSize(10)
    
    doc.text('Reporte:  ' + data.tipo, 10, 25)

    doc.text('Filtros: ', 10, 32)

    
    
    
    if (data.tipo === 'Visitas por sitio' || data.tipo === 'usuarios') {
        doc.text('Genero: '+data.site?.tipogenero, 15, 37)
        doc.text('Edad: '+data.site?.tipoedad, 15, 42)
        doc.text('Nacionalidad: '+data.site?.tipopais, 15, 47)
        doc.text('Fecha inicial: ' + data.site.fecha_inicial, 10, 54)
        doc.text('Fecha final: ' + data.site.fecha_final, 10, 59)
        tabla(data, doc)
    } else if (data.tipo === 'Calificaciones') {
        doc.text(data.site?.tipocalificacion, 15, 37)
        doc.text('Fecha inicial: ' + data.site.fecha_inicial, 10, 44)
        doc.text('Fecha final: ' + data.site.fecha_final, 10, 49)
        tabla(data, doc)
        doc.addPage()
        tablaUsers(data, doc)
    }
    
   
    const pageSize = doc.getNumberOfPages()
    for (let i = 1; i <= pageSize; i++) {
        doc.setPage(i)
        doc.text(`${i}`, doc.internal.pageSize.width - 10, 10 )
    }
    doc.setPage(pageSize)
    doc.text(
        `Reporte generado el ${date_report_format} a las ${hour_report_format}.`,
        20,
        doc.internal.pageSize.height - 10
    )


    doc.save(`[${data.site.id_sitio}]${data.tipo}-${data.name}.pdf`)
}

export default PDF

const tabla = (data: any, doc: any) => {
    if (data.tipo === 'Visitas por sitio') {
        return autoTable(doc, {
            startY: 65,
            head: [
                [
                    data.rows.length >1 ? 'Nombre sitio' :'',
                    'Total vistas',
                    'Hombre',
                    'Mujer',
                    'Sin sexo',
                    'Menores edad',
                    'Mayores edad',
                    'Tercera edad',
                    'Nacional',
                    'Extranjero',
                ],
            ],
            body: 
            data.rows.map((user: any) => {
                return [
                    data.rows.length >1 ? user.nombre_sitio :'' ,
                    user.total_visits,
                    user.hombre,
                    user.mujer,
                    user.indefinido,
                    user.menores,
                    user.mayores,
                    user.tercera_edad,
                    user.nacional,
                    user.internacional,
                ]
                // ...
        }),
        })
    } else if (data.tipo === 'Calificaciones') {
        return autoTable(doc, {
            startY: 55,
            head: [[data.calificaciones.length >1 ? 'Nombre sitio' :'','Total vistas', 'Pésima', 'Buena', 'Excelente']],
            body: 
                data.calificaciones.map((user: any) => {
                    return [
                        data.calificaciones.length >1 ? user.nombre_sitio :'' ,
                        user.total_visitas,
                        user.pesima,
                        user.buena,
                        user.excelente,
                    ]
                }),
                // ...
            
        })
    }else if (data.tipo === 'usuarios') {
        return autoTable(doc, {
            startY: 65,
            head: [[data.site.id_sitio ===-1 ? 'Nombre sitio':'','Usuario', 'Genero', 'País', 'Edad', 'Ultima visita']],
            body: 
            data.rows.map((user: any) => {
                return [
                    data.site.id_sitio ===-1 ? user.nombre_sitio:'',
                    user.nombre,
                    user.genero,
                    user.pais,
                    user.edad,
                    Moment(user.ultima_visita).format('DD/MM/YYYY'),
                ]
            }),
                // ...
            
        })
    }
}

const tablaUsers = (data: any, doc: any) => {

    data.users.map((user: any) => {
      
     
    })

    return autoTable(doc, {
        startY: 20,
        columnStyles: { Comentario: { cellWidth:10 } },
        columns: [
            data.site.id_sitio ===-1 ? {header: 'Nombre sitio', dataKey: 'nombre_sitio'}:'',
            {header: 'Nombre', dataKey: 'nombre'},
            {header: 'Apellido', dataKey: 'apellido'},
            {header: 'Género', dataKey: 'genero'},
            {header: 'País', dataKey: 'pais_origen'},
            {header: 'Puntuación', dataKey: 'puntuacion'},
            {header: 'Comentario', dataKey: 'comentario'},
        ],
        body: 
            data.users.map((user: any) => {
                var str=user.comentario.substring(0, 50);

                return [
                    data.site.id_sitio ===-1 ? user.nombre_sitio:'',
                    user.nombre,
                    user.apellido,
                    user.genero,
                    user.pais_origen,
                    user.puntuacion,
                    str,
                ]
            }),
            // ...
        
    })
}
