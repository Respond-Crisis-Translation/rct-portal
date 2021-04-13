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

export const uploadCaseDocument = (file) => {
  const timestamp = db.FieldValue.serverTimestamp();
  var fileId = auth.currentUser.uid + "/" + file.name;
  var storageRef = fs.ref(fileId).put(file).catch(
    function(error) {
      console.error("Error uploading document.");
    }
  );

  // document.getElementById("uploader").addEventListener("change", function(e) {
  //     files = e.target.files;
  // });
}
