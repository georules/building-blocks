/* =========================================================================
 *
 * header__nav-save-fork.js
 *  Create links to the gist and block page, as well as display the gist's title
 *  and the author's username.
 *
 * ========================================================================= */
import React from 'react';
import Actions from '../actions/actions.js';

var ModeNav = React.createClass({
  handleModeChange: function handleModeChange() {
    var mode = this.props.mode;
    if(mode === "☮") {
      mode = "☯";
    } else {
      mode = "☮";
    }
    Actions.setMode(mode);
  },
  render: function render() {
    if(this.props.mode === "☮") {
      return (
        <div id='block__mode' data-for="tooltip_app" data-tip='Switch to standard mode' data-place='left' data-effect="solid" onClick={this.handleModeChange}>{this.props.mode}</div>
      )
    } else {
      return (
        <div id='block__mode' data-for="tooltip_app" data-tip='Switch to side-by-side mode' data-place='left' data-effect="solid" onClick={this.handleModeChange}>{this.props.mode}</div>
      )
    }
  }
});

export default ModeNav
