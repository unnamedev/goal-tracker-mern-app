import React from "react"
import {render} from "react-dom"
import "./index.scss"
import App from "./App"
import {store} from "./app/store"
import {Provider} from "react-redux"

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("root")
)