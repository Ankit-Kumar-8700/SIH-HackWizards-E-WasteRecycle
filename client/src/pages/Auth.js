// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Avatar, Button, Paper, Grid, Typography, Container, TextField, InputAdornment, IconButton } from '@mui/material';

// import { useNavigate } from 'react-router-dom';
// // import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import { signUp, signIn } from '../redux/userSlice';



// import decode from 'jwt-decode';

// const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword:"",city:"", phone:"", address:"", lat:"", lon:"", role:"user"};



// const Input = ({ name, handleChange, label, half, autoFocus, type, handleShowPassword }) => (
//     <Grid item xs={12} sm={half ? 6 : 12}>
//         <TextField
//             name={name}
//             onChange={handleChange}
//             variant="outlined"
//             required
//             fullWidth
//             label={label}
//             autoFocus={autoFocus}
//             type={type}
//             InputProps={name === 'password' ? {
//                 endAdornment: (
//                     <InputAdornment position="end">
//                         <IconButton onClick={handleShowPassword}>
//                             {type === 'password' ? <VisibilityOff /> : <Visibility />}
//                         </IconButton>
//                     </InputAdornment>
//                 ),
//             } : null}
//         />
//     </Grid>
// );


// const Auth = () => {
//     const [form, setForm] = useState(initialState);
//     const [isSignup, setIsSignup] = useState(true);
//     // const [emailVerifed,setEmailVerified] = useState(false);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();


//     const {isAuthenticated} = useSelector((state) => state.user);

//     const [showPassword, setShowPassword] = useState(false);
//     const handleShowPassword = () => setShowPassword(!showPassword);

//     const switchMode = () => {
//         setForm(initialState);
//         setIsSignup((prevIsSignup) => !prevIsSignup);
//         setShowPassword(false);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (isSignup) {
//             if(form.confirmPassword !== form.password){
//                 alert("Passwords not match please correct them!");
//                 return;
//             }
//             else{
//                 alert("Check Your E-Mail to verify");
//                 dispatch(signUp({ ...form, name: form.firstName + ' ' +  form.lastName }));
                
//             }

//         } else{
//               dispatch(signIn({ ...form, name: form.firstName + form.lastName }));
//         } 
//         navigate("/");          
//     };
    
//     // useEffect(() => {   
//     //     if(isAuthenticated)  
//     // },[isAuthenticated]);


//     useEffect(() => {
//         if('geolocation' in navigator){
//           navigator.geolocation.getCurrentPosition((position) => {
//               setForm({...form,lat:position.coords.latitude,lon:position.coords.longitude})
//           })
//       }
//       },[]);


//     // const googleSuccess = async (res) => {
//     //     const token = res?.credential;
//     //     const result = decode(token);
//     //     try {
//     //         // dispatch(googleLogin({ result, token }));
//     //         navigate("/");
//     //     } catch (error) {
//     //         console.log(error);
//     //     }
//     // };



//     const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//     return (
//         <Container className={`mt-28 mb-12 items-center`}  component="main" maxWidth="xs" style={{ display: "flex", justifyContent: "center"}}  >
//             <Paper className='flex flex-col justify-center items-center p-4' elevation={6}>
//             <Avatar className='my-2' style={{ backgroundColor: '#435334' }} >
//                     <LockOutlinedIcon className='' />
//                 </Avatar>
//                 <Typography component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
//                 <form className='mt-4' onSubmit={handleSubmit} >
//                     <Grid container spacing={2}>
//                         {isSignup && (
//                             <>
//                                 <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
//                                 <Input name="lastName" label="Last Name" handleChange={handleChange} half />
//                             </>
//                         )}
//                         <Input name="email" label="Email Address" handleChange={handleChange} type="email" value={form.email} />
//                         <Input name="password" label="Password" handleChange={handleChange} half={isSignup}  type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
//                         {isSignup && ( 
//                             <>
//                             <Input name="confirmPassword" label="Repeat Password" half  handleChange={handleChange} type="password" />
//                             <Input name="city" label="Your City" half  handleChange={handleChange} type="text" />
//                                 <Input name="phone" label="Your Phone Number" half  handleChange={handleChange} type="text" />
//                                 <Grid item xs={12} >
//                                 <textarea
//                                     className='border-1 border-[#e5e7eb] rounded-lg p-3'
//                                     name='address'
//                                     placeholder='Your Address'
//                                     value={form.address}
//                                     rows={3}
//                                     onChange={handleChange}
//                                     cols={35}
//                                 />   
//                                 </Grid>
//                                 </>
//                         )}

//                     </Grid>
//                     <Button type="submit" variant="contained" className='mt-4 w-3/4' style={{ backgroundColor: '#40513B' }}  >
//                         {isSignup ? 'Sign Up ' : 'Sign In'}
//                     </Button>
//                     {/* <div className='my-4 flex justify-center'>
//                         <GoogleLogin
//                             width={"100%"}
//                             onSuccess={credentialResponse => {
//                                 googleSuccess(credentialResponse)
//                             }}
//                             onError={() => {
//                                 console.log('Login Failed');
//                                 alert("Something went wrong try again!!");
//                             }}
//                         />
//                     </div> */}
//                     <Grid container justifyContent="flex-end">
//                         <Grid item>
//                             <Button onClick={switchMode} style={{ color: '#435334' }} >
//                                 {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
//                             </Button>
//                         </Grid>
//                         {isSignup && (
//                             <>
//                             <Grid item>
//                             <Button onClick={() => setForm({...form,role:'collector'})} style={{ color: '#435334' }} >
//                                 Signup as collector?
//                             </Button>
//                         </Grid>
//                         <Grid item>
//                             <Button onClick={() => setForm({...form,role:'center'})} style={{ color: '#435334' }} >
//                                Signup as Center?
//                             </Button>
//                         </Grid>

//                             </>
//                         )}
//                     </Grid>
//                 </form>
//             </Paper>
//         </Container>
//     );
// };

// export default Auth;



import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField, InputAdornment, IconButton } from '@mui/material';

import { useNavigate } from 'react-router-dom';
// import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { signUp, signIn } from '../redux/userSlice';



import decode from 'jwt-decode';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword:"",city:"", phone:"", address:"", lat:"", lon:"", role:"user"};



const Input = ({ name, handleChange, label, half, autoFocus, type, handleShowPassword }) => (
    <Grid item xs={12} sm={half ? 6 : 12}>
        <TextField
            name={name}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            InputProps={name === 'password' ? {
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                            {type === 'password' ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            } : null}
        />
    </Grid>
);


const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(true);
    // const [emailVerifed,setEmailVerified] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const {isAuthenticated} = useSelector((state) => state.user);

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const switchMode = () => {
        setForm(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            if(form.confirmPassword !== form.password){
                alert("Passwords not match please correct them!");
                return;
            }
            else{
                // alert("Check Your E-Mail to verify");
                console.log(form);
                dispatch(signUp({ ...form, name: form.firstName + form.lastName }));
                
            }

        } else{
              dispatch(signIn({ ...form, name: form.firstName + form.lastName }));
        }           
        navigate("/");
    };
    
    // useEffect(() => {
    //     if(isAuthenticated)
    // },[isAuthenticated]);


    useEffect(() => {
        if('geolocation' in navigator){
          navigator.geolocation.getCurrentPosition((position) => {
              setForm({...form,lat:position.coords.latitude,lon:position.coords.longitude})
          })
      }
      },[]);


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    return (
        <Container className={`mt-28 mb-12 items-center`}  component="main" maxWidth="xs" style={{ display: "flex", justifyContent: "center",color:'#435334'}}  >
            <Paper className='flex flex-col justify-center items-center p-4 text-#000000' elevation={6}>
                <Avatar className='my-2' style={{ backgroundColor: '#435334' }} >
                    <LockOutlinedIcon className='' />
                </Avatar>
                <Typography component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
                <form className='mt-4' onSubmit={handleSubmit} >
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} half={isSignup}  type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignup && ( 
                            <>
                            <Input name="confirmPassword" label="Repeat Password" half  handleChange={handleChange} type="password" />
                            <Input name="city" label="Your City" half  handleChange={handleChange} type="text" />
                                <Input name="phone" label="Your Phone Number" half  handleChange={handleChange} type="text" />
                                <Grid item xs={12} >
                                <textarea
                                    className='border-1 border-[#e5e7eb] rounded-lg p-3'
                                    name='address'
                                    placeholder='Your Address'
                                    value={form.address}
                                    rows={3}
                                    onChange={handleChange}
                                    cols={35}
                                />   
                                </Grid>
                                </>
                        )}

                    </Grid>
                    <Button type="submit" variant="contained" className='mt-4 w-3/4' style={{ backgroundColor: '#40513B' }}  >
                        {isSignup ? 'Sign Up ' : 'Sign In'}
                    </Button>
                    {/* <div className='my-4 flex justify-center'>
                        <GoogleLogin
                            width={"100%"}
                            onSuccess={credentialResponse => {
                                googleSuccess(credentialResponse)
                            }}
                            onError={() => {
                                console.log('Login Failed');
                                alert("Something went wrong try again!!");
                            }}
                        />
                    </div> */}
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode} style={{ color: '#435334' }} >
                                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                        {isSignup && (
                            <>
                            <Grid item>
                            <Button onClick={() => setForm({...form,role:'collector'})} style={{ color: '#435334' }} >
                                Signup as collector?
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={() => setForm({...form,role:'center'})} style={{ color: '#435334' }} >
                               Signup as Center?
                            </Button>
                        </Grid>

                            </>
                        )}
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;