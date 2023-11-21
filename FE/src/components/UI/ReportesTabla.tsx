import React from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const defaultHeader: any = [
    'id','Nombre', 'Cantidad'
];
const defaultData: any = [
    {
        id: 1,
        nombre: 'Lorem ipsum',
        cantidad: 10
    },
    {
        id: 2,
        nombre: 'Foo baz',
        cantidad: 3
    },
    {
        id: 3,
        nombre: 'Bazz ipfoo',
        cantidad: 16
    }
];
const ReportesTabla = (props: any) => {
    const [headers, setHeaders] = React.useState(defaultHeader)
    const [dataTabla, setDataTabla] = React.useState(defaultData)
    const [startDate, setStartDate] = React.useState(null)
    const [endDate, setEndDate] = React.useState(null)
    const [tmpOrdenes] = React.useState(props.ordenes)

    const tableToCSV = () => {
        let csv_data: any = [headers];
        
        dataTabla.map((row: any) => {
            const csvrow: any = [];
            Object.entries(row).map((value: any) => {
                // eslint-disable-next-line
                const [_, val] = value
                csvrow.push(val)
                return value
            })
            csv_data.push(csvrow.join(','))
            return row
        })
        
        csv_data = csv_data.join('\n');
     
        const CSVFile = new Blob([csv_data], { type: "text/csv" });
        const url = window.URL.createObjectURL(CSVFile);
        const temp_link = document.createElement('a');
        
        temp_link.download = `${process.env.REACT_APP_REPORTE_NOMBRE}.csv`;
        temp_link.href = url;
        
        temp_link.style.display = "none";
        document.body.appendChild(temp_link);
        
        temp_link.click();
        document.body.removeChild(temp_link);
    };
    const generaDataReporte = (e: any) => {
        e.preventDefault()
        if (startDate === null || endDate === null) return
        const starttime = new Date(startDate).getTime()
        const endtime = new Date(endDate).getTime()
        const filteredOrdenes = tmpOrdenes.slice(0).filter((orden: any) => {
            const ordentime = new Date(orden.createdAt).getTime()

            if (ordentime <= endtime && ordentime >= starttime) {
                return true
            } else {
                return false
            }
        })
        const tmpDataTabla: any = []
        const tmpData: any = {}
        filteredOrdenes.map((orden: any) => {
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
            return orden
        })
        Object.entries(tmpData).map((prod: any) => {
            const [key, value] = prod
            tmpDataTabla.push({
                nombre: key,
                precio: '$ ' + value.precio.toFixed(2),
                cantidad: value.cuenta
            })
            return prod
        })
        setDataTabla(tmpDataTabla)
        setStartDate(null)
        setEndDate(null)
    };

    React.useEffect(() => {
        if (props.headers) {
            setHeaders(props.headers)
        }
    }, [props.headers])

    React.useEffect(() => {
        if (props.data) {
            setDataTabla(props.data)
        }
    }, [props.data])

    return <div className='container'>
        <div className='row p-3'>
            <form onSubmit={generaDataReporte} className='row m-0 p-0'>
                <div className='col-sm-12 col-md-4 col-lg-4 mt-2'>
                    <DatePicker className='w-100 form-control d-block' selected={startDate} onChange={(date: any) => setStartDate(date)} placeholderText='Inicio' maxDate={endDate} required/>
                </div>
                <div className='col-sm-12 col-md-4 col-lg-4 mt-2'>
                    <DatePicker className='w-100 form-control d-block' selected={endDate} onChange={(date: any) => setEndDate(date)} placeholderText='Fin'minDate={startDate} required/>
                </div>
                <div className='col-sm-12 col-md-4 col-lg-4 mt-2'>
                    <button type="submit" className='btn btn-secondary w-100'>Generar reporte</button>
                </div>
            </form>
            <div className='col-12 p-3 table-responsive'>
                <table className='table table-success table-hover table-striped table-caption-top table-sm'>
                    <thead>
                        <tr>
                            {
                                headers.map((label: any, hid: number) => {
                                    return <th key={`tr-th-${hid}`} scope="col">{label}</th>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody className='h-40 overflow-auto'>
                        {
                            dataTabla.map((row: any, rid: number) => {
                                return (
                                    <tr key={`tr-${rid}`}>
                                        {
                                            Object.entries(row).map((value: any, did: number) => {
                                                const [key, val] = value
                                                return <td key={`td-${rid}-${did}-${key}`}>{val}</td>
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className='col-sm-12 col-md-4 col-lg-4 mt-2'>
                {
                    dataTabla.length > 0 ? (
                        <div className='btn btn-success w-100' onClick={tableToCSV}>Descarga CSV</div>
                    ) : ''
                }
            </div>
        </div>
    </div>
}

export default ReportesTabla
