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
  
    doc.text('Reporte:  '+data.tipo, 10, 25)

    doc.text('Filtros: ', 10, 32)
 
    doc.text(data.site.genero, 15, 37)
    doc.text(data.site.edad, 15, 42)
    doc.text(data.site.pais, 15, 47)

    doc.text('Fecha inicial: ' + data.site.fecha_inicial, 10, 54)
    doc.text('Fecha final: ' + data.site.fecha_final, 10, 59)


    autoTable(doc, {
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

    doc.text(`Reporte generado el ${date_report_format} a las ${hour_report_format}.`, 20, doc.internal.pageSize.height - 10)

  

    doc.save(`[${data.site.id_sitio}]${data.tipo}-${data.name}.pdf`)

}

export default PDF
