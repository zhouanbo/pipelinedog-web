import React from 'react'
import queryString from 'query-string'

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import Subheader from 'material-ui/Subheader'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

export default class PdAppBar extends React.Component { 

  constructor(props) {
    super(props)
    this.state = {
      open: false, 
      alertOpen: false,
      saveOpen: false,
      exportOpen: false,
      aboutOpen: false
    }
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

        <Dialog
          actions={[
            <FlatButton
              label="Cancel"
              primary={true}
              onTouchTap={()=>{this.setState({alertOpen: false})}}
            />,
            <FlatButton
              label="OK"
              primary={true}
              onTouchTap={()=>{this.setState({alertOpen: false});this.props.dispatchProjectCreate();this.handleToggle()}}
            />
          ]}
          modal={false}
          open={this.state.alertOpen}
          onRequestClose={()=>{this.setState({alertOpen: false})}}
        >
          Are you sure to create a new step? You current progress will be lost.
        </Dialog>

        <Dialog
          actions={[
            <FlatButton
              label="Download"
              primary={true}
              onTouchTap={()=>{window.open(`https://pipelinedog.herokuapp.com/?${queryString.stringify({content: this.props.save, name: "pipeline.yml"})}`, "_blank")}}
            />,
            <FlatButton
              label="Close"
              primary={true}
              onTouchTap={()=>{this.setState({saveOpen: false})}}
            />
          ]}
          modal={true}
          open={this.state.saveOpen}
          onRequestClose={()=>{this.setState({saveOpen: false})}}
        >
          <Subheader>Saving Content:</Subheader>
          <TextField
            name="save"
            value={this.props.save}
            rows={20}
            rowsMax={20}
            style={{margin: "0px 25px", width: "90%"}}
            multiLine={true}
          />
        </Dialog>

        <Dialog
          actions={[
            <FlatButton
              label="Download"
              primary={true}
              onTouchTap={()=>{window.open(`https://pipelinedog.herokuapp.com/?${queryString.stringify({content: this.props['export'], name: "pipeline.sh"})}`, "_blank");}}
            />,
            <FlatButton
              label="Close"
              primary={true}
              onTouchTap={()=>{this.setState({exportOpen: false})}}
            />
          ]}
          modal={true}
          open={this.state.exportOpen}
          onRequestClose={()=>{this.setState({exportOpen: false})}}
        >
          <Subheader>Exporting Commands:</Subheader>
          <TextField
            name="export"
            value={this.props['export']}
            rows={20}
            rowsMax={20}
            style={{margin: "0px 25px", width: "90%"}}
            multiLine={true}
          />
        </Dialog>

        <Dialog
          actions={[
            <FlatButton
              label="Close"
              primary={true}
              onTouchTap={()=>{this.setState({aboutOpen: false})}}
            />
          ]}
          modal={true}
          open={this.state.aboutOpen}
          onRequestClose={()=>{this.setState({aboutOpen: false})}}
        >
          <Subheader>2016 PipelineDog</Subheader>
            <div style={{margin: "0px 25px"}}>
              <p>Anbo Zhou</p>
              <p>Yeting Zhang</p>
              <p>Yazhou Sun</p>
              <p>Jinchuan Xing</p>
            </div>
        </Dialog>

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
                onTouchTap={()=>{this.props.dispatchProjectSave();this.setState({saveOpen: true})}}
              />
              <MenuItem 
                disabled={!this.props.enterMain}
                primaryText="Export Pipeline" 
                onTouchTap={()=>{this.props.dispatchExportPipeline();this.setState({exportOpen: true})}}
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
            <MenuItem onTouchTap={()=>{this.setState({alertOpen: true})}}>New Project</MenuItem>
            <MenuItem onTouchTap={()=>{this.handleToggle();this.props.dispatchProjectSave();this.setState({saveOpen: true})}}>Save Project</MenuItem>
            <MenuItem onTouchTap={()=>{this.handleToggle(); this.props.dispatchExportPipeline();this.setState({exportOpen: true})}}>Export Pipeline</MenuItem>
            <MenuItem onTouchTap={()=>{this.handleToggle();window.open("https://github.com/zhouanbo/pipelinedog-web","_blank")}}>Github Repository</MenuItem>
            <MenuItem onTouchTap={()=>{this.handleToggle();this.setState({aboutOpen: true})}}>About PipelineDog</MenuItem>
        </Drawer>
        
      </div>
    )
  }
}