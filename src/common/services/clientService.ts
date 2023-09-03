import { IClientService } from "@/common/services/IClientService";

export class ClientService implements IClientService {
  async isRobotIdValidAsync(robotId: string): Promise<boolean> {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(robotId.startsWith("a"));
      }, 2000);
    });
  }
}
