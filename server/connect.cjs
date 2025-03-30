// connect.cjs
const { MongoClient } = require('mongodb');
require('dotenv').config({ path: './config.env' });

/**
 * Fetch data from MongoDB with optional filters.
 * @param {Object} filters - An object containing filtering options.
 * @param {string} filters.role - The user's role ('patient', 'doctor', or 'hospital').
 * @param {string} filters.email - The user's email for filtering (if applicable).
 * @returns {Promise<Object>} - An object containing arrays for patients, doctors, appointments, and hospitals.
 */
async function fetchData(filters = {}) {
  const Db = process.env.ATLAS_URI;
  const client = new MongoClient(Db);

  try {
    await client.connect();
    const database = client.db('navisai');

    // Apply filtering based on role:
    const patientFilter =
      filters.role === 'patient' && filters.email
        ? { email: filters.email }
        : {};
    const doctorFilter =
      filters.role === 'doctor' && filters.email
        ? { email: filters.email }
        : {};

    // For hospital role or if no email is provided, return all documents.
    const patients = await database
      .collection('patients')
      .find(patientFilter)
      .toArray();
    const doctors = await database
      .collection('doctors')
      .find(doctorFilter)
      .toArray();
    // For appointments, you might add further filtering based on user.
    const appointments = await database.collection('appointments').find({}).toArray();
    const hospitals = await database.collection('hospitals').find({}).toArray();

    return { patients, doctors, appointments, hospitals };
  } catch (e) {
    console.error(e);
    throw e;
  } finally {
    await client.close();
  }
}

module.exports = { fetchData };