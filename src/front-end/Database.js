import { resolve } from "url";
import { rejects } from "assert";

const FAKE_LEDGERS = [
  {
    name: '薪水',
    type: 1,
    number: 200000,
    createDate: new Date('2019/6/1'),
  },
  {
    name: '麥當勞歡樂送',
    type: 2,
    number: 398,
    createDate: new Date('2019/6/6 10:30:12'),
  },
  {
    name: '房租',
    type: 4,
    number: 30000,
    createDate: new Date('2019/6/1'),
  },
  {
    name: '薪水',
    type: 1,
    number: 200000,
    createDate: new Date('2019/5/1'),
  },
  {
    name: '房租',
    type: 4,
    number: 30000,
    createDate: new Date('2019/5/1'),
  },
  {
    name: '午餐',
    type: 2,
    number: 90,
    createDate: new Date('2019/6/10 11:40:37'),
  },
]
const TYPES = ['收入', '食', '衣', '住', '行', '娛樂'];

if (!window.indexedDB) {
  window.alert(`Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.`);
}

let dbObj = {
  db: null,
};

export function openDB() {
  return new Promise((resolve, reject) => {
    let request = indexedDB.open('ledger', 13);

    request.onerror = function (event) {
      alert('Database error.');
      reject({ db: null, });
    };

    request.onupgradeneeded = function (event) {
      dbObj.db = event.target.result;

      let itemsObjectStore = dbObj.db.createObjectStore('item', { autoIncrement: true });
      itemsObjectStore.createIndex('createDate', 'createDate', { unique: false });
      // itemsObjectStore.transaction.oncomplete = () => {
      //   let itemsObjectStore = dbObj.db.transaction("item", "readwrite").objectStore("item");
      //   FAKE_LEDGERS.forEach((item) => {
      //     itemsObjectStore.add(item);
      //   });
      // }

      let typesObjectStore = dbObj.db.createObjectStore('item_type', { autoIncrement: true });
      TYPES.forEach((t) => {
        typesObjectStore.add(t);
      });

    };

    request.onsuccess = function (event) {
      dbObj.db = event.target.result;
      resolve(dbObj);
    };
  });
}

export function getItemsByYear(year) {
  return new Promise((resolve) => {
    let queryYear = new Date().getFullYear();
    if (year) {
      queryYear = year;
    }

    let transaction = dbObj.db.transaction(['item']);
    let objectStore = transaction.objectStore("item");
    let index = objectStore.index('createDate');
    const range = IDBKeyRange.bound(new Date(`${queryYear}/1/1`), new Date(`${queryYear}/12/31`), false, true);
    let items = [];

    index.openCursor(range).onsuccess = (event) => {
      let cursor = event.target.result;
      if (cursor) {
        items.push(cursor.value);
        cursor.continue();
      } else {
        resolve(items);
      }
    };
  });
}

export function getItemsToday() {
  return new Promise((resolve) => {
    const today = new Date();
    let transaction = dbObj.db.transaction(['item']);
    let objectStore = transaction.objectStore("item");
    let index = objectStore.index('createDate');
    const range = IDBKeyRange.bound(
      new Date(`${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`),
      new Date(`${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate() + 1}`),
      false,
      true
    );
    let items = [];

    index.openCursor(range).onsuccess = (event) => {
      let cursor = event.target.result;
      if (cursor) {
        items.push(cursor.value);
        cursor.continue();
      } else {
        resolve(items);
      }
    };
  });
}

export function getItemsByDate(startDate, endDate) {
  return new Promise((resolve) => {
    let transaction = dbObj.db.transaction(['item']);
    let objectStore = transaction.objectStore("item");
    let index = objectStore.index('createDate');
    const range = IDBKeyRange.bound(
      startDate,
      endDate,
      false,
      false
    );
    let items = [];

    index.openCursor(range).onsuccess = (event) => {
      let cursor = event.target.result;
      if (cursor) {
        items.push(cursor.value);
        cursor.continue();
      } else {
        resolve(items);
      }
    };
  });
}

export function getItemTypesMap() {
  return new Promise((resolve) => {
    let transaction = dbObj.db.transaction(['item_type']);
    let objectStore = transaction.objectStore("item_type");
    let itemTypesMap = new Map();

    objectStore.openCursor().onsuccess = (event) => {
      let cursor = event.target.result;
      if (cursor) {
        itemTypesMap.set(cursor.key, cursor.value);
        cursor.continue();
      } else {
        resolve(itemTypesMap);
      }
    };
  });
}

export function addItem(item) {
  return new Promise((resolve, reject) => {
    let transaction = dbObj.db.transaction(['item'], 'readwrite');
    let objectStore = transaction.objectStore("item");
    let request = objectStore.add(item);

    request.onsuccess = (e) => {
      resolve(true);
    }

    objectStore.onerror = (e) => {
      console.error(e);
      reject(e);
    }
  });
}
