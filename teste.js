const main = (params) => {
	const fatoriais = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880];
	let result = 500000;
	for (let i = 0; i < fatoriais.length; i++) {
		result = result - fatoriais[i];
	}
	console.log(result);
};

main();
