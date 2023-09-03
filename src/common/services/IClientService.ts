export interface IClientService {
  isRobotIdValidAsync(robotId: string): Promise<boolean>;
}
