import { Provider } from "react-redux"
import { Nav } from "./routing/Nav"
import { Routing } from "./routing/Rouing"
import s from './redux/store'
import './style.css'
import { BrowserRouter } from "react-router"
import { Home } from "./components/Home"

export const Main = () => {


    return <>

        <Provider store={s}>
            <BrowserRouter>
                <Nav></Nav>
                <Routing></Routing>
            </BrowserRouter>
        </Provider>

    </>
}