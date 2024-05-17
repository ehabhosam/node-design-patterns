class Profiler {
  constructor(label) {
    this.label = label;
    this.last_time = null;
  }

  start() {
    this.last_time = process.hrtime();
  }

  end() {
    const diff = process.hrtime(this.last_time);
    console.log(this.label, "time elapsed:", diff);
  }
}
