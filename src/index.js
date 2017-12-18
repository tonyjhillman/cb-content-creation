import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import axios from 'axios';
import { RingLoader } from 'react-spinners';
import xmldom from 'xmldom';
import marked from 'marked';

{/*
  This initial function is called by the main render method, at the bottom.
  It itself should not be expected to do much, other than call the method
  that sets whatever global state or properties become required.
  */}
function RootWindow(props)
{
	return (
		<BaseApplicationWindow />
	);
}

{/*
  The function BaseApplicationWindow returns the base (that is, the bottom)
  window for the application. The border of this window is just visible, outside
  the UpperApplicationWindow. It then renders the inner windows.
*/}
function BaseApplicationWindow(props)
{
	return (
	    <div>

				<div
					className='baseApplicationWindow'
					id='baseApplicationWindow'
					style={{
						position: 'absolute',
						border: '2px solid black',
						width: 1650,
						height: 1090,
						backgroundColor: 'white',
						boxShadow: '2px 8px 16px 0px rgba(0,0,0,0.2)',
						top: 20,
						left: 40,
					}}
				>
				</div>

			<FileSelectionOuterWindow />

			<UpperApplicationWindow />

		</div>
	);
}

{/*
  The outer window for the File Selector, which appears at the left of
  the overall UI. This provides a title-image, at the upper-left.
  */}
class FileSelectionOuterWindow extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state =
		{
			test: 'test'
		};
	}

	render () {

		return (
			<div
				className='fileSelectionOuterWindow'
				id='fileSelectionOuterWindow'
				style={{
					position: 'absolute',
					border: '2px solid black',
					width: 552,
					height: 1074,
					backgroundColor: 'white',
					top: 28,
					left: 48
				}}
			>
				<span>

					<img
						src={require('./images/fileSelectorTitle.png')}
						alt={require('./images/toolTitleAlt.png')}
							style={{
								position: 'relative',
								width: 163,
								height: 27,
								top: 22,
								left: 30}} />

				</span>

				<FileSelectionInnerWindow />

			</div>
		)};
}

{/*
  The inner window for the File Selector. This holds the
  content-display. Note that the content is actually managed by the
	InnerApplicationWindow, rather than the FileSelectionInnerWindow, which
	itself just provides the outline within which the content appears.
  */}
class FileSelectionInnerWindow extends React.Component
{
	getXMLFileFromServer(targetFilename)
	{
			if (!navInitializationComplete)
			{
				var nodeJsTargetURL = 'http://localhost:8083/' + '?'
					+ "LocationForRead=" + sourceLocation + targetFilename;

				axios.get(nodeJsTargetURL, {timeout: 6000},
								{headers: {'Content-Type': 'text/plain'}}
					).then(response => {
							xmlFileAvailable = true;
							//alert("response.data is " + response.data);
							this.DetermineNavContent(response.data);
						});

						navInitializationComplete = true;
				}
	}

	// Clean up the string retrieved from the server that specifies the nav content.
	// Transform it into a DOM object. Iterate through the object, and put each value
	// into a standard JSON array. We will use this as data for a map iterator, which
	// will render the nav content.
	//
	DetermineNavContent(dataFromFilesystem)
	{
		var originalString = JSON.stringify(dataFromFilesystem);

		// Remove the tabs and line-breaks from the xml string.
		//
		var cleanedString = originalString.replace(/(\\t\\n|\\n|\\t)/gm, "");

		//alert(cleanedString);

		// Parse the string to a DOM object.
		//
		var DOMParser = require('xmldom').DOMParser;
		var doc = new DOMParser().parseFromString(cleanedString);

		var listOfAllSections = doc.getElementsByTagName('section_info');

		var arrayCounter = 0;

		// Go through each section of the document in turn.
		//
		for (var index = 0; index < listOfAllSections.length; index++)
		{
			// Look at one section at a time.
			//
			var currentSectionFromList = listOfAllSections.item(index);

			// For each page, create an array to hold the information.
			//
			arrayOfAllTitles2[index] = new Array;

			// Give this page an id.
			//
			arrayOfAllTitles2[index][0] = arrayCounter++;

			// Store the page-name.
			//
			arrayOfAllTitles2[index][1] = currentSectionFromList.childNodes[0].textContent;

			// Store the page-location.
			//
			arrayOfAllTitles2[index][2] = currentSectionFromList.childNodes[1].textContent;

			// Examine the subsection for this section, and determine how many
			// child-pages it contains.
			//
			var listOfAllSubSections = currentSectionFromList.getElementsByTagName('child_page_info');

			// If there is at least one child page under the current section-page...
			//
			if (listOfAllSubSections.length > 0)
			{
				// Array to hold Document object contents for this subsection.
				//
				arrayOfAllTitles2[index][3] = new Array();

				// The default view is that the sub-array is not visible.
				//
				arrayOfAllTitles2[index][4] = "closed";

				// Do the following once for each child page in the subsection-content area.
				//
				for (var subsectionindex = 0; subsectionindex < listOfAllSubSections.length; subsectionindex++)
				{
					// Create a sub-array for each set of child-page information in this subsection.
					//
					arrayOfAllTitles2[index][3][subsectionindex] = new Array();

					// Look at each child-page in turn.
					//
					var currentSubSectionFromList = listOfAllSubSections.item(subsectionindex);

					// Give this page an id.
					//
					arrayOfAllTitles2[index][3][subsectionindex][0] = arrayCounter++;

					// Store the page-name.
					//
					arrayOfAllTitles2[index][3][subsectionindex][1] = currentSubSectionFromList.childNodes[0].textContent;

					// Store the page-location.
					//
					arrayOfAllTitles2[index][3][subsectionindex][2] = currentSubSectionFromList.childNodes[1].textContent;

					// Examine the subsubsection
					// for the current page, and see how many offspring it contains.
					//
					var listOfAllSubSubSections = currentSubSectionFromList.getElementsByTagName('grandchild_page_info');

					// If there is at least one grandchild page under the current subsubsection page...
					//
					if (listOfAllSubSubSections.length > 0)
					{
						// Create an array to hold the subsubsection page information.
						//
						arrayOfAllTitles2[index][3][subsectionindex][3] = new Array();

						// The default view is that the sub-array is not visible.
						//
						arrayOfAllTitles2[index][3][subsectionindex][4] = "closed";

						// Do the following once for each grandchild page in the subsubsection-content area.
						//
						for (var subsubsectionindex = 0; subsubsectionindex < listOfAllSubSubSections.length; subsubsectionindex++)
						{
							// Create a sub-array for each set of grandchild-page information in this subsubsection.
							//
							arrayOfAllTitles2[index][3][subsectionindex][3][subsubsectionindex] = new Array();

							// Look at each grandchild-page in turn.
							//
							var currentSubSubSectionFromList = listOfAllSubSubSections.item(subsubsectionindex);

							// Give this page an id.
							//
							arrayOfAllTitles2[index][3][subsectionindex][3][subsubsectionindex][0] = arrayCounter++;

							// Store the page-name.
							//7
							arrayOfAllTitles2[index][3][subsectionindex][3][subsubsectionindex][1] = currentSubSubSectionFromList.childNodes[0].textContent;

							// Store the page-location.
							//
							arrayOfAllTitles2[index][3][subsectionindex][3][subsubsectionindex][2] = currentSubSubSectionFromList.childNodes[1].textContent;

							// There are no great-grandchild-pages: this is the lowest level.
							// So, we now end. Our array is complete.
							//
						}
					}
				}
			}
		}

		// Change state, so that a re-rendering occurs.
		//
		this.setState( { arrayOfAllTitles: arrayOfAllTitles2 });
	}

	render ()
	{

		return (
			<div
				className='fileSelectionInnerWindow'
				id='fileSelectionInnerWindow'
				style={{
					position: 'relative',
					border: '2px solid black',
					width: 500,
					height: 972,
					overflow: 'scroll',
					backgroundColor: 'white',
					boxShadow: '2px 8px 16px 0px rgba(0,0,0,0.2)',
					top: 38,
					left: 24
				}}
			>

			<div>
				<NavTree theServerSideArray={ this.getXMLFileFromServer("security_pages.xml") }


				/>
			</div>

				</div>
		)};
}

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
var currentValueOfEditPane = "Click the NEW button, to create new content.";

// Likewise...this is for the RenderPane.
//
var currentValueOfRenderPane = "<p style='position: absolute; width:400px; left: 20px; top:100px; font-size:32px'><i>Bring up a file" +
 	" in the panel to the left. Then, start editing, and see your rendered content here...</i></p>";

// For now, the location of files that are being read and written.
//
const sourceLocation = "./writes/";

// Get the XML file when the tool starts. Then, prohibit access subsequently.
//
var navInitializationComplete = false;

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

// Perform nav-content rendering according to length of current file only when
// file is available, otherwise use default value.
//
var xmlFileAvailable = false;

var arrayOfAllTitles = new Array("", "");
var arrayOfAllTitles2 = new Array("", "");
var arrayOfAllLocations = new Array();

// By switching this to false, disallow attempts to get a file before a
// current, ongoing attempt has concluded.
//
var canGetFile = true;

var self = null;

class NavTree extends React.Component
{
	constructor(props, context)
	{
		super(props, context);
		this.state =
		{
			latestArray: props.theServerSideArray

		};

		this.toggleNodeToOpenOrClosed = this.toggleNodeToOpenOrClosed.bind(this);
	}

	// This method is called when the user clicks on a plus or minus icon, to
	// the left of a page-name. The icon indicates that there is child-content
	// to be revealed or hidden. The function toggles the icon-appearance,
	// and establishes an "open" or "closed" item in the array-line for the page. On
	// re-render, this causes the child-content to be displayed. The function takes
	// three params, which are the new status (open or closed) to which we are
	// moving the item, id of the array-item we are searching for, and the
	// array to be searched in.
	//
	toggleNodeToOpenOrClosed(newStatus, id, theArray)
	{
		// Make sure we don't try to dig down below the third level, by
		// keeping track of the level we are on.
		//
		var levelCount = 0;

		// Find the item in the array based on the id that has been passed, then
		// change its 4th position to "open".
		//
		for (var q = 0; q < theArray.length; q++)
		{
			// Once we find an array-item that has the id passed to us, we know
			// this is the item we modify; changing its 4 slot to "open".
			//
			if (theArray[q][0] == id)
			{
				theArray[q][4] = newStatus;

				break;
			}

			// While  the 3 slot is not
			// undefined, examine child-content recursively.
			//
			if (theArray[q][3] != undefined)
			{

				if (theArray[q][3].length > 0)
				{

					this.toggleNodeToOpenOrClosed(newStatus, id, theArray[q][3]);
				}
			}
		}

		// This is not considered good style, but I've not yet found a way otherwise
		// to trigger a general rendering when the parent-opening is completed.
		//
		this.forceUpdate();
	}

  render()
	{
		// To keep track of "this" during our descent into the map function,
		// we need to bind the current "this" (which we use to call the function
		// that opens the nav-parents to reveal children) to a local variable, "self".
		// Note that this is used in the onClick definition, when we return the
		// NodeClosed object.
		//
		self = this;

    let nodes = arrayOfAllTitles2.map(function(person)
		{
			if (person[4] == "closed")
			{
	      return (
	        <NodeInNavTree
								node={person}
								paddingTop={10}
								image={'plusSign.png'}
								onClick={ () => self.toggleNodeToOpenOrClosed("open", person[0], arrayOfAllTitles2) }
								children={person[3]}
								whetherOpen={person[4]}
								/>
	      );
			}
			else
			{
				return (
				 <NodeInNavTree

				 			 node={person}
							 paddingTop={10}
				 			 image={'minusSign.png'}
							 children={person[3]}
							 whetherOpen={person[4]}
							 onClick={ () => self.toggleNodeToOpenOrClosed("closed", person[0], arrayOfAllTitles2) }
							 />
			 );
			}
    });

    return (
      <div>
        <ul style={{
				 listStyle: 'none',
				 position: 'absolute',
				 border: '0px solid black',
				 width: 720,
				 height: 1100,
				 backgroundColor: 'white',
				 top: -12,
				 left: 0,
				 zIndex: 99,
				 fontSize: 28
			 }}

				className="org">
         {nodes}
        </ul>
      </div>
    );
  }
}

class NodeInNavTree extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state =
		{
			role: props.role
		};
	}

	callGetFileFromServer(filename)
	{
		upperApplicationWindowContext.getFileFromServer(filename);
	}
  render()
	{
    let childnodes = null;
		var theImage = null;

		// Iterate over the child-elements for this array-item only if (a) they
		// do exist, and (b) the current status of the parent is "open" (the default
	  // is "closed", which means the child-items do not appear unless the parent
	  // has been opened by user-click).
		//
    if (this.props.children && this.props.whetherOpen == "open")
		{
      childnodes = this.props.children.map(function(childnode)
			{
			 if (childnode[3] == undefined)
			 {
				 theImage = "blank.png";

	       return (
					 <NodeInNavTree
					 			 node={childnode}
								 paddingTop={10}
					 			 image={theImage}
								 children={childnode[3]}
								 whetherOpen={childnode[4]}
								 />
	       );
			 }
			 else
			 {
				 if (childnode[3] != undefined && childnode[4] == "closed")
				 {
					 return (
							<NodeInNavTree
										node={childnode}
										paddingTop={10}
										image={'plusSign.png'}
										children={childnode[3]}
										whetherOpen={childnode[4]}
										onClick={ () => self.toggleNodeToOpenOrClosed("open", childnode[0], arrayOfAllTitles2) }
										/>
						);
				 }
				 else
				 {
				   if (childnode[3] != undefined && childnode[4] == "open")

					 return (
							<NodeInNavTree
										node={childnode}
										paddingTop={10}
										image={'minusSign.png'}
										children={childnode[3]}
										whetherOpen={childnode[4]}
										onClick={ () => self.toggleNodeToOpenOrClosed("closed", childnode[0], arrayOfAllTitles2) }
										/>
						);
					}
			 }
     });
    }

		//alert("In NodeInNavTree, this.props.role is " + this.props.role);
    return (
      <li style={{ paddingTop: this.props.paddingTop }}
				  key={this.props.node[0]}>

					<div>

						<img src={ require('./images/' + this.props.image) }
						  onClick={this.props.onClick}
							style={{
								position: 'relative',
								width: 30,
								height: 30,
								top: 4,
								left: -10
							}} />

						<button
							onClick={this.callGetFileFromServer.bind(this, this.props.node[2])}
							style={{
                position: 'relative',
                fontFamily: 'Arial',
                color: 'black',
                fontSize: 30,
                top: 2,
                border: 'none'
              }}>{this.props.node[1]}</button>

					</div>

        { childnodes ?
          <ul style={ {listStyle: 'none'} }>{childnodes}</ul>
        : null }
      </li>
    );
  }
}





{/*
	A second version of the nav tree, this time for selecting the name and hierarchy-position
	of a new file that is being defined. The hierarchy is presented entirely open. The user
	clicks on a name, to indicate the parent-document of the new page to be saved.
  */}
class NavTreeForDefinition extends React.Component
{
	constructor(props, context)
	{
		super(props, context);
		this.state =
		{
			latestArray: props.theServerSideArray
		};
	}

  render()
	{
		// To keep track of "this" during our descent into the map function,
		// we need to bind the current "this" (which we use to call the function
		// that opens the nav-parents to reveal children) to a local variable, "self".
		// Note that this is used in the onClick definition, when we return the
		// NodeClosed object.
		//
		var arrayOfAllTitles3 = arrayOfAllTitles2.slice();

    let nodes = arrayOfAllTitles3.map(function(person)
		{
			if (person[4] == "closed")
			{

	      return (
	        <NodeInNavTreeForDefinition
								node={person}
								paddingTop={10}
								image={'minusSign.png'}
								children={person[3]}
								whetherOpen={person[4]}
								/>
	      );
			}
			else
			{
				return (
				 <NodeInNavTreeForDefinition
				 			 node={person}
							 paddingTop={10}
				 			 image={'minusSign.png'}
							 children={person[3]}
							 whetherOpen={person[4]}
							 />
			 );
			}
    });

    return (
      <div>
        <ul style={{
				 listStyle: 'none',
				 position: 'absolute',
				 border: '0px solid black',
				 width: 720,
				 height: 1100,
				 backgroundColor: 'white',
				 top: -12,
				 left: 0,
				 zIndex: 99,
				 fontSize: 28
			 }}

				className="org">
         {nodes}
        </ul>
      </div>
    );
  }
}

{/*
	Nodes for the nav-tree used for file-definition.
*/}
class NodeInNavTreeForDefinition extends React.Component
{
	constructor(props)
	{
		super(props);
	}

	useSelectedName(filename)
	{
		alert("Selected filename is " + filename);
	}

  render()
	{
    let childnodes = null;
		var theImage = null;

		// Iterate over the child-elements for this array-item only if (a) they
		// do exist, and (b) the current status of the parent is "open" (the default
	  // is "closed", which means the child-items do not appear unless the parent
	  // has been opened by user-click).
		//
    if (this.props.children)
		{
      childnodes = this.props.children.map(function(childnode)
			{
			 if (childnode[3] == undefined)
			 {
				 theImage = "blank.png";

	       return (
					 <NodeInNavTreeForDefinition
					 			 node={childnode}
								 paddingTop={10}
					 			 image={theImage}
								 children={childnode[3]}
								 whetherOpen={childnode[4]}
								 />
	       );
			 }
			 else
			 {
				 return (
						<NodeInNavTreeForDefinition
									node={childnode}
									paddingTop={10}
									image={'minusSign.png'}
									children={childnode[3]}
									whetherOpen={childnode[4]}
									/>
					);
			 }
     });
    }

    return (
      <li style={{ paddingTop: this.props.paddingTop }}
				  key={this.props.node[0]}>

					<div>

						<img src={ require('./images/' + this.props.image) }
						  onClick={this.props.onClick}
							style={{
								position: 'relative',
								width: 30,
								height: 30,
								top: 4,
								left: -10
							}} />

						<button
							onClick={this.useSelectedName.bind(this, this.props.node[1])}
							style={{
                position: 'relative',
                fontFamily: 'Arial',
                color: 'black',
                fontSize: 30,
                top: 2,
                border: 'none'
              }}>{this.props.node[1]}</button>

					</div>

        { childnodes ?
          <ul style={ {listStyle: 'none'} }>{childnodes}</ul>
        : null }
      </li>
    );
  }
}

var upperApplicationWindowContext = null;

{/*
  The class UpperApplicationWindow returns the principal, upper (which is
  to say, inner) window, within which all elements except the save and render
  buttons will appear. It establishes the logo and tool-title at the top, and
  populates its area by calling the functions for each of the buttons and for
  the two principal display panes.
*/}
export default class UpperApplicationWindow extends React.Component
{
		constructor(props)
	  {
			super(props);
      this.state = {
				image: 'nodeJsButtonBasic.png',
				htmlPaneContent: currentValueOfRenderPane,
				nodeImageToggle: true,
				editPaneToggle: true,
				value: currentValueOfEditPane,

				// The names of the files that we can read, edit, and save in this
				// prototype.
				//
				defaultfilename: './writes/default.md',
				nofilefilename: 'nofile.md',
				xmlfilename: 'security_pages.xml',
				spinnerdisplay: false,
				newfiletobesaveddisplay: false,
				currentContentForRenderPane: "theDefault",

				titles: arrayOfAllTitles,
				locations: arrayOfAllLocations,
			};

			this.saveCurrentEditsToServer
				= this.saveCurrentEditsToServer.bind(this);

				this.getFileFromServer
					= this.getFileFromServer.bind(this);
    }

		defineDetailsOfNewFileToBeSaved()
		{
			this.state.newfiletobesaveddisplay = true;
			//alert(this.state.newfiletobesaveddisplay);
			this.forceUpdate();
		}

		hideNewFileDefinitionWindow()
		{
			this.state.newfiletobesaveddisplay = false;
			//alert(this.state.newfiletobesaveddisplay);
			this.forceUpdate();
		}

		// Save edits made to the currently display file (within EditPane)
		// to the server.
		//
    saveCurrentEditsToServer()
    {
			// If the file is either the simple instruction default, which appears
			// on intialization, or the template offered for modification-guidance,
			// which appears after the New button has been pressed, bring up the
			// dialog that invites the user to define a new filename and location
			// within the page-hierarchy.
			//
			if (currentFileName == "./writes/default.md" ||
						currentFileName == "default.md")
			{
				this.defineDetailsOfNewFileToBeSaved();
			}

			// Otherwise, we are saving a file that already exists within the
			// file-hierarchy, and has receved a modification. So, go ahead and
			// re-save it.
			//
			else
			{
	    	if (canSaveFile)
				{
						canGetFile = false;
						canSaveFile = false;

						var nodeJsTargetURL = 'http://localhost:8083/'
										+ '?'
										+ "LocationForWrite="
										+ currentFileName;

						axios.post(nodeJsTargetURL, currentValueOfEditPane,
													{headers: {'Content-Type': 'text/plain'}}
															).then(response => {

																this.setState ( { value: response.data } );

																canGetFile = true;
																canSaveFile = true;

																alert("File saved.");

															}).catch(error => {

																alert(error);

																canGetFile = true;
																canSaveFile = true;

															});
				}
				else
				{
						//alert("Nothing to be Saved...");
				}
			}
    }

    getFileFromServer(targetFilename)
    {
        if(canGetFile)
				{
						canGetFile = false;
			    	canSaveFile = false;

						currentFileName = targetFilename;

			    	this.setState ( { value: 'Loading...' } );

			    	this.state.spinnerdisplay = true;

			    	var nodeJsTargetURL = 'http://localhost:8083/' + '?'
			    		+ "LocationForRead="  + targetFilename;

			    	axios.get(nodeJsTargetURL, {timeout: 6000},
										{headers: {'Content-Type': 'text/plain'}}
							).then(response => {

			        			this.setState ( { value: response.data } );
			        			this.setState ( { spinnerdisplay: false } );

										// Ensure that the retrieved file becomes the content of the edit pane.
										//
			        			currentValueOfEditPane = this.state.value;

										// Similarly, ensure its html-rendered version becomes the content of
										// the render pane.
										//
										currentValueOfRenderPane = marked(this.state.value);
										this.setState ( { currentContentForRenderPane: currentValueOfRenderPane})

										canGetFile = true;
										canSaveFile = true;

			        		}).catch(error => {

		        				this.setState ( { spinnerdisplay: false } );
		        				this.setState ( { value: 'File Not Found' } );

										canGetFile = true;
										canSaveFile = true;
			        		});
					}
    }

	// The pane that shows the editable markdown. The value is the current
	// textual content.
	//
	RenderEditPane ()
	{

		return (

			<EditPane
				value={ this.state.value }
				/>

		);
	}

	  // The pane that shows the rendered version of the markdown that is being
    // edited.
    //
    RenderHtmlPane()
    {
			//alert("rendering");
    	return (
    		<RenderPane
    			htmlPaneContent={currentValueOfRenderPane}
    		/>
    	);
    }

    // The spinner should only be visible while file-access is underway. The
    // spinnerdisplay property is therefore used to control whether the
    // display of the component is 'inline' or 'none'.
    //
    RenderSpinner()
    {
    	return (
    		<Spinner
    			display={ this.state.spinnerdisplay }
    		/>
    	);
    }

	render ()
	{
		// Globalize the "this" of the UpperApplicatioWindow. This will allow us to call
		// its internal GetFileFroServer method from multiple points in the render-hierarchy
		// (for example, from the Organization sub-hierarchy, which provides the nav pane).
		//
		upperApplicationWindowContext = this;

		return (
			<div
				className='upperApplicationWindow'
				id='upperApplicationWindow'
				style={{
					position: 'absolute',
					border: '2px solid black',
					width: 1072,
					height: 1074,
					backgroundColor: 'white',
					top: 28,
					left: 610,
				}}
			>
				<span>
					<img
						src={require('./images/couchbaseLogo.png')}
						alt={require('./images/couchbaseLogoAlt.png')}
							style={{
								position: 'relative',
								width: 80,
								height: 80,
								top: 16,
								left: 46}} />
					<img
						src={require('./images/toolTitle.png')}
						alt={require('./images/toolTitleAlt.png')}
							style={{
								position: 'relative',
								width: 704,
								height: 64,
								top: 12,
								left: 60}} />
				</span>

				<GenerateNewFileButton onClick={() => this.getFileFromServer(this.state.defaultfilename) } />

				<div>
				 	{ this.RenderSpinner() }
				</div>

				<div>
				 { this.RenderEditPane() }
				</div>

				<div>
				 { this.RenderHtmlPane() }
				</div>

				<SaveCurrentFileButton onClick={() => this.saveCurrentEditsToServer(this.state.currentfilename) }/>

				<SaveAsButton onClick={() => this.defineDetailsOfNewFileToBeSaved() }/>

				<NewFileDefinitionWindow display={ this.state.newfiletobesaveddisplay }
						onClick={() => this.hideNewFileDefinitionWindow() }
				/>

			</div>
		);
	}
}

{/*
  The NoFileButton method returns the button whereby a non-existent
  file is searched for, and the associated error-handling tested. This
  is not intended for production.
*/}
class NoFileButton extends React.Component
{
	// Activate with "<NoFileButton onClick={() => this.getFileFromServer(this.state.nofilefilename)} />".
	// Not currently used.
	//
	render ()
	{
		return (
			<button
				onClick={this.props.onClick}
				className='noFileButton'
				id='noFileButton'
				style={{
					position: 'absolute',
					border: '2px solid black',
					width: 124,
					height: 40,
					backgroundColor: 'white',
					boxShadow: '2px 8px 16px 0px rgba(0,0,0,0.2)',
					top: 58,
					left: 906,
				}}
			><img src={require('./images/noFileButton.png')}
					   alt={require('./images/goButtonBasicAlt.png')}
					   style={{
							padding: 2,
							width:'90%',
							height: '78%'
					   }}
						 />
			</button>
		);
	}
}



{/*
  The Spinner is visible while a markdown file is loading. Once the file
  has loaded, the spinner disappears. NEED TO TEST what happens when the
  loading process is interrupted by a user-click on a different button.
*/}
class Spinner extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state =
		{
			display: props.display
		};
	}

	render ()
	{
		return (
			<div

				style={{
						position: 'absolute',
						top: 400,
						display: this.props.display ? 'inline' : 'none' ,
						left: 254,
						paddingTop: 10,
						zIndex: 99
					}}>

				<RingLoader
					color={'#B0B0B0'}
				/>
			</div>
		);
	}
}

var RenderPaneContext = null;

{/*
  The RenderPane class returns the button for displaying the Node.js
  filtered version of the source-file.
*/}
class RenderPane extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = {
					value: props.htmlPaneContent
				};
	}

	componentWillReceiveProps(nextProps)
	{
		this.setState( { value: nextProps.htmlPaneContent } );
	}

	render ()
	{
		RenderPaneContext = this;

		return (
			<div
				className='renderPane'
				id='renderPane'
				style={{
					position: 'absolute',
					border: '2px solid black',
					width: 490,
					height: 892,
					resize: 'horizontal',
					maxWidth: 650,
					overflow: 'auto',
					direction: 'ltr',
					backgroundColor: '#F5F5F5',
					boxShadow: '2px 8px 16px 0px rgba(0,0,0,0.2)',
					top: 110,
					left: 540,
				}}
			>
				<div style={{
							zIndex: 98,
							paddingLeft: 10,
							position: 'absolute',
							width: 470,
							height: 2040,
							top: 0,
							left: 10}}>

							<span>

								<img src={require('./images/couchbaseLogoTrans3.png')}
									 alt={require('./images/couchbaseLogoTransAlt.png')}
									 style={{
									 	zIndex: 10,
										position: 'absolute',
										width: 240,
										height: 240,
										top: 632,
										left: 200}}
								/>
							</span>

							<div dangerouslySetInnerHTML={{ __html: currentValueOfRenderPane }} />

	       </div>
			</div>
		);
	}
}

{/*
  The EditPane method returns the button for displaying the Node.js
  filtered version of the source-file.
*/}
class EditPane extends React.Component
{
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

				// Update the RenderPane to show the latest html rendered version
				// of the markdown that is undergoing editing.
				//
				currentValueOfRenderPane = marked(this.state.value);
				//alert(currentValueOfRenderPane);

				RenderPaneContext.forceUpdate();
			});
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

			upperApplicationWindowContext.saveCurrentEditsToServer();
		}
	}

    render ()
    {

		return (

		<div >
			<form
				onKeyDown={this.handleKeyDown}
			>
				<textarea
					value={this.state.value}
					onChange={ (event) => { this.handleChange(event) }}
					onload={ this.tellme() }

					style={{
						paddingTop: 10,
						paddingLeft: 10,
						paddingRight: 10,
						paddingBottom: 10,
						position: 'absolute',
						border: '2px solid black',
						width: 470,
						height: 872,
						resize: 'horizontal',
						maxWidth: 970,
						minWidth: 470,
						backgroundColor: 'white',
						boxShadow: '2px 8px 16px 0px rgba(0,0,0,0.2)',
						top: 110,
						left: 40,
						zIndex: 99
					}}
				>

				</textarea>
      		</form>
        </div>
		);
	}
}

{/*
  The GenerateNewFileButton method returns the button for displaying the generic
  documentation source-file.
*/}
class GenerateNewFileButton extends React.Component
{
	render ()
	{
		return (

			<div>
				<button
					onClick = {this.props.onClick}
					className='GenerateNewFileButton'
					id='GenerateNewFileButton'
					style={{
						position: 'absolute',
						border: '2px solid black',
						width: 144,
						height: 40,
						backgroundColor: 'white',
						boxShadow: '2px 8px 16px 0px rgba(0,0,0,0.2)',
						top: 1020,
						left: 48,
					}}
				><img src={require('./images/newButton.png')}
						   alt={require('./images/newButton.png')}
						   style={{
								padding: 3,
								width:'52%',
								height: '74%'
						   }}
					/>
				</button>
			</div>
		);
	}
}

{/*
  The SaveCurrentFileButton method returns the button for choosing the
  source-file to be edited.
*/}
class SaveCurrentFileButton extends React.Component
{
	render()
	{
		return (
			<button
				onClick = {this.props.onClick}
				className='SaveCurrentFileButton'
				id='SaveCurrentFileButton'
				style={{
					position: 'absolute',
					border: '2px solid black',
					width: 144,
					height: 40,
					backgroundColor: 'white',
					boxShadow: '2px 8px 16px 0px rgba(0,0,0,0.2)',
					top: 1020,
					left: 206,
				}}
			><img src={require('./images/saveButton.png')}
					   alt={require('./images/nodeJsButtonBasicAlt.png')}
					   style={{
							padding: 3,
							width:'58%',
							height: '78%'
					   }}
						 />
			</button>
		);
	}
}

class FilePositionSelectorWindow extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state =
		{
			display: props.display
		};
	}

	render ()
	{

		return (
			<div
				className='fileSelectionInnerWindow'
				id='fileSelectionInnerWindow'
				style={{
					position: 'relative',
					border: '2px solid black',
					width: 500,
					height: 972,
					overflow: 'scroll',
					backgroundColor: 'white',
					boxShadow: '2px 8px 16px 0px rgba(0,0,0,0.2)',
					top: 38,
					left: 24,
					zIndex: 99
				}}
			>

			<div>
				<NavTreeForDefinition theServerSideArray={ arrayOfAllTitles2 }
					role = 'definition'

				/>
			</div>

				</div>
		)};
}

class NewFileDefinitionWindow extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state =
		{
			display: props.display
		};
	}

	render ()
	{
		//alert("NewFileDefinitionWindow called with a display value of " + this.props.display);
		return (
			<div>
				<div
					className='fileDefinitionWindow'
					className='fileDefinitionWindow'

					style={{
						position: 'absolute',
						display: this.props.display ? 'inline' : 'none' ,
						border: '2px solid black',
						width: 1056,
						height: 1057,
						backgroundColor: 'white',
						boxShadow: '2px 8px 16px 0px rgba(0,0,0,0.2)',
						top: 6,
						left: 6,
						zIndex:99
					}}
				>

				<span>

					<img
						src={require('./images/positionSelectorTitle.png')}
						alt={require('./images/toolTitleAlt.png')}
							style={{
								position: 'relative',
								width: 223,
								height: 27,
								top: 22,
								left: 30}} />

				</span>

				<FilePositionSelectorWindow />

				<button
					onClick={this.props.onClick}
					className='cancelAndDismissFileDefinitionWindowButton'
					id='cancelAndDismissFileDefinitionWindowButton'
					style={{
						position: 'absolute',

						border: '2px solid black',
						width: 144,
						height: 40,
						backgroundColor: 'white',
						boxShadow: '2px 8px 16px 0px rgba(0,0,0,0.2)',
						top: 1006,
						left: 742,
					}}
				><img src={require('./images/cancelButton.png')}
							 alt={require('./images/nodeJsButtonBasicAlt.png')}
							 style={{
								padding: 3,
								width:'73%',
								height: '69%'
							 }}
							 />
				</button>

					<button
						onClick={this.props.onClick}
						className='saveAndDismissFileDefinitionWindowButton'
						id='saveAndDismissFileDefinitionWindowButton'
						style={{
							position: 'absolute',

							border: '2px solid black',
							width: 144,
							height: 40,
							backgroundColor: 'white',
							boxShadow: '2px 8px 16px 0px rgba(0,0,0,0.2)',
							top: 1006,
							left: 902,
						}}
					><img src={require('./images/saveButton.png')}
								 alt={require('./images/nodeJsButtonBasicAlt.png')}
								 style={{
									padding: 3,
									width:'58%',
									height: '78%'
								 }}
								 />
					</button>

				</div>
			</div>
		);
	}
}

{/*
	The SaveAsButton methods returns the button for saving a newly-designed
	file under a particular name and at a particular place within the page-hierarchy.
*/}
class SaveAsButton extends React.Component
{
	render()
	{
		return (
			<button
				onClick = {this.props.onClick}
				className='SaveAsButton'
				id='SaveAsButton'
				style={{
					position: 'absolute',
					border: '2px solid black',
					width: 164,
					height: 40,
					backgroundColor: 'white',
					boxShadow: '2px 8px 16px 0px rgba(0,0,0,0.2)',
					top: 1020,
					left: 364,
				}}
			><img src={require('./images/saveAsButton.png')}
					   alt={require('./images/nodeJsButtonBasicAlt.png')}
					   style={{
							padding: 1,
							width:'78%',
							height: '87%'
					   }}
						 />
			</button>
		);
	}
}

{/*
  The XMLButton method returns the xml file that shows the
	available pages.
*/}
class XMLButton extends React.Component
{
	// Activate with "<XMLButton onClick={() => this.getXMLFileFromServer(this.state.xmlfilename) }/>"
	// Not currently used.
	//
	render()
	{
		alert("called");
		return (
			<button
				onClick = {this.props.onClick}
				className='xmlButton'
				id='xmlButton'
				style={{
					position: 'absolute',
					border: '2px solid black',
					width: 144,
					height: 40,
					backgroundColor: 'white',
					boxShadow: '2px 8px 16px 0px rgba(0,0,0,0.2)',
					top: 1020,
					left: 320,
				}}
			><img src={require('./images/xmlButton.png')}
					   alt={require('./images/nodeJsButtonBasicAlt.png')}
					   style={{
							padding: 3,
							width:'52%',
							height: '78%'
					   }}
						 />
			</button>
		);
	}
}

{/*
  The main render method calls RootWindow, which gets the ball rolling. The other
  methods then call each other in sequence.
  */}
ReactDOM.render (
	<RootWindow />,
	document.getElementById('root')
);
