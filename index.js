#!/usr/bin/env node
const minimist = require('minimist');
const readline = require('readline');
const shortUUID = require('short-uuid');

const { generate, updateVersion } = require ('./api');

const uuidTranslator = shortUUID();

// https://timber.io/blog/creating-a-real-world-cli-app-with-node/

const { version } = require('./package.json');
const appVersion = version;

// function generateLongId() {
// 	return shortUUID.uuid();
// }

// function generateShortId() {
// 	return uuidTranslator.new();
// }

(async () => {
	const menus = {
		default: `
library-cli <options>

	--help, --h :: help

	--version, --v :: cli version

	--generate :: generates a UUIDnpm s, either in short (default) or long format
		--number, --n <value> :: the number of ids to generate
		--long, --l :: generates a long uuid

	--updateversion :: updates the version
		--major, --ma <value> :: sets the major version, defaults to the current value or 0
		--minor, --mi <value> :: sets the minor version, defaults to the current value or 0
		--patch, --p <value> :: sets the patch, defaults to the current value or 0
		--patch_inc, --pi :: increments the patch by one
		--date, --d <value> :: sets the version date in MM/DD/YYYY format, defaults to current date
		--silent, --s :: does not prompt`,
	};

	const version = `
library-cli version '${appVersion}'`;

	const args = minimist(process.argv.slice(2));

	let cmd = 'generate' || 'help';

	if (args.updateversion || args.uv)
		cmd = 'updateversion';

	if (args.version || args.v)
		cmd = 'version';

	if (args.help || args.h)
		cmd = 'help';

	let number = 1;
	if (args.number || args.n)
		number = args.number || args.n;

	let short = true;
	if (args.long || args.l)
		short = false;

	switch (cmd) {
		case 'generate':
			console.log(generate(number, short).join('\n'));
			break;

		case 'updateversion':
			const apiArgs = {};

			apiArgs.silent = (args.silent) || (args.s) || false;
			// console.log(`silent: ${silent}`);

			// apiArgs.major = Number(packageJson.version_major || 0);
			// console.log(`major: ${major}`);
			if ((args.major !== null && args.major !== undefined) || (args.ma !== null && args.ma !== undefined))
				apiArgs.major = args.major || args.ma;
			// console.log(`major.args: ${major}`);

			// apiArgs.minor = Number(packageJson.version_minor || 0);
			// console.log(`minor: ${minor}`);
			if ((args.minor !== null && args.minor !== undefined) || (args.mi !== null && args.mi !== undefined))
				apiArgs.minor = args.minor || args.mi;
			// console.log(`minor.args: ${minor}`);

			// apiArgs.patch = Number(packageJson.version_patch || 0);
			// console.log(`patch: ${patch}`);
			if ((args.patch !== null && args.patch !== undefined) || (args.p !== null && args.p !== undefined))
				apiArgs.patch = args.patch || args.p;
			// console.log(`patch.args: ${patch}`);

			// console.log(`patch: ${patch}`);
			if (args.patch_inc || args.pi)
			// 	apiArgs.patch = patch + 1;
				apiArgs.pi = true;
			// console.log(`patch.args: ${patch}`);

			apiArgs.date = null;
			if (args.date || args.d)
				apiArgs.date = args.date || args.d;
			// if (!date)
			// 	apiArgs.date = dayjs().format('MM/DD/YYYY');

			// const version = `${major}.${minor}.${patch}`;

			// if (!silent) {
			// 	const value = await question(`Updating with version '${version}' and date '${date}'.\nDo you want to proceed? [y/n] `, 'y');
			// 	if (!value) {
			// 		console.log('No updates applied.');
			// 		return;
			// 	}
			// }

			const results = await updateVersion(apiArgs);
			if (results.message || results.error)
				console.log(results.success ? results.message ? results.message : '' : results.error ? results.error : 'failed');

			break;

		case 'help':
			// require('./cmds/help')(args)
			console.log(menus.default);
			break;

		case 'version':
			console.log(version);
			break;

		default:
			console.error(`"${cmd}" is not a valid command!`);
			break;
	}
})();
