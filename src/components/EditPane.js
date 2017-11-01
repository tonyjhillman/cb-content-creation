import React from 'react';
import axios from 'axios';

// In order to transfer data from the (child) EditPane to the (parent) UpperAppli-
// cationWindow, we use the currentValueOfEditPane global variable. This is kept
// up to date by the child, on every change to the text, based on user input.
//
// It would be nice to dispense with this, and use the state and props of the
// parent and child to pass the information. But I've yet to figure out quite
// how: passing { this.props.value } as a param to a parent method references
// the *parent's* prop, not the child's. How then, to specify the child value,
// when the parent makes the call?
//
var currentValueOfEditPane = "default";

// For now, the location of files that are being read and written.
//
const sourceLocation = "./writes/";

// When a file has been selected, its name is kept in this global variable. The
// value of the variable changes only when a new file is selected. When a file
// is to be written to disk, the current value of this variable is used to
// establish the filename.
//
var currentFileName = 'default.md';

// By switching this to false, disallow attempts to save a file before a
// previously selected file has been loaded.
//
var canSaveFile = true;

// By switching this to false, disallow attempts to get a file before a
// current, ongoing attempt has concluded.
//
var canGetFile = true;

/*
 The EditPane method returns the button for displaying the Node.js
 filtered version of the source-file. 
 */
export default class EditPane extends React.Component {

  constructor(props)
  {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: props.value,

    };
  }

  // Whenever a change is made to the file, add this to the current
  // state's value, and update the currentValueOfEditPane global variable.
  // Use the canSaveFile variable to allow the file to be saved only after
  // a change has been made to it.
  //
  handleChange(event)
  {
    canSaveFile = true;
    this.setState({value: event.target.value}, () => {
      currentValueOfEditPane = this.state.value;
    });
    this.props.onChange(event.target.value);
  }

  // For the text-pane content, update the EditPane's local state with the
  // property value just given to it by the parent (this property value itself
  // having been generated based on currentValueOfEditPane, which is updated
  // on every change the user makes. Thus, we have a complete cycle, with all
  // versions of the pane-content kept the same. Note the componentWillReceiveProps
  // updates on each general rendering (unlike the constructor, which is fired only
  // when the overall program commences).
  //
  componentWillReceiveProps(nextProps)
  {
    this.setState( { value: nextProps.value } );
  }

  tellme()
  {
    // This method is called when loading (as opposed to rendering)
    // is complete. I have no use for it right now, but it may prove
    // important in due course, so I have left this here.
  }

  // Handles Cmd-S saving of the current edit pane. This duplicates
  // the parental method that is triggered by clicking the SAVE button.
  // I have not yet found a way of triggering that method without a
  // click, and so have resorted to implementing a second-time, strictly
  // in the local context of the child (EditPane) component. I have
  // taken the step of, in the last line of this routine, updating
  // currentValueOfEditPane, to keep all notions of the current edit
  // pane-content in sync. I'm not happy with this, but need an
  // alternative.
  //
  handleKeyDown(event)
  {
    let charCode = String.fromCharCode(event.which).toLowerCase();

    if(event.metaKey && charCode === 's')
    {
      event.preventDefault();

      if (canSaveFile)
      {
        var nodeJsTargetURL = 'http://localhost:8083/' + '?' + "LocationForWrite="
          + sourceLocation + currentFileName;

        axios.post(nodeJsTargetURL, currentValueOfEditPane,
          {headers: {'Content-Type': 'text/plain'}}
        ).then(response => {

          this.setState ( { value: response.data } );

          currentValueOfEditPane = this.state.value;

        });
      }
      else
      {
        alert("No File to be Saved");
      }
    }
  }

  render ()
  {
    return (
      <form
        onKeyDown={this.handleKeyDown}>
        <textarea
          value={this.state.value}
          onChange={ (event) => { this.handleChange(event) }}
          onload={ this.tellme() }/>
      </form>
    );
  }
  
}