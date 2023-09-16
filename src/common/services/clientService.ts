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

    return !!rasBotData;
  }
}
