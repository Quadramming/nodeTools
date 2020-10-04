import {c} from './c.mjs';
import * as fs from 'fs';
import * as mPath from 'path';

function removeLastSlash(path) {
	return path.replace(/[\/\\]$/, '');
}

export function deleteFile(file) {
	fs.unlinkSync(file);
}

export function saveFile(file, buffer) {
	fs.writeFileSync(file, buffer);
}

export function getContent(file, size = 0) {
	if ( size === 0 ) {
		return fs.readFileSync(file);
	} else {
		let buffer = Buffer.alloc(size);
		const hFile = fs.openSync(file);
		const readed = fs.readSync(hFile, buffer, 0, size, 0);
		if ( size > readed ) {
			buffer = buffer.subarray(0, readed);
		}
		return buffer;
	}
}

export function getFileSize(filename) {
	const stats = fs.statSync(filename);
	const fileSizeInBytes = stats['size'];
	return fileSizeInBytes;
}

export function getExtension(path) {
	return mPath.extname(path);
}

export function getBaseName(path) {
	return mPath.parse(path).base;
}

export function parse(path) {
	return mPath.parse(path);
}

export function scanDir(path, fn, inExceptions = []) {
	path = removeLastSlash(path);
	const exceptions = inExceptions.map( el => removeLastSlash(el) );
	fs.readdirSync(path, {withFileTypes: true} ).forEach(file => {
		try {
			const entityPath = `${path}/${file.name}`;
			if ( file.isDirectory() ) {
				if ( ! exceptions.includes(entityPath) ) {
					scanDir(entityPath, fn, exceptions);
				}
			} else {
				fn(entityPath);
			}
		} catch ( error ) {
			c(`Problem with ${file}: ${error}`);
		}
	});
}

export function moveSafe(from, to) {
	if ( from === to ) {
		return;
	}
	if ( ! fs.existsSync(from)  ) {
		c('No such file: ' + from);
		return;
	}
	const parts = parse(to);
	let i = 0;
	while ( fs.existsSync(to) ) {
		++i;
		to = parts.dir + '/' + parts.name + '_' + i + parts.ext;
	}
	fs.renameSync(from, to);
}

export function moveForce(from, to) {
	if ( from === to ) {
		return;
	}
	if ( ! fs.existsSync(from)  ) {
		c('No such file: ' + from);
		return;
	}
	fs.renameSync(from, to);
}
