import React from 'react'
import {List, ListItem, MakeSelectable} from 'material-ui/List';
import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

let SelectableList = MakeSelectable(List);

export default class PdStepList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      alertOpen: false,
      alertStep: {},
      alertIndex: 0,
      nameOpen: false,
      name: ""
    }
  }

  render() {
    return (
      <SelectableList value={this.props.editing} onChange={(event, index)=>{}}>

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
          Are you sure to delete "{this.state.alertStep.name === "" ? "Unnamed Tab" : this.state.alertStep.name}"?
        </Dialog>

        <Dialog
          actions={[
            <FlatButton
              label="OK"
              primary={true}
              onTouchTap={()=>{this.props.dispatchCreateList(this.state.name); this.setState({nameOpen: false})}}
            />
          ]}
          modal={false}
          open={this.state.nameOpen}
          onRequestClose={()=>{this.setState({nameOpen: false})}}
        >
          <Subheader>Create File List</Subheader>
          <TextField style={{margin: "0px 25px"}} value={this.state.name} hintText="File List Name" onChange={event=>{this.setState({name: event.target.value})}}/>
        </Dialog>

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
        
        <Subheader>List Files</Subheader>
        <IconButton
          onTouchTap={()=>{this.setState({nameOpen: true, name: ""})}}
          iconClassName="material-icons" 
          style={{marginTop: -50, float: "right"}}
          tooltip="Add"
        >
          note_add
        </IconButton>

        {this.props.flists.map((flist, index) => {
          let idx = (index*-1)-2
          return (
            <ListItem
              value={idx}
              key={idx}
              onTouchTap={()=>{this.props.dispatchStepChange.call(this, idx)}}
              onMouseOver={()=>{document.getElementsByClassName("delete-icon-"+idx)[0].style.display="inline"}}
              onMouseLeave={()=>{document.getElementsByClassName("delete-icon-"+idx)[0].style.display="none"}}
              leftIcon={
                <IconButton 
                  iconClassName="material-icons" 
                  style={{marginTop: 5}}
                >
                  input
                </IconButton>
              }
              rightIcon={
                <IconButton
                  className={"delete-icon-"+idx}
                  iconClassName="material-icons" 
                  style={{marginTop: 5, marginRight: 21, display: "none"}}
                  onTouchTap={()=>{this.setState({
                    alertOpen: true,
                    alertStep: flist,
                    alertIndex: idx
                  })}}
                  tooltip="Delete"
                >
                  delete
                </IconButton>
              }
              primaryText={!flist.name?"Unnamed List":flist.name}
              secondaryText={!flist.name?"ID: NA":'ID: $'+flist.name.replace(/ /g, '_')}
            />
          )
        })}
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