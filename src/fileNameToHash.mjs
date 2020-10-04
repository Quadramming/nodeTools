import {c} from './c.mjs';
import * as fsys from './fsys.mjs';
import md5 from 'md5';

export function fileNameToHash(dir) {
	if ( typeof dir !== 'string' ) {
		throw Error('fileNameToHash(): Needs dir');
	}
	fsys.scanDir(dir, file => {
		const parts = fsys.parse(file);
		fsys.moveSafe(file, parts.dir + '/' + md5(Math.random()) + parts.ext);
	});
}
