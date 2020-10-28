import {c} from './c.mjs';
import * as fsys from './fsys.mjs';

export function searchRN(dir) {
	if ( typeof dir !== 'string' ) {
		throw Error('searchRN(): Needs dir');
	}
	fsys.scanDir(dir, file => {
		const content = fsys.getContent(file);
		let RNcount = 0;
		let index = 0;
		while ( true ) {
			let hit = content.indexOf('\r\n', index);
			if ( hit === -1 ) {
				break;
			}
			++RNcount;
			index = hit+1;
		}
		if ( RNcount !== 0 ) {
			c(file + "  :  " + RNcount);
		}
	});
}
