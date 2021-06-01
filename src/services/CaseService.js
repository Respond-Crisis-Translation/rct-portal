import { db } from "../firebase";

export const getAllCases = () => {
  return db.collection("cases").get();
};

export const getCases = (field, value) => {
  return db.collection("cases").where(field, "==", value).get();
};

export const getCasesByLang = (from, to) => {
  return db
    .collection("cases")
    .where("fromLanguage", "==", from)
    .where("toLanguage", "==", to)
    .get();
};

export const getCase = (caseId) => {
  return db.collection("cases").doc(caseId).get();
};

export const createCase = (document) => {
  return db
    .collection("cases")
    .add(document)
    .then((documentRef) => {
      const uid = documentRef.id;
      db.collection("cases").doc(uid).update({ id: uid });
    });
};

export const getMyCases = (translatorId) => {
  return db
    .collection("cases")
    .where("translator.id", "==", translatorId)
    .get();
};

export const assignCase = (caseId, status, translator) => {
  return db.collection("cases").doc(caseId).update({ status, translator });
};
