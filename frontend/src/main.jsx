import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Dashboard from './Pages/Dashboard.jsx'
import About from './Pages/About.jsx'
import Profile from './Pages/Profile.jsx'
import Catalog from './Pages/Catalog.jsx'
import Login from './Pages/Login.jsx'
import SigUp from './Pages/SigUp.jsx'

const router = createBrowserRouter([
  {
    path: "/login",
    element:  <Login/> 
  },
  {
    path: "/sigup",
    element: <SigUp/>
  },
  {
    element: <App/>,
    children:[
      {
        path:"/",
        element: <Dashboard/>
      },
      {
        path:"/about",
        element: <About/>
      },
      {
        path:"/profile",
        element: <Profile/>
      },
      {
        path:"/catalog",
        element: <Catalog/>
      },
      
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
