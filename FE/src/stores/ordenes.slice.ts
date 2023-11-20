import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const ordeneSlice = createSlice({
    name: 'ordenes',
    initialState: {
        orden: null,
        all: []
    },
    reducers: {
        setOrden(state: any, action: any) {
            state.orden = action.payload
        },
        setAll(state: any, action: any) {
            state.all = action.payload
        },
        processOrden(state:any, action: any) {
            const asyncExec = async () => {
                try {
                    let response:any = {}
                    if (action.payload.isnew) {
                        const { data } = await axios.post(`${process.env.REACT_APP_APIEP}/ordenes`, {
                            orden:action.payload.data
                        }, {
                            headers: {
                                Authorization: `Bearer ${sessionStorage.token}`
                            }
                        })
                        response = data
                    } else {
                        const { data } = await axios.patch(`${process.env.REACT_APP_APIEP}/ordenes`, {
                            orden:action.payload.data
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

export const { setOrden, setAll, processOrden } = ordeneSlice.actions
export default ordeneSlice.reducer