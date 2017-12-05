import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import axios from 'axios';
import { RingLoader } from 'react-spinners';
import xml2js from 'xml2js';
import xmldom from 'xmldom';


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
	render () {

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
var currentValueOfEditPane = "default";

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

class Organisation extends React.Component
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
		//alert("Name is: " + theArray);
		//if (theArray[3] != undefined)
		//{
		//	alert("When [1] is " + theArray[1] + ", the length of the subarray is " + theArray[3].length);
		//}
		//else {
		//	alert("The item is " + theArray[1] + ", and there is no subarray");
		//}
		//alert("Current slice is: " + theArray);
		//alert("Called toggleNodeToOpenOrClosed");
		//ualert("newStatus is " + newStatus + ", childnode[0] is " + id + ", and theArray is " + theArray);

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
	        <NodeIsEitherOpenOrClosed
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
				 <NodeIsEitherOpenOrClosed
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
				 width: 370,
				 height: 670,
				 backgroundColor: 'white',
				 top: 48,
				 left: -530,
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

var currentNodeLocation = "";

class NodeIsEitherOpenOrClosed extends React.Component
{
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

				//alert("Childnode name is " + childnode[1]);
				//if (childnode[1] == "Setting up saslauthd")
				//{
				//	alert("Found it, with a [3] value of " + childnode[3]);
				//}

			 if (childnode[3] == undefined)
			 {
				 theImage = "blank.png";

	       return (
					 <NodeIsEitherOpenOrClosed
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
							<NodeIsEitherOpenOrClosed
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
							<NodeIsEitherOpenOrClosed
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
				htmlPaneContent: '<h1 id="the-first-level-header">The First-Level Header</h1>'
					+ '\n\n'
					+ '\<p\>This is a regular paragraph, which starts describing a topic.'
					+ 'It introduces a <em>numbered</em> list, as follows:</p>'
					+ '<ol>'
					+ '<li>This is the first element</li>'
					+ '<li>This is the second element</li>'
					+ '<li>This is the third element</li>'
					+ '</ol>'
					+ '<p>Now we are back to a paragraph again. Now, an '
					+ '<strong>unordered</strong> list:</p>'
					+ '<ul>'
					+ '<li>The first element</li>'
					+ '<li>The second</li>'
					+ '<li>The third</li>'
					+ '</ul>'
					+ '</li>'
					+ '<li>The third element in the initial, ordered list</li>'
					+ '</ol>'
					+ '<h2 id="the-second-level-header">The Second-Level Header</h2>'
					+ '<p>Now, some links:</p>'
					+ '<p><a href="https://www.google.com">I&#39;m an inline-style'
					+ ' link</a></p>'
					+ '<p><a href="https://www.google.com" title="Google&#39;s '
					+ 'Homepage">I&#39;m an inline-style link with title</a></p>',
				nodeImageToggle: true,
				editPaneToggle: true,
				value: 'Please click the NEW button to create new content',

				// The names of the files that we can read, edit, and save in this
				// prototype.
				//
				defaultfilename: './writes/default.md',
				javafilename: 'java.md',
				dotnetfilename: 'dotnet.md',
				phpfilename: 'php.md',
				pythonfilename: 'python.md',
				cfilename: 'c.md',
				gofilename: 'go.md',
				nodejsfilename: 'nodejs.md',
				nofilefilename: 'nofile.md',
				xmlfilename: 'security_pages.xml',

				spinnerdisplay: false,

				javaImage: 'plusSign.png',
	      javaContentDisplay: false,
				dotNetImage: 'plusSign.png',
				dotNetContentDisplay: false,
				phpImage: 'plusSign.png',
				phpContentDisplay: false,
				pythonImage: 'plusSign.png',
				pythonContentDisplay: false,

				beneathJavaTopMeasurement: 76,
				beneathDotNetTopMeasurement: 125,
				beneathPhpTopMeasurement: 174,
				beneathPythonTopMeasurement: 400,

				javaContentStartingHeight: 54,
				dotNetContentStartingHeight: 118,
				phpContentStartingHeight: 164,
				pythonContentStartingHeight: 210,

				entrydisplaytitle: 'Javax',
				parententryheight: 400,

				titles: arrayOfAllTitles,
				locations: arrayOfAllLocations,

				navEntryIndentationZeroeth: 20,
				navEntryIndentationFirst: 30,
				navEntryIndentationSecond: 40,
			};

			this.saveCurrentEditsToServer
				= this.saveCurrentEditsToServer.bind(this);

				this.getFileFromServer
					= this.getFileFromServer.bind(this);
    }

		// FIX: currently adds "./writes" to "./writes" and so the save fails.
		//
    saveCurrentEditsToServer()
    {
    	if (canSaveFile)
			{
					canGetFile = false;
					canSaveFile = false;

					var nodeJsTargetURL = 'http://localhost:8083/'
									+ '?'
									+ "LocationForWrite="
									+ sourceLocation + currentFileName;

					axios.post(nodeJsTargetURL, currentValueOfEditPane,
												{headers: {'Content-Type': 'text/plain'}}
														).then(response => {

															this.setState ( { value: response.data } );

															canGetFile = true;
															canSaveFile = true;

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
			        			currentValueOfEditPane = this.state.value;

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
								//alert(response.data);
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
				//alert(JSON.stringify(arrayOfAllTitles2));
			}

			//alert("completed: " + JSON.stringify(arrayOfAllTitles2));

			// Change state, so that a re-rendering occurs.
			//
			this.setState( { arrayOfAllTitles: arrayOfAllTitles2 });
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
    	return (
    		<RenderPane
    			htmlPaneContent={ this.state.htmlPaneContent }
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

	render () {

		//alert("test");

		//getFileGlobalAccess = this

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





				<GenButton onClick={() => this.getFileFromServer(this.state.defaultfilename) } />



				<div>
				 	{ this.RenderSpinner() }
				</div>

				<div>
				 { this.RenderEditPane() }
				</div>

				<div>
				 { this.RenderHtmlPane() }
				</div>

				<FileButton onClick={() => this.saveCurrentEditsToServer(this.state.currentfilename) }/>



				<div>
					<Organisation theServerSideArray={ this.getXMLFileFromServer("security_pages.xml") }/>
				</div>

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
  The GenButton method returns the button for displaying the generic
  documentation source-file.
*/}
class GenButton extends React.Component
{
	render ()
	{
		return (

			<div>
				<button
					onClick = {this.props.onClick}
					className='genButton'
					id='genButton'
					style={{
						position: 'absolute',
						border: '2px solid black',
						width: 144,
						height: 40,
						backgroundColor: 'white',
						boxShadow: '2px 8px 16px 0px rgba(0,0,0,0.2)',
						top: 1020,
						left: 160,
					}}
				><img src={require('./images/newButton.png')}
						   alt={require('./images/genButtonBasicAlt.png')}
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
						backgroundColor: 'white',
						boxShadow: '2px 8px 16px 0px rgba(0,0,0,0.2)',
						top: 110,
						left: 40,
						zIndex: 89
					}}
				>

				</textarea>
      		</form>
        </div>
		);
	}
}

{/*
  The RenderPane method returns the button for displaying the Node.js
  filtered version of the source-file.
*/}
function RenderPane(props)
{
	return (
		<div
			className='renderPane'
			id='renderPane'
			style={{
				position: 'absolute',
				border: '2px solid black',
				width: 490,
				height: 892,
				backgroundColor: 'white',
				boxShadow: '2px 8px 16px 0px rgba(0,0,0,0.2)',
				top: 110,
				left: 540,
			}}
		>
			<div style={{
						zIndex: 99,
						paddingLeft: 20,
						position: 'relative',
						width: 470,
						height: 2040,
						top: 10,
						left: 10}}>

				<span>

					<img src={require('./images/couchbaseLogoTrans.png')}
						 alt={require('./images/couchbaseLogoTransAlt.png')}
						 style={{
						 	zIndex: 10,
							position: 'absolute',
							width: 240,
							height: 240,
							top: 590,
							left: 210}}
					/>
				</span>

				<div dangerouslySetInnerHTML={{ __html: props.htmlPaneContent }} />

            </div>

		</div>
	);
}

{/*
  The FileButton method returns the button for choosing the
  source-file to be edited.
*/}
class FileButton extends React.Component
{
	render()
	{
		return (
			<button
				onClick = {this.props.onClick}
				className='fileButton'
				id='fileButton'
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
