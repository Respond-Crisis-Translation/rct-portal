import { db } from '../firebase'

export const getTranslators = (status) => {
  return db.collection('translators').where('status', '==', status).get()
}
