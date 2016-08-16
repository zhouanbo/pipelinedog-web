import React from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import {Tabs, Tab} from 'material-ui/Tabs';

import PdAppBar from './pdAppBar.jsx'
import PdToolBar from './pdToolBar.jsx'
import PdEditor from './pdEditor.jsx'

class Main extends React.Component {
  
  render() {
    return (
      <div>
        <div id="header" style={{position: "absolute", top: 0, left: 0, width: "100%"}}>
          <PdAppBar />
          <PdToolBar />
        </div>

        <div id="content" style={{marginTop: 128}}>
            <Tabs initialSelectedIndex={1}>
              <Tab
                label="MAP"
                value="map"
              >
                <Card>
                  <CardHeader
                    title="Map"
                    subtitle="Connection among steps"
                  />
                  
                </Card>
              </Tab>
              <Tab
                label="EDITOR"
                value="editor"
              >
                <div style={{display: "flex"}}>
                  <Card style={{flex: "1 1 auto"}}>
                    <CardHeader
                      title="Editor"
                      subtitle="Define a step using YAML format"
                    />
                      <PdEditor  
                        value="Hello" 
                        onChange={function(){}} 
                      />
                  </Card>
                  <Card style={{flex: "1 1 auto"}} >
                    <CardHeader
                      title="Preview"
                      subtitle="A preview of the parsed command"
                    />
                    <CardText style={{fontSize: 16}}>
                      Bye
                    </CardText>  
                  </Card>
                </div>
              </Tab>
              <Tab
                label="FILES"
                value="files"
              >
                <Card>
                  <CardHeader
                    title="Files"
                    subtitle="Inputs and outputs of steps"
                  />
                </Card>
              </Tab>
            </Tabs>
                    
        </div>
          
      </div>
    )
  }
}

export default Main