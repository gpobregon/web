import {Page, Text, View, Document, StyleSheet, PDFViewer, Image, pdf} from '@react-pdf/renderer'
import React, {useState, FC, useEffect} from 'react'
import {Button, Modal} from 'react-bootstrap'
import moment from 'moment'
import {Auth} from 'aws-amplify'
import {saveAs} from 'file-saver'
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

    tabla(data, doc)

    doc.text(
        `Reporte generado el ${date_report_format} a las ${hour_report_format}.`,
        20,
        doc.internal.pageSize.height - 10
    )

    if (data.tipo === 'Más visitados') {
        doc.text(data.site?.tipogenero, 15, 37)
        doc.text(data.site?.tipoedad, 15, 42)
        doc.text(data.site?.tipopais, 15, 47)
        doc.text('Fecha inicial: ' + data.site.fecha_inicial, 10, 54)
        doc.text('Fecha final: ' + data.site.fecha_final, 10, 59)
    } else if (data.tipo === 'Calificaciones') {
        doc.text(data.site?.tipocalificacion, 15, 37)
        doc.text('Fecha inicial: ' + data.site.fecha_inicial, 10, 44)
        doc.text('Fecha final: ' + data.site.fecha_final, 10, 49)
        doc.addPage()
        tablaUsers(data, doc)
    }

    doc.save(`[${data.site.id_sitio}]${data.tipo}-${data.name}.pdf`)
}

export default PDF

const tabla = (data: any, doc: any) => {
    if (data.tipo === 'Más visitados') {
        return autoTable(doc, {
            startY: 65,
            head: [
                [
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
            body: [
                [
                    data.rows[0].total_visits,
                    data.rows[0].hombre,
                    data.rows[0].mujer,
                    data.rows[0].indefinido,
                    data.rows[0].menores,
                    data.rows[0].mayores,
                    data.rows[0].tercera_edad,
                    data.rows[0].nacional,
                    data.rows[0].internacional,
                ],
                // ...
            ],
        })
    } else if (data.tipo === 'Calificaciones') {
        return autoTable(doc, {
            startY: 55,
            head: [['Total vistas', 'Pésima', 'Buena', 'Excelente']],
            body: [
                [
                    data.calificaciones.total_visitas,
                    data.calificaciones.pesima,
                    data.calificaciones.buena,
                    data.calificaciones.excelente,
                ],
                // ...
            ],
        })
    }
}

const tablaUsers = (data: any, doc: any) => {
    let bodyData = []

    data.users.map((user: any) => {
      
     
    })

    return autoTable(doc, {
        startY: 20,
        columnStyles: { Comentario: { cellWidth:10 } },
        columns: [
            {header: 'Nombre', dataKey: 'nombre'},
            {header: 'Apellido', dataKey: 'apellido'},
            {header: 'Género', dataKey: 'genero'},
            {header: 'País', dataKey: 'pais_origen'},
            {header: 'Puntuación', dataKey: 'puntuacion'},
            {header: 'Comentario', dataKey: 'comentario'},
        ],
        body: 
            data.users.map((user: any) => {
                var str=user.comentario.substring(0, 25);

                return [
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
