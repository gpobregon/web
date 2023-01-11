import {Page, Text, View, Document, StyleSheet, PDFViewer, Image, pdf} from '@react-pdf/renderer'
import React, {useState, FC, useEffect} from 'react'
import {Button, Modal} from 'react-bootstrap'
import moment from 'moment'
import {Auth} from 'aws-amplify'
import {saveAs} from 'file-saver'

const PDF: FC<any> = ({show, onClose, DATA}) => {
    console.log('🚀 ~ file: pdf.tsx:7 ~ DATA', DATA)

    var date_report = new Date()
    var date_report_format = moment(date_report).format('DD/MM/YYYY')
    var hour_report_format = moment(date_report).format('HH:mm:ss')
    const [user, setDataUser] = useState({
        name: '',
        lastName: '',
    })

    useEffect(() => {
        Auth.currentUserInfo().then((user) => {
            setDataUser({
                name: user.attributes.name,
                lastName: user.attributes['custom:lastname'],
            })
        })
    }, [])

    const MasVisitados = () => (
        <Document>
            <Page size='A4' style={styles.page} orientation={'landscape'}>
                <Text style={styles.title}>
                    {DATA.name}({DATA.site.id_sitio})
                </Text>
                <Text style={styles.detalle}>
                    {DATA.tipo} del {moment(DATA.site.fecha_inicial).format('DD/MM/YYYY')} al{' '}
                    {moment(DATA.site.fecha_final).format('DD/MM/YYYY')}
                </Text>
                <View style={styles.table}>
                    <View style={styles.section}>
                        <View style={{flexDirection: 'column', paddingHorizontal: 20}}>
                            <Text style={styles.titleRowsTable}>Visitas</Text>
                            <Text style={styles.titleRowsTable}>Total visitas</Text>
                            <Text style={styles.titleRowsTable}>{DATA.rows?.total_visitas}</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'column',
                                borderLeft: '1px solid black',
                                paddingHorizontal: 20,
                                alignContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                            }}
                        >
                            <Text style={styles.titleRowsTable}>Género</Text>

                            <View style={{flexDirection: 'row'}}>
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        alignContent: 'center',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                    }}
                                >
                                    <Text style={styles.titleRowsTable}>Hombre</Text>
                                    <Text style={styles.titleRowsTable}>
                                        {DATA.rows?.genero.hombre}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        alignContent: 'center',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                    }}
                                >
                                    <Text style={styles.titleRowsTable}>Mujer</Text>
                                    <Text style={styles.titleRowsTable}>
                                        {DATA.rows?.genero.mujer}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        alignContent: 'center',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                    }}
                                >
                                    <Text style={styles.titleRowsTable}>Sin género</Text>
                                    <Text style={styles.titleRowsTable}>
                                        {DATA.rows?.genero.indefinido}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View
                            style={{
                                flexDirection: 'column',
                                borderLeft: '1px solid black',
                                paddingHorizontal: 20,
                                alignContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                            }}
                        >
                            <Text style={styles.titleRowsTable}>Edad</Text>
                            <View style={{flexDirection: 'row'}}>
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        alignContent: 'center',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                    }}
                                >
                                    <Text style={styles.titleRowsTable}>Menor</Text>
                                    <Text style={styles.titleRowsTable}>
                                        {DATA.rows?.edad.menores}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        alignContent: 'center',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                    }}
                                >
                                    <Text style={styles.titleRowsTable}>Mayor</Text>
                                    <Text style={styles.titleRowsTable}>
                                        {DATA.rows?.edad.mayores}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        alignContent: 'center',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                    }}
                                >
                                    <Text style={styles.titleRowsTable}>Tercera</Text>
                                    <Text style={styles.titleRowsTable}>
                                        {DATA.rows?.edad.tercera_edad}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View
                            style={{
                                flexDirection: 'column',
                                borderLeft: '1px solid black',
                                paddingHorizontal: 20,
                                alignContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                            }}
                        >
                            <Text style={styles.titleRowsTable}>País</Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        alignContent: 'center',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                    }}
                                >
                                    <Text style={styles.titleRowsTable}>Nacional</Text>
                                    <Text style={styles.titleRowsTable}>
                                        {DATA.rows?.pais.nacional}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        alignContent: 'center',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                    }}
                                >
                                    <Text style={styles.titleRowsTable}>Extranjero</Text>
                                    <Text style={styles.titleRowsTable}>
                                        {DATA.rows?.pais.internacional}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <Text style={styles.generadoPor}>
                    Reporte generado el {date_report_format} a las {hour_report_format} por{' '}
                    {user.name} {user.lastName}.
                </Text>
            </Page>
        </Document>
    )
    const saveFile = () => {
        // This does the trick!
        pdf(<MasVisitados />)
            .toBlob()
            .then((blob) => saveAs(blob, `[${DATA.site.id_sitio}]${DATA.tipo}-${DATA.name}.pdf`))
    }
    return (
        <Modal show={show} size='lg' fullscreen onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Reporte</Modal.Title>
            </Modal.Header>
            <div className='d-flex align-content-center'>
                <Button onClick={saveFile}>Exportar PDF</Button>
            </div>
            <Modal.Body>
                <PDFViewer style={styles.viewer} showToolbar={false}>
                    <MasVisitados />
                </PDFViewer>
            </Modal.Body>
        </Modal>
    )
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#E4E4E4',
        padding: 20,
    },
    section: {
        flexDirection: 'row',
    },
    viewer: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 18,
        marginBottom: 35,
        paddingHorizontal: 20,
        textAlign: 'center',
    },
    titleRowsTable: {
        fontSize: 14,
        margin: 5,
        textAlign: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
    },
    table: {
        flexDirection: 'column',
        margin: 25,
        border: '1px solid black',
        alignContent: 'center',
        justifyContent: 'center',
    },
    generadoPor: {
        fontSize: 12,
        marginVertical: -20,
        paddingHorizontal: 35,
    },
    detalle: {
        fontSize: 14,
        marginBottom: -20,
        paddingHorizontal: 35,
    },
})

export default PDF
