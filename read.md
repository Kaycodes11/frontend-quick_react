# firebase auth

[ Reference ]: https://dev.to/nicolasmontielf/how-use-firebaseui-for-user-authentication-on-your-react-project-32h7 "working"

[ Reference ] : https://www.youtube.com/watch?v=eTuJ47RvEdQ&ab_channel=WebBASE

# Get the current user i.e. authenticated (two ways)

## Using Observer ( i.e. onAuthStateChanged ) : This is recommended way to get the current user

To ensure the firebase has initialized and when using signInWithRedirect it waits for getRedirectResult to resolve , simply put , using this observer it ensures the proper handling of currentUser

## Another Way is to getAuth().currentUser: if no user then null

NOTE: use onAuthStateChanged to get the current user and getAuth().currentUser as arg to needful apis

## Firestore

# Making a reference to collection or document: it only just points to a location (does't do api request)

```ts
import { doc, collection } from "firebase/firestore";

const alovelaceDocumentRef = doc(db, "users", "alovelace"); // doc(db, 'users/alovelace');
const usersRef = collection(db, "users");
```

# Data bundles: https://firebase.google.com/docs/firestore/bundles

A data bundle is a static binary file built by you to package "one or more document and/or query snapshots" and from which you can extract `named queries` at client". The `server-side SDKs let you build bundles` and client SDKs provide methods allow to load data from those bundles to use as `local cache`.

`Named queries are just object that can be extracted from a bundle (which built via server-side SDKs)`, then use immediately to query data either from cache or from the cloud firestore.

## custom objects

````ts
class City {
  constructor(name, state, country) {
    this.name = name;
    this.state = state;
    this.country = country;
  }
  toString() {
    return this.name + ", " + this.state + ", " + this.country;
  }
}

// Firestore data converter
const cityConverter = {
  toFirestore: (city) => {
    // when sending to firebase it has to a simple object
    return {
      name: city.name,
      state: city.state,
      country: city.country,
    };
  },
  fromFirestore: (snapshot, options) => {
    // now when fetching the data from firebase, turn it into class
    const data = snapshot.data(options);
    return new City(data.name, data.state, data.country);
  },
};

// Set and Get with cityConverter
const ref = doc(db, "cities", "LA").withConverter(cityConverter); // document reference
await setDoc(ref, new City("Los Angeles", "CA", "USA"));

const docSnap = await getDoc(ref);

if (docSnap.exists()) {
  // Convert to City object
  const city = docSnap.data();
  // Use a City instance method
  console.log(city.toString());
} else {
  console.log("No such document!");
}

// ## Add a new document with a generated id.
const docRef = await addDoc(collection(db, "cities"), {
  name: "Tokyo",
  country: "Japan",
});

console.log("Document written with ID: ", docRef.id);

// ## Update the timestamp field with the value from the server
const docRef = doc(db, "objects", "some-id");
const updateTimestamp = await updateDoc(docRef, {
  timestamp: serverTimestamp(),
});

// ## update elements in array

const washingtonRef = doc(db, "cities", "DC");

// Atomically add a new region to the "regions" array field only if not already exist
await updateDoc(washingtonRef, {
    regions: arrayUnion("greater_virginia")
});

// Atomically remove all values from region on washingtonRef that has "east_coast".
await updateDoc(washingtonRef, {
    regions: arrayRemove("east_coast")
});

## Get data from collection and documents: https://firebase.google.com/docs/firestore/query-data/get-data

## Get Realtime updates with cloud firestore: https://firebase.google.com/docs/firestore/query-data/listen

``ts
import { doc, onSnapshot } from "firebase/firestore";

// listen onto a document (i.e. '/cities/SF') & then every time this document changes;
// snapshot will get the current data

const unsub = onSnapshot(doc(db, "cities", "SF"), (doc) => {
    // if needed to know whether this document has local changes that haven't been written to backend yet
  const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
  console.log(source, " data: ", doc.data());
});

// listen to multiple documents from a collection

import { collection, query, where, onSnapshot } from "firebase/firestore";

const q = query(collection(db, "cities"), where("state", "==", "CA"));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const cities = [];
  querySnapshot.forEach((doc) => {
      cities.push(doc.data().name);
  });
  console.log("Current cities in CA: ", cities.join(", "));
});

// view changes between snapshots: to see the actual changes to query results between query snapshots
import { collection, query, where, onSnapshot } from "firebase/firestore";

const q = query(collection(db, "cities"), where("state", "==", "CA"));
const unsubscribe = onSnapshot(q, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
        console.log("New city: ", change.doc.data());
    }
    if (change.type === "modified") {
        console.log("Modified city: ", change.doc.data());
    }
    if (change.type === "removed") {
        console.log("Removed city: ", change.doc.data());
    }
  });
});

// to detach the listener: unsubscribe()

// handle the listen errors
import { collection, onSnapshot } from "firebase/firestore";

const unsubscribe = onSnapshot(
  collection(db, "cities"),
  (snapshot) => {
    // do something
  },
  (error) => {
    // handle error
  });

// ## more querying: https://firebase.google.com/docs/firestore/query-data/queries
// limit-orderBy : https://firebase.google.com/docs/firestore/query-data/order-limit-data
// count documents with aggregation query: https://firebase.google.com/docs/firestore/query-data/aggregation-queries

// acess and manage offline data: https://firebase.google.com/docs/firestore/manage-data/enable-offline

// indexing: https://firebase.google.com/docs/firestore/query-data/indexing

``

// ## Transaction : https://firebase.google.com/docs/firestore/manage-data/transactions
If a transaction reads documents and another client modifies any of those documents, Cloud Firestore retries the transaction.

This feature ensures that the transaction runs on up-to-date and consistent data. Firestore roll back the transaction automatically on the failed transaction.

## Data contention in the mobile/web SDKs uses optimistic concurrency control for transaction:

[platforms]: Apple Platform, Android, Web, C++

In the Mobile/Web SDKs, a transaction keeps track of all the documents you read inside the transaction. The transaction completes its write operations "only if none of those documents changed during the transaction's execution". If any document did change, the transaction handler retries the transaction. If the transaction can't get a clean result after a few retries, the transaction fails due to data contention.

## Data contention in the server client libraries (when using Firestore's server-side SDKs)

[platforms]: Node.js

Based on the assumption that data contention is likely. Pessimistic transactions use database locks to prevent other operations from modifying data.

When a transaction locks a document, other write operations must wait for the transaction to release its lock. Transactions acquire their locks in chronological order. A transaction releases its document locks at commit time. It also releases its locks if it times out or fails for any reason.

## export and import data:: https://firebase.google.com/docs/firestore/manage-data/export-import

```

## Realtime Database

## Storage : https://firebase.google.com/docs/storage/web/start
```
````
