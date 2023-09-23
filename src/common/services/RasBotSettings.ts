import { IRasBotSettings } from "@/common/services/IRasBotSettings.interface";

export class RasBotSettings implements IRasBotSettings {
  readonly rasBotId: string = null;
  readonly joyStickPercentOffset = 25;
  readonly innerDiameter = 100;
  readonly outerDiameter = 300;
  readonly innerColor = "white";
  readonly outerBorderColor = "white";
  readonly outerColor = "#242625";
  readonly throttleDelay_ms = 800;
}
