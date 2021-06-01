import { db } from '../firebase'

export const getTranslators = (status) => {
  return db.collection('translators').where('status', '==', status).get()
}

export const updateStatus = (uid, status) => {
  return db.collection('translators').doc(uid).update({id: uid, status})
}

export const updateRole = (uid, role) => {
  return db.collection('translators').doc(uid).update({role})
}