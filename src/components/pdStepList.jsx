import React from 'react'
import { List, ListItem, makeSelectable } from 'material-ui/List';
import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Badge from 'material-ui/Badge'
import TextField from 'material-ui/TextField';
import DropZone from 'react-dropzone';

let SelectableList = makeSelectable(List);

export default class PdStepList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      alertOpen: false,
      alertStep: {},
      alertIndex: 0,
      nameOpen: false,
      modifyOpen: false,
      flistUploadOpen: false,
      stepUploadOpen: false,
      id: "",
      name: "",
      modifyName: ''
    }
  }

  componentDidMount() {
    //Set list height
    const setListSize = () => {
      document.getElementById('stepList').style.height = Number(document.getElementById('container').offsetHeight - 64 - 50) + "px"
    }
    setListSize()
    window.addEventListener("resize", setListSize)
  }

  render() {
    return (
      <Paper id="stepList" style={{ flex: "0 0 25%", overflowY: "scroll", overflowX: "hidden", zIndex: 0 }} zDepth={0}>
        <SelectableList value={this.props.editing} onChange={(event, index) => { }}>

          <Dialog
            actions={[
              <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={() => { this.setState({ alertOpen: false }) }}
              />,
              <FlatButton
                label="OK"
                primary={true}
                onTouchTap={() => { this.props.dispatchDeleteStep(this.state.alertIndex); this.setState({ alertOpen: false }) }}
              />
            ]}
            modal={false}
            open={this.state.alertOpen}
            onRequestClose={() => { this.setState({ alertOpen: false }) }}
          >
            Are you sure to delete "{this.state.alertStep.name === "" ? "Unnamed Tab" : this.state.alertStep.name}"?
        </Dialog>

          <Dialog
            actions={[
              <FlatButton
                label="OK"
                primary={true}
                onTouchTap={() => { this.props.dispatchCreateList(this.state.name); this.setState({ nameOpen: false }) }}
              />
            ]}
            modal={false}
            open={this.state.nameOpen}
            onRequestClose={() => { this.setState({ nameOpen: false }) }}
          >
            <Subheader>Create File List</Subheader>
            <TextField style={{ margin: "0px 25px" }} value={this.state.name} hintText="File List Name" onChange={event => { this.setState({ name: event.target.value }) }} />
          </Dialog>

          <Dialog
            actions={[
              <FlatButton
                label="OK"
                primary={true}
                onTouchTap={() => { this.props.dispatchModifyList(this.state.id, this.state.modifyName); this.setState({ modifyOpen: false }) }}
              />
            ]}
            modal={false}
            open={this.state.modifyOpen}
            onRequestClose={() => { this.setState({ modifyOpen: false }) }}
          >
            <Subheader>Modify List Name</Subheader>
            <TextField style={{ margin: "0px 25px" }} value={this.state.modifyName} hintText="New Name" onChange={event => { this.setState({ modifyName: event.target.value }) }} />
          </Dialog>

          <ListItem
            value={-1}
            onTouchTap={() => { this.props.dispatchStepChange.call(this, -1) }}
            leftIcon={
              <IconButton
                iconClassName="material-icons"
                style={{ marginTop: 5 }}
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
            onTouchTap={() => { this.setState({ nameOpen: true, name: "" }) }}
            iconClassName="material-icons"
            style={{ marginTop: -50, marginRight: 70, float: "right" }}
            tooltip="Add"
          >
            note_add
          </IconButton>
          <IconButton
            onTouchTap={() => { this.setState({ flistUploadOpen: true }) }}
            iconClassName="material-icons"
            style={{ marginTop: -50, marginRight: 35, float: "right" }}
            tooltip="Upload"
          >
            file_upload
          </IconButton>
          <IconButton
            onTouchTap={(event, index) => { this.props.dispatchSortList(); this.setState({ editing: -2 }) }}
            iconClassName="material-icons"
            style={{ marginTop: -50, float: "right" }}
            tooltip="Sort"
          >
            sort
          </IconButton>

          {this.props.flists.map((flist, index) => {
            let idx = (index * -1) - 2
            return (
              <ListItem
                value={idx}
                key={idx}
                onTouchTap={() => { this.props.dispatchStepChange.call(this, idx) }}
                onMouseOver={() => { document.getElementsByClassName("delete-icon-" + idx)[0].style.display = "inline"; document.getElementsByClassName("modify-icon-" + idx)[0].style.display = "inline" }}
                onMouseLeave={() => { document.getElementsByClassName("delete-icon-" + idx)[0].style.display = "none"; document.getElementsByClassName("modify-icon-" + idx)[0].style.display = "none" }}
                leftIcon={
                  <IconButton
                    iconClassName="material-icons"
                    style={{ marginTop: 5 }}
                  >
                    input
                </IconButton>
                }
                rightIcon={
                  <div style={{ marginTop: 5, marginRight: -120, width: 200 }}>
                    <IconButton
                      className={"modify-icon-" + idx}
                      iconClassName="material-icons"
                      style={{ display: "none" }}
                      onTouchTap={() => {
                        this.setState({
                          modifyOpen: true,
                          id: idx,
                        })
                      }}
                      tooltip="Edit Name"
                    >
                      mode_edit
                </IconButton>
                    <IconButton
                      className={"delete-icon-" + idx}
                      iconClassName="material-icons"
                      style={{ marginLeft: -15, display: "none" }}
                      onTouchTap={() => {
                        this.setState({
                          alertOpen: true,
                          alertStep: flist,
                          alertIndex: idx
                        })
                      }}
                      tooltip="Delete"
                    >
                      delete
                </IconButton>
                  </div>
                }
                primaryText={!flist.name ? "Unnamed List" : flist.name}
                secondaryText={!flist.name ? "ID: NA" : 'ID: $' + flist.name.replace(/ /g, '_')}
              />
            )
          })}
          <Divider inset={true} />

          <Subheader>Steps</Subheader>
          <IconButton
            onTouchTap={this.props.dispatchCreateStep}
            iconClassName="material-icons"
            style={{ marginTop: -50, marginRight: 70, float: "right" }}
            tooltip="Add"
          >
            note_add
        </IconButton>
          <IconButton
            onTouchTap={() => { this.setState({ stepUploadOpen: true }) }}
            iconClassName="material-icons"
            style={{ marginTop: -50, marginRight: 35, float: "right" }}
            tooltip="Upload"
          >
            file_upload
          </IconButton>
          <IconButton
            onTouchTap={(event, index) => { this.props.dispatchSortStep(); this.setState({ editing: -2 }) }}
            iconClassName="material-icons"
            style={{ marginTop: -50, float: "right" }}
            tooltip="Sort"
          >
            sort
        </IconButton>

          {this.props.steps.map((step, index) => {
            return (
              <ListItem
                value={index}
                key={index}
                onTouchTap={() => { this.props.dispatchStepChange.call(this, index) }}
                onMouseOver={() => { document.getElementsByClassName("delete-icon-" + index)[0].style.display = "inline" }}
                onMouseLeave={() => { document.getElementsByClassName("delete-icon-" + index)[0].style.display = "none" }}
                leftIcon={
                  <IconButton
                    iconClassName="material-icons"
                    style={{ marginTop: 5 }}
                  >
                    assignment
                </IconButton>
                }
                rightIcon={
                  <div style={{ marginTop: 5, marginRight: -50, width: 100 }}>
                    <IconButton
                      className={"delete-icon-" + index}
                      iconClassName="material-icons"
                      style={{ display: "none" }}
                      onTouchTap={() => {
                        this.setState({
                          alertOpen: true,
                          alertStep: step,
                          alertIndex: index
                        })
                      }}
                      tooltip="Delete"
                    >
                      delete
                </IconButton>
                  </div>
                }
                primaryText={!step.name ? "Unnamed Step" : step.name}
                secondaryText={"ID: " + (step.id ? step.id : "NA")}
              />
            )
          })}
        </SelectableList>

        <Dialog
          actions={[
            <FlatButton
              label="Close"
              primary={true}
              onTouchTap={() => { this.setState({ flistUploadOpen: false }) } }
              />
          ]}
          modal={true}
          open={this.state.flistUploadOpen}
          onRequestClose={() => { this.setState({ flistUploadOpen: false }) } }
          >
          <h4>Upload File</h4>
          <DropZone
            multiple={false}
            onDrop={(files) => { this.props.dispatchListAddUpload(files); this.setState({ flistUploadOpen: false }) } }
            >
            <div style={{ padding: 16, textAlign: "center", }}>Drop your file or click to select.</div>
          </DropZone>
        </Dialog>
        <Dialog
          actions={[
            <FlatButton
              label="Close"
              primary={true}
              onTouchTap={() => { this.setState({ stepUploadOpen: false }) } }
              />
          ]}
          modal={true}
          open={this.state.stepUploadOpen}
          onRequestClose={() => { this.setState({ stepUploadOpen: false }) } }
          >
          <h4>Upload File</h4>
          <DropZone
            multiple={false}
            onDrop={(files) => { this.props.dispatchStepAddUpload(files); this.setState({ stepUploadOpen: false }) } }
            >
            <div style={{ padding: 16, textAlign: "center", }}>Drop your file or click to select.</div>
          </DropZone>
        </Dialog>
      </Paper>
    )
  }
}