const semver = require("semver");
const fs = require("fs");
const { promisify } = require("util");
const lockfile = require("@yarnpkg/lockfile");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const caretify = async ({ packageJson, yarnLock, indent }) => {
    const parsedPackageJson = JSON.parse(await readFile(packageJson, "utf8"));
    const parsedYarnLock = lockfile.parse(
        await readFile(yarnLock, "utf8")
    ).object;

    for (const key of ["dependencies", "devDependencies"]) {
        for (const [name, version] of Object.entries(
            parsedPackageJson[key] || []
        )) {
            try {
                const fixedVersion = semver.minVersion(version);
                const newVersion = `^${fixedVersion.version}`;
                const originalName = `${name}@${version}`;
                const newName = `${name}@${newVersion}`;

                if (
                    newName in parsedYarnLock &&
                    parsedYarnLock[newName].version !== fixedVersion.version
                ) {
                    // The new version ^x.y.z already exists in yarn.lock, and it resolves to something
                    // different than x.y.z
                    continue;
                }

                parsedPackageJson[key][name] = newVersion;
                parsedYarnLock[newName] = parsedYarnLock[originalName];
            } catch (e) {
                console.log(`Couldn't process dependency ${name}@${version}`);
            }
        }
    }

    await writeFile(
        packageJson,
        JSON.stringify(parsedPackageJson, null, indent)
    );

    await writeFile(yarnLock, lockfile.stringify(parsedYarnLock));
};

module.exports = {
    caretify,
};
