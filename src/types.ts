type HasEmoji = [boolean, string | [], string, string] & {};

type UnicodeString = `&#x${string};` | string;

type ContentType = FunTranslationResponse["contents"] & {
  error: 429 | 401 | 404 | 200;
  isBad: boolean;
};

type HistoryType = {
  past: ContentType[];
};

type FunTranslationResponse = {
  success: {
    total: number;
  };
  contents: {
    translated: string;
    text: string;
    translation: string;
  };
};

type Master =
  | "Starwars"
  | "Startrek"
  | "Got"
  | "Elvish"
  | "All"
  | "Yoda"
  | "Pirate"
  | "Valspeak"
  | "Minion"
  | "Ferb-latin"
  | "Pig-latin"
  | "Dothraki"
  | "Valyrian"
  | "Hodor"
  | "Sindarin"
  | "Quenya"
  | "Orcish"
  | "Sith"
  | "Cheunh"
  | "Gungan"
  | "Mandalorian"
  | "Huttese"
  | "Chef"
  | "Catalan"
  | "Oldenglish"
  | "Shakespeare"
  | "Vulcan"
  | "Klingon"
  | "Romulan"
  | "Dovahzul"
  | "Thuum"
  | "Aldmeris"
  | "Groot"
  | "Jive"
  | "Ebonics"
  | "Dolan"
  | "Fudd"
  | "Kraut"
  | "Wow"
  | "Cockney"
  | "Norfolk"
  | "Morse"
  | "Us2uk"
  | "Uk2us"
  | "Leetspeak"
  | "Brooklyn"
  | "Ermahgerd"
  | "Australian"
  | "Boston"
  | "Austrian"
  | "Article_rewrite"
  | "Braille"
  | "Numbers"
  | "Emoji"
  | "Doge"
  | "Navi"
  | "Southern-accent"
  | "Ubbi-dubbi"
  | "Inflationary-english"
  | "George-bush-dubya"
  | "Post-modern"
  | "Ayleidoon"
  | "Redneck"
  | "Roman-numerals"
  | "Asian-accent"
  | "Russian-accent"
  | "English-contraction"
  | "Irish"
  | "British"
  | "German-accent"
  | "Draconic"
  | "Enderman"
  | "Wheel-of-time-old-tongue";
