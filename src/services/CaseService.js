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

export const getCaseDocuments = (caseId) => {

}

export const uploadCaseDocument = (file) => {
  const timestamp = db.FieldValue.serverTimestamp();
  var filePath = auth.currentUser.uid + "/" + file.name;
  var caseId = null;

  // 0. Get Case (Document in Firebase)
  console.log("Using CASEID: ", caseId);

  getCase(caseId).then(caseRef => {

      // 1. Upload file
      var storageRef = fs.ref(filePath).put(file).then(storageSnapshot => {
        console.log("uploading file.");

        // 2. Update Case with file location
        return caseRef.update({
            date_completed: timestamp,
            file_link: storageSnapshot.metadata.fullPath,
            translated_document_link: storageSnapshot.metadata.fullPath
          });

      }).catch(error => {
          console.error("Error uploading document.");
        }
      );

  }).catch(error => {
    console.log("error getting case: ", error);
  });
}
