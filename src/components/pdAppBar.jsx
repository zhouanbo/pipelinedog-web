import React from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Subheader from 'material-ui/Subheader'

export default class PdAppBar extends React.Component { 

  constructor(props) {
    super(props)
    this.state = {open: false}
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle() {
    if (this.props.init) {
      this.setState({open: !this.state.open})
    }
  }

  render() {
    return (
      <div>
        <AppBar
          title="PipelineDog"
          onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
        />
        {this.props.init ?
          <Drawer
              docked={false}
              open={this.state.open}
              onRequestChange={(open) => this.setState({open})}
            >
              <Subheader>PipelineDog</Subheader>
              <MenuItem onTouchTap={()=>{this.handleToggle()}}>Export Project</MenuItem>
              <MenuItem onTouchTap={()=>{this.handleToggle()}}>Upload List File</MenuItem>
              <MenuItem onTouchTap={()=>{this.handleToggle()}}>Github Repository</MenuItem>
              <MenuItem onTouchTap={()=>{this.handleToggle()}}>About PipelineDog</MenuItem>
              
          </Drawer> :
          <div></div>
        }
        
      </div>
    )
  }
}