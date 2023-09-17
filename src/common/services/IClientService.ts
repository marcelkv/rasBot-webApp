export interface IClientService {
  get isConnected(): boolean;
  connectRobotAsync(robotId: string): Promise<boolean>;
}
