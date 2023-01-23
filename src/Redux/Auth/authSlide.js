import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import { registerApi } from "./authActions";
import { loginApi ,  googleApi , facebookApi , forgotPassApi ,signOutApi } from "./authActions";

const initialState = {
     currentUser: undefined,
     loading : false
}

export const authRegister = createAsyncThunk(
    'auth/register',
     async (user) => {
         return await registerApi(user)
    }
)


export const authLogin = createAsyncThunk(
    'auth/login',
     async (user) => {
         return await loginApi(user)
    }
)

export const authGoogleLogin = createAsyncThunk(
    'auth/google',
     async () => {
         return await googleApi()
    }
)


export const authFacebookLogin = createAsyncThunk(
    'auth/facebook',
     async () => {
         return await facebookApi()
    }
)

export const authForgotPassword = createAsyncThunk(
    'auth/forgotpass',
     async (email) => {
         return await forgotPassApi(email)
    }
)

export const authLogout = createAsyncThunk(
    'auth/logout',
     async () => {
        
         return await signOutApi()
    }
)


export const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {


        addUser : (state , action ) => {
            state.currentUser = action.payload;
        }
    },

    extraReducers : (builder) => {
        builder
           .addCase(authRegister.pending , (state , action ) => {
                 state.loading = true
           })

           .addCase(authRegister.fulfilled , (state , action ) => {
                 state.loading = false

           })

           .addCase(authRegister.rejected , (state , action ) => {
                  state.loading = false
           })


           .addCase(authLogin.pending , (state , action ) => {
            state.loading = true
      })

           .addCase(authLogin.fulfilled , (state , action ) => {
            state.loading = false

      })

           .addCase(authLogin.rejected , (state , action ) => {
             state.loading = false
      })



           .addCase(authGoogleLogin.pending , (state , action ) => {
           state.loading = true
          })

           .addCase(authGoogleLogin.fulfilled , (state , action ) => {
           state.loading = false

           })

          .addCase(authGoogleLogin.rejected , (state , action ) => {
          state.loading = false
           })


           .addCase(authFacebookLogin.pending , (state , action ) => {
            state.loading = true
           })
 
            .addCase(authFacebookLogin.fulfilled , (state , action ) => {
            state.loading = false
 
            })
 
           .addCase(authFacebookLogin.rejected , (state , action ) => {
           state.loading = false
            })


            .addCase(authForgotPassword.pending , (state , action ) => {
                state.loading = true
               })
     
            .addCase(authForgotPassword.fulfilled , (state , action ) => {
                state.loading = false
     
                })
     
            .addCase(authForgotPassword.rejected , (state , action ) => {
               state.loading = false
                })


             .addCase(authLogout.pending , (state , action ) => {
                    state.loading = true
                   })
         
             .addCase(authLogout.fulfilled , (state , action ) => {
                    state.loading = false
                    state.currentUser = undefined
         
                    })
         
             .addCase(authLogout.rejected , (state , action ) => {
                   state.loading = false
                    })

          
     
    }
})


export const {addUser} = authSlice.actions
export default authSlice.reducer