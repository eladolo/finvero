import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const productoSlice = createSlice({
    name: 'productos',
    initialState: {
        producto: null,
        all: []
    },
    reducers: {
        setProducto(state: any, action: any) {
            state.producto = action.payload
        },
        setAll(state: any, action: any) {
            state.all = action.payload
        },
        processProducto(state:any, action: any) {
            const asyncExec = async () => {
                try {
                    let response:any = {}
                    if (action.payload.isnew) {
                        const { data } = await axios.post(`${process.env.REACT_APP_APIEP}/productos`, {
                            producto:action.payload.data
                        }, {
                            headers: {
                                Authorization: `Bearer ${sessionStorage.token}`
                            }
                        })
                        response = data
                    } else {
                        const { data } = await axios.patch(`${process.env.REACT_APP_APIEP}/productos`, {
                            producto:action.payload.data
                        }, {
                            headers: {
                                Authorization: `Bearer ${sessionStorage.token}`
                            }
                        })
                        response = data
                    }
        
                    if (response.status === 400) {
                        throw new Error(response.message)
                    }
                } catch (error: any) {
                    console.error(error)
                }
            }

            asyncExec()
        }
    }
})

export const { setProducto, setAll, processProducto } = productoSlice.actions
export default productoSlice.reducer