import {c} from './c.mjs';
import {fileNameToHash} from './fileNameToHash.mjs';
import {addExtensions} from './addExtensions.mjs';
import {moveByExtension} from './moveByExtension.mjs';
import {cloneFind} from './cloneFind.mjs';
import {allChars} from './allChars.mjs';
import {deleteFiles} from './deleteFiles.mjs';
import {searchRN} from './searchRN.mjs';

try {
	if ( process.argv[2] === 'fileNameToHash' ) {
		fileNameToHash(process.argv[3]);
	} else if ( process.argv[2] === 'addExtensions' ) {
		addExtensions(process.argv[3]);
	} else if ( process.argv[2] === 'allChars' ) {
		allChars();
	} else if ( process.argv[2] === 'moveByExtension' ) {
		moveByExtension(process.argv[3], process.argv[4], process.argv[5]);
	} else if ( process.argv[2] === 'cloneFind' ) {
		cloneFind(process.argv[3], process.argv[4]);
	} else if ( process.argv[2] === 'deleteFiles' ) {
		deleteFiles(process.argv[3]);
	} else if ( process.argv[2] === 'searchRN' ) {
		searchRN(process.argv[3]);
	} else {
		c('No tool found');
	}
} catch ( error ) {
	c(error.message);
}
