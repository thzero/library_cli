#!/usr/bin/env node
const dayjs = require('dayjs');
const readline = require('readline');
const shortUUID = require('short-uuid');

const uuidTranslator = shortUUID();

// https://timber.io/blog/creating-a-real-world-cli-app-with-node/

function generateLongId() {
	return shortUUID.uuid();
}

function generateShortId() {
	return uuidTranslator.new();
}

function question(q, acceptable) {
	const rl = readline.createInterface( {
		input: process.stdin,
		output: process.stdout
	} );

	rl.setPrompt(q);
	rl.prompt();

	return new Promise(( resolve , reject) => {
		let response;
		rl.on('line', (userInput) => {
			response = userInput;
			rl.close();
		});
		rl.on('close', () => {
			resolve(response === acceptable);
		});
	});
}

function generate(number, short) {
	let results = [];
	for (let i = 0; i < number; i++) {
		if (!short)
			results.push(generateLongId());
		else
			results.push(generateShortId());
	}
	return results;
}

async function updateVersion(args) {
	args = args ? args : {};

	const packagePath = `${process.cwd()}/package.json`;
	const packageJson = require(packagePath);
	// console.log(packageJson);

	if (!args.major)
		args.major = Number(packageJson.version_major || 0);
	// console.log(args);
	if (!args.minor)
		args.minor = Number(packageJson.version_minor || 0);
	// console.log(args);
	if (!args.patch)
		args.patch = Number(packageJson.version_patch || 0);
	// console.log(args);
	if (!args.date)
		args.date = dayjs().format('MM/DD/YYYY');
	// console.log(args);
	if (args.silent === undefined)
		args.silent = true;
	// console.log(args);

	if (args.pi)
		args.patch = args.patch + 1;
	// console.log(args);

	const version = `${args.major}.${args.minor}.${args.patch}`;

	if (!args.silent) {
		const value = await question(`Updating with version '${version}' and date '${args.date}'.\nDo you want to proceed? [y/n] `, 'y');
		if (!value) {
			console.log('No updates applied.');
			return;
		}
	}

	packageJson.version = version;
	packageJson.version_major = args.major;
	packageJson.version_minor = args.minor;
	packageJson.version_patch = args.patch;
	packageJson.version_date = args.date;
	// console.log(packageJson);

	const output = JSON.stringify(packageJson, null, 2);
	// console.log(output);
	const fs = require('fs');
	try {
		fs.promises.writeFile(packagePath, output);
	}
	catch (err) {
		return { success: false, error: err };
	}
	return { success: true, message: `Updated version with '${args.major}.${args.minor}.${args.patch}', '${args.date}'.` };
}

module.exports = {
	generate,
	updateVersion
}
