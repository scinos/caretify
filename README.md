# caretify

Tool to convert all your dependencies to caret versions (example: `1.2.3 -> ^1.2.3`).

It will change `package.json` to refletc the new ranges. It will also change `yarn.lock` so the new ranges resolve to the same version than before.

## Usage

`yarn dlx caretify` to convert `package.json` and `yarn.lock` in current directory

Check `caretify -h` to see other options.
