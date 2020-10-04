
export function moveByType(dir, type, outDir) {
	parse(dir, file => {
		const ext = getExt(file);
		const outFile = getFileName(file);
		if ( ext === type ) {
			safeMv(file, outDir+'/'+outFile);
		}
	});
}
