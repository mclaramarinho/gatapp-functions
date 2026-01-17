import { populateCatPedigreesCollection }
  from "../../features/pedigree/use_cases/create";
import { populatePetColorsCollection }
  from "../../features/petColor/use_cases/create/index";

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
  ]);

  // Future updates only
  await Promise.all([]);
};
