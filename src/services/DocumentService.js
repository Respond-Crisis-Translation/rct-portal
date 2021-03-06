import { db } from "../firebase";

export const getDocuments = (caseId) => {
  return db.collection("documents").where("case_id", "==", caseId).get();
};

export const updateDocument = (uid, translated_doc_link, doc_type) => {
  return db.collection("documents").doc(uid).update({
    translated_document_link: translated_doc_link,
    translated_document_type: doc_type,
  });
};

export const updateDateCompleted = (uid) => {
  return db
    .collection("documents")
    .doc(uid)
    .update({ date_completed: new Date() });
};

export const undoComplete = (uid) => {
  return db
    .collection("documents")
    .doc(uid)
    .update({ translated_document_link: "", translated_document_type: "" });
};

export const createDocument = (document) => {
  return db
    .collection("documents")
    .add(document)
    .then((documentRef) => {
      const uid = documentRef.id;
      db.collection("documents").doc(uid).update({ id: uid });
    });
};
