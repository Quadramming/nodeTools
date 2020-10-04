import {c} from './c.mjs';
import sha1 from 'sha1';
import * as fsys from './fsys.mjs';

const headChunk = 2;

function deleteSingle(map) {
	for ( const [key, value] of map ) {
		if ( value.length === 1 ) {
			map.delete(key);
		}
	}
}

function scanMap(map, fn) {
	for ( const [key, value] of map ) {
		for ( const el of value ) {
			fn(el);
		}
	}
}

function getFileHash(file, size = 0) {
	const text = fsys.getContent(file, size);
	return sha1(text);
}

export function cloneFind(dir, outFile) {
	if ( typeof dir !== 'string' ) {
		throw Error('cloneFind(): Needs dir');
	}
	if ( typeof outFile !== 'string' ) {
		throw Error('cloneFind(): Needs output file');
	}
	
	const mapSize = new Map();
	fsys.scanDir(dir, file => {
		const size = String(fsys.getFileSize(file));
		if ( mapSize.has(size) ) {
			mapSize.get(size).push(file);
		} else {
			mapSize.set(size, [file]);
		}
	});
	deleteSingle(mapSize);
	
	const mapHead = new Map();
	scanMap(mapSize, file => {
		const headHash = getFileHash(file, headChunk);
		if ( mapHead.has(headHash) ) {
			mapHead.get(headHash).push(file);
		} else {
			mapHead.set(headHash, [file]);
		}
	});
	deleteSingle(mapHead);
	
	const mapHash = new Map();
	scanMap(mapHead, file => {
		const fullHash = getFileHash(file);
		if ( mapHash.has(fullHash) ) {
			mapHash.get(fullHash).push(file);
		} else {
			mapHash.set(fullHash, [file]);
		}
	});
	deleteSingle(mapHash);
	
	
	let output = '';
	for ( const [key, value] of mapHash ) {
		output += '==========\n';
		for ( const el of value ) {
			output += 'K '+el+'\n';
		}
	}
	fsys.saveFile(outFile, output);
	
}
