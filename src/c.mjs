export function c(variable, ...rest) {
	let output = variable;
	if ( rest.length > 0 ) {
		output = String(output);
		for ( const variable of rest ) {
			output += ', ' + variable;
		}
	}
	if ( output === undefined ) {
		debugger;
	}
	console.log(output);
}
