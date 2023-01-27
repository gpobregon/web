/* eslint-disable react/jsx-no-target-blank */
import {Auth} from 'aws-amplify'
import {useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {roleManager} from '../../../../app/models/roleManager'
import {getData, getRolesMethod} from '../../../../app/services/api'
import {AsideMenuItem} from './AsideMenuItem'

export function AsideMenuMain() {
    const intl = useIntl()
    const [roles, setRoles] = useState<roleManager[]>([])

    const getRoles = async () => {
        const role: any = await getData(getRolesMethod)

        validateRole(role.data as roleManager[])
    }

    const validateRole = async (rol: any) => {
        Auth.currentUserInfo().then(async (user) => {
            const filter = rol.filter((role: any) => {
                return user.attributes['custom:role'] === role.nombre
            })
            setRoles(filter)
        })
    }

    useEffect(() => {
        const rol = async () => {
            await getRoles()
        }
        rol()
    }, [])

    return (
        <>
            {roles[0]?.gestor_categorias_idiomas && (
                <AsideMenuItem
                    to='/catalogos'
                    title='Catalogos'
                    fontIcon='bi bi-tag'
                    bsTitle='Catalogos'
                    className='py-3'
                />
            )}
            {roles[0]?.gestor_sitios && (
                <AsideMenuItem
                    to='/sitios'
                    title='Sitios'
                    bsTitle='Sitios'
                    fontIcon='bi bi-house-door'
                    className='py-3'
                />
            )}
            {roles[0]?.gestor_notificaciones && (
                <AsideMenuItem
                    to='/notificaciones-push'
                    title='Notificaciones'
                    bsTitle='Notificaciones'
                    fontIcon='bi bi-bell'
                    className='py-3'
                />
            )}
            {roles[0]?.gestor_offline && (
                <AsideMenuItem
                    to='/offline'
                    title='Offline'
                    bsTitle='Offline'
                    fontIcon='bi bi-wifi-off'
                    className='py-3'
                />
            )}
            {roles[0]?.gestor_reportes && (
                <AsideMenuItem
                    to='/reportes'
                    title='Reportes'
                    bsTitle='Reportes'
                    fontIcon='bi bi-file-earmark-text'
                    className='py-3'
                />
            )}
            {roles[0]?.gestor_usuarios && (
                <AsideMenuItem
                    to='/usuarios'
                    title='Usuarios'
                    bsTitle='Usuarios'
                    fontIcon='bi bi-people'
                    className='py-3'
                />
            )}
        </>
    )
}
