import React from 'react';

{/*
  The outer window for the File Selector, which appears at the left of
  the overall UI. This provides a title-image, at the upper-left.
  */}
export default class FileSelectionOuterWindow extends React.Component
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
						src={require('../images/fileSelectorTitle.png')}
						alt={require('../images/toolTitleAlt.png')}
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

{/*
  The content-display for the File Selector. This consists
  of a series of images, which are toggled between plus and
  minus. To the right of each image is a folder-name. When a
  plus-image is clicked on, the corresponding folder is opened,
  and the display is modified to show the folder-content. The
  image at this point is switched to a minus-sign.
  */}
class FileSelectionContent extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			javaImage: 'plusSign.png',
			dotNetImage: 'plusSign.png',
			beneathJavaTopMeasurement: 76
		}
	};

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

	// Button display-toggling for the Java content..
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
 					src={require('../images/' + this.props.javaImage )}
 					alt={require('../images/couchbaseLogoAlt.png')}
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
 					src={require('../images/' + this.props.dotNetImage )}
 					alt={require('../images/couchbaseLogoAlt.png')}
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
