# repl-history

This package allows you to easily include history into your custom REPL. By default it will create a `.repl_history` file in the project directory and keep the most recent 200 lines. You can adjust those settings by passing appropriate options.

## Quickstart

Install: `npm i repl-history`

```javascript
const repl = require('repl').start()
require('repl-history')(repl)
```

## Options
You can pass an options object as a second parameter.

* `filePath` (*string*, `[project_dir]/.repl_history`): Specify an alternative file. Must be a fully-qualified path.
* `useHome` (*boolean*, `false`): Use the user's default history file `~/.node_repl_history`. This option supercedes `filePath`.
* `maxSave` (*number*, `200`): The maximum number of lines to save. Set to `0` to save all lines.

### Examples

```javascript
// specify a different file name
const path = require("path")
const repl = require('repl').start()
require('repl-history')(repl, {filePath: path.join(__dirname, "commands")})
```

```javascript
// use the home history file, keep 600 lines
const repl = require('repl').start()
require('repl-history')(repl, {useHome: true, maxSave: 600})
```
