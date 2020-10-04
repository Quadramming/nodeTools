import {c} from './c.mjs';
import * as fsys from './fsys.mjs';

export function deleteFiles(listFile) {
	if ( typeof listFile !== 'string' ) {
		throw Error('deleteFiles(): Needs list');
	}
	const list = fsys.getContent(listFile).toString();
	
	let result;
	const re = /K (.*)/g;
	while ( (result = re.exec(list)) !== null ) {
		fsys.deleteFile(result[1]);
	}
}
