import variable from "./../variables/platform";

export default (variables = variable) => {
	const inputTheme = {
		".multiline": {
			height: null,
		},
		".small": {
			height: 30,
			lineHeight: 20,
			paddingTop:0,
			paddingBottom:0,
			marginRight: 10,
		},
		".bordered": {
			borderBottomColor: variables.btnPrimaryBg,
			borderBottomWidth: variables.borderWidth * 2,
		},
		height: variables.inputHeightBase,
		color: "#000",
		paddingLeft: 5,
		paddingRight: 5,
		flex: 1,
		margin: 0,
		fontSize: variables.inputFontSize,
		lineHeight: variables.inputLineHeight,
	};

	return inputTheme;
};
