import { IClientService } from "@/common/services/IClientService";
import { FirebaseApp, initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  updateDoc,
  getDocs,
  Firestore,
} from "firebase/firestore";
import { IRasBot } from "@/common/services/IRasBot.interface";
import firebaseConfig from "@/firebase/firebaseConfig";
import { serverTimestamp } from "firebase/firestore";

export class ClientService implements IClientService {
  private readonly _firebaseApp: FirebaseApp = null;
  private readonly _firestore: Firestore;
  private readonly _rasBotCol;
  private _robotId: string = null;
  private _rasBotDocId: string = null;
  private _isThrottled = false;

  constructor() {
    this._firebaseApp = initializeApp(firebaseConfig);
    this._firestore = getFirestore(this._firebaseApp);
    this._rasBotCol = collection(this._firestore, "rasBots");
  }

  get isLoggedIn(): boolean {
    return !!this._robotId && !!this._rasBotDocId;
  }

  async logInAsync(robotId: string): Promise<boolean> {
    const rasBotSnapshot = await getDocs(this._rasBotCol);
    const rasBotInDb = rasBotSnapshot.docs.find((doc) => {
      const data = doc.data();
      return data.rasBotId === robotId;
    });
    const rasBotData = rasBotInDb?.data() as IRasBot;
    if (rasBotData) {
      this._robotId = rasBotData.rasBotId;
      this._rasBotDocId = rasBotInDb.id;
    } else {
      this._robotId = null;
    }

    return this.isLoggedIn;
  }

  logOut(): void {
    this._robotId = null;
    this._rasBotDocId = null;
  }

  setPosition(x: number, y: number): void {
    if (!this.isLoggedIn) {
      return;
    }

    if (this._isThrottled) {
      return;
    }

    this._isThrottled = true;
    setTimeout(() => (this._isThrottled = false), 400);
    setTimeout(async () => {
      const rasBotDocRef = doc(this._firestore, "rasBots", this._rasBotDocId);
      await updateDoc(rasBotDocRef, {
        x: x,
        y: y,
        timeStamp: serverTimestamp(),
      });
    }, 0);
  }
}
