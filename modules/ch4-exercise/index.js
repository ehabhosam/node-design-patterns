import { printFilesTree } from "../../utils";
import concatFiles from "./concat-files";
import listNestedFiles from "./list-nested-files";
import recursiveFind from "./recursive-find";

// exercise 4.1: concat files content in destination file
// concatFiles("fileA.txt", "fileB.txt", "result.txt", () => {
//   console.log("content of provided files has been written successfully.");
// });

// exercise 4.2: list nested files & directories in a directory
// listNestedFiles("modules", (files) => {
//   printFilesTree(files);
// });

// exercise 4.3: list nested files & directories in a directory
recursiveFind("modules", "regex", (files) => {
  console.log("result of saerch for keyword:", "regex");
  console.log(files);
});
