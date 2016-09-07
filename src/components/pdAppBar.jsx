import React from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem'
import Subheader from 'material-ui/Subheader'

export default class PdAppBar extends React.Component { 

  constructor(props) {
    super(props)
    this.state = {open: false}
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle() {
    if (this.props.enterMain) {
      this.setState({open: !this.state.open})
    }
  }

  render() {
    return (
      <div>
        <AppBar
          title="PipelineDog"
          onLeftIconButtonTouchTap={this.handleToggle}
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton iconClassName="material-icons">
                  more_vert
                </IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem 
                disabled={!this.props.enterMain}
                primaryText="Save Project" 
                onTouchTap={this.props.dispatchSaveProject}
              />
              <MenuItem 
                disabled={!this.props.enterMain}
                primaryText="Export Command" 
                onTouchTap={this.props.dispatchExportCommand}
              />
            </IconMenu>
          }
        />
        <Drawer
            docked={false}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
          >
            <Subheader>PipelineDog</Subheader>
            <MenuItem onTouchTap={()=>{this.handleToggle();this.props.dispatchProjectCreate()}}>New Project</MenuItem>
            <MenuItem onTouchTap={()=>{this.handleToggle();this.props.dispatchProjectSave()}}>Save Project</MenuItem>
            <MenuItem onTouchTap={()=>{this.handleToggle(); this.props.dispatchExportCommand()}}>Export Command</MenuItem>
            <MenuItem onTouchTap={()=>{this.handleToggle()}}>Upload List File</MenuItem>
            <MenuItem onTouchTap={()=>{this.handleToggle()}}>Github Repository</MenuItem>
            <MenuItem onTouchTap={()=>{this.handleToggle()}}>About PipelineDog</MenuItem>
        </Drawer>
        
      </div>
    )
  }
}