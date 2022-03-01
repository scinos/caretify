const semver = require("semver");
const fs = require("fs/promises");
const lockfile = require("@yarnpkg/lockfile");

const caretify = async ({ packageJson, yarnLock, indent }) => {
    const parsedPackageJson = JSON.parse(
        await fs.readFile(packageJson, "utf8")
    );
    const parsedYarnLock = lockfile.parse(
        await fs.readFile(yarnLock, "utf8")
    ).object;

    for (const key of ["dependencies", "devDependencies"]) {
        for (const [name, version] of Object.entries(
            parsedPackageJson[key] || []
        )) {
            const fixedVersion = semver.minVersion(version);
            const newVersion = `^${fixedVersion.version}`;
            parsedPackageJson[key][name] = newVersion;

            const originalName = `${name}@${version}`;
            const newName = `${name}@${newVersion}`;

            if (!(newName in parsedYarnLock)) {
                parsedYarnLock[newName] = parsedYarnLock[originalName];
            }
        }
    }

    await fs.writeFile(
        packageJson,
        JSON.stringify(parsedPackageJson, null, indent)
    );

    await fs.writeFile(yarnLock, lockfile.stringify(parsedYarnLock));
};

module.exports = {
    caretify,
};
