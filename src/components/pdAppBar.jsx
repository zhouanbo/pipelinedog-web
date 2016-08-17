import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'

class PdAppBar extends React.Component { 
  render() {
    return (
      <AppBar
        title="PipelineDog"
        iconElementRight={
          <IconButton 
            iconClassName="material-icons" 
            onTouchTap={function(){alert("hello")}} 
            tooltip="Upload"
          >
            file_upload
          </IconButton>
        }
      />
    )
  }
}

export default PdAppBar