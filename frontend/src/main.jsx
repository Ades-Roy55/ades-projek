import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Dashboard from './Pages/Dashboard.jsx'
// import About from './Pages/About.jsx'

const router = createBrowserRouter([
  // {
  //   path:"/"
  // },
  {
    element: <App/>,
    children:[
      {
        path:"/",
        element: <Dashboard/>
      },
      // {
      //   path:"/about",
      //   element: <About/>
      // }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
