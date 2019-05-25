import { request } from "http";

export const InitializeDB = () => {
  //var databaseRequest = window.indexedDB.open("MyData", 1); //initial database
  var databaseRequest = window.indexedDB.open("MyData", 8); //created bank table

  databaseRequest.onupgradeneeded = function(event) {
    var db = event.target.result;

    if (!db.objectStoreNames.contains("bank")) {
      var table = db.createObjectStore("bank", {
        keyPath: "bankId",
        autoIncrement: true
      });

      table.createIndex("name", "name", { unique: false });
      table.createIndex("accountNo", "accountNo", { unique: false });
      table.createIndex("expiration", "expiration", { unique: false });
    } else {
      var table = event.currentTarget.transaction.objectStore("bank");
      if (!table.indexNames.contains("expiration")) {
        table.createIndex("expiration", "expiration", { unique: false });
      }
    }
  };
};

export const saveToDB = (table, data, onComplete) => {
  let db = indexedDB.open("MyData");
  var toBeInserted = {};
  db.onsuccess = event => {
    let tx = event.target.result.transaction([table], "readwrite");
    let store = tx.objectStore(table);

    store.put(data);

    tx.oncomplete = event => {
      onComplete(event);
    };

    tx.onerror = event => {
      return false;
    };
  };
};
