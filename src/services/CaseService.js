import { auth, db, fs } from '../firebase'

export const getCases = () => {
  return db.collection('cases').get()
}

export const getCase = (caseId) => {
  return db.collection('cases').doc(caseId).get()
}

export const getMyCases = (translatorId) => {
  return db.collection('cases').where('translator.id', '==', translatorId).get()
}

export const uploadCaseDocument = (caseId, file) => {
  const timestamp = db.FieldValue.serverTimestamp();
  var fileId = auth.currentUser.uid + "/" + file.name;

  // 0. Get Case (Document in Firebase)
  var query = firebase.firestore().collection('messages')
                                  .where(caseId, "==", true);

  var caseRef = db.collection('cases').doc(caseId);
  console.log("Using CASEID: ", caseId);
  console.log("CASEREF: ", caseRef);

  caseRef.get().then(doc => {
    if (doc.exists) {
      console.log("Document contents: ", doc.date());
    } else {
      console.log("No document contents.");
    }
  }).catch(error => {
    console.log("error getting doc: ", error);
  });



    // 1. Upload file
    fs.ref(fileId).put(file).then(snapshot => {
      console.log("uploading file.");

      // 2. Update Case with file location


    }).catch(error => {
        console.error("Error uploading document.");
      }
    );
  );
}
