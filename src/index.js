import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import axios from 'axios';
import { RingLoader } from 'react-spinners';
import Button from './components/Button';

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
            
            <FileSelectionOuterWindow />
	    
			<UpperApplicationWindow />

		</div>
	);
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
						src={require('./images/cButtonBasic.png')}
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

class FileSelectionInnerWindow extends React.Component
{

	RenderFileSelectionContent ()
	{
		return (
				<FileSelectionContent />
			);
	}

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
					left: 24,
					zIndex: 90
				}}
			>
					<div>
					{ this.RenderFileSelectionContent() }
					</div>
				</div>
		)};
}

class CurrentJavaContent extends React.Component
{
	render()
	{
		return(
			<div>
				The name of the Java file.
			</div>

		);
	}
}

class FileSelectionContent extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			plusOrMinusImageToggle: true,
			javaImage: 'plusSign.png',
			dotNetImage: 'plusSign.png',
			beneathJavaTopMeasurement: 76
		}
	};

	RenderCurrentJavaContent()
	{
		//alert("Called...");
		return (
			<CurrentJavaContent />
		);

	}

	JavaSetPlusOrMinusOnClick()
	{
		this.setState(prevState => ({
				javaPlusOrMinusImageToggle: !prevState.javaPlusOrMinusImageToggle
			}));

			this.state.javaImage = this.state.javaPlusOrMinusImageToggle ? 'plusSign.png' : 'minusSign.png' ;

			this.state.beneathJavaTopMeasurement = this.state.javaPlusOrMinusImageToggle ? this.state.beneathJavaTopMeasurement - 76: this.state.beneathJavaTopMeasurement + 76;
	}

	DotNetSetPlusOrMinusOnClick()
	{
		this.setState(prevState => ({
				dotNetPlusOrMinusImageToggle: !prevState.dotNetPlusOrMinusImageToggle
			}));

			this.state.dotNetImage = this.state.dotNetPlusOrMinusImageToggle ? 'plusSign.png' : 'minusSign.png' ;
	}

	// Button display-toggling, which we won't use for now.
	//
	 JavaRenderPlusOrMinusButton () {
		 	//alert("now rendering PlusOrMinusButton with this.state.image as " + this.state.image);
	 return (
     <JavaPlusOrMinusButton
		 		javaImage = { this.state.javaImage}
				onClick={ () => this.JavaSetPlusOrMinusOnClick() }
      />
		);
	 }

	// Button display-toggling, which we won't use for now.
	//
	 DotNetRenderPlusOrMinusButton () {
		 	//alert("now rendering PlusOrMinusButton with this.state.image as " + this.state.image);
	 return (
     <DotNetPlusOrMinusButton
		 		beneathJavaTopMeasurement = { this.state.beneathJavaTopMeasurement}
		 		dotNetImage = { this.state.dotNetImage}
				onClick={ () => this.DotNetSetPlusOrMinusOnClick() }
      />
		);
	 }

	render () {

		return (
			<div>

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
								top: 26,
								left: 72

							}}>

							Java

					</span>

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
									left: 72

								}}>

								.NET

						</span>

						 { this.DotNetRenderPlusOrMinusButton() }

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

{/*
  The class UpperApplicationWindow returns the principal, upper (which is
  to say, inner) window, within which all elements except the save and render
  buttons will appear. It establishes the logo and tool-title at the top, and
  populates its area by calling the functions for each of the buttons and for
  the two principal display panes.
*/}
class UpperApplicationWindow extends React.Component
{
		constructor(props)
	  {
			super(props);
      this.state = {
				image: 'nodeJsButtonBasic.png',
				htmlPaneContent: '',
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

				spinnerdisplay: false
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

		setNodeImageOnClick()
		{
				//alert("called");
			this.setState(prevState => ({
	    		nodeImageToggle: !prevState.nodeImageToggle
	    	}));

	    	//this.state.image = this.state.nodeImageToggle ? 'pythonButtonBasic.png' : 'nodeJsButtonBasic.png' ;

	    	// Making this demo invisible for now. Will likely use the functionality on some
	    	// toggle buttons in due course.
	    	//
	    	this.state.image = this.state.nodeImageToggle ? 'nodeJsButtonBasic.png' : 'goButtonBasic.png' ;
		}

	// Button display-toggling, which we won't use for now.
	//
	// RenderNodeJsButton () {
		 	//alert("called also: value of this.state.image is " + this.state.image);
	// return (
  //   <NodeJsButton
  //    	image={ this.state.image }
	//	onClick={ () => this.setNodeImageOnClick() }
  //    />
	//	);
	// }

	RenderNodeJsButton ()
	{

		return (
      		<NodeJsButton image={ this.state.image }
      			onClick={() => this.getFileFromServer(this.state.nodejsfilename)}
      		/>
		);
	}
    
	render () {

		return (
			<div
				className='upperApplicationWindow'
				id='upperApplicationWindow'
				style={{
					width: '100%',
					height: 1074,
					backgroundColor: 'white',
				}}
			>
				<span>
					<img
						src={require('./images/couchbaseLogo.png')}
						alt={require('./images/couchbaseLogoAlt.png')}
							style={{
								width: 40, 
								height: 40, 
								margin: '16px 0 0 46px'}} />
          <h2 style={{
            display: 'inline-block',
            lineHeight: '40px',
            margin: '0 10px',
            fontWeight: 300,
            verticalAlign: 'bottom'}}>Couchbase SDK Docs Editor</h2>
				</span>

        <br/>
        
				<Button title="New" onClick={() => this.getFileFromServer(this.state.defaultfilename) } />
        <Button title="Java" onClick={() => this.getFileFromServer(this.state.javafilename)} />
        <Button title=".NET" onClick={() => this.getFileFromServer(this.state.dotnetfilename)} />
        <Button title="PHP" onClick={() => this.getFileFromServer(this.state.phpfilename)} />
        <Button title="Python" onClick={() => this.getFileFromServer(this.state.pythonfilename)} />
        <Button title="C" onClick={() => this.getFileFromServer(this.state.cfilename)} />
        <Button title="Go" onClick={() => this.getFileFromServer(this.state.gofilename)} />
        <Button title="Node.js" onClick={() => this.getFileFromServer(this.state.nodejsfilename)} />

				<div className="mainBox">
          <div>
            <EditPane
              onChange={(text) => {
                this.setState({
                  htmlPaneContent: text
                })
              }}
              value={ this.state.value }
            />
            <EditPane
              onChange={(text) => {
                this.setState({
                  htmlPaneContent: text
                })
              }}
              value={ this.state.value }
            />
          </div>
          
          <RenderPane
            htmlPaneContent={ this.state.htmlPaneContent }
          />
				</div>
			
				<FileButton onClick={() => this.saveCurrentEditsToServer(this.state.currentfilename) }/>

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
				border: '2px solid black',
				backgroundColor: 'white',
				boxShadow: '2px 8px 16px 0px rgba(0,0,0,0.2)',
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
					left: 220,
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
  The main render method calls RootWindow, which gets the ball rolling. The other
  methods then call each other in sequence.
  */}
ReactDOM.render (
	<RootWindow />,
	document.getElementById('root')
);
