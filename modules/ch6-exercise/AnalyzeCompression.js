import { PassThrough } from "stream";

export class AnalyzeCompression extends PassThrough {
  constructor(startTime, obj, options) {
    super(options);
    this.obj = obj;
    this.startTime = startTime;
  }

  _transform() {}
}
