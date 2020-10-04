import {c} from './c.mjs';
import * as fsys from './fsys.mjs';

export function moveByExtension(dir, type, outDir) {
	if ( typeof dir !== 'string' ) {
		throw Error('moveByType(): Needs dir');
	}
	if ( typeof type !== 'string' ) {
		throw Error('moveByType(): Needs type');
	}
	if ( typeof outDir !== 'string' ) {
		throw Error('moveByType(): Needs outDir');
	}
	fsys.scanDir(dir, file => {
		const parts = fsys.parse(file);
		if ( parts.ext === '.'+type ) {
			fsys.moveSafe(file, outDir+'/'+parts.base);
		}
	}, [outDir]);
}
