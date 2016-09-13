import React from 'react'
import queryString from 'query-string'

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import DropDownMenu from 'material-ui/DropDownMenu'
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import DropZone from 'react-dropzone'

export default class PdEditorToolBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      uploadOpen: false
    }
  }

  render() {
    return (
      <Toolbar>

        <Dialog
          actions={[
            <FlatButton
              label="Close"
              primary={true}
              onTouchTap={()=>{this.setState({uploadOpen: false})}}
            />
          ]}
          modal={true}
          open={this.state.uploadOpen}
          onRequestClose={()=>{this.setState({uploadOpen: false})}}
        >
          <h4>Upload File</h4>
          <h5>Notice: You current edit will be lost.</h5>
          <DropZone 
            multiple={false} 
            onDrop={(files)=>{this.props.dispatchStepUpload(files);this.setState({uploadOpen: false})}}
          >
            <div style={{padding: 16, textAlign: "center", }}>Drop your file or click to select.</div>
          </DropZone>
        </Dialog>

        <ToolbarGroup firstChild={true}>
          <h4 style={{marginLeft: 16, color: "#757575"}}>{!this.props.name?"Unnamed Step":this.props.name}</h4>
        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <RaisedButton 
            disabled={this.props.tab!==0}
            label="Import" 
            labelPosition="before"
            primary={true}
            icon={<FontIcon className="material-icons">file_upload</FontIcon>}
            style={{marginLeft: 0}} 
            onTouchTap={()=>{this.setState({uploadOpen: true})}}
          />
          <RaisedButton 
            disabled={this.props.tab!==0}
            label="Download" 
            labelPosition="before"
            primary={true}
            icon={<FontIcon className="material-icons">file_download</FontIcon>}
            style={{marginLeft: 0}} 
            onTouchTap={()=>{window.open(`https://pipelinedog.herokuapp.com/?${queryString.stringify({content: this.props.text, name: this.props.name.replace(/ /g, '_')+".yml"})}`, "_blank")}}
          />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}