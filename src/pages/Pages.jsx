import React from "react";
import {NavLink} from "react-router-dom";
const Tr=(props)=>{
  return (
    <tr>
      <th scope="row">{props.index}</th>
      <td>{props.title}</td>
      <td>{props.name}</td>
      <td><NavLink to={"editPage/"+props.id}>[redakt]</NavLink></td>
    </tr>
  )
}
export class Pages extends React.Component{
  constructor() {
    super();
    this.state={
      pageDetails:[]
    }
  }

  componentDidMount() {
    fetch("http://isgenderli.com/getPages")
      .then(response => response.json())
      .then(info => {
        this.setState({
          pageDetails: info.map((item, index) => {
            return <Tr key={index} index={index+1} id={item.id} name={item.name} title={item.title}/>;
          })
        })
      })
  }
  render(){
    return(
      <div>
        <div className="col-10">

        <table className="table">
          <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Title</th>
            <th scope="col">Управление</th>
          </tr>
          </thead>
          <tbody>
          {this.state.pageDetails}
          </tbody>
        </table>
        </div>

        <NavLink className="btn btn-primary" to="addPage/">Add new page</NavLink>
      </div>
    );
  }
}
