function file_upload(bytes, file_name) {
	const blob = new Blob([bytes], {
		type: 'text/plain'
	});
	const fileUrl = window.URL.createObjectURL(blob);
	const anchor = document.createElement('a');
	anchor.style = 'display:none;';
	document.body.append(anchor);
	anchor.download = file_name;
	anchor.href = fileUrl;
	anchor.click();
	window.URL.revokeObjectURL(fileUrl);
}

// eslint-disable-next-line no-undef
let message = ethereumjs.Buffer.Buffer.from('you re screwed man get help');

file_upload(message, 'mal.txt');
