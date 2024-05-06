const fs = require("fs");
const path = require("path");

function loadModule(filename, _module, _require) {
  var wrappedSrc =
    "(function(module, exports, require) {" +
    fs.readFileSync(filename, "utf8") +
    "})(module, module.exports, require);";
  eval(wrappedSrc);
}

const _require = function (_moduleName) {
  console.log("_require invoked for _module: " + _moduleName);
  var id = _require.resolve(_moduleName);
  if (_require.cache[id]) {
    return _require.cache[id].exports;
  }

  var _module = {
    exports: {},
    id: id,
  };

  _require.cache[id] = _module; //[4]

  loadModule(id, _module, _require); //[5]

  return _module.exports; //[6]
};
_require.cache = {};

_require.resolve = function (_moduleName) {
  return path.join(__dirname, _moduleName);
};
_require("hello.js");
