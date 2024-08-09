import workerpool from "workerpool";

const execute = async (script, args, input) => {
  console.log("received reqeust", script, args, input);
  try {
    const f = new Function(args, script);
    const result = f(...input);
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

// create a worker and register public functions
workerpool.worker({
  execute,
});
