import React from 'react';
import './App.css';
import  {Route,BrowserRouter} from "react-router-dom";
import {Menu} from "./components/Menu";
import {Pages} from "./pages/Pages";
import {AddPage} from "./pages/AddPages";
import {EditPage} from "./pages/Editpage";

function App() {
  return (
<div className="container-fluid">
  <BrowserRouter>
  <div className="row">
    <Menu/>
    <div className="col-9">
      <Route exact path="/" render={()=>{return "CMS"}}/>
      <Route exact path="/pages/" render={()=>{ return <Pages/>}}/>
      <Route path="/pages/addPage" render={()=>{ return <AddPage/>}}/>
      <Route path="/pages/editPage" render={()=>{ return <EditPage/>}}/>
    </div>
  </div>

  </BrowserRouter>
</div>
  );
}

export default App;
