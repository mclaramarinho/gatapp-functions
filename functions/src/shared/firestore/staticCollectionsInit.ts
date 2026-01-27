import { populateCatPedigreesCollection }
  from "../../features/pedigree/use_cases/populate";
import { populatePeriodTypes }
  from "../../features/periodType/use_cases/populate";
import { populatePetColorsCollection }
  from "../../features/petColor/use_cases/populate/index";
import { populateVaccinesCollection }
  from "../../features/vaccine/use_cases/populate";

/**
 * Import this inside init.ts to ensure static collections are created
 * First time, needs to run all population functions
 * From then on, only run the ones needing updates or additions
 */
export const initializeStaticCollections = async () => {
  // First time only
  await Promise.all([
    populateCatPedigreesCollection(),
    populatePetColorsCollection(),
    populateVaccinesCollection(),
    populatePeriodTypes(),
  ]);

  // Future updates only
  await Promise.all([]);
};
