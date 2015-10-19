
/* =========================================================================
 *
 *  files__add.js
 *  Component for adding a new file
 *
 * ========================================================================= */
// External Dependencies
// ------------------------------------
import React from 'react';
import logger from 'bragi-browser';

// Internal Dependencies
// ------------------------------------
import Actions from '../actions/actions.js';

// ========================================================================
//
// Functionality
// ========================================================================
var FilesAdd = React.createClass({
  getInitialState: function getInitialState(){
    return { show: false };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    // we close the menu if any selection is made...
    this.setState({show: false});
  },
  showAdd: function showMore(){
    this.setState({show: !this.state.show});
  },
  handleText: function handleText(file) {
    var reader = new FileReader();
    reader.onload = (function(evt) {
      var content = evt.target.result;
      file.content = content;
      Actions.addFile(file);
    });
    reader.readAsText(file);
  },
  handleBlob: function handleBlob(file) {
    var reader = new FileReader();
    Actions.setModal("Sorry, the gist API supports text files only.")
    console.log("TEXT FILES ONLY")
    document.getElementById('files__input').value = '';
    // TODO: clear the file input
  },
  selectFile: function selectFile(evt) {
    var files = evt.target.files;
    var file = files[0];
    console.log("FILE", file)
    // TODO error handling
    if(!file) return;
    if(file.size > 10000000) {
      console.log("ERROR", "file too big!", file.size, " > 10mb")
      return;
    }
    console.log("file type", file.type, file.type.indexOf("text/"))
    if(file.type.indexOf("text/") === 0) {
      console.log("handle text")
      this.handleText(file);
    } else if(file.type.indexOf("application/json") === 0) {
      this.handleText(file);
    } else {
      this.handleBlob(file);
    }
  },
  addFile: function addFile() {
    console.log("add file")
    //var name = this.props.file.filename
    //Actions.addFile(name)
  },
  render: function render() {
    let show = '';
    if(this.state.show){
      show = 'show';
    }
    return (
      <div id='files__add-wrapper'>
        <div id='files__add-ui' className={show}>
          {/*<input id="files__name" />*/}
          <input onChange={this.selectFile} type="file" id="files__input" name="files[]"/>
        </div>

        <a id="files__add"  data-for="tooltip_files" data-tip="Add a new file" data-place='bottom' data-effect="solid" onClick={this.showAdd} className="file">➕</a>
      </div>
    )
  }

})

export default FilesAdd;
