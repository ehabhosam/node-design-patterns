import { ReplaceStream } from "../transform/replace-stream";

process.stdin.pipe(new ReplaceStream("ehab", "GOAT")).pipe(process.stdout);
