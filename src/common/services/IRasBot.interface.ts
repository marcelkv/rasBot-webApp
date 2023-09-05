export interface IRasBot {
  x: number;
  y: number;
  timeStamp: {
    seconds: number;
    nanoseconds: number;
  };
  rasBotId: string;
}
