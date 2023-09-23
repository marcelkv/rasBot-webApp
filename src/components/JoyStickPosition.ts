export class JoyStickPosition {
  readonly top: number;
  readonly left: number;
  readonly xPercent: number;
  readonly yPercent: number;

  constructor(left = 0, top = 0, xPercent = 0, yPercent = 0) {
    this.left = left;
    this.top = top;
    this.xPercent = xPercent;
    this.yPercent = yPercent;
  }
}
