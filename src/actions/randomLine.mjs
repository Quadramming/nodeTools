import {c} from '../c.mjs';
import * as fsys from '../fsys.mjs';

export class Action {
	
	act(input) {
		if ( input.length === 0 ) {
			c(`randomLine {path:string} [{count:number}]=5 => Show random count lines from path`);
			return;
		}
		const filePath = input[0] ?? 'dictionary.txt';
		const count = input[1] ?? 5;
		const content = fsys.getContent(filePath).toString();
		const lines = content.split('\n');
		for ( let i = 0; i < count; ++i ) {
			c(lines[Math.floor(Math.random() * lines.length)]);
		}
	}
	
}
