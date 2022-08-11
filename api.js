#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

import dayjs from 'dayjs';
import { nanoid, customAlphabet } from 'nanoid';
import readline from 'readline';
import shortUUID from 'short-uuid';

const uuidTranslator = shortUUID();

// https://timber.io/blog/creating-a-real-world-cli-app-with-node/

export function generateId(number, type, length, alphabet) {
	let results = [];
	for (let i = 0; i < number; i++) {
		if ('nano' === type)
			results.push(generateNanoId(length, alphabet));
		else if ('short' === type)
				results.push(generateLongId());
		else
			results.push(generateShortId());
	}
	return results;
}

function generateNanoId(length, alphabet) {
	if (length && alphabet)
		return customAlphabet(alphabet, id);
	if (length)
		return nanoid(length);
	return nanoid();
}

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

export async function updateVersion(args) {
	args = args ? args : {};

	let packagePath = !_isEmpty(args.packagePath) ? args.packagePath : process.cwd();
	if (!packagePath.includes('package.json'))
		packagePath = path.join(packagePath, 'package.json');
	// const packageJson = require(packagePath);
	let packageJson = await fs.promises.readFile(packagePath);
	packageJson = JSON.parse(packageJson);
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
		if (!value)
			return { success: true, message: 'No updates applied.' };
	}

	packageJson.version = version;
	packageJson.version_major = args.major;
	packageJson.version_minor = args.minor;
	packageJson.version_patch = args.patch;
	packageJson.version_date = args.date;
	// console.log(packageJson);

	const output = JSON.stringify(packageJson, null, 2);
	// console.log(output);
	try {
		fs.promises.writeFile(packagePath, output);
	}
	catch (err) {
		return { success: false, error: err };
	}
	return { success: true, message: `Updated version with '${args.major}.${args.minor}.${args.patch}', '${args.date}'.` };
}

function _isEmpty(value) {
	if (value === null || value === undefined)
		return true;

	if (!(typeof value === 'string'))
		return true;

	if (value.length === 0)
		return true;
	
	return false;
}