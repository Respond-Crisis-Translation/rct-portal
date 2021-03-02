import { db } from '../firebase'

export const getCases = () => {
  return db.collection('cases').get()
}

export const getCase = (caseId) => {
  return db.collection('cases').doc(caseId).get()
}

export const getMyCases = (translatorId) => {
  return db.collection('cases').where('translator.id', '==', translatorId).get()
}
