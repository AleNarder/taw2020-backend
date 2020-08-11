import * as mongoose from 'mongoose'

interface LocationType extends mongoose.Document {
  Comune: string,
  Provincia: string,
  Regione: string,
  CAP: string,
  Indirizzo?: string
}

const locationSchema = new mongoose.Schema({
  Comune: {
    type: String,
    required: true
  },
  Provincia: {
    type: String,
    required: true
  },
  Regione: {
    type: String,
    required: true
  },
  Indirizzo: {
    type: String,
    required: true
  },
  CAP: {
    type: String,
    required: true
  }
})

const LocationModel = mongoose.model<LocationType>('Location', locationSchema)
export { locationSchema, LocationModel, LocationType }