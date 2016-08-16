import React from 'react'
import IconButton from 'material-ui/IconButton'
import brace from 'brace'
import AceEditor from 'react-ace'

import 'brace/mode/yaml'
import 'brace/theme/chrome'

class PdEditor extends React.Component {

  render() {
    return (
      <div style={{position: "relative", padding: "8px 16px", zIndex: 0}}>
        <AceEditor
          ref="ace"
          mode="yaml"
          theme="chrome"
          width="100%"
          minLines={25}
          maxLines={200}
          fontSize={16}
          value={this.props.value} 
          onChange={this.props.onChange}
          showPrintMargin={false} 
          showGutter={false}
        />
      </div>
    )
  }
}
export default PdEditor