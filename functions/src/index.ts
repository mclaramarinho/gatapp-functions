/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { setGlobalOptions } from "firebase-functions/v2/options";
// import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";
import { getApps, initializeApp } from "firebase-admin/app";

// Initialize Firebase
if (getApps().length === 0) {
  initializeApp(); // NO config object
}

setGlobalOptions({ maxInstances: 10 });

export * from "./features/pet";
export * from "./features/pedigree";
export * from "./features/petColor";
export * from "./features/user";

// TODO - createProfessional
// TODO - updateProfessional
// TODO - deleteProfessional
// TODO - getProfessionals

// TODO - createVaccineSchedule
// TODO - updateVaccineSchedule
// TODO - getVaccineSchedules

// TODO - recordVaccineAdministration
// TODO - getVaccinationHistory
