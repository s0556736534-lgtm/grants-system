import { Route, Routes } from "react-router"
import { Home } from "../components/Home"
import { Login } from "../components/Login"
import { ViewRequests } from "../components/ViewRequests"
import { RequestDetails } from "../components/RequestDetails"
import { Register } from "../components/Register"
import { ViewStatus } from "../components/ViewStatus"
import { SendRequest } from "../components/SendRequest"
import { Navigate } from "react-router"
import { useSelector } from "react-redux"
export const Routing = () => {
    //const c=useSelector(s=>s.users.current)
    const current = useSelector(state => state.users.current);

    return <>
    
        <Routes>
            {/* <Route path="/" element={<Navigate to="/Home" />} /> */}
            <Route path="/" element={current ? <Navigate to="/Home" /> : <Navigate to="/Login" />} />
            <Route path="Home" element={<Home></Home>}></Route>
                <Route path="ViewStatus" element={<ViewStatus></ViewStatus>}></Route>
                <Route path="SendRequest" element={<SendRequest></SendRequest>}></Route>
            
            <Route path="Login" element={<Login></Login>}></Route>
            <Route path="Register" element={<Register></Register>}></Route>
            <Route path="ViewRequests" element={<ViewRequests></ViewRequests>}></Route>
            <Route path="RequestDetails" element={<RequestDetails></RequestDetails>}></Route>
            
            
        </Routes>
    </>
}