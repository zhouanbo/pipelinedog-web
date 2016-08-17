import React from 'react'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import DropDownMenu from 'material-ui/DropDownMenu'
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem'

class PdEditorToolBar extends React.Component {
  render() {
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          <IconButton 
            iconClassName="material-icons" 
            onTouchTap={function(){alert("hello")}} 
            tooltip="Upload"
            tooltipPosition="top-center"
            style={{marginTop: 5}}
          >
            file_upload
          </IconButton>
          
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

export default PdEditorToolBar