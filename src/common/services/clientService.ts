import { IClientService } from "@/common/services/IClientService";

export class ClientService implements IClientService {
  async isRobotIdValidAsync(robotId: string): Promise<boolean> {
    if (robotId.startsWith("a")) {
      throw new Error("Network error occurred");
    }

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    });
    return robotId.startsWith("b");
  }
}
