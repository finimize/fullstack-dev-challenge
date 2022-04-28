const args = ["run test-coverage"];
const opts = { stdio: "inherit", cwd: "client", shell: true };
console.log(opts);
require("child_process").spawn("npm", args, opts);
