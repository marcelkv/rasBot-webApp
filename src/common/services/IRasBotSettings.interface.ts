export interface IRasBotSettings {
  readonly rasBotId: string;
  readonly outerDiameter: number;
  readonly innerDiameter: number;
  readonly outerColor: string;
  readonly outerBorderColor: string;
  readonly innerColor: string;
  readonly joyStickPercentOffset: number;
  readonly throttleDelay_ms: number;
}
