import { Kysely } from "kysely"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const seed = async (db: Kysely<any>) => {
  await db
    .insertInto("member")
    .values([
      {
        id: "1351135001437143070",
        username: "laurenshoog_05979",
        globalName: "Ex Laurens",
      },
      {
        id: "526472034054832139",
        username: "b4cspijker",
        globalName: "Spijker",
      },
      {
        id: "725673039135637525",
        username: "boyka8612",
        globalName: "boyka",
      },
      {
        id: "398077923313319937",
        username: "polleke040",
        globalName: "polleke040",
      },
      {
        id: "558702077677928449",
        username: "souleman3376",
        globalName: "Betsie Brombeer",
      },
      {
        id: "252397492023459840",
        username: "myst7930",
        globalName: "Myst",
      },
      {
        id: "1091548577630785556",
        username: "koohina",
        globalName: null,
      },
      {
        id: "129405643034460160",
        username: "bengeleng",
        globalName: null,
      },
      {
        id: "1299678407960952897",
        username: "gunj76",
        globalName: null,
      },
      {
        id: "1052856449673461800",
        username: "destil.",
        globalName: "RS",
      },
      {
        id: "557632389598150695",
        username: "beanos.is.cool",
        globalName: "Cyan",
      },
      {
        id: "276375902382850048",
        username: "florentvd",
        globalName: null,
      },
      {
        id: "275189205297004544",
        username: "_meliodas_1998",
        globalName: "Dutch OdinPlayz - Meliodas",
      },
      {
        id: "332208238395129859",
        username: "tim8041",
        globalName: "Tim",
      },
      {
        id: "695321549770719292",
        username: "lootusg",
        globalName: "Lootus",
      },
      {
        id: "1002239445468205187",
        username: "vicejamesnl",
        globalName: "Walter White",
      },
      {
        id: "838384912243228672",
        username: "christjeee",
        globalName: "christjeee",
      },
      {
        id: "268148372399980544",
        username: "res_",
        globalName: "res_",
      },
      {
        id: "312502476542574593",
        username: "aren010",
        globalName: "Aren",
      },
      {
        id: "1068790616978358324",
        username: "venom_aa",
        globalName: "venomAA",
      },
      {
        id: "692015990535356485",
        username: "kris_lybeer",
        globalName: "Kris",
      },
      {
        id: "546069390748155924",
        username: "nithwing.",
        globalName: "Nithwing",
      },
      {
        id: "1028625816508174377",
        username: "niels043",
        globalName: "Niels043",
      },
      {
        id: "633651258095566878",
        username: "luke_05343",
        globalName: "⚡luke⚡",
      },
      {
        id: "324577208368758788",
        username: "zsuzsah",
        globalName: "Zsuzsa",
      },
      {
        id: "232592695107911680",
        username: "menco",
        globalName: "Menco",
      },
      {
        id: "1007695451081932871",
        username: "steenoven",
        globalName: "Steenoven",
      },
      {
        id: "409821239381852171",
        username: "michiemessi",
        globalName: "michiel",
      },
      {
        id: "760489876222640158",
        username: "oppiem",
        globalName: "OppieM",
      },
      {
        id: "797805700314431509",
        username: "nilscast",
        globalName: "Nils",
      },
      {
        id: "720649293412696166",
        username: ".cziko",
        globalName: "Cziko",
      },
      {
        id: "1417805495128948757",
        username: "muppet0555",
        globalName: "Muppet",
      },
      {
        id: "498768506062635008",
        username: "s5h_julian",
        globalName: "JulianB",
      },
      {
        id: "668779425814413332",
        username: "kyan6003",
        globalName: "༼TyrαeΙ༽",
      },
      {
        id: "774279563323899907",
        username: "verweggistan",
        globalName: "Stan ツ",
      },
      {
        id: "522128358948077578",
        username: "berg000",
        globalName: "Berg",
      },
      {
        id: "503130518137733141",
        username: "baksteeen",
        globalName: "General Tom",
      },
      {
        id: "868928426613035108",
        username: "x_harm_x",
        globalName: "Harm",
      },
      {
        id: "1201117339651940434",
        username: "ruuuuubje",
        globalName: "Ron",
      },
      {
        id: "688060962921775149",
        username: "banaan530",
        globalName: "Zeus",
      },
      {
        id: "682246755231858916",
        username: "justinkoops",
        globalName: "Justin de Grote",
      },
      {
        id: "758324599141695580",
        username: "pimg01",
        globalName: "PimG01",
      },
      {
        id: "600288924321185802",
        username: "jeffrey_14",
        globalName: "Jeffrey_14",
      },
      {
        id: "225300824631279616",
        username: "flyinghighnl",
        globalName: "flyinghigh",
      },
      {
        id: "1220854067308265588",
        username: "qaodufyaufasdbhf",
        globalName: "ZoZwartEnStout",
      },
      {
        id: "386178485036515328",
        username: "rijkezwerverr",
        globalName: "Rijkezwerverr",
      },
      {
        id: "627190235184365568",
        username: "arie76",
        globalName: "Arie",
      },
      {
        id: "757283350716350464",
        username: "abel0987_",
        globalName: "abel0987",
      },
      {
        id: "431472746984243230",
        username: "daan2506",
        globalName: "Daan S.",
      },
      {
        id: "1412133342186573905",
        username: "tjingtjong20",
        globalName: "Denzel",
      },
      {
        id: "1394003330476408853",
        username: "jimmyzhg.",
        globalName: "Jimmyzhg",
      },
      {
        id: "405064257407942667",
        username: "ralph_14.",
        globalName: "Ralph_14",
      },
      {
        id: "682340812603785261",
        username: "galle08009",
        globalName: "galle",
      },
      {
        id: "418699405194166272",
        username: "whoareyou_420",
        globalName: "Yordii",
      },
      {
        id: "772088472629411882",
        username: "jelle0411",
        globalName: "Jelle",
      },
      {
        id: "1329036004144844821",
        username: "ajvdv10",
        globalName: "Ajvdv10",
      },
      {
        id: "781432342295216210",
        username: "cato7723",
        globalName: "patron cato",
      },
      {
        id: "318624257456472065",
        username: ".woeboe",
        globalName: "Woeboe",
      },
      {
        id: "367376597021622273",
        username: "gewoon_mathijs",
        globalName: "Mathijs_77",
      },
      {
        id: "797540415237521499",
        username: "joel6773",
        globalName: "Joe",
      },
      {
        id: "1211633257435897888",
        username: "r09076040",
        globalName: "r0402100",
      },
      {
        id: "1329387994284556299",
        username: "dnssmit",
        globalName: "Smit",
      },
      {
        id: "356395249376952320",
        username: "kevinb90",
        globalName: "Hazard",
      },
      {
        id: "307579551226265601",
        username: "vuilnisbak_",
        globalName: "VUILNISBAK",
      },
      {
        id: "858432139343298560",
        username: "almirity",
        globalName: "almirity",
      },
      {
        id: "1252688951848865955",
        username: "1karne",
        globalName: "КАГИЕ 🥛",
      },
      {
        id: "783786424511758357",
        username: "alifoeroe79",
        globalName: "Alifoeroe79",
      },
      {
        id: "509695842123513876",
        username: "dannypeeterss",
        globalName: "DannyPeeters",
      },
      {
        id: "1178826210738982973",
        username: "baflotown",
        globalName: "Baflo Town",
      },
      {
        id: "1348739090677497886",
        username: "timtradesss",
        globalName: "BoB",
      },
      {
        id: "566269690310033408",
        username: "tripasteven",
        globalName: "TripaSteve",
      },
      {
        id: "763853320640004157",
        username: "wesje_",
        globalName: "wesje",
      },
      {
        id: "738004036418142218",
        username: "ktc76",
        globalName: "Ktc76",
      },
      {
        id: "1195850190372999329",
        username: "supacc",
        globalName: ">_<",
      },
      {
        id: "358624863524618242",
        username: "rubentje2004",
        globalName: null,
      },
      {
        id: "1392952022919282748",
        username: "moodypresident",
        globalName: "mees",
      },
      {
        id: "469722302444077056",
        username: "soer5946",
        globalName: "Tank",
      },
      {
        id: "390609648753049601",
        username: "zwekkerd",
        globalName: "zwekkerd",
      },
      {
        id: "1320431677603975200",
        username: "gezelligheidsmeneer",
        globalName: "Joris ⚡",
      },
      {
        id: "275651868020047873",
        username: "sjoerd6498",
        globalName: null,
      },
      {
        id: "690501365713207337",
        username: "kamielbossaer",
        globalName: null,
      },
      {
        id: "1333166704649310283",
        username: "fuera0553",
        globalName: "Fuera",
      },
      {
        id: "283310617895501824",
        username: "daan8461",
        globalName: "Daan",
      },
      {
        id: "309081896644640769",
        username: "chippendale8877",
        globalName: null,
      },
      {
        id: "1057676990947278868",
        username: "bi3rbassa",
        globalName: "Backinblack",
      },
      {
        id: "908787242468782110",
        username: "deleted_user_1099137441fc",
        globalName: null,
      },
      {
        id: "453940450600943618",
        username: "camp_1278",
        globalName: "Camp_",
      },
      {
        id: "1263229561341218816",
        username: "nomercy1908._40556",
        globalName: "NoMercy1908",
      },
      {
        id: "864850817479475200",
        username: "aon6",
        globalName: "alles-of-niets",
      },
      {
        id: "483196333105348609",
        username: "alexanderv.3623",
        globalName: "NickName",
      },
      {
        id: "1443250115279061032",
        username: "wolfie_.8",
        globalName: "Wolf",
      },
      {
        id: "852990161272700989",
        username: "notmejustyou",
        globalName: "NotMeJustYou",
      },
      {
        id: "397895801335971842",
        username: "latek0",
        globalName: "YYUM",
      },
      {
        id: "1135997392756408330",
        username: "jolo3d",
        globalName: "Jolo",
      },
      {
        id: "712030180079566888",
        username: "lander9968",
        globalName: "Lander.54(L.D.B.);)",
      },
      {
        id: "563181066932977665",
        username: "eli.1.8.9.9",
        globalName: "Eli",
      },
      {
        id: "1076161148149321779",
        username: "chipmunk455",
        globalName: "Chipmunk456",
      },
      {
        id: "764765220367237123",
        username: "joachim4069",
        globalName: "joachim",
      },
      {
        id: "318680508076654594",
        username: "hjc_war",
        globalName: "hjc_war",
      },
      {
        id: "631180430426636308",
        username: "bertoldvds",
        globalName: "Bertoldvds",
      },
      {
        id: "714785802839654440",
        username: "clashbaasjesse",
        globalName: "ClashBaasJesse",
      },
      {
        id: "1314769240305303583",
        username: "jessey0386",
        globalName: "Jessey",
      },
      {
        id: "1487174715364741181",
        username: "nietbeschikbaa",
        globalName: ".",
      },
      {
        id: "789033582298529813",
        username: "dyon0336",
        globalName: "Dyon",
      },
      {
        id: "493517231360311317",
        username: "v1nst3rrr",
        globalName: "V1nst3rrr",
      },
      {
        id: "1354923429916184656",
        username: "paulcoc040",
        globalName: "Paul",
      },
      {
        id: "595753511988232202",
        username: "jimbopient",
        globalName: "jimpient",
      },
      {
        id: "533682190324858880",
        username: "deserrif",
        globalName: "deserrif",
      },
      {
        id: "1355649579135008810",
        username: "luc07589",
        globalName: "Luc",
      },
      {
        id: "723206489275367454",
        username: "jesse.ehv",
        globalName: "Jesse",
      },
      {
        id: "1114294926914633748",
        username: "dikke7051",
        globalName: "dikke",
      },
      {
        id: "346345913083625472",
        username: "blue04930",
        globalName: "blue",
      },
      {
        id: "471421502852694022",
        username: "mark2207.",
        globalName: "mark2207",
      },
      {
        id: "474966056025194496",
        username: "thomass20_",
        globalName: "Thomas_trd",
      },
      {
        id: "115524331269914626",
        username: "racocon",
        globalName: "Thomas",
      },
      {
        id: "1483545519715520653",
        username: "cappi0996",
        globalName: "Cappi",
      },
      {
        id: "1086749352971739176",
        username: "maximb5557",
        globalName: "maximb",
      },
      {
        id: "177507557915492353",
        username: "yogibear.2",
        globalName: null,
      },
      {
        id: "1322239396820287630",
        username: "dilonstaal_01807",
        globalName: "DilonStaal",
      },
      {
        id: "1326640048103358477",
        username: "aminreda1",
        globalName: "AminReda",
      },
      {
        id: "1353063602814324838",
        username: "344576_",
        globalName: "SilverFox",
      },
      {
        id: "1304366043606814723",
        username: "wessel0403",
        globalName: null,
      },
      {
        id: "826020637537206293",
        username: "lasergopewpee",
        globalName: "lasergopewpee",
      },
      {
        id: "1141307667453849610",
        username: "maxx29_",
        globalName: "Max",
      },
      {
        id: "563675882200367104",
        username: "manildz",
        globalName: "Algerino🇩🇿",
      },
      {
        id: "573160070548946959",
        username: "spookieb",
        globalName: "spookieB",
      },
      {
        id: "672496717383335948",
        username: "rikkert1001",
        globalName: "Rikkert",
      },
      {
        id: "1008431081021771848",
        username: "grapplings",
        globalName: "Grapplings",
      },
      {
        id: "1085212862844248196",
        username: "accur4cy",
        globalName: "ACCUR4CY",
      },
      {
        id: "979080531574673408",
        username: "jorickblom",
        globalName: "Jorick Blom",
      },
      {
        id: "665155514208092170",
        username: "jordi7891",
        globalName: "jordi",
      },
      {
        id: "393339113706881026",
        username: "bas638",
        globalName: "Bas",
      },
      {
        id: "178245134515830784",
        username: "botpain",
        globalName: "Bot Pain",
      },
      {
        id: "691618338215952405",
        username: "d0rus",
        globalName: "Barbaarkoning",
      },
      {
        id: "328101333938733058",
        username: "big_oekka",
        globalName: null,
      },
      {
        id: "806123229407084554",
        username: "jownasdb",
        globalName: "JDBot",
      },
      {
        id: "404330827993055243",
        username: "nico123_9",
        globalName: "Nico.",
      },
      {
        id: "1210223659340275784",
        username: "whiteking2907",
        globalName: "WhiteKing2907",
      },
      {
        id: "1333147713944027248",
        username: "spijkeneess",
        globalName: "Spijkenees",
      },
      {
        id: "1380280404912635985",
        username: "ruben_a4o",
        globalName: "Ruben | A4O",
      },
      {
        id: "764466250285187133",
        username: "clanvenger",
        globalName: "Clanvenger",
      },
      {
        id: "332940202127523841",
        username: "_skaulgildrith_",
        globalName: "Htanerb",
      },
      {
        id: "748660989855006902",
        username: "jd2112tm",
        globalName: "JD 2112™",
      },
      {
        id: "419492126494031874",
        username: "gamermbv",
        globalName: "Bryce",
      },
      {
        id: "1245172433221324946",
        username: "hema.aambeienzalf",
        globalName: "Rens-3103",
      },
      {
        id: "687938633327837185",
        username: "danimaas_",
        globalName: "DaniMaas",
      },
      {
        id: "283569680243752961",
        username: "buxbuny",
        globalName: "ImTim",
      },
      {
        id: "1147512030924910682",
        username: "sitie_absomini",
        globalName: "Sitie",
      },
      {
        id: "194536635730362368",
        username: "stolly",
        globalName: "Stolly",
      },
      {
        id: "812327986363367475",
        username: "charmingrax",
        globalName: "Charmingrax",
      },
      {
        id: "558684768447758348",
        username: "jesperr_cl",
        globalName: "Jc",
      },
      {
        id: "432986005294022656",
        username: "monqlais",
        globalName: "Monqlais",
      },
      {
        id: "298121409245478913",
        username: "gast023",
        globalName: "Thijsa",
      },
      {
        id: "583261686681829376",
        username: "hendrikus_2004",
        globalName: "Sem",
      },
      {
        id: "445643386284933120",
        username: ".rick070",
        globalName: "rick070",
      },
      {
        id: "1377104182691237888",
        username: "ordinary112",
        globalName: "Ordinary",
      },
      {
        id: "659787324577546240",
        username: "brent.wizi",
        globalName: "Brent",
      },
      {
        id: "837425338295910420",
        username: "notorious221",
        globalName: "Notorious221",
      },
      {
        id: "1313294168461803540",
        username: "3starssy",
        globalName: "3starry",
      },
      {
        id: "1338631087999684668",
        username: "claudio095586",
        globalName: "Claudio",
      },
      {
        id: "1264203904766181439",
        username: "zurearie",
        globalName: "Zure Arie",
      },
      {
        id: "845040554986831905",
        username: "rikkertt_",
        globalName: null,
      },
      {
        id: "1295845835518640130",
        username: "iampolarbear.",
        globalName: "PolarBear",
      },
      {
        id: "316310821993054210",
        username: "joppe2817",
        globalName: "Joppe",
      },
      {
        id: "553301098988044289",
        username: "maximie",
        globalName: "Maximie",
      },
      {
        id: "577104514293956618",
        username: "bjorn.93",
        globalName: "bjorn",
      },
      {
        id: "845989456854384670",
        username: "lennart04a",
        globalName: "Lennart",
      },
      {
        id: "882322021353140244",
        username: "the.kaidius",
        globalName: null,
      },
      {
        id: "380405624913264640",
        username: "niels_18_",
        globalName: "雷 | Niels ⚡",
      },
      {
        id: "971033744511234058",
        username: "tiempieboy2511",
        globalName: "Tiempieboy",
      },
      {
        id: "415535477702131712",
        username: "dw5713",
        globalName: "dw5713",
      },
      {
        id: "1329564090229850215",
        username: "jmpieroelie.",
        globalName: "Ace",
      },
      {
        id: "801180514768912444",
        username: "lucas5ie",
        globalName: null,
      },
      {
        id: "1275003510618062938",
        username: "stanko1230478",
        globalName: "Stanko123",
      },
      {
        id: "1354878485180449114",
        username: "jemoeder728",
        globalName: "Free markie",
      },
      {
        id: "736524883512655923",
        username: "goeasysir",
        globalName: "GoEasySir",
      },
      {
        id: "307892860567552001",
        username: "enouqh",
        globalName: "smurtie",
      },
      {
        id: "1283079105251643464",
        username: "ekw78",
        globalName: "EKW",
      },
      {
        id: "487587013218795530",
        username: "bas_b_",
        globalName: "Bas",
      },
      {
        id: "709093604647501915",
        username: "shadowblade1081",
        globalName: "MrNoob",
      },
      {
        id: "522593664850067470",
        username: "displayresolutions",
        globalName: "DisplayResolutions",
      },
      {
        id: "1324512471398219786",
        username: "mayonaise0575",
        globalName: "Mayonaise",
      },
      {
        id: "805877035951456297",
        username: "rietje",
        globalName: "Rietje",
      },
      {
        id: "225596107726651392",
        username: "koen1998",
        globalName: "Koen",
      },
      {
        id: "1327542006649716747",
        username: "venividivincie_42089",
        globalName: "Venividivincie",
      },
      {
        id: "1119153720769400843",
        username: "t.vds2000",
        globalName: "THOM",
      },
      {
        id: "1473650637978992681",
        username: "thomdw",
        globalName: "Thomdw",
      },
      {
        id: "442695362734587905",
        username: "pauwkes",
        globalName: "Pauwkes",
      },
      {
        id: "225964530855837696",
        username: "maarten2.0",
        globalName: "Maarten",
      },
      {
        id: "486459558982713344",
        username: "blubje04",
        globalName: "Bram",
      },
      {
        id: "337007805670359041",
        username: "bas4140",
        globalName: "Bas",
      },
      {
        id: "1354795651808100507",
        username: "olaftklooster",
        globalName: "Olaf",
      },
      {
        id: "979046930527170640",
        username: "killer.70",
        globalName: "Killer",
      },
      {
        id: "1545509105257553941",
        username: "tristank18.",
        globalName: "TristanK18",
      },
      {
        id: "584854361398706176",
        username: "3atmyon1sh0t",
        globalName: "BlazeTheHaze",
      },
      {
        id: "682198858968596484",
        username: "vietjan.",
        globalName: "vietjan",
      },
      {
        id: "1204863911006965825",
        username: "crazyjay187.",
        globalName: "CrazyJay187",
      },
      {
        id: "210784650333782016",
        username: "moto_moto3700",
        globalName: "Moto Moto",
      },
      {
        id: "628672199066255370",
        username: "achilles789",
        globalName: "bicep",
      },
      {
        id: "439449391670099969",
        username: "jonas.tuy",
        globalName: "𝐉𝐨𝐧𝐚𝐬",
      },
      {
        id: "508385130671374346",
        username: "sbc1862",
        globalName: "sBC",
      },
      {
        id: "931542086786895912",
        username: "thimo.s01",
        globalName: "Tstr_01",
      },
      {
        id: "605100737281785860",
        username: "bart048229",
        globalName: "Bart",
      },
      {
        id: "241627622445023233",
        username: "sanderr3016",
        globalName: "Sander",
      },
      {
        id: "654718605467844618",
        username: "th1js600",
        globalName: "th1js600",
      },
      {
        id: "141189008272261120",
        username: "jomme0412",
        globalName: "Jomme0412",
      },
      {
        id: "346007523968548864",
        username: "_sander04_",
        globalName: null,
      },
      {
        id: "477551833301123072",
        username: "jotti3738",
        globalName: "Jotti",
      },
      {
        id: "382910125637369877",
        username: "minigrotefrank",
        globalName: "MiniGrote Frank",
      },
      {
        id: "1242816291413168261",
        username: "dl_timvdb",
        globalName: "DL_Timvdb",
      },
      {
        id: "402414582850912256",
        username: "lwest04",
        globalName: "lwest04",
      },
      {
        id: "1166337400725852252",
        username: "svengus.",
        globalName: "Svengus",
      },
      {
        id: "294942490170228736",
        username: "kjell14",
        globalName: "kjell14",
      },
      {
        id: "249187917140852736",
        username: "fcresham",
        globalName: "Resham",
      },
      {
        id: "402897012451966976",
        username: "erkel2000",
        globalName: "erkel2000",
      },
      {
        id: "563824425196060717",
        username: "47eu",
        globalName: "Paradise",
      },
      {
        id: "1286641057853083662",
        username: "laurens37",
        globalName: "Laurens",
      },
      {
        id: "322371070495817728",
        username: "sicko0728",
        globalName: "sicko",
      },
      {
        id: "1348995162453311499",
        username: "_fake_account_1",
        globalName: "Steven",
      },
      {
        id: "522463098238533657",
        username: "asamcool",
        globalName: "Asamcool",
      },
      {
        id: "257141846747250689",
        username: "themelonassassin",
        globalName: "TheMelonAssassin",
      },
      {
        id: "647112241363025940",
        username: ".rubennn.",
        globalName: "Rυben",
      },
      {
        id: "1322226464204263455",
        username: "thomasz_.",
        globalName: "Thomasz_",
      },
      {
        id: "697398266693812274",
        username: "skull4232",
        globalName: "Skull",
      },
      {
        id: "383350122592993281",
        username: "geerard5536",
        globalName: "Geerard",
      },
      {
        id: "235455501960216576",
        username: "youri3685",
        globalName: "noonoo",
      },
      {
        id: "1330573280280842392",
        username: "habby0051",
        globalName: "Habby",
      },
      {
        id: "351595023760097281",
        username: "prefixer1337",
        globalName: "PrefixeR",
      },
      {
        id: "969502400580812830",
        username: "motomotomoto007",
        globalName: "Voldemort",
      },
      {
        id: "764759977859743745",
        username: "chiljonkuiperij",
        globalName: "chiljon kuiperij",
      },
      {
        id: "556561964654919701",
        username: "ts_skull",
        globalName: "Skull",
      },
      {
        id: "541723070834933773",
        username: "jorritk18",
        globalName: "Jorrit",
      },
      {
        id: "216612164788551690",
        username: "samv50",
        globalName: "Sam",
      },
      {
        id: "1306916359929856040",
        username: "shadie6320",
        globalName: "Shadie",
      },
      {
        id: "373103482925875200",
        username: "bigdickrick3017",
        globalName: "Rick",
      },
      {
        id: "221342966428467200",
        username: "jelloniee",
        globalName: "Jellonie",
      },
      {
        id: "621336872328626247",
        username: "roeboenknoenoe",
        globalName: "RoeboenKnoenoe",
      },
      {
        id: "1283126109172531342",
        username: "mr.gunz1",
        globalName: "Gunz",
      },
    ])
    .execute()
}
