import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import axios from 'axios';
import { RingLoader } from 'react-spinners';

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
					width: 1088,
					height: 1090,
					backgroundColor: 'white',
					boxShadow: '2px 8px 16px 0px rgba(0,0,0,0.2)',
					top: 20,
					left: 40,
				}}
			>
			</div>
		
			<UpperApplicationWindow />
		
		</div>
	);
}
	// An initial instruction, which is visible when the tool first comes up.
	//
	var initialInstruction = "Please click the GEN button to see initial content";
	
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
			
			spinnerdisplay: false
			
		};
			
		this.saveCurrentEditsToServer 
			= this.saveCurrentEditsToServer.bind(this);
    }
    
    saveCurrentEditsToServer()
    {  	
    	

			var nodeJsTargetURL = 'http://localhost:8083/' + '?' + "LocationForWrite=" 
									+ sourceLocation + currentFileName;	
			
				axios.post(nodeJsTargetURL, currentValueOfEditPane, 
								{headers: {'Content-Type': 'text/plain'}}
					).then(response => { 
					
					this.setState ( { value: response.data } );
				}).catch(error => { 
        		
        			alert(error);

        		});  
	
    }
    
    getFileFromServer(targetFilename)
    {	
		currentFileName = targetFilename;
		
    	this.setState ( { value: 'Loading...' } );
    	
    	this.state.spinnerdisplay = true;

    	var nodeJsTargetURL = 'http://localhost:8083/' + '?' 
    		+ "LocationForRead=" + sourceLocation + targetFilename;
    	
    	axios.get(nodeJsTargetURL, 
							{headers: {'Content-Type': 'text/plain'}}
				).then(response => { 
        			
        			this.setState ( { value: response.data } );
        			this.setState ( { spinnerdisplay: false } );


        		}).catch(error => { 
        		
        			this.setState ( { spinnerdisplay: false } );
        			this.setState ( { value: 'File Not Found' } );

        		}); 
    }
 
	setNodeImageOnClick() 
	{
		this.setState(prevState => ({
    		nodeImageToggle: !prevState.nodeImageToggle
    	}));
    	
    	//this.state.image = this.state.nodeImageToggle ? 'pythonButtonBasic.png' : 'nodeJsButtonBasic.png' ;
    	
    	// Making this demo invisible for now. Will likely use the functionality on some
    	// toggle buttons in due course.
    	//
    	this.state.image = this.state.nodeImageToggle ? 'nodeJsButtonBasic.png' : 'nodeJsButtonBasic.png' ;
	}
	
	// Button display-toggling, which we won't use for now.
	//
	// RenderNodeJsButton () {
	// return (
    //   <NodeJsButton 
    //  	image={ this.state.image } 
	//	onClick={ () => this.setNodeImageOnClick() }
    //  />
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
	
	
	RenderEditPane () 
	{
		return (
			<EditPane 
				value={ this.state.value }
			/>
		);
	}
                  	
    RenderHtmlPane()
    {
    	return (
    		<RenderPane
    			htmlPaneContent={ this.state.htmlPaneContent }
    		/> 
    	);
    }
    
    RenderSpinner()
    {

    	return (
    		
    		
    		<Spinner

    			display={ this.state.spinnerdisplay }
    			
    		/> 
    	);
    }
	
	render () {
		

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
					left: 48,
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
			
			</div>
		);
	}
}

{/*
  The NoFileButton method returns the button whereby a non-existent
  file is searched for, and the associated error-handling tested.
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
    
    handleChange(event) 
    {
		this.setState({value: event.target.value}, () => {

			currentValueOfEditPane = this.state.value;	
		
		});
		
    }
    
	componentWillReceiveProps(nextProps)
	{
		this.setState( { value: nextProps.value } );
	}
	
	tellme()
	{
		
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
			alert("Cmd + S pressed");
	
			var nodeJsTargetURL = 'http://localhost:8083/' + '?' + "LocationForWrite=" 
								+ sourceLocation + currentFileName;	
	
			axios.post(nodeJsTargetURL, currentValueOfEditPane, 
							{headers: {'Content-Type': 'text/plain'}}
				).then(response => { 
			
				this.setState ( { value: response.data } );
		
				currentValueOfEditPane = this.state.value;
		
			}); 
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

