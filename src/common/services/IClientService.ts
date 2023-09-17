export interface IClientService {
  get isLoggedIn(): boolean;
  logInAsync(robotId: string): Promise<boolean>;
  logOut(): void;
  setPosition(x: number, y: number): void;
}
