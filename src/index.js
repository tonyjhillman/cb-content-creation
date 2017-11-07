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
		<GlobalStateSetter />
	);
}

{/*
  The GlobalStateSetter class establishes whatever global state is required,
  and then calls the function that returns the application's base window.
*/}
class GlobalStateSetter extends React.Component
{
	render()
	{
		return (
			<BaseApplicationWindow />
		);
	}
}

{/*
  The function BaseApplicationWindow returns the base (that is, the bottom)
  window for the application. The border of this window is just visible, outside
  the UpperApplicationWindow.
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
  content-display.
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
					backgroundColor: 'white',
					boxShadow: '2px 8px 16px 0px rgba(0,0,0,0.2)',
					top: 38,
					left: 24
				}}
			>

				</div>
		)};
}

class JavaFirstLevelContent extends React.Component
{
  render ()
	{
		return (

      <div>

        <span
            id="javaFirstLevelContent"
            class="javaFirstLevelContent"
            style={{
              position: 'relative',
              fontFamily: 'Arial',
              color: 'black',
              fontSize: 22,
              padding: 0,
              top: 50,
              left: 102,
              display: this.props.display ? 'inline' : 'none'

            }}  >

            <button
              onClick = {this.props.onClick}
              style={{
                position: 'relative',
                fontFamily: 'Arial',
                color: 'black',
                fontSize: 24,
                top: 20,
                border: 'none'
              }}

            >
              <i>Using the Java SDK</i>
            </button>

        </span>

      </div>
    )};
}


class PhpFirstLevelContent extends React.Component
{
  render ()
	{
		return (

      <div>

        <span
            id="phpFirstLevelContent"
            class="phpFirstLevelContent"
            style={{
              position: 'relative',
              fontFamily: 'Arial',
              color: 'black',
              fontSize: 22,
              padding: 0,
              top: 0,
              left: 102,
              display: this.props.display ? 'inline' : 'none'

            }}  >

            <button
              onClick = {this.props.onClick}
              style={{
                position: 'relative',
                fontFamily: 'Arial',
                color: 'black',
                fontSize: 24,
                top: this.props.phpContentStartingHeight,
                border: 'none'
              }}

            >
              <i>Using the PHP SDK</i>
            </button>

        </span>

      </div>
    )};
}

class PythonFirstLevelContent extends React.Component
{
  render ()
	{
		return (

			<div>

				<div>

            <button
              onClick = {this.props.onClick}
              style={{
                position: 'relative',
								left: 102,
                fontFamily: 'Arial',
                color: 'black',
                fontSize: 24,
                top: this.props.pythonContentStartingHeight,
                border: 'none',
								display: this.props.display ? 'inline' : 'none'
              }}

            >
              <i>Intro to the Python SDK</i>
            </button>
					</div>

					<div>

						<button
							onClick = {this.props.onClick}
							style={{
								position: 'relative',
								left: 102,
								fontFamily: 'Arial',
								color: 'black',
								fontSize: 24,
								top:  this.props.pythonContentStartingHeight + 20,
								border: 'none',
								display: this.props.display ? 'inline' : 'none'
							}}

						>
							<i>Using the Python SDK</i>
						</button>
					</div>

				</div>

    )};
}



{/*
  The PlusOrMinusButton class returns the File Selector button that displays
	a plus or minus sign, for the opening and closing of folders.
*/}
class JavaPlusOrMinusButton extends React.Component
{
	render ()
	{
		return (
			<button
				onClick={this.props.onClick}
				className='plusOrMinusButton'
				id='plusOrMinusButton'
				style={{
					position: 'absolute',
					border: '0px solid black',
					width: 30,
					height: 30,
					backgroundColor: 'white',
					border: 'none',
					top: 28,
					left: 26,
					outlineWidth: 0,
					zIndex:98
				}}
			>
				 <img
 					src={require('./images/' + this.props.javaImage )}
 					alt={require('./images/couchbaseLogoAlt.png')}
 						style={{
 							position: 'relative',
 							width: 30,
 							height: 30,
 							top: 0,
 							left: 0}} />
			</button>
		);
	}
}

{/*
  The PlusOrMinusButton class returns the File Selector button that displays
	a plus or minus sign, for the opening and closing of folders.
*/}
class PhpPlusOrMinusButton extends React.Component
{
	render ()
	{
		return (
			<button
				onClick={this.props.onClick}
				className='phpPlusOrMinusButton'
				id='phpPlusOrMinusButton'
				style={{
					position: 'absolute',
					border: '0px solid black',
					width: 30,
					height: 30,
					backgroundColor: 'white',
					border: 'none',
					top: this.props.beneathDotNetTopMeasurement,
					left: 26,
					outlineWidth: 0,
					zIndex:98
				}}
			>
				 <img
 					src={require('./images/' + this.props.phpImage )}
 					alt={require('./images/couchbaseLogoAlt.png')}
 						style={{
 							position: 'relative',
 							width: 30,
 							height: 30,
 							top: 0,
 							left: 0}} />
			</button>
		);
	}
}

class PythonPlusOrMinusButton extends React.Component
{
	render ()
	{
		return (
			<button
				onClick={this.props.onClick}
				className='phpPlusOrMinusButton'
				id='phpPlusOrMinusButton'
				style={{
					position: 'absolute',
					border: '0px solid black',
					width: 30,
					height: 30,
					backgroundColor: 'white',
					border: 'none',
					top: this.props.beneathPhpTopMeasurement,
					left: 26,
					outlineWidth: 0,
					zIndex:98
				}}
			>
				 <img
 					src={require('./images/' + this.props.pythonImage )}
 					alt={require('./images/couchbaseLogoAlt.png')}
 						style={{
 							position: 'relative',
 							width: 30,
 							height: 30,
 							top: 0,
 							left: 0}} />
			</button>
		);
	}
}

class DotNetFirstLevelContent extends React.Component
{
  render ()
	{
		return (

      <div>

        <span
            id="dotNetFirstLevelContent"
            class="dotNetFirstLevelContent"
            style={{
              position: 'relative',
              fontFamily: 'Arial',
              color: 'black',
              fontSize: 22,
              padding: 0,
              top: 0,
              left: 102,
              display: this.props.display ? 'inline' : 'none'

            }}  >

            <button
              onClick = {this.props.onClick}
              style={{
                position: 'relative',
                fontFamily: 'Arial',
                color: 'black',
                fontSize: 24,
                top: this.props.dotNetContentStartingHeight,
                border: 'none'
              }}

            >
              <i>Using the .NET SDK</i>
            </button>

        </span>

      </div>
    )};
}

{/*
  The PlusOrMinusButton class returns the File Selector button that displays
	a plus or minus sign, for the opening and closing of folders.
*/}
class DotNetPlusOrMinusButton extends React.Component
{
	render ()
	{
		return (
			<button
				onClick={this.props.onClick}
				className='plusOrMinusButton'
				id='plusOrMinusButton'
				style={{
					position: 'absolute',
					border: '0px solid black',
					width: 30,
					height: 30,
					backgroundColor: 'white',
					border: 'none',
					top: this.props.beneathJavaTopMeasurement,
					left: 26,
					outlineWidth: 0,
					zIndex:98
				}}
			>
				 <img
 					src={require('./images/' + this.props.dotNetImage )}
 					alt={require('./images/couchbaseLogoAlt.png')}
 						style={{
 							position: 'relative',
 							width: 30,
 							height: 30,
 							top: 0,
 							left: 0}} />
			</button>
		);
	}
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
				defaultfilename: 'default.md',
				javafilename: 'java.md',
				dotnetfilename: 'dotnet.md',
				phpfilename: 'php.md',
				pythonfilename: 'python.md',
				cfilename: 'c.md',
				gofilename: 'go.md',
				nodejsfilename: 'nodejs.md',
				nofilefilename: 'nofile.md',
				xmlfilename: 'pages.xml',

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
				pythonContentStartingHeight: 210
			};

			this.saveCurrentEditsToServer
				= this.saveCurrentEditsToServer.bind(this);
    }

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
				//alert("Called with value " + targetFilename);
        if(canGetFile)
				{
						canGetFile = false;
			    	canSaveFile = false;

						currentFileName = targetFilename;

			    	this.setState ( { value: 'Loading...' } );

			    	this.state.spinnerdisplay = true;

			    	var nodeJsTargetURL = 'http://localhost:8083/' + '?'
			    		+ "LocationForRead=" + sourceLocation + targetFilename;

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
	    	var nodeJsTargetURL = 'http://localhost:8083/' + '?'
	    		+ "LocationForRead=" + sourceLocation + targetFilename;

	    	axios.get(nodeJsTargetURL, {timeout: 6000},
								{headers: {'Content-Type': 'text/plain'}}
					).then(response => {

							var originalString = JSON.stringify(response.data);
							var cleanedString = originalString.replace("\"", "");

							var DOMParser = require('xmldom').DOMParser;
							var doc = new DOMParser().parseFromString(cleanedString);

							var listOfAllSections = doc.getElementsByTagName('section_info');

							// Go through each section of the document in turn.
							//
							for (var index = 0; index < listOfAllSections.length; index++)
							{
								var currentSectionFromList = listOfAllSections.item(index);

								// Get the title and location for the main page of each section.
								//
								alert("Page-title for section " + (index + 1) + " is "
									+ currentSectionFromList.childNodes[0].textContent + ", and page-location is "
										+ currentSectionFromList.childNodes[1].textContent + ".");

								// Examine the subsection for this section, and determine how many
								// child-pages it contains.
								//
								var listOfAllSubSections = currentSectionFromList.getElementsByTagName('child_page_info');

								alert("There are " + listOfAllSubSections.length + " child-pages in this section:");

								// If there is at least one child page under the current section-page...
								//
								if (listOfAllSubSections.length > 0)
								{
									// Do the following once for each child page in the subsection-content area.
									//
									for (var subsectionindex = 0; subsectionindex < listOfAllSubSections.length; subsectionindex++)
									{
										// Look at each child-page in turn.
										//
										var currentSubSectionFromList = listOfAllSubSections.item(subsectionindex);

										// Return its title and location.
										//
										alert("Child-page title number " + (subsectionindex + 1)
													+ " is " + currentSubSectionFromList.childNodes[0].textContent + ", and "
														+ "its location is "  + currentSubSectionFromList.childNodes[1].textContent);

										// Any page at any level can have child pages of its own. Examine the subsubsection
										// for the current page, and see how many offspring it contains.
										//
										var listOfAllSubSubSections = currentSubSectionFromList.getElementsByTagName('grandchild_page_info');

										alert("Located " + listOfAllSubSubSections.length + " grandchild-page(s) in this section:");

										// If there is at least one grandchild page under the current subsubsection page...
										//
										if (listOfAllSubSubSections.length > 0)
										{
											// Do the following once for each grandchild page in the subsubsection-content area.
											//
											for (var subsubsectionindex = 0; subsubsectionindex < listOfAllSubSubSections.length; subsubsectionindex++)
											{
												// Look at each grandchild-page in turn.
												//
												var currentSubSubSectionFromList = listOfAllSubSubSections.item(subsubsectionindex);

												// Return its title and location.
												//
												alert("Grandchild-page title number " + (subsubsectionindex + 1)
															+ " is " + currentSubSubSectionFromList.childNodes[0].textContent + ", and "
																+ "its location is "  + currentSubSubSectionFromList.childNodes[1].textContent);
											}
										}
									}
								}
							}
						});
    }

	RenderNodeJsButton ()
	{

		return (
      		<NodeJsButton image={ this.state.image }
      			onClick={() => this.getFileFromServer(this.state.nodejsfilename)}
      		/>
		);
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

		JavaSetPlusOrMinusOnClick()
		{
			this.setState(prevState => ({
					javaPlusOrMinusImageToggle: !prevState.javaPlusOrMinusImageToggle
				}));

				this.state.javaImage = this.state.javaPlusOrMinusImageToggle ? 'plusSign.png' : 'minusSign.png' ;

	      this.state.javaContentDisplay = this.state.javaPlusOrMinusImageToggle ? false : true ;

				// Push down or pull up the .NET button, which is immediately below Java.
				//
				this.state.beneathJavaTopMeasurement = this.state.javaPlusOrMinusImageToggle ?
					this.state.beneathJavaTopMeasurement - 76: this.state.beneathJavaTopMeasurement + 76;

				// Recalculate the vertical start of the .NET first-level content accordingly.
				//
				this.state.dotNetContentStartingHeight = this.state.javaPlusOrMinusImageToggle ?
					this.state.dotNetContentStartingHeight - 40: this.state.dotNetContentStartingHeight + 40;

				// Push down or pull up the PHP button, which is immediately below .NET.
				//
				this.state.beneathDotNetTopMeasurement = this.state.javaPlusOrMinusImageToggle ?
					this.state.beneathDotNetTopMeasurement - 76: this.state.beneathDotNetTopMeasurement + 76;

				// Recalculate the vertical start of the PHP first-level content accordingly.
				//
				this.state.phpContentStartingHeight = this.state.javaPlusOrMinusImageToggle ?
					this.state.phpContentStartingHeight - 42: this.state.phpContentStartingHeight + 42;

				// Push down or pull up the Python button, which is immediately below PHP.
				//
				this.state.beneathPhpTopMeasurement = this.state.javaPlusOrMinusImageToggle ?
					this.state.beneathPhpTopMeasurement - 76: this.state.beneathPhpTopMeasurement + 76;

				// Recalculate the vertical start of the Python first-level content accordingly.
				//
				this.state.pythonContentStartingHeight = this.state.javaPlusOrMinusImageToggle ?
					this.state.pythonContentStartingHeight - 42: this.state.pythonContentStartingHeight + 42;

		}

		DotNetSetPlusOrMinusOnClick()
		{
			this.setState(prevState => ({
					dotNetPlusOrMinusImageToggle: !prevState.dotNetPlusOrMinusImageToggle
				}));

				this.state.dotNetImage = this.state.dotNetPlusOrMinusImageToggle ? 'plusSign.png' : 'minusSign.png' ;

				this.state.dotNetContentDisplay = this.state.dotNetPlusOrMinusImageToggle ? false : true ;

				// Push down or pull up the PHP button, which is immediately below .NET.
				//
				this.state.beneathDotNetTopMeasurement = this.state.dotNetPlusOrMinusImageToggle ?
					this.state.beneathDotNetTopMeasurement - 76: this.state.beneathDotNetTopMeasurement + 76;

				// Recalculate the vertical start of the PHP first-level content accordingly.
				//
				this.state.phpContentStartingHeight = this.state.dotNetPlusOrMinusImageToggle ?
					this.state.phpContentStartingHeight - 42: this.state.phpContentStartingHeight + 42;

				// Push down or pull up the Python button, which is immediately below PHP.
				//
				this.state.beneathPhpTopMeasurement = this.state.dotNetPlusOrMinusImageToggle ?
					this.state.beneathPhpTopMeasurement - 76: this.state.beneathPhpTopMeasurement + 76;

				// Recalculate the vertical start of the Python first-level content accordingly.
				//
				this.state.pythonContentStartingHeight = this.state.dotNetPlusOrMinusImageToggle ?
					this.state.pythonContentStartingHeight - 42: this.state.pythonContentStartingHeight + 42;

		}

		PhpSetPlusOrMinusOnClick()
		{
			this.setState(prevState => ({
					phpPlusOrMinusImageToggle: !prevState.phpPlusOrMinusImageToggle
				}));

				this.state.phpImage = this.state.phpPlusOrMinusImageToggle ? 'plusSign.png' : 'minusSign.png' ;

				this.state.phpContentDisplay = this.state.phpPlusOrMinusImageToggle ? false : true ;

				// Push down or pull up the Python button, which is immediately below PHP.
				//
				this.state.beneathPhpTopMeasurement = this.state.phpPlusOrMinusImageToggle ?
					this.state.beneathPhpTopMeasurement - 76: this.state.beneathPhpTopMeasurement + 76;

				// Recalculate the vertical start of the Python first-level content accordingly.
				//
				this.state.pythonContentStartingHeight = this.state.phpPlusOrMinusImageToggle ?
					this.state.pythonContentStartingHeight - 42: this.state.pythonContentStartingHeight + 42;

		}

		PythonSetPlusOrMinusOnClick()
		{
			this.setState(prevState => ({
					pythonPlusOrMinusImageToggle: !prevState.pythonPlusOrMinusImageToggle
				}));

				this.state.pythonImage = this.state.pythonPlusOrMinusImageToggle ? 'plusSign.png' : 'minusSign.png' ;

				this.state.pythonContentDisplay = this.state.pythonPlusOrMinusImageToggle ? false : true ;

		}

		// Button display-toggling for the Java content.
		//
		 JavaRenderPlusOrMinusButton ()
	   {
	  	 return (
	       <JavaPlusOrMinusButton
	  		 		javaImage = { this.state.javaImage}
	  				    onClick={ () => this.JavaSetPlusOrMinusOnClick() }
	        />
	  		);
		 }

		// Button display-toggling for the Java content.
 		//
 		 PhpRenderPlusOrMinusButton ()
 	   {
 	  	 return (
 	       <PhpPlusOrMinusButton
				 beneathDotNetTopMeasurement = { this.state.beneathDotNetTopMeasurement}
 	  		 		phpImage = { this.state.phpImage }
 	  				    onClick={ () => this.PhpSetPlusOrMinusOnClick() }
 	        />
 	  		);
 		 }

		 // Button display-toggling for the Python content.
		//
		 PythonRenderPlusOrMinusButton ()
	   {
			 	//alert("beneathPhpTopMeasurement is now " + this.state.beneathPhpTopMeasurement)
	  	 return (
	       <PythonPlusOrMinusButton
				 beneathPhpTopMeasurement = { this.state.beneathPhpTopMeasurement}
	  		 		pythonImage = { this.state.pythonImage }
	  				    onClick={ () => this.PythonSetPlusOrMinusOnClick() }
	        />
	  		);
		 }

		 // First-level folder-content, made available when the Php-folder
		 // button is clicked.
		 //
	   PhpRenderFirstLevelContent ()
	   {
	     return (
	       <PhpFirstLevelContent
	  		 		display = { this.state.phpContentDisplay }
						phpContentStartingHeight = { this.state.phpContentStartingHeight }
						onClick={ () => this.getFileFromServer(this.state.phpfilename) }

	        />
	  		);
	   }

		 // First-level folder-content, made available when the Python-folder
		 // button is clicked.
		 //
	   PythonRenderFirstLevelContent ()
	   {
	     return (
	       <PythonFirstLevelContent
	  		 		display = { this.state.pythonContentDisplay }
						pythonContentStartingHeight = { this.state.pythonContentStartingHeight }
						onClick={ () => this.getFileFromServer(this.state.pythonfilename) }

	        />
	  		);
	   }

		 // First-level folder-content, made available when the Java-folder
		 // button is clicked.
		 //
	   JavaRenderFirstLevelContent ()
	   {
	     return (
	       <JavaFirstLevelContent
	  		 		display = { this.state.javaContentDisplay }
						onClick={ () => this.getFileFromServer(this.state.javafilename) }

	        />
	  		);
	   }

		// Button display-toggling for the .NET content.
		//
		 DotNetRenderPlusOrMinusButton ()
	   {
	  	 return (
	       <DotNetPlusOrMinusButton
	  		 		beneathJavaTopMeasurement = { this.state.beneathJavaTopMeasurement}
	  		 		   dotNetImage = { this.state.dotNetImage }
	  				       onClick={ () => this.DotNetSetPlusOrMinusOnClick() }
	        />
	  		);
		 }

		 // First-level folder-content, made available when the dotNet-folder
		 // button is clicked.
		 //
	   DotNetRenderFirstLevelContent ()
	   {
	     return (
	       <DotNetFirstLevelContent

	  		 		display = { this.state.dotNetContentDisplay }
						dotNetContentStartingHeight = { this.state.dotNetContentStartingHeight }
						onClick={ () => this.getFileFromServer(this.state.dotnetfilename) }

	        />
	  		);
	   }

	render () {

		//alert("test");


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

				<div
						id="completeNavContent"
						class="completeNavContent"
						style={{
							position: 'absolute',
							fontFamily: 'Arial',
							color: 'black',
							fontSize: 28,
							padding: 0,
							top: 76,
							left: -532

						}}
				>
							 <div>

									<span
											id="javaNavSectionTitle"
											class="javaNavSectionTitle"
											style={{
												position: 'absolute',
												fontFamily: 'Arial',
												color: 'black',
												fontSize: 28,
												padding: 0,
												top: 30,
												left: 76

											}}>

											Java

									</span>

									{ this.JavaRenderFirstLevelContent() }

									{ this.JavaRenderPlusOrMinusButton() }

								</div>

								<div>

									<span
											id="dotNetNavSectionTitle"
											class="dotNetNavSectionTitle"
											style={{
												position: 'absolute',
												fontFamily: 'Arial',
												color: 'black',
												fontSize: 28,
												padding: 0,
												top: this.state.beneathJavaTopMeasurement,
												left: 76

											}}>

											.NET

									</span>

									{ this.DotNetRenderFirstLevelContent() }

									 { this.DotNetRenderPlusOrMinusButton() }

								</div>

								<div>

									<span
											id="phpNavSectionTitle"
											class="phpNavSectionTitle"
											style={{
												position: 'absolute',
												fontFamily: 'Arial',
												color: 'black',
												fontSize: 28,
												padding: 0,
												top: this.state.beneathDotNetTopMeasurement,
												left: 76

											}}>

											PHP

									</span>

										{ this.PhpRenderFirstLevelContent() }

									 	{ this.PhpRenderPlusOrMinusButton() }

								</div>

								<div>

									<span
											id="pythonNavSectionTitle"
											class="pythonNavSectionTitle"
											style={{
												position: 'absolute',
												fontFamily: 'Arial',
												color: 'black',
												fontSize: 28,
												padding: 0,
												top: this.state.beneathPhpTopMeasurement,
												left: 76

											}}>

											Python

									</span>

										{ this.PythonRenderFirstLevelContent() }

									 	{ this.PythonRenderPlusOrMinusButton() }

								</div>

				</div>

				<GenButton onClick={() => this.getFileFromServer(this.state.defaultfilename) } />

				<JavaButton onClick={() => this.getFileFromServer(this.state.javafilename)}/>

				<DotNetButton onClick={() => this.getFileFromServer(this.state.dotnetfilename)}/>

				<PhpButton onClick={() => this.getFileFromServer(this.state.phpfilename)} />

				<PythonButton onClick={() => this.getFileFromServer(this.state.pythonfilename)} />

				<CButton onClick={() => this.getFileFromServer(this.state.cfilename)} />

				<GoButton onClick={() => this.getFileFromServer(this.state.gofilename)} />

				<div>
				 { this.RenderNodeJsButton() }
				</div>

				<NoFileButton onClick={() => this.getFileFromServer(this.state.nofilefilename)} />

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

				<XMLButton onClick={() => this.getXMLFileFromServer(this.state.xmlfilename) }/>

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
  The NodeJsButton method returns the button for displaying the Node.js
  filtered version of the source-file.
*/}
class NodeJsButton extends React.Component
{
	render ()
	{
		return (
			<button
				onClick={this.props.onClick}
				className='nodeJsButton'
				id='nodeJsButton'
				style={{
					position: 'absolute',
					border: '2px solid black',
					width: 124,
					height: 40,
					backgroundColor: 'white',
					boxShadow: '2px 8px 16px 0px rgba(0,0,0,0.2)',
					top: 110,
					left: 906,
				}}
			><img src={require('./images/' + this.props.image)}
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
						width: 110,
						height: 40,
						backgroundColor: 'white',
						boxShadow: '2px 8px 16px 0px rgba(0,0,0,0.2)',
						top: 110,
						left: 40,
					}}
				><img src={require('./images/newButton.png')}
						   alt={require('./images/genButtonBasicAlt.png')}
						   style={{
								padding: 3,
								width:'62%',
								height: '76%'
						   }}
					/>
				</button>
			</div>
		);
	}
}

{/*
  The JavaButton method returns the button for displaying the Java
  filtered version of the source-file.
*/}
class JavaButton extends React.Component
{
	render ()
	{
		return (
			<button
				onClick = {this.props.onClick}
				className='javaButton'
				id='javaButton'
				style={{
					position: 'absolute',
					border: '2px solid black',
					width: 110,
					height: 40,
					backgroundColor: 'white',
					boxShadow: '2px 8px 16px 0px rgba(0,0,0,0.2)',
					top: 110,
					left: 162,
				}}
			>
				<img src={require('./images/javaButtonBasic.png')}
					   alt={require('./images/javaButtonBasicAlt.png')}
					   style={{
							padding: 1,
							width:'70%',
							height: '90%'
					   }}
				/>
			</button>
		);
	}
}

{/*
  The DotNetButton method returns the button for displaying the .NET
  filtered version of the source-file.
*/}
class DotNetButton extends React.Component
{
	render()
	{
		return (
			<button
				onClick = {this.props.onClick}
				className='dotNetButton'
				id='dotNetButton'
				style={{
					position: 'absolute',
					border: '2px solid black',
					width: 110,
					height: 40,
					backgroundColor: 'white',
					boxShadow: '2px 8px 16px 0px rgba(0,0,0,0.2)',
					top: 110,
					left: 286,
				}}
			><img src={require('./images/dotNetButtonBasic.png')}
					   alt={require('./images/dotNetButtonBasicAlt.png')}
					   style={{
							padding: 4,
							width:'60%',
							height: '64%'
					   }}
						 />
			</button>
		);
	}
}

{/*
  The PhpButton method returns the button for displaying the PHP
  filtered version of the source-file.
*/}
class PhpButton extends React.Component
{
	render ()
	{
		return (
			<button
				onClick = {this.props.onClick}
				className='phpButton'
				id='phpButton'
				style={{
					position: 'absolute',
					border: '2px solid black',
					width: 110,
					height: 40,
					backgroundColor: 'white',
					boxShadow: '2px 8px 16px 0px rgba(0,0,0,0.2)',
					top: 110,
					left: 410,
				}}
			>
				<img src={require('./images/phpButtonBasic.png')}
					   alt={require('./images/phpButtonBasicAlt.png')}
					   style={{
							padding: 3,
							width:'62%',
							height: '76%'
					   }}
				/>
			</button>
		);
	}
}

{/*
  The PythonButton method returns the button for displaying the Python
  filtered version of the source-file.
*/}
class PythonButton extends React.Component
{
	render ()
	{
		return (
			<button
				onClick = {this.props.onClick}
				className='pythonButton'
				id='pythonButton'
				style={{
					position: 'absolute',
					border: '2px solid black',
					width: 110,
					height: 40,
					backgroundColor: 'white',
					boxShadow: '2px 8px 16px 0px rgba(0,0,0,0.2)',
					top: 110,
					left: 534,
				}}
			><img src={require('./images/pythonButtonBasic.png')}
					   alt={require('./images/pythonButtonBasicAlt.png')}
					   style={{
							padding: 0,
							width:'88%',
							height: '82%'
					   }}
						 />
			</button>
		);
	}
}

{/*
  The CButton method returns the button for displaying the C
  filtered version of the source-file.
*/}
class CButton extends React.Component
{
	render ()
	{
		return (
			<button
				onClick = {this.props.onClick}
				className='cButton'
				id='cButton'
				style={{
					position: 'absolute',
					border: '2px solid black',
					width: 110,
					height: 40,
					backgroundColor: 'white',
					boxShadow: '2px 8px 16px 0px rgba(0,0,0,0.2)',
					top: 110,
					left: 658,
				}}
			><img src={require('./images/cButtonBasic.png')}
					   alt={require('./images/cButtonBasicAlt.png')}
					   style={{
							padding: 2,
							width:'27%',
							height: '72%'
					   }}
						 />
			</button>
		);
	}
}


{/*
  The GoButton method returns the button for displaying the Go
  filtered version of the source-file.
*/}
class GoButton extends React.Component
{
	render ()
	{
		return (
			<button
				onClick = {this.props.onClick}
				className='goButton'
				id='goButton'
				style={{
					position: 'absolute',
					border: '2px solid black',
					width: 110,
					height: 40,
					backgroundColor: 'white',
					boxShadow: '2px 8px 16px 0px rgba(0,0,0,0.2)',
					top: 110,
					left: 782,
				}}
			><img src={require('./images/goButtonBasic.png')}
					   alt={require('./images/goButtonBasicAlt.png')}
					   style={{
							padding: 0,
							width:'42%',
							height: '70%'
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
						height: 812,
						backgroundColor: 'white',
						boxShadow: '2px 8px 16px 0px rgba(0,0,0,0.2)',
						top: 170,
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
				height: 832,
				backgroundColor: 'white',
				boxShadow: '2px 8px 16px 0px rgba(0,0,0,0.2)',
				top: 170,
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
							top: 530,
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
					left: 160,
				}}
			><img src={require('./images/saveButton.png')}
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
  The XMLButton method returns the xml file that shows the
	available pages.
*/}
class XMLButton extends React.Component
{
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
