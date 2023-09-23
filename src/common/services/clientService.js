import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import firebaseConfig from "@/firebase/firebaseConfig";
import { serverTimestamp } from "firebase/firestore";
import { throttle } from "lodash";
export class ClientService {
  _firebaseApp = null;
  _firestore;
  _rasBotCol;
  _robotId = null;
  _rasBotDocId = null;
  _throttleTime = 800;
  constructor() {
    this._firebaseApp = initializeApp(firebaseConfig);
    this._firestore = getFirestore(this._firebaseApp);
    this._rasBotCol = collection(this._firestore, "rasBots");
  }
  get isLoggedIn() {
    return !!this._robotId && !!this._rasBotDocId;
  }
  async logInAsync(robotId) {
    const rasBotSnapshot = await getDocs(this._rasBotCol);
    const rasBotInDb = rasBotSnapshot.docs.find((doc) => {
      const data = doc.data();
      return data.rasBotId === robotId;
    });
    const rasBotData = rasBotInDb?.data();
    if (rasBotData) {
      this._robotId = rasBotData.rasBotId;
      this._rasBotDocId = rasBotInDb.id;
    } else {
      this._robotId = null;
    }
    return this.isLoggedIn;
  }
  logOut() {
    this._robotId = null;
    this._rasBotDocId = null;
  }
  async setPositionAsync(x, y) {
    this.setPositionThrottled.cancel();
    await this._setPositionAsync(x, y);
  }
  async _setPositionAsync(x, y) {
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
  setPositionThrottled = throttle(this._setPositionAsync, this._throttleTime);
  getSettings() {
    return Promise.resolve(undefined);
  }
}
//# sourceMappingURL=clientService.js.map
