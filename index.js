const fs = require("fs");
const path = require("path");

const parseOptions = ({ filePath, useHome, maxSave }) => {
  if (filePath && useHome) {
    console.warn(
      "Warning: both filePath and useHome specified, using home directory"
    );
  }

  filePath = filePath || path.join(__dirname, ".repl_history");
  if (useHome) {
    const homeDir =
      process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
    filePath = path.join(homeDir, ".node_repl_history");
  }
  maxSave = !isNaN(maxSave) && maxSave >= 0 ? maxSave : 200;

  return { filePath, maxSave };
};

module.exports = (repl, options = {}) => {
  const config = parseOptions(options);

  try {
    repl.history = fs
      .readFileSync(config.filePath, { encoding: "utf8" })
      .split("\n")
      .filter(line => line.trim());
  } catch (error) {
    if (error.code === "ENOENT") {
      console.warn("No history file found");
    } else {
      throw error;
    }
  }

  repl.on("exit", () => {
    const lines = config.maxSave
      ? repl.history.slice(1, config.maxSave + 1)
      : repl.history.slice(1);
    fs.writeFileSync(config.filePath, lines.join("\n"));
    process.exit();
  });
};
