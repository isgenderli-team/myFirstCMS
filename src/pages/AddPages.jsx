import React, {createRef} from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-vibrant_ink";
import "emmet-core";
import "ace-builds/src-noconflict/ext-emmet";

export class AddPage extends React.Component{
  constructor() {
    super();
    this.htmlEditor = createRef();
    this.cssEditor = createRef();
     this.jsEditor = createRef();
    this.handleSave = this.handleSave.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state={
      pageName:"",
      pageTitle:""
    }

  }
  handleSave(){
    let formData = new FormData();
    formData.append('name',this.state.pageName);
    formData.append('title',this.state.pageTitle);
    formData.append("html",this.htmlEditor.current.editor.getValue());
    formData.append("css",this.cssEditor.current.editor.getValue());
    formData.append("js",this.jsEditor.current.editor.getValue());
    fetch("http://isgenderli.com/addPage",{
      method:'POST',
      body: formData
    })
      .then(response=>response.json())
      .then(result=>console.log(result))



  }
  handleInputChange(event){
    const target = event.target; // <-input
    const name = target.name; // <- input[name="name/title"]
    const value = target.value; // <- input[name="name/title"].value

    this.setState({
      [name]:value
    })

  }
  componentDidMount() {
    console.log(this.htmlEditor.current.editor.getValue())
  }

  render(){
    return <div>
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <a className="nav-link active" id="nav-html-tab" data-toggle="tab" href="#nav-html" role="tab"
             aria-controls="nav-html" aria-selected="true">HTML</a>
          <a className="nav-link" id="nav-css-tab" data-toggle="tab" href="#nav-css" role="tab"
             aria-controls="nav-css" aria-selected="false">CSS</a>
          <a className="nav-link" id="nav-js-tab" data-toggle="tab" href="#nav-js" role="tab"
             aria-controls="nav-js" aria-selected="false">JS</a>
          <a className="nav-link" id="nav-extraHtml-tab" data-toggle="tab" href="#nav-extraHtml" role="tab"
             aria-controls="nav-extraHtml" aria-selected="false">Html options</a>
         <button onClick={this.handleSave} className="btn btn-light ml-auto">[Save]</button>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active" id="nav-html" role="tabpanel" aria-labelledby="nav-html-tab">
          <AceEditor
            mode="html"
            theme="vibrant_ink"
            ref = {this.htmlEditor}
            width="100%"
            setOptions={
              {
                fontSize:18,
                enableEmmet:true

              }
            }
          />

        </div>
        <div className="tab-pane fade" id="nav-css" role="tabpanel" aria-labelledby="nav-css-tab">
          <AceEditor
            mode="css"
            theme="vibrant_ink"
            width="100%"
            ref = {this.cssEditor}
            setOptions={
              {
                fontSize:18,
                enableEmmet:true

              }
            }
          />
        </div>
        <div className="tab-pane fade" id="nav-js" role="tabpanel" aria-labelledby="nav-js-tab">
          <AceEditor
            mode="javascript"
            theme="vibrant_ink"
            width="100%"
            ref={this.jsEditor}
            setOptions={
              {
                fontSize:18,
                enableEmmet:true

              }
            }
          />
        </div>
        <div className="tab-pane fade" id="nav-extraHtml" role="tabpanel" aria-labelledby="nav-extraHtml-tab">
          <div className="mt-5 mb-3 col-10">
            <input onChange={this.handleInputChange} type="text" name="pageName" placeholder="Enter the name" className="form-control"/>
          </div>
          <div className="mb-3 col-10">
            <input onChange={this.handleInputChange} type="text" name="pageTitle" placeholder="Enter the title" className="form-control"/>
          </div>
        </div>
        </div>


    </div>
  }
}
