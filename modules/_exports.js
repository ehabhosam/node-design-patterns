var my_var = "override ehab hosam";

exports.set_var = function (value) {
  my_var = value;
};

exports.get_var = function () {
  return my_var;
};

global.my_var = "global value";
