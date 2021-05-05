import { db } from '../firebase'

export const getAllCases = () => {
  return db.collection('cases').get()
}

export const getCases = (status) => {
  return db.collection('cases').where('status', '==', status).get()
}

export const getCase = (caseId) => {
  return db.collection('cases').doc(caseId).get()
}

export const getMyCases = (translatorId) => {
  return db.collection('cases').where('translator.id', '==', translatorId).get()
}

export const assignCase = (caseId, status, translator) => {
  return db.collection('cases').doc(caseId).update({status, translator})
}