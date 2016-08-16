import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'

const PdAppBar = () => (
  <AppBar
    title="PipelineDog"
    iconElementRight={
      <IconButton
        iconClassName="fa fa-github" 
        onTouchTap={function(){alert("hello")}}
        tooltip="Github"
      />
    }
  />
)

export default PdAppBar