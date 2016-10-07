import React from 'react'
import queryString from 'query-string'

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import DropDownMenu from 'material-ui/DropDownMenu'
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import Badge from 'material-ui/Badge'
import Subheader from 'material-ui/Subheader'
import { List, ListItem } from 'material-ui/List'
import DropZone from 'react-dropzone'

export default class PdEditorToolBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      uploadOpen: false,
      searchOpen: false,
      alertOpen: false,
      successOpen: false,
      pipelines: '',
      database: ''
    }


  }

  render() {
    return (
      <Toolbar>

        <Dialog
          actions={[
            <FlatButton
              label="Close"
              primary={true}
              onTouchTap={() => { this.setState({ uploadOpen: false }) } }
              />
          ]}
          modal={true}
          open={this.state.uploadOpen}
          onRequestClose={() => { this.setState({ uploadOpen: false }) } }
          >
          <h4>Upload File</h4>
          <h5>Notice: You current edit will be lost.</h5>
          <DropZone
            multiple={false}
            onDrop={(files) => { this.props.dispatchStepUpload(files); this.setState({ uploadOpen: false }) } }
            >
            <div style={{ padding: 16, textAlign: "center", }}>Drop your file or click to select.</div>
          </DropZone>
        </Dialog>

        <Dialog
          actions={[
            <FlatButton
              label="Close"
              primary={true}
              onTouchTap={() => { this.setState({ successOpen: false }) } }
              />
          ]}
          modal={true}
          open={this.state.successOpen}
          onRequestClose={() => { this.setState({ successOpen: false }) } }
          >
          Sucessfully Done.
        </Dialog>

        <Dialog
          actions={[
            <FlatButton
              label="Close"
              primary={true}
              onTouchTap={() => { this.setState({ alertOpen: false }) } }
              />,
            <FlatButton
              label="OK"
              primary={true}
              onTouchTap={() => {
                this.props.firebase.database().ref('pipelines').push({
                  name: this.props.name,
                  content: this.props.text,
                  upvote: 0,
                  createdAt: this.props.firebase.database.ServerValue.TIMESTAMP
                }).then(() => { this.setState({ alertOpen: false, successOpen: true }) })
              } }
              />
          ]}
          modal={true}
          open={this.state.alertOpen}
          onRequestClose={() => { this.setState({ alertOpen: false }) } }
          >
          Are you sure to publish your step so everybody can search and use it?
        </Dialog>

        <Dialog
          actions={[
            <FlatButton
              label="Close"
              primary={true}
              onTouchTap={() => { this.setState({ searchOpen: false }) } }
              />
          ]}
          modal={false}
          open={this.state.searchOpen}
          onRequestClose={() => { this.setState({ searchOpen: false }) } }
          autoScrollBodyContent={ true }
          >
          <h4>Search Pipeline</h4>
          <h5>Notice: You current edit will be lost.</h5>
          <TextField
            onChange={(event) => {
              let pipelines = {}
              if (event.target.value !== '')
                Object.keys(this.state.database).map(id => {
                  if (this.state.database[id].name.includes(event.target.value))
                    pipelines[id] = this.state.database[id]
                })
              this.setState({ pipelines })
            } }
            hintText="Search Term"
            />
          <List>
            <Subheader>Result Pipelines</Subheader>
            {Object.keys(this.state.pipelines).length !== 0 ? Object.keys(this.state.pipelines).sort((a,b)=>{return this.state.pipelines[b].upvote-this.state.pipelines[a].upvote}).map((id, idx) => {
              return <ListItem
                key={idx}
                primaryText={this.state.pipelines[id].name}
                secondaryText={this.state.pipelines[id].content.substr(0, 50) }
                rightIcon={
                  <Badge
                    style={{ zIndex: 99, width: 200, marginTop: -5 }}
                    badgeContent={this.state.pipelines[id].upvote}
                    badgeStyle={{ top: 10, right: 30 }}
                    primary={true}
                    >
                    <FlatButton
                      style={{ marginTop: -5 }}
                      onTouchTap={() => {
                        this.props.dispatchEditorChange.call(this, this.state.pipelines[id].content)
                        this.props.dispatchEditorParse.call(this, this.state.pipelines[id].content)
                        this.setState({ searchOpen: false })
                        this.setState({ successOpen: true })
                      } }
                      icon={<FontIcon style={{ marginLeft: 5, marginTop: -5 }} className="material-icons">check_circle</FontIcon>}
                      >
                      Use
                    </FlatButton>
                    <FlatButton
                      style={{ marginTop: -5 }}
                      onTouchTap={() => { this.props.firebase.database().ref("pipelines/" + id).update({ upvote: this.state.pipelines[id].upvote + 1 }); let pipelines = this.state.pipelines; pipelines[id].upvote++; this.setState({ pipelines }) } }
                      icon={<FontIcon style={{ marginLeft: 5, marginTop: -5 }} className="material-icons">thumb_up</FontIcon>}
                      >
                      Upvote
                    </FlatButton>
                  </Badge>
                }

                />
            }) : <p>No Result</p>}
          </List>
        </Dialog>

        <ToolbarGroup firstChild={true}>
          <h4 style={{ marginLeft: 16, color: "#757575" }}>{this.props.name}</h4>
        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <RaisedButton
            disabled={this.props.tab !== 0}
            label="Parse"
            labelPosition="before"
            primary={true}
            icon={<FontIcon className="material-icons">code</FontIcon>}
            style={{ marginLeft: 0 }}
            onTouchTap={this.props.dispatchEditorParse.bind(this, this.props.text) }
            />
          <RaisedButton
            disabled={this.props.tab !== 0}
            label="Load"
            labelPosition="before"
            primary={true}
            icon={<FontIcon className="material-icons">file_upload</FontIcon>}
            style={{ marginLeft: 0 }}
            onTouchTap={() => { this.setState({ uploadOpen: true }) } }
            />
          <RaisedButton
            disabled={this.props.tab !== 0}
            label="Save"
            labelPosition="before"
            primary={true}
            icon={<FontIcon className="material-icons">file_download</FontIcon>}
            style={{ marginLeft: 0 }}
            onTouchTap={() => { window.open(`https://pipelinedog.herokuapp.com/?${queryString.stringify({ content: this.props.text, name: this.props.name.replace(/ /g, '_') + ".yml" })}`, "_blank") } }
            />
          <RaisedButton
            disabled={this.props.tab !== 0}
            label="Publish"
            labelPosition="before"
            primary={true}
            icon={<FontIcon className="material-icons">language</FontIcon>}
            style={{ marginLeft: 0 }}
            onTouchTap={()=>{this.setState({alertOpen: true})}}
            />
          <RaisedButton
            disabled={this.props.tab !== 0}
            label="Search"
            labelPosition="before"
            primary={true}
            icon={<FontIcon className="material-icons">search</FontIcon>}
            style={{ marginLeft: 0 }}
            onTouchTap={() => {
              this.props.firebase.database().ref('pipelines').orderByChild('upvote').on('value', (snapshot) => {
                this.setState({ database: snapshot.val() })
              }); this.setState({ searchOpen: true })
            } }
            />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}