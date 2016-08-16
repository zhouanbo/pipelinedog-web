import React from 'react'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import DropDownMenu from 'material-ui/DropDownMenu'
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem'

const PdToolBar = () => (
  <Toolbar>
    <ToolbarGroup firstChild={true} lastChild={true}>
      <IconButton 
        iconClassName="material-icons" 
        onTouchTap={function(){alert("hello")}} 
        tooltip="Upload"
        style={{marginTop: 5}}
      >
        file_upload
      </IconButton>

      <ToolbarSeparator />
      
      <IconButton
        iconClassName="material-icons" 
        onTouchTap={function(){alert("hello")}}
        tooltip="New"
        style={{marginTop: 5}}
      >
        open_in_new
      </IconButton>
      
    </ToolbarGroup>
  </Toolbar>
)

export default PdToolBar