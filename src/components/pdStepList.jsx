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
          primaryText="Start"
          secondaryText="Input: aaa.txt"
        />
        <Divider inset={true} />
      </List>
    )
  }
}

export default PdStepList