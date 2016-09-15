import React from 'react'
import {List, ListItem, MakeSelectable} from 'material-ui/List';
import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

let SelectableList = MakeSelectable(List);

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
      <SelectableList value={this.props.editing} onChange={(event, index)=>{}}>
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
          value={-2}
          onTouchTap={()=>{this.props.dispatchStepChange.call(this, -2)}}
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
          value={-1}
          onTouchTap={()=>{this.props.dispatchStepChange.call(this, -1)}}
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
          onTouchTap={(event, index)=>{this.props.dispatchSortStep(); this.setState({editing: -2})}}
          iconClassName="material-icons" 
          style={{marginTop: -50, float: "right"}}
          tooltip="Sort"
        >
          sort
        </IconButton>

        {this.props.steps.map((step, index) => {
          return (
            <ListItem
              value={index}
              key={index}
              onTouchTap={()=>{this.props.dispatchStepChange.call(this, index)}}
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
                  tooltip="Delete"
                >
                  delete
                </IconButton>
              }
              primaryText={!step.name ? "Unnamed Step" : step.name}
              secondaryText={"ID: " + (step.id ? step.id : "NA")}
            />
          )
        })}    
      </SelectableList>
    )
  }
}