// import React, { useState } from 'react'
// import logo from '../../Assets/Images/PACRA_logo.png'
// import classes from './Login.module.css'


// function index(props) {
    // const [islogged, setislogged] = useState(false)
    // const [loginParams, setloginParams] = useState({
    //     user_id: "",
    //     user_password: ""
    // })

    // const handleFormChange = (event) => {
    //     let loginParamsNew = { ...loginParams };
    //     let val = event.target.value;
    //     loginParamsNew[event.target.name] = val;
    //     setloginParams(loginParamsNew);
    // };

    // const login = (event) => {
    //     let user_id = loginParams.user_id;
    //     let user_password = loginParams.user_password;
    //     if (user_id === "admin" && user_password === "123") {
    //         localStorage.setItem("token", "T");
    //         setislogged(true);
    //     }
    //     event.preventDefault();
    // };


    // return (
        // <div className="container-fluid d-flex flex-column text-center h-100 bg-success">
        //     <form onSubmit={props.login} className="form-signin p-5  d-flex flex-column container my-auto">
        //         <h1 className="h3 mb-3 font-weight-normal text-white">Please sign in</h1>
        //         <div className='col-6'>
        //             <input
        //                 type="text"
        //                 name="user_id"
        //                 onChange={props.handleFormChange}
        //                 placeholder="Enter Username"
        //             />
        //             <input
        //                 type="password"
        //                 name="user_password"
        //                 onChange={props.handleFormChange}
        //                 placeholder="Enter Password"
        //             />
        //             <input type="submit" value="Login" />
        //         </div>
        //     </form >
        // </div >
//         <div className={`d-flex flex-column h-100 ${classes.align}`}>
//             <div className={`my-auto ${classes.grid} ${classes.align__item}`}>

//                 <div className={classes.register}>

//                     {/* <svg xmlns="http://www.w3.org/2000/svg" className={classes.site__logo} width="56" height="84" viewBox="77.7 214.9 274.7 412"><defs><linearGradient id="a" x1="0%" y1="0%" y2="0%"><stop offset="0%" stop-color="#8ceabb" /><stop offset="100%" stop-color="#378f7b" /></linearGradient></defs><path fill="url(#a)" d="M215 214.9c-83.6 123.5-137.3 200.8-137.3 275.9 0 75.2 61.4 136.1 137.3 136.1s137.3-60.9 137.3-136.1c0-75.1-53.7-152.4-137.3-275.9z" /></svg> */}

//                     <img src={logo} className={classes.site__logo} />
//                     <h2>Sign In</h2>

//                     <form onSubmit={props.login} className={classes.form}>

//                         <div className={`${classes.form__field}`}>
//                             <input
//                                 type="text"
//                                 name="user_id"
//                                 className='w-100'
//                                 onChange={props.handleFormChange}
//                                 placeholder="user@pacra.com"
//                             />
//                         </div>

//                         <div className={classes.form__field}>
//                             <input
//                                 type="password"
//                                 name="user_password"
//                                 onChange={props.handleFormChange}
//                                 placeholder="******"
//                             />
//                         </div>

//                         <div className={classes.form__field}>
//                             <input type="submit" value="Login" />
//                         </div>

//                     </form>

//                 </div>

//             </div>
//         </div>
//     )


// }
// export default index;
