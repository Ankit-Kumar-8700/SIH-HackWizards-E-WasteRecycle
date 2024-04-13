import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { SignUp, LogIn, fetchAvailablePickups, fetchAlreadyPickups, fetchScheduledPickups, makePickUp, acceptPickup, markPickup, fetchCollectorRequests,markVerified,markRecycled, fetchNearestCenter, fetchCredits, fetchCollectorOrders} from "../api/api";



export const signUp = createAsyncThunk('signUp', async (formData) => {
    try {
        const { data } = await SignUp(formData);
        return data;
    }
    catch (error) {
        const message = error.response.data.msg;
        return { message };
    }

})


export const signIn = createAsyncThunk('signIn', async (formData) => {
    try {
        const { data } = await LogIn(formData);
        return data;
    }
    catch (error) {
        const message = error.response.data.msg;
        return { message };
    }
})

export const createPickup = createAsyncThunk('createPickup', async (formData) => {
    try {
        const { data } = await makePickUp({ products: formData });
        console.log(data);
        return data;
    }
    catch (error) {
        const message = error.response.data.msg;
        return message;
    }
})

export const availablePickups = createAsyncThunk('availablePickups', async () => {
    try {
        const { data } = await fetchAvailablePickups();
        return data;
    }
    catch (error) {
        console.log(error)
        const message = error.response.data.msg;
        return { message };
    }
})

export const scheduledPickups = createAsyncThunk('schedulePickups', async () => {
    try {
        const { data } = await fetchScheduledPickups();
        return data;
    }
    catch (error) {
        const message = error.response.data.msg;
        return { message };
    }
})

export const alreadyPickedUp = createAsyncThunk('alreadyPickedUp', async () => {
    try {
        const { data } = await fetchAlreadyPickups();
        console.log(data);
        return data;
    }
    catch (error) {
        const message = error.response.data.msg;
        return { message };
    }
})

export const acceptPickUp = createAsyncThunk('acceptPickUp', async (orderId) => {
    try {
        const { data } = await acceptPickup({ orderId });
        return data;          //Remove the accepted order from the list
    }
    catch (error) {
        const message = error.response.data.msg;
        return { message };
    }
})

export const markPickedUp = createAsyncThunk('markPickeUp', async (orderId) => {
    try {
        const { data } = await markPickup({ orderId });
        return data;          //Remove the accepted order from the list
    }
    catch (error) {
        const message = error.response.data.msg;
        return { message };
    }
})

export const getNearestCenter = createAsyncThunk('getNearestCenter', async() => {
    try {
        const { data } = await fetchNearestCenter();
        console.log(data);
        return data;          //Remove the accepted order from the list
    }
    catch (error) {
        const message = error.response.data.msg;
        return { message };
    }
})


export const getCollectorOrders = createAsyncThunk('getCollectorOrders', async(collectorId) => {
    try {
        const { data } = await fetchCollectorOrders(collectorId);
        return data;          //Remove the accepted order from the list
    }
    catch (error) {
        const message = error.response.data.msg;
        return { message };
    }
})


export const makeVerified = createAsyncThunk('makeVerified', async (orderId) => {
    try {
        const { data } = await markVerified(orderId);
        return data;       
    }
    catch (error) {
        const message = error.response.data.msg;
        return { message };
    }
})

export const makeRecycled = createAsyncThunk('markRecycled', async (orderId) => {
    try {
        const { data } = await markRecycled(orderId);
        return data;   
    }
    catch (error) {
        const message = error.response.data.msg;
        return { message };
    }
})

export const getCredits = createAsyncThunk('getCredits',async() => {
    try{
        const {data} = await fetchCredits();
        return data;
    }
    catch(error){
        const message = error.response.data.msg;
        return { message };
    }
})


const initialState = {
    isAuthenticated: false,
    user: {},
    orders: [],
    credits:0
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        logout: (state) => {
            localStorage.clear();
            state.isAuthenticated = false;
            state.user = null;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(signUp.fulfilled, (state, action) => {
            const result = action.payload;
            console.log(result);
            if (result?.message) {
                return alert(result.message);
            }
            if (result?.token) {
                state.user = {
                    name: result.name,
                    userId: result.userId,
                    role: result.role,
                    credits:result.credits
                }
                state.isAuthenticated = true;
                localStorage.setItem('profile', result.token);
                localStorage.setItem('user', JSON.stringify({ ...state.user }));
            }
        })
        builder.addCase(signIn.fulfilled, (state, action) => {
            const result = action.payload;
            if (result?.token) {
                state.user = {
                    name: result.name,
                    userId: result.userId,
                    role: result.role,
                    credits:result.credits
                }
                state.isAuthenticated = true;
                localStorage.setItem('profile', result.token);
                localStorage.setItem('user', JSON.stringify({ ...state.user }));
            }
            else {
                alert(result.msg);
            }
        })
        builder.addCase(createPickup.fulfilled, (state, action) => {
            const result = action.payload;
            alert(result?.message);
        })
        builder.addCase(acceptPickUp.fulfilled, (state, action) => {
            const result = action.payload;
            console.log(result)
            alert(result?.message);
            if (result?.id) {
                state.orders = state.orders.filter((order) => order._id !== result.id);
            }
        })
        builder.addCase(markPickedUp.fulfilled, (state, action) => {
            const result = action.payload;
            alert(result?.message);
            if (result?.id) {
                state.orders = state.orders.filter((order) => order._id !== result.id);
            }
        })
        builder.addCase(availablePickups.fulfilled, (state, action) => {
            const result = action.payload;
            if (result?.message) {
                console.log(result.message);
            }
            else {
                state.orders = result;
            }
        })
        builder.addCase(scheduledPickups.fulfilled, (state, action) => {
            const result = action.payload;
            if (result?.message) {
                console.log(result.message);
            }
            else {
                state.orders = result;
            }
        })
        builder.addCase(getCollectorOrders.fulfilled, (state, action) => {
            const result = action.payload;
            if (result?.message) {
                console.log(result.message);
            }
            else {
                state.orders = result;
                console.log(state.orders);
            }
        })
        builder.addCase(alreadyPickedUp.fulfilled, (state, action) => {
            const result = action.payload;
            console.log(result);
            if (result?.message) {
                console.log(result.message);
            }
            else {
                state.orders = result;
            }
        })

        builder.addCase(makeVerified.fulfilled, (state, action) => {
            const result = action.payload;
            alert(result?.message);
        })
        builder.addCase(makeRecycled.fulfilled, (state, action) => {
            const result = action.payload;
            alert(result?.message);
            if (result?.id) {
                state.orders = state.orders.filter((order) => order._id !== result.id);
            }
        })


        builder.addCase(getCredits.fulfilled, (state,action) => {
                const result = action.payload;
                console.log(result);
                state.credits = result;
        })
    }
})

export const { addToCart, decrement, removeFromCart, logout, setUserAuthenticated } = userSlice.actions;
export default userSlice.reducer;