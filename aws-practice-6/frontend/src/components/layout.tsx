import * as React from "react"
import "./layout.css"

const Layout = ({ children }) => {
  return (
    <>
      <div className="layout-header">Todo App</div>
      <div className="layout-body">{children}</div>
      <div className="layout-footer">Copyright &copy; 2021</div>
    </>
  )
}

export default Layout
