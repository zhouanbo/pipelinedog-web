import React from 'react'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import DropDownMenu from 'material-ui/DropDownMenu'
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem'

class PdEditorToolBar extends React.Component {
  render() {
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true}>     
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

export default PdEditorToolBar