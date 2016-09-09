import React from 'react'
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class PdStepList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      alertOpen: false,
      alertStep: {},
      alertIndex: 0
    }
  }

  render() {
    return (
      <List>
        <Subheader>Tabs</Subheader>

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
              onTouchTap={()=>{this.props.dispatchDeleteStep(this.state.alertIndex); this.setState({alertOpen: false})}}
            />
          ]}
          modal={false}
          open={this.state.alertOpen}
          onRequestClose={()=>{this.setState({alertOpen: false})}}
        >
          Are you sure to delete step "{this.state.alertStep.name === "" ? "Unnamed Step" : this.state.alertStep.name}"?
        </Dialog>

        <ListItem
          onTouchTap={this.props.dispatchStepChange.bind(this, -2)}
          leftIcon={
            <IconButton 
              iconClassName="material-icons" 
              style={{marginTop: 5}}
            >
              input
            </IconButton>
          }
          primaryText="List File"
          secondaryText="Pipeline input"
        />
        <ListItem
          onTouchTap={this.props.dispatchStepChange.bind(this, -1)}
          leftIcon={
            <IconButton 
              iconClassName="material-icons" 
              style={{marginTop: 5}}
            >
              language
            </IconButton>
          }
          primaryText="Global Variables"
          secondaryText="Pipeline specific variables"
        />
        <Divider inset={true} />

        <Subheader>Steps</Subheader>
        <IconButton
          onTouchTap={this.props.dispatchCreateStep}
          iconClassName="material-icons" 
          style={{marginTop: -50, marginRight: 35, float: "right"}}
          tooltip="Add"
        >
          note_add
        </IconButton>
        <IconButton
          onTouchTap={this.props.dispatchSortStep}
          iconClassName="material-icons" 
          style={{marginTop: -50, float: "right"}}
          tooltip="Sort"
        >
          sort
        </IconButton>

        {this.props.steps.map((step, index) => {
          return (
            <ListItem
              key={index}
              onTouchTap={this.props.dispatchStepChange.bind(this, index)}
              onMouseOver={()=>{document.getElementsByClassName("delete-icon-"+index)[0].style.display="inline"}}
              onMouseLeave={()=>{document.getElementsByClassName("delete-icon-"+index)[0].style.display="none"}}
              leftIcon={
                <IconButton
                  iconClassName="material-icons" 
                  style={{marginTop: 5}}
                >
                  assignment
                </IconButton>
              }
              rightIcon={
                <IconButton
                  className={"delete-icon-"+index}
                  iconClassName="material-icons" 
                  style={{marginTop: 5, marginRight: 21, display: "none"}}
                  onTouchTap={()=>{this.setState({
                    alertOpen: true,
                    alertStep: step,
                    alertIndex: index
                  })}}
                  tooltip="Delete Step"
                >
                  delete
                </IconButton>
              }
              primaryText={!step.name ? "Unnamed Step" : step.name}
              secondaryText={"ID: " + (step.id ? step.id : "NA")}
            />
          )
        })}    
      </List>
    )
  }
}