import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const userSlice = createSlice({
    name: 'users',
    initialState: {
        user: null,
        all: []
    },
    reducers: {
        setUser(state: any, action: any) {
            state.user = action.payload
        },
        setAll(state: any, action: any) {
            state.all = action.payload
        },
        processUser(state:any, action: any) {
            const asyncExec = async () => {
                try {
                    let response:any = {}
                    if (action.payload.isnew) {
                        const { data } = await axios.post(`${process.env.REACT_APP_APIEP}/usuarios`, {
                            usuario:action.payload.data
                        }, {
                            headers: {
                                Authorization: `Bearer ${state.user.token}`
                            }
                        })
                        response = data
                    } else {
                        const { data } = await axios.patch(`${process.env.REACT_APP_APIEP}/usuarios`, {
                            usuario:action.payload.data
                        }, {
                            headers: {
                                Authorization: `Bearer ${state.user.token}`
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

export const { setUser, setAll, processUser } = userSlice.actions
export default userSlice.reducer