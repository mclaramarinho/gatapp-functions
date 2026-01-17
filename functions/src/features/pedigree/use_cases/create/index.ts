import { FirestoreCollections } from "../../../../shared/firestore/collections";
import { firestore } from "../../../../shared/firestore/init";
import { CatPedigreeModel } from "./models/CatPedigreeModel";

/**
 * List of predefined cat pedigrees
 */
class CatPedigreeList {
  static SRD = new CatPedigreeModel(0, "SRD", "Sem Raça Definida");
  static ABISSINIO = new CatPedigreeModel(1, "ABISSINIO", "Abissínio");
  static AFRODITE = new CatPedigreeModel(2, "AFRODITE", "Afrodite");
  static AMERICAN_BOBTAIL = new CatPedigreeModel(
      3, "AMERICAN_BOBTAIL", "American Bobtail"
  );
  static AMERICAN_BOBTAIL_SHORTHAIR = new CatPedigreeModel(
      5, "AMERICAN_BOBTAIL_SHORTHAIR", "American Bobtail Shorthair"
  );
  static AMERICAN_CURL = new CatPedigreeModel(
      6, "AMERICAN_CURL", "American Curl"
  );
  static AMERICAN_CURL_LONGHAIR = new CatPedigreeModel(
      7, "AMERICAN_CURL_LONGHAIR", "American Curl Longhair"
  );
  static AMERICAN_SHORTHAIR = new CatPedigreeModel(
      8, "AMERICAN_SHORTHAIR", "American Shorthair"
  );
  static AMERICAN_WIREHAIR = new CatPedigreeModel(
      9, "AMERICAN_WIREHAIR", "American Wirehair"
  );
  static ANGORA = new CatPedigreeModel(
      10, "ANGORA", "Angorá"
  );
  static ASHERA = new CatPedigreeModel(
      11, "ASHERA", "Ashera"
  );
  static AUSTRALIAN_MIST = new CatPedigreeModel(
      12, "AUSTRALIAN_MIST", "Australian Mist"
  );
  static BALINESE = new CatPedigreeModel(
      13, "BALINESE", "Balinês"
  );
  static BENGAL = new CatPedigreeModel(
      14, "BENGAL", "Bengal"
  );
  static BENGAL_LONGHAIR = new CatPedigreeModel(
      15, "BENGAL_LONGHAIR", "Bengal Longhair"
  );
  static BIRMAN = new CatPedigreeModel(
      16, "BIRMAN", "Birman (Sagrado da Birmânia)"
  );
  static BOMBAY = new CatPedigreeModel(
      17, "BOMBAY", "Bombay"
  );
  static BRAZILIAN_SHORTHAIR = new CatPedigreeModel(
      18, "BRAZILIAN_SHORTHAIR", "Brazilian Shorthair"
  );
  static BRITISH_LONGHAIR = new CatPedigreeModel(
      19, "BRITISH_LONGHAIR", "British Longhair"
  );
  static BRITISH_SHORTHAIR = new CatPedigreeModel(
      20, "BRITISH_SHORTHAIR", "British Shorthair"
  );
  static BURMESE = new CatPedigreeModel(
      21, "BURMESE", "Burmese"
  );
  static BURMILLA = new CatPedigreeModel(
      22, "BURMILLA", "Burmilla"
  );
  static BURMILLA_LONGHAIR = new CatPedigreeModel(
      23, "BURMILLA_LONGHAIR", "Burmilla Longhair"
  );
  static CAT_ALPINE_LINX = new CatPedigreeModel(
      24, "CAT_ALPINE_LINX", "Cat Alpine Lynx"
  );
  static CHARTREUX = new CatPedigreeModel(
      25, "CHARTREUX", "Chartreux"
  );
  static CHAUSIE = new CatPedigreeModel(
      26, "CHAUSIE", "Chausie"
  );
  static CORNISH_REX = new CatPedigreeModel(
      27, "CORNISH_REX", "Cornish Rex"
  );
  static CYMRIC = new CatPedigreeModel(
      28, "CYMRIC", "Cymric"
  );
  static DESERT_LINX = new CatPedigreeModel(
      29, "DESERT_LINX", "Desert Lynx"
  );
  static DEVON_REX = new CatPedigreeModel(
      30, "DEVON_REX", "Devon Rex"
  );
  static DONSKOY = new CatPedigreeModel(
      31, "DONSKOY", "Donskoy"
  );
  static DWARF = new CatPedigreeModel(
      32, "DWARF", "Dwarf"
  );
  static EGYPTIAN_MAU = new CatPedigreeModel(
      33, "EGYPTIAN_MAU", "Egyptian Mau"
  );
  static ELFO = new CatPedigreeModel(
      34, "ELFO", "Elfo"
  );
  static EXOTIC_SHORTHAIR = new CatPedigreeModel(
      35, "EXOTIC_SHORTHAIR", "Exotic Shorthair"
  );
  static FOLDEX = new CatPedigreeModel(
      36, "FOLDEX", "Foldex"
  );
  static GATO_BAMBINO = new CatPedigreeModel(
      37, "GATO_BAMBINO", "Gato Bambino"
  );
  static GATO_BRAMBLE = new CatPedigreeModel(
      38, "GATO_BRAMBLE", "Gato Bramble"
  );
  static GATO_DA_AREIA = new CatPedigreeModel(
      39, "GATO_DA_AREIA", "Gato da Areia"
  );
  static GATO_DE_PALLAS = new CatPedigreeModel(
      40, "GATO_DE_PALLAS", "Gato de Pallas"
  );
  static GENETTA = new CatPedigreeModel(
      41, "GENETTA", "Genetta"
  );
  static GERMAN_REX = new CatPedigreeModel(
      42, "GERMAN_REX", "German Rex"
  );
  static HAVANA = new CatPedigreeModel(
      43, "HAVANA", "Havana"
  );
  static HIGHLANDER = new CatPedigreeModel(
      44, "HIGHLANDER", "Highlander"
  );
  static HIGHLANDER_SHORTHAIR = new CatPedigreeModel(
      45, "HIGHLANDER_SHORTHAIR", "Highlander Shorthair"
  );
  static HIMALAYAN = new CatPedigreeModel(
      46, "HIMALAYAN", "Himalayan"
  );
  static JAPANESE_BOBTAIL = new CatPedigreeModel(
      47, "JAPANESE_BOBTAIL", "Japanese Bobtail"
  );
  static JAPANESE_BOBTAIL_LONGHAIR = new CatPedigreeModel(
      48, "JAPANESE_BOBTAIL_LONGHAIR", "Japanese Bobtail Longhair"
  );
  static JUNGLE_CURL = new CatPedigreeModel(
      49, "JUNGLE_CURL", "Jungle Curl"
  );
  static KHAOMANEE = new CatPedigreeModel(
      50, "KHAOMANEE", "Khaomanee"
  );
  static KINKALOW = new CatPedigreeModel(
      51, "KINKALOW", "Kinkalow"
  );
  static KORAT = new CatPedigreeModel(
      52, "KORAT", "Korat"
  );
  static KURILIAN_BOBTAIL = new CatPedigreeModel(
      53, "KURILIAN_BOBTAIL", "Kurilian Bobtail"
  );
  static KURILIAN_BOBTAIL_LONGHAIR = new CatPedigreeModel(
      54, "KURILIAN_BOBTAIL_LONGHAIR", "Kurilian Bobtail Longhair"
  );
  static LAMBKIN = new CatPedigreeModel(
      55, "LAMBKIN", "Lambkin"
  );
  static LAPERM = new CatPedigreeModel(
      56, "LAPERM", "LaPerm"
  );
  static LAPERM_SHORTHAIR = new CatPedigreeModel(
      57, "LAPERM_SHORTHAIR", "LaPerm Shorthair"
  );
  static LIKOY = new CatPedigreeModel(
      58, "LIKOY", "Likoy"
  );
  static MAINE_COON = new CatPedigreeModel(
      59, "MAINE_COON", "Maine Coon"
  );
  static MAINE_COON_POLYDACTYL = new CatPedigreeModel(
      60, "MAINE_COON_POLYDACTYL", "Maine Coon Polydactyl"
  );
  static MANDALAY = new CatPedigreeModel(
      61, "MANDALAY", "Mandalay"
  );
  static MANX = new CatPedigreeModel(
      62, "MANX", "Manx"
  );
  static MAU_EGIPICIO = new CatPedigreeModel(
      63, "MAU_EGIPICIO", "Mau Egípcio"
  );
  static MINSKIN = new CatPedigreeModel(
      64, "MINSKIN", "Minskin"
  );
  static MINUET = new CatPedigreeModel(
      65, "MINUET", "Minuet"
  );
  static MINUET_LONGHAIR = new CatPedigreeModel(
      66, "MINUET_LONGHAIR", "Minuet Longhair"
  );
  static MOJAVE_SPOTTED = new CatPedigreeModel(
      67, "MOJAVE_SPOTTED", "Mojave Spotted"
  );
  static MUNCHKIN = new CatPedigreeModel(
      68, "MUNCHKIN", "Munchkin"
  );
  static MUNCHKIN_LONGHAIR = new CatPedigreeModel(
      69, "MUNCHKIN_LONGHAIR", "Munchkin Longhair"
  );
  static NEBELUNG = new CatPedigreeModel(
      70, "NEBELUNG", "Nebelung"
  );
  static NORUEGUES_DA_FLORESTA = new CatPedigreeModel(
      71, "NORUEGUES_DA_FLORESTA", "Norueguês da Floresta"
  );
  static OCICAT = new CatPedigreeModel(
      72, "OCICAT", "Ocicat"
  );
  static ORIENTAL_LONGHAIR = new CatPedigreeModel(
      73, "ORIENTAL_LONGHAIR", "Oriental Longhair"
  );
  static ORIENTAL_SHORTHAIR = new CatPedigreeModel(
      74, "ORIENTAL_SHORTHAIR", "Oriental Shorthair"
  );
  static OWYHEE_BOB = new CatPedigreeModel(
      75, "OWYHEE_BOB", "Owyhee Bob"
  );
  static PERSA = new CatPedigreeModel(
      76, "PERSA", "Persa"
  );
  static PETERBALD = new CatPedigreeModel(
      77, "PETERBALD", "Peterbald"
  );
  static PIXIEBOB = new CatPedigreeModel(
      78, "PIXIEBOB", "Pixiebob"
  );
  static PIXIEBOB_LONGHAIR = new CatPedigreeModel(
      79, "PIXIEBOB_LONGHAIR", "Pixiebob Longhair"
  );
  static RAGDOLL = new CatPedigreeModel(
      80, "RAGDOLL", "Ragdoll"
  );
  static RUSSIAN_BLUE = new CatPedigreeModel(
      81, "RUSSIAN_BLUE", "Russian Blue"
  );
  static SAFARI = new CatPedigreeModel(
      82, "SAFARI", "Safari"
  );
  static SAVANNAH = new CatPedigreeModel(
      83, "SAVANNAH", "Savannah"
  );
  static SCOTTISH_FOLD = new CatPedigreeModel(
      84, "SCOTTISH_FOLD", "Scottish Fold"
  );
  static SCOTTISH_STRAIGHT = new CatPedigreeModel(
      85, "SCOTTISH_STRAIGHT", "Scottish Straight"
  );
  static SELKIRK_REX = new CatPedigreeModel(
      86, "SELKIRK_REX", "Selkirk Rex"
  );
  static SELKIRK_REX_LONGHAIR = new CatPedigreeModel(
      87, "SELKIRK_REX_LONGHAIR", "Selkirk Rex Longhair"
  );
  static SIAMES = new CatPedigreeModel(
      88, "SIAMES", "Siamês"
  );
  static SIBERIAN = new CatPedigreeModel(
      89, "SIBERIAN", "Siberian"
  );
  static SINGAPURA = new CatPedigreeModel(
      90, "SINGAPURA", "Singapura"
  );
  static SNOWSHOE = new CatPedigreeModel(
      91, "SNOWSHOE", "Snowshoe"
  );
  static SOMALI = new CatPedigreeModel(
      92, "SOMALI", "Somali"
  );
  static SPHYNX = new CatPedigreeModel(
      93, "SPHYNX", "Sphynx"
  );
  static THAI = new CatPedigreeModel(
      94, "THAI", "Thai"
  );
  static TIFFANIE = new CatPedigreeModel(
      95, "TIFFANIE", "Tiffanie"
  );
  static TONKINESE = new CatPedigreeModel(
      96, "TONKINESE", "Tonkinese"
  );
  static TOYGER = new CatPedigreeModel(
      97, "TOYGER", "Toyger"
  );
  static TURKISH_ANGORA = new CatPedigreeModel(
      98, "TURKISH_ANGORA", "Turkish Angora"
  );
  static TURKISH_VAN = new CatPedigreeModel(
      99, "TURKISH_VAN", "Turkish Van"
  );
  static UKRAINIAN_LEVKOY = new CatPedigreeModel(
      100, "UKRAINIAN_LEVKOY", "Ukrainian Levkoy"
  );
  static USSURI = new CatPedigreeModel(
      101, "USSURI", "Ussuri"
  );
  static VAN_CAT = new CatPedigreeModel(
      102, "VAN_CAT", "Van Cat"
  );
  /**
   * @return {CatPedigreeModel[]}
   */
  static values(): CatPedigreeModel[] {
    return [
      this.SRD,
      this.ABISSINIO,
      this.AFRODITE,
      this.AMERICAN_BOBTAIL,
      this.AMERICAN_BOBTAIL_SHORTHAIR,
      this.AMERICAN_CURL,
      this.AMERICAN_CURL_LONGHAIR,
      this.AMERICAN_SHORTHAIR,
      this.AMERICAN_WIREHAIR,
      this.ANGORA,
      this.ASHERA,
      this.AUSTRALIAN_MIST,
      this.BALINESE,
      this.BENGAL,
      this.BENGAL_LONGHAIR,
      this.BIRMAN,
      this.BOMBAY,
      this.BRAZILIAN_SHORTHAIR,
      this.BRITISH_LONGHAIR,
      this.BRITISH_SHORTHAIR,
      this.BURMESE,
      this.BURMILLA,
      this.BURMILLA_LONGHAIR,
      this.CAT_ALPINE_LINX,
      this.CHARTREUX,
      this.CHAUSIE,
      this.CORNISH_REX,
      this.CYMRIC,
      this.DESERT_LINX,
      this.DEVON_REX,
      this.DONSKOY,
      this.DWARF,
      this.EGYPTIAN_MAU,
      this.ELFO,
      this.EXOTIC_SHORTHAIR,
      this.FOLDEX,
      this.GATO_BAMBINO,
      this.GATO_BRAMBLE,
      this.GATO_DA_AREIA,
      this.GATO_DE_PALLAS,
      this.GENETTA,
      this.GERMAN_REX,
      this.HAVANA,
      this.HIGHLANDER,
      this.HIGHLANDER_SHORTHAIR,
      this.HIMALAYAN,
      this.JAPANESE_BOBTAIL,
      this.JAPANESE_BOBTAIL_LONGHAIR,
      this.JUNGLE_CURL,
      this.KHAOMANEE,
      this.KINKALOW,
      this.KORAT,
      this.KURILIAN_BOBTAIL,
      this.KURILIAN_BOBTAIL_LONGHAIR,
      this.LAMBKIN,
      this.LAPERM,
      this.LAPERM_SHORTHAIR,
      this.LIKOY,
      this.MAINE_COON,
      this.MAINE_COON_POLYDACTYL,
      this.MANDALAY,
      this.MANX,
      this.MAU_EGIPICIO,
      this.MINSKIN,
      this.MINUET,
      this.MINUET_LONGHAIR,
      this.MOJAVE_SPOTTED,
      this.MUNCHKIN,
      this.MUNCHKIN_LONGHAIR,
      this.NEBELUNG,
      this.NORUEGUES_DA_FLORESTA,
      this.OCICAT,
      this.ORIENTAL_LONGHAIR,
      this.ORIENTAL_SHORTHAIR,
      this.OWYHEE_BOB,
      this.PERSA,
      this.PETERBALD,
      this.PIXIEBOB,
      this.PIXIEBOB_LONGHAIR,
      this.RAGDOLL,
      this.RUSSIAN_BLUE,
      this.SAFARI,
      this.SAVANNAH,
      this.SCOTTISH_FOLD,
      this.SCOTTISH_STRAIGHT,
      this.SELKIRK_REX,
      this.SELKIRK_REX_LONGHAIR,
      this.SIAMES,
      this.SIBERIAN,
      this.SINGAPURA,
      this.SNOWSHOE,
      this.SOMALI,
      this.SPHYNX,
      this.THAI,
      this.TIFFANIE,
      this.TONKINESE,
      this.TOYGER,
      this.TURKISH_ANGORA,
      this.TURKISH_VAN,
      this.UKRAINIAN_LEVKOY,
      this.USSURI,
      this.VAN_CAT,
    ];
  }
}


/**
 * Populates the 'catPedigrees' collection
 * in Firestore with predefined cat pedigrees.
 */
export const populateCatPedigreesCollection = async () => {
  const all = CatPedigreeList.values();

  all.map((pedigree) => {
    firestore
        .collection(FirestoreCollections.CatPedigrees)
        .doc(pedigree.id.toString()).set({
          normalizedName: pedigree.normalizedName,
          displayName: pedigree.displayName,
        })
        .then(() => {
          console.log(
              `Cat pedigree ${pedigree.displayName} created successfully.`
          );
        })
        .catch((error) => {
          console.error(
              `Error creating cat pedigree ${pedigree.displayName}: `, error
          );
        });
  });
};
