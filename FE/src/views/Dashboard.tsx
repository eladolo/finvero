import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import '../assets/Dashboard.scss';
import Navbar from '../components/containers/Navbar';
import Lineas from '../components/graficas/Lineas';
import Dona from '../components/graficas/Dona';
import ReportesTabla from '../components/UI/ReportesTabla';

function Dashboard() {
    const [headers, setHeaders] = React.useState([])
    const [dataTabla, setDataTabla] = React.useState([])
    const [dataLinea, setDataLinea] = React.useState(null)
    const [dataDona, setDataDona] = React.useState(null)
    const dispatch = useDispatch()
    const userdata = useSelector((state: any) => state.users.user || {})
    const ordenes = useSelector((state: any) => state.ordenes.all || [])
    const getOrdenes = React.useCallback(() => {
        const asyncExec = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_APIEP}/ordenes/user`, {
                    headers: {
                        Authorization: `Bearer ${userdata.token}`
                    },
                    params: {
                        id:userdata.uid
                    }
                })
                
                if (data.status === 400) {
                    throw new Error(data.message)
                }
                dispatch({type: 'ordenes/setAll', payload: data})
            } catch (error: any) {
                console.error(error)
            }
        }
        asyncExec()
    }, [userdata, dispatch]);
    
    React.useEffect(() => {
        getOrdenes()
    }, [getOrdenes])

    React.useEffect(() => {
        if (ordenes.length > 0) {
            const tmpHeadersTabla: any = ["Producto", "Precio", "Cantidad"]
            const tmpDataTabla: any = []
            const tmpData: any = {}
            const tmpDataLinea: any = {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'] as any [],
                datasets: [
                    {
                        fill: true,
                        label: 'Ordenes ventas',
                        data: [0,0,0,0,0,0,0,0,0,0,0,0] as any [],
                        borderColor: 'rgb(53, 162, 235)',
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    },
                ],
            };
            const tmpDataDona: any = {
                labels: [] as any [],
                datasets: [
                    {
                        label: '# de productos',
                        data: [] as any[],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            };
            ordenes.map((orden: any) => {
                const ordenMes = new Date(orden.createdAt).getMonth()
                const productos = JSON.parse(orden.productos)
                productos.map((producto: any) => {
                    if (tmpData[producto.nombre]) {
                        tmpData[producto.nombre].cuenta += producto.addToCart
                    } else {
                        tmpData[producto.nombre] = {
                            ...producto,
                            cuenta: producto.addToCart
                        }
                    }
                    return producto
                })
                tmpDataLinea.datasets[0].data[ordenMes] += orden.total
                return orden
            })
            Object.entries(tmpData).map((prod: any) => {
                const [key, value] = prod
                tmpDataTabla.push({
                    nombre: key,
                    precio: '$ ' + value.precio.toFixed(2),
                    cantidad: value.cuenta
                })
                tmpDataDona.labels.push(key)
                tmpDataDona.datasets[0].data.push(value.cuenta)
                return prod
            })
            setHeaders(tmpHeadersTabla)
            setDataTabla(tmpDataTabla.sort((a:any, b: any) => b.cantidad - a.cantidad))
            setDataDona(tmpDataDona)
            setDataLinea(tmpDataLinea)
        } else {
            setHeaders([])
            setDataTabla([])
            setDataDona(null)
            setDataLinea(null)
        }
    }, [ordenes, dispatch])

    return (
        <div className="Dashboard">
            <span className='float-end p-2'>{userdata?.nombre || ''}</span>
            <Navbar />
            <div className='nav nav-tabs' role='tablist' id="dashboard-tabs">
                <button className="nav-link" data-bs-toggle="tab" data-bs-target="#dashboard-reportes" type="button" role="tab" aria-controls="nav-dashboard-reportes" aria-selected="true">
                    Reportes
                </button>
                <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#dashboard-graficas" type="button" role="tab" aria-controls="nav-dashboard-graficas" aria-selected="false">
                    Gráficas
                </button>
            </div>
            <div className='tab-content' id="nav-dashboard-content">
                <div className='tab-pane fade' id="dashboard-reportes" role="tabpanel" aria-labelledby='nav-dashboard-reportes-tab'>
                    <ReportesTabla headers={headers} data={dataTabla} ordenes={ordenes}></ReportesTabla>
                </div>
                <div className='tab-pane fade show active p-4' id="dashboard-graficas" role="tabpanel" aria-labelledby='nav-dashboard-graficas-tab'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-sm-12 col-md-6 col-lg-6'>
                                <Lineas data={dataLinea} options={null} />
                            </div>
                            <div className='col-sm-12 col-md-6 col-lg-6'>
                                <Dona data={dataDona} options={null} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;