import { IClientService } from "@/common/services/IClientService";
import { FirebaseApp, initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  Firestore,
} from "firebase/firestore";
import { IRasBot } from "@/common/services/IRasBot.interface";
import firebaseConfig from "@/firebase/firebaseConfig";

export class ClientService implements IClientService {
  private readonly _firebaseApp: FirebaseApp = null;
  private readonly _firestore: Firestore;
  private readonly _rasBotCol;

  constructor() {
    this._firebaseApp = initializeApp(firebaseConfig);
    this._firestore = getFirestore(this._firebaseApp);
    this._rasBotCol = collection(this._firestore, "rasBots");
  }

  async isRobotIdValidAsync(robotId: string): Promise<boolean> {
    const rasBotSnapshot = await getDocs(this._rasBotCol);
    const rasBotInDb = rasBotSnapshot.docs.find((doc) => {
      const data = doc.data();
      return data.rasBotId === robotId;
    });
    const rasBotData = rasBotInDb?.data() as IRasBot;

    if (rasBotData) {
      const date = this._getDate(rasBotData);
      const currentDate = new Date();
      return date < currentDate;
    }

    return false;
  }

  private _getDate(rasBot: IRasBot): Date {
    const seconds = rasBot.timeStamp.seconds;
    const nanoseconds = rasBot.timeStamp.nanoseconds;
    const milliseconds = seconds * 1000 + nanoseconds / 1000000;
    return new Date(milliseconds);
  }
}
