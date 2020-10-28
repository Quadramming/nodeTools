import {c} from './c.mjs';
import * as fs from 'fs';

export function allChars() {
	const buffer = Buffer.alloc(256);
	for ( let i = 0; i < 256; ++i ) {
		buffer[i] = i;
	}
	fs.writeFileSync('allChars.txt', buffer);
}
