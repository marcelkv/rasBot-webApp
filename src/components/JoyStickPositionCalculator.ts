import { JoyStickPosition } from "@/components/JoyStickPosition";

export class JoyStickPositionCalculator {
  private _outerDiameter: number;
  private _innerDiameter: number;
  private _centerX: number;
  private _centerY: number;
  private readonly _numberOfDecimals = 0;
  private readonly _borderOffset = 0.4;

  get maxBorder(): number {
    return this._outerDiameter / 2 - this._innerDiameter * this._borderOffset;
  }

  constructor(
    outerDiameter: number,
    innerDiameter: number,
    outerTop: number,
    outerLeft: number
  ) {
    this.init(outerDiameter, innerDiameter, outerTop, outerLeft);
  }

  init(
    outerDiameter: number,
    innerDiameter: number,
    outerTop: number,
    outerLeft: number
  ) {
    this._outerDiameter = outerDiameter;
    this._innerDiameter = innerDiameter;
    this._centerX = outerLeft + outerDiameter / 2;
    this._centerY = outerTop + outerDiameter / 2;
  }

  getPosition(realX: number, realY: number): JoyStickPosition {
    const deltaX = realX - this._centerX;
    const deltaY = realY - this._centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    let left = deltaX;
    let top = deltaY;

    if (!this._isPointerInside(distance)) {
      const angle = Math.atan2(deltaY, deltaX);
      left = Math.cos(angle) * this.maxBorder;
      top = Math.sin(angle) * this.maxBorder;
    }
    left = this._roundToTwoDecimals(left);
    top = this._roundToTwoDecimals(top) * -1;

    const xPercent = Math.min(100, Math.max(-100, left));
    const yPercent = Math.min(100, Math.max(-100, top));

    return new JoyStickPosition(left, top, xPercent, yPercent);
  }

  private _isPointerInside(distance: number): boolean {
    return distance <= this.maxBorder;
  }

  private _roundToTwoDecimals(number: number): number {
    return parseFloat(number.toFixed(this._numberOfDecimals));
  }
}
