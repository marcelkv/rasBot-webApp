import { JoyStickPosition } from "@/components/JoyStickPosition";

export class JoyStickPositionCalculator {
  _outerRadius: number;
  _innerRadius: number;
  _centerX: number;
  _centerY: number;

  constructor(
    outerRadius: number,
    innerRadius: number,
    outerTop: number,
    outerLeft: number,
    outerSize: number
  ) {
    this.init(outerRadius, innerRadius, outerTop, outerLeft, outerSize);
  }

  init(
    outerRadius: number,
    innerRadius: number,
    outerTop: number,
    outerLeft: number,
    outerSize: number
  ) {
    this._outerRadius = outerRadius;
    this._innerRadius = innerRadius;
    this._centerX = outerLeft + outerSize / 2;
    this._centerY = outerTop + outerSize / 2;
  }

  getPosition(realX: number, realY: number): JoyStickPosition {
    const deltaX = realX - this._centerX;
    const deltaY = realY - this._centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    let left = deltaX;
    let top = deltaY;

    if (!this._isPointerInside(distance)) {
      const angle = Math.atan2(deltaY, deltaX);
      left = Math.cos(angle) * (this._outerRadius - this._innerRadius - 100);
      top = Math.sin(angle) * (this._outerRadius - this._innerRadius - 100);
    }

    return new JoyStickPosition(left, top);
  }

  _isPointerInside(distance: number): boolean {
    return distance + 100 <= this._outerRadius - this._innerRadius;
  }
}
