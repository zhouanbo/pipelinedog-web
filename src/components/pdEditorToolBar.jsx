import React from 'react'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import DropDownMenu from 'material-ui/DropDownMenu'
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem'

export default class PdEditorToolBar extends React.Component {
  
  render() {
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          <h4 style={{marginLeft: 16, color: "#757575"}}>{this.props.name === ""?"Unnamed Step":this.props.name}</h4>
        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <RaisedButton 
            label="Import" 
            labelPosition="before"
            primary={true}
            icon={<FontIcon className="material-icons">file_upload</FontIcon>}
            style={{marginLeft: 0}} 
          />
          <RaisedButton 
            label="Export" 
            labelPosition="before"
            primary={true} 
            icon={<FontIcon className="material-icons">file_download</FontIcon>}
            style={{marginLeft: 0}}
          />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}