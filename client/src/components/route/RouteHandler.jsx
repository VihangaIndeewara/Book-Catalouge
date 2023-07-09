import {BrowserRouter,Routes,Route} from "react-router-dom";
import { Home } from "../pages/Home/Home";
import Login from "../pages/login/Login";


export const RouteHandler=()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/home" element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    );
}