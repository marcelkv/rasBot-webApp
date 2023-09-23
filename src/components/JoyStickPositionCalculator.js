import { JoyStickPosition } from "@/components/JoyStickPosition";
export class JoyStickPositionCalculator {
  _outerDiameter;
  _innerDiameter;
  _centerX;
  _centerY;
  _numberOfDecimals = 0;
  _borderOffset = 0.4;
  get maxBorder() {
    return this._outerDiameter / 2 - this._innerDiameter * this._borderOffset;
  }
  constructor(outerDiameter, innerDiameter, outerTop, outerLeft) {
    this.init(outerDiameter, innerDiameter, outerTop, outerLeft);
  }
  init(outerDiameter, innerDiameter, outerTop, outerLeft) {
    this._outerDiameter = outerDiameter;
    this._innerDiameter = innerDiameter;
    this._centerX = outerLeft + outerDiameter / 2;
    this._centerY = outerTop + outerDiameter / 2;
  }
  getPosition(realX, realY) {
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
  _isPointerInside(distance) {
    return distance <= this.maxBorder;
  }
  _roundToTwoDecimals(number) {
    return parseFloat(number.toFixed(this._numberOfDecimals));
  }
}
//# sourceMappingURL=JoyStickPositionCalculator.js.map
