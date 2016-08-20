import React from 'react'
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {CardHeader} from 'material-ui/Card';

class PdStepList extends React.Component {
  render() {
    return (
      <List>
        <Subheader>Tabs</Subheader>

        <ListItem
          leftIcon={
            <IconButton 
              iconClassName="material-icons" 
              style={{marginTop: 5}}
            >
              input
            </IconButton>
          }
          primaryText="Inputlist"
          secondaryText="Name: aaa.txt"
        />
        <ListItem
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

        <ListItem
          leftIcon={
            <IconButton 
              iconClassName="material-icons" 
              style={{marginTop: 5}}
            >
              assignment
            </IconButton>
          }
          primaryText="Sample Step"
          secondaryText="Name: Sample"
        />
      </List>
    )
  }
}

export default PdStepList