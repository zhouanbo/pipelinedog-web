import React from 'react'
import IconButton from 'material-ui/IconButton'
import brace from 'brace'
import AceEditor from 'react-ace'

import 'brace/mode/yaml'
import 'brace/theme/chrome'

export default class PdEditor extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    //Set editor height
    const setEditorSize = () => {
      document.getElementById('editor').style.height=Number(document.getElementById('container').offsetHeight-64-56-72-50)+"px"
    }
    setEditorSize();
    window.addEventListener("resize", setEditorSize);
  }

  render() {
    return (
      <div style={{position: "relative", zIndex: 0}}>
        <AceEditor
          ref="ace"
          mode="yaml"
          theme="chrome"
          width="100%"
          maxLines={200}
          fontSize={16}
          value={this.props.text} 
          onChange={this.props.onChange}
          showPrintMargin={false} 
          showGutter={true}
          editorProps={{$blockScrolling: Infinity}}
        />
      </div>
    )
  }
}