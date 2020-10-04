import {c} from './c.mjs';
import * as fsys from './fsys.mjs';
import {default as fileType} from 'file-type';
import md5 from 'md5';

export function addExtensions(dir) {
	if ( typeof dir !== 'string' ) {
		throw Error('addExtensions(): Needs dir');
	}
	fsys.scanDir(dir, async file => {
		fileType.fromFile(file).then( extension => {
			const parts = fsys.parse(file);
			let ext = parts.ext;
			if ( extension ) {
				ext = '.' + extension.ext;
			}
			fsys.moveSafe(file, parts.dir + '/' + parts.name + ext);
		});
	});
}
