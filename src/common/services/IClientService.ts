import { IRasBotSettings } from "@/common/services/IRasBotSettings.interface";

export interface IClientService {
  get isLoggedIn(): boolean;
  get settings(): IRasBotSettings;

  logInAsync(robotId: string): Promise<boolean>;
  logOut(): void;

  setPositionAsync(x: number, y: number): Promise<void>;
  setPositionThrottled(x: number, y: number): void;
}
