const admin = require('firebase-admin')
const serviceAccount = require('../db/mi-backend-firebase-adminsdk-6so14-a880fb13c9.json')
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
const { getFirestore, doc, getDoc } = require('firebase-admin/firestore')

class Container {
	constructor() {
		this.db = getFirestore()
	}
	//Guardar un objeto
	save(obj) {
		try {
			return this.db.collection('products').add(obj)
		} catch (err) {
			console.log(err)
		}
	}
	//Obtener un objeto según su ID
	getById(id) {
		try {
			const data = this.db.doc(`/products/${id}`).get()
			return data
		} catch (err) {
			console.log(err)
		}
	}
	//Obtener todos los objetos
	getAll() {
		try {
			return this.model.find()
		} catch (err) {
			console.log(err)
		}
	}
	//Eliminar un objeto
	deleteById(id) {
		try {
			return this.model.findByIdAndDelete(id)
		} catch (err) {
			console.log(err)
		}
	}
}

module.exports = Container