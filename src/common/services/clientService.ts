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
import { throttle } from "lodash";
import { IRasBotSettings } from "@/common/services/IRasBotSettings.interface";
import { RasBotSettings } from "@/common/services/RasBotSettings";

export class ClientService implements IClientService {
  private readonly _firebaseApp: FirebaseApp = null;
  private readonly _firestore: Firestore;
  private readonly _rasBotCol;
  private readonly _rasBotSettingsCol;
  private _robotId: string = null;
  private _rasBotDocId: string = null;
  private _settings: IRasBotSettings = new RasBotSettings();

  constructor() {
    this._firebaseApp = initializeApp(firebaseConfig);
    this._firestore = getFirestore(this._firebaseApp);
    this._rasBotCol = collection(this._firestore, "rasBots");
    this._rasBotSettingsCol = collection(this._firestore, "rasBotSettings");
  }

  get isLoggedIn(): boolean {
    return !!this._robotId && !!this._rasBotDocId;
  }

  get settings(): IRasBotSettings {
    return this._settings;
  }

  async logInAsync(robotId: string): Promise<boolean> {
    await this._initSettingsAsync(robotId);
    await this._logInAsync(robotId);
    return this.isLoggedIn;
  }

  logOut(): void {
    this._robotId = null;
    this._rasBotDocId = null;
  }

  async setPositionAsync(x: number, y: number): Promise<void> {
    this.setPositionThrottled.cancel();
    await this._setPositionAsync(x, y);
  }

  setPositionThrottled = throttle(
    this._setPositionAsync,
    this.settings.throttleDelay_ms
  );

  private async _logInAsync(robotId: string): Promise<void> {
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
  }

  private async _initSettingsAsync(robotId: string): Promise<void> {
    const rasBotSettingsSnapshot = await getDocs(this._rasBotSettingsCol);
    const rasBotSettingsInDb = rasBotSettingsSnapshot.docs.find((doc) => {
      const data = doc.data();
      return data.rasBotId === robotId;
    });
    const rasBotSettingsData = rasBotSettingsInDb?.data() as IRasBotSettings;
    if (rasBotSettingsData) {
      this._settings = rasBotSettingsData;
    }
  }

  private async _setPositionAsync(x: number, y: number): Promise<void> {
    if (!this.isLoggedIn) {
      return;
    }

    try {
      const rasBotDocRef = doc(this._firestore, "rasBots", this._rasBotDocId);
      await updateDoc(rasBotDocRef, {
        x: x,
        y: y,
        timeStamp: serverTimestamp(),
      });
    } catch (e) {
      return;
    }
  }
}
