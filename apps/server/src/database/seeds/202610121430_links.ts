import { Kysely } from "kysely"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const seed = async (db: Kysely<any>) => {
  await db
    .insertInto("link")
    .values([
      {
        isPrimary: false,
        memberId: "432986005294022656",
        playerTag: "#YCG9GQGQ",
      },
      {
        isPrimary: false,
        memberId: "1242816291413168261",
        playerTag: "#2YV2VGLU",
      },
      {
        isPrimary: false,
        memberId: "723206489275367454",
        playerTag: "#8UY0RYQP",
      },
      {
        isPrimary: false,
        memberId: "522128358948077578",
        playerTag: "#PGUGUPL2",
      },
      {
        isPrimary: false,
        memberId: "257141846747250689",
        playerTag: "#L00PRVC",
      },
      {
        isPrimary: false,
        memberId: "772088472629411882",
        playerTag: "#LPL2QRL92",
      },
      {
        isPrimary: false,
        memberId: "760489876222640158",
        playerTag: "#2PVRPVVQQ",
      },
      {
        isPrimary: false,
        memberId: "1327542006649716747",
        playerTag: "#2QGJVUJU",
      },
      {
        isPrimary: false,
        memberId: "845040554986831905",
        playerTag: "#UVUVJJV8",
      },
      {
        isPrimary: false,
        memberId: "257141846747250689",
        playerTag: "#9UQGJYLCV",
      },
      {
        isPrimary: false,
        memberId: "1007695451081932871",
        playerTag: "#PUVUV80P",
      },
      {
        isPrimary: false,
        memberId: "1326640048103358477",
        playerTag: "#LYG0RU8V",
      },
      {
        isPrimary: false,
        memberId: "654718605467844618",
        playerTag: "#80JQR8Q9U",
      },
      {
        isPrimary: false,
        memberId: "312502476542574593",
        playerTag: "#8099PG8PR",
      },
      {
        isPrimary: false,
        memberId: "858432139343298560",
        playerTag: "#2VVPCQLJ",
      },
      {
        isPrimary: false,
        memberId: "605100737281785860",
        playerTag: "#8GGPRPQ",
      },
      {
        isPrimary: false,
        memberId: "621336872328626247",
        playerTag: "#JG02RC2G",
      },
      {
        isPrimary: false,
        memberId: "760489876222640158",
        playerTag: "#R028VRC",
      },
      {
        isPrimary: false,
        memberId: "801180514768912444",
        playerTag: "#YVRRUGCJV",
      },
      {
        isPrimary: false,
        memberId: "337007805670359041",
        playerTag: "#8992RLR8",
      },
      {
        isPrimary: false,
        memberId: "654718605467844618",
        playerTag: "#J8QP80L",
      },
      {
        isPrimary: false,
        memberId: "709093604647501915",
        playerTag: "#YQVPP0YL",
      },
      {
        isPrimary: false,
        memberId: "522128358948077578",
        playerTag: "#JYVPCVYP",
      },
      {
        isPrimary: false,
        memberId: "665155514208092170",
        playerTag: "#8QY8Y9P2Q",
      },
      {
        isPrimary: false,
        memberId: "1086749352971739176",
        playerTag: "#8G2RUJ8JQ",
      },
      {
        isPrimary: false,
        memberId: "508385130671374346",
        playerTag: "#22QY82CR",
      },
      {
        isPrimary: false,
        memberId: "979080531574673408",
        playerTag: "#R0VQRJCR",
      },
      {
        isPrimary: false,
        memberId: "390609648753049601",
        playerTag: "#L8YR09YL",
      },
      {
        isPrimary: false,
        memberId: "783786424511758357",
        playerTag: "#QRRVJRJG",
      },
      {
        isPrimary: false,
        memberId: "692015990535356485",
        playerTag: "#C89V9L98",
      },
      {
        isPrimary: false,
        memberId: "322371070495817728",
        playerTag: "#9PJ0PR002",
      },
      {
        isPrimary: false,
        memberId: "383350122592993281",
        playerTag: "#2LLVVY9GP",
      },
      {
        isPrimary: false,
        memberId: "257141846747250689",
        playerTag: "#YVCLRY98U",
      },
      {
        isPrimary: false,
        memberId: "257141846747250689",
        playerTag: "#PVPV2U0JG",
      },
      {
        isPrimary: false,
        memberId: "210784650333782016",
        playerTag: "#C008CYCV",
      },
      {
        isPrimary: false,
        memberId: "177507557915492353",
        playerTag: "#829ULL80V",
      },
      {
        isPrimary: false,
        memberId: "249187917140852736",
        playerTag: "#RCCVRJPR",
      },
      {
        isPrimary: false,
        memberId: "210784650333782016",
        playerTag: "#8VLCYPRLY",
      },
      {
        isPrimary: false,
        memberId: "210784650333782016",
        playerTag: "#L88YLG00L",
      },
      {
        isPrimary: false,
        memberId: "772088472629411882",
        playerTag: "#PCY02UUU9",
      },
      {
        isPrimary: false,
        memberId: "654718605467844618",
        playerTag: "#2LQYRYURC",
      },
      {
        isPrimary: false,
        memberId: "1263229561341218816",
        playerTag: "#9LY22L9LG",
      },
      {
        isPrimary: false,
        memberId: "522128358948077578",
        playerTag: "#8U8P2RVG",
      },
      {
        isPrimary: false,
        memberId: "654718605467844618",
        playerTag: "#YCYCGQ8JR",
      },
      {
        isPrimary: false,
        memberId: "772088472629411882",
        playerTag: "#9RC2PCQC",
      },
      {
        isPrimary: false,
        memberId: "783786424511758357",
        playerTag: "#CYPYGGU9",
      },
      {
        isPrimary: false,
        memberId: "654718605467844618",
        playerTag: "#YU9G90YJQ",
      },
      {
        isPrimary: false,
        memberId: "654718605467844618",
        playerTag: "#LYY0R890C",
      },
      {
        isPrimary: false,
        memberId: "605100737281785860",
        playerTag: "#8JYPJ89G",
      },
      {
        isPrimary: false,
        memberId: "257141846747250689",
        playerTag: "#ULP0Y98C",
      },
      {
        isPrimary: false,
        memberId: "1091548577630785556",
        playerTag: "#2RPG08V8G",
      },
      {
        isPrimary: false,
        memberId: "1327542006649716747",
        playerTag: "#PGCPV0LJ2",
      },
      {
        isPrimary: false,
        memberId: "324577208368758788",
        playerTag: "#R99JRU08",
      },
      {
        isPrimary: false,
        memberId: "783786424511758357",
        playerTag: "#2PPRUGQYC",
      },
      {
        isPrimary: false,
        memberId: "249187917140852736",
        playerTag: "#2LJUGP9QL",
      },
      {
        isPrimary: false,
        memberId: "257141846747250689",
        playerTag: "#G2V990J",
      },
      {
        isPrimary: false,
        memberId: "1007695451081932871",
        playerTag: "#YCPPRUV0J",
      },
      {
        isPrimary: true,
        memberId: "257141846747250689",
        playerTag: "#8RRG0LJR2",
      },
      {
        isPrimary: false,
        memberId: "764765220367237123",
        playerTag: "#2J22G0CPQ",
      },
      {
        isPrimary: false,
        memberId: "225964530855837696",
        playerTag: "#CY9CGJJR",
      },
      {
        isPrimary: false,
        memberId: "322371070495817728",
        playerTag: "#28YL2G9QR",
      },
      {
        isPrimary: false,
        memberId: "633651258095566878",
        playerTag: "#9G8RPVJ0",
      },
      {
        isPrimary: false,
        memberId: "1329564090229850215",
        playerTag: "#2YV290GLL",
      },
      {
        isPrimary: false,
        memberId: "633651258095566878",
        playerTag: "#9PLPG2LLG",
      },
      {
        isPrimary: false,
        memberId: "1333166704649310283",
        playerTag: "#YR8PGQYQ",
      },
      {
        isPrimary: false,
        memberId: "1210223659340275784",
        playerTag: "#YLJRJRJ88",
      },
      {
        isPrimary: false,
        memberId: "445643386284933120",
        playerTag: "#9V2LGPQR0",
      },
      {
        isPrimary: false,
        memberId: "232592695107911680",
        playerTag: "#Q2VGJYLJ",
      },
      {
        isPrimary: false,
        memberId: "386178485036515328",
        playerTag: "#9L92CUU8J",
      },
      {
        isPrimary: false,
        memberId: "322371070495817728",
        playerTag: "#9PVGGR08P",
      },
      {
        isPrimary: false,
        memberId: "633651258095566878",
        playerTag: "#CPQCPQV0",
      },
      {
        isPrimary: false,
        memberId: "837425338295910420",
        playerTag: "#9LRYUU2C",
      },
      {
        isPrimary: false,
        memberId: "633651258095566878",
        playerTag: "#LUQJG0U8",
      },
      {
        isPrimary: false,
        memberId: "633651258095566878",
        playerTag: "#8RUUJCQGY",
      },
      {
        isPrimary: false,
        memberId: "1329036004144844821",
        playerTag: "#PGJURLPPJ",
      },
      {
        isPrimary: false,
        memberId: "1353063602814324838",
        playerTag: "#CQLQ0P28",
      },
      {
        isPrimary: false,
        memberId: "337007805670359041",
        playerTag: "#8YLJGJ8P0",
      },
      {
        isPrimary: false,
        memberId: "760489876222640158",
        playerTag: "#G28Y0ULJC",
      },
      {
        isPrimary: false,
        memberId: "633651258095566878",
        playerTag: "#G0V88VRUU",
      },
      {
        isPrimary: false,
        memberId: "723206489275367454",
        playerTag: "#G0CLY8VG9",
      },
      {
        isPrimary: false,
        memberId: "633651258095566878",
        playerTag: "#Q899PLRQV",
      },
      {
        isPrimary: false,
        memberId: "522128358948077578",
        playerTag: "#YC0000L9R",
      },
      {
        isPrimary: false,
        memberId: "654718605467844618",
        playerTag: "#G8CUC8GJG",
      },
      {
        isPrimary: false,
        memberId: "772088472629411882",
        playerTag: "#Q0QUGJLJR",
      },
      {
        isPrimary: false,
        memberId: "257141846747250689",
        playerTag: "#G2P0LP0LL",
      },
      {
        isPrimary: false,
        memberId: "522128358948077578",
        playerTag: "#PCPPPCPV",
      },
      {
        isPrimary: false,
        memberId: "318680508076654594",
        playerTag: "#8GPRGURLV",
      },
      {
        isPrimary: false,
        memberId: "471421502852694022",
        playerTag: "#Y2CVYJJQ",
      },
      {
        isPrimary: false,
        memberId: "445643386284933120",
        playerTag: "#UVYRLJ0J",
      },
      {
        isPrimary: false,
        memberId: "1135997392756408330",
        playerTag: "#QP2U2YUVL",
      },
      {
        isPrimary: false,
        memberId: "1333147713944027248",
        playerTag: "#LGVCYCLQ9",
      },
      {
        isPrimary: false,
        memberId: "633651258095566878",
        playerTag: "#L98UGCU8Y",
      },
      {
        isPrimary: false,
        memberId: "445643386284933120",
        playerTag: "#280QRV2P0",
      },
      {
        isPrimary: false,
        memberId: "1008431081021771848",
        playerTag: "#PJGQUP2UY",
      },
      {
        isPrimary: false,
        memberId: "772088472629411882",
        playerTag: "#89PYRVYQC",
      },
      {
        isPrimary: false,
        memberId: "738004036418142218",
        playerTag: "#2P8YUVVPP",
      },
      {
        isPrimary: false,
        memberId: "1348995162453311499",
        playerTag: "#QUV88J9GJ",
      },
      {
        isPrimary: false,
        memberId: "498768506062635008",
        playerTag: "#2GYGQ829",
      },
      {
        isPrimary: false,
        memberId: "309081896644640769",
        playerTag: "#YJCG28CR",
      },
      {
        isPrimary: false,
        memberId: "1443250115279061032",
        playerTag: "#UQJ89800",
      },
      {
        isPrimary: false,
        memberId: "682340812603785261",
        playerTag: "#LPLPRPJ0V",
      },
      {
        isPrimary: false,
        memberId: "1354923429916184656",
        playerTag: "#RYYQGY8C",
      },
      {
        isPrimary: false,
        memberId: "837425338295910420",
        playerTag: "#YG22L0L88",
      },
      {
        isPrimary: false,
        memberId: "801180514768912444",
        playerTag: "#GJ8Y8Y9L2",
      },
      {
        isPrimary: false,
        memberId: "498768506062635008",
        playerTag: "#8GQ929C",
      },
      {
        isPrimary: false,
        memberId: "1283126109172531342",
        playerTag: "#QVPYGYR8C",
      },
      {
        isPrimary: false,
        memberId: "1283126109172531342",
        playerTag: "#GL0QGCC9U",
      },
      {
        isPrimary: false,
        memberId: "1355649579135008810",
        playerTag: "#VQQYLYLC",
      },
      {
        isPrimary: false,
        memberId: "1354878485180449114",
        playerTag: "#YJCPY2QUC",
      },
      {
        isPrimary: false,
        memberId: "557632389598150695",
        playerTag: "#GPRCULG9U",
      },
      {
        isPrimary: false,
        memberId: "1275003510618062938",
        playerTag: "#LR8V0UYQU",
      },
      {
        isPrimary: false,
        memberId: "221342966428467200",
        playerTag: "#G9RU0292G",
      },
      {
        isPrimary: false,
        memberId: "1545509105257553941",
        playerTag: "#J92L20R8",
      },
      {
        isPrimary: false,
        memberId: "346345913083625472",
        playerTag: "#29QVYRCY9",
      },
      {
        isPrimary: false,
        memberId: "483196333105348609",
        playerTag: "#28V8Q2V8P",
      },
      {
        isPrimary: false,
        memberId: "346345913083625472",
        playerTag: "#2GJG8JYJV",
      },
      {
        isPrimary: false,
        memberId: "225964530855837696",
        playerTag: "#PCJQYUQV9",
      },
      {
        isPrimary: false,
        memberId: "631180430426636308",
        playerTag: "#U8QG9L8R",
      },
      {
        isPrimary: false,
        memberId: "1329387994284556299",
        playerTag: "#VPCU9V8C",
      },
      {
        isPrimary: false,
        memberId: "1354795651808100507",
        playerTag: "#8P2QC0G2J",
      },
      {
        isPrimary: false,
        memberId: "445643386284933120",
        playerTag: "#JQPRQJRR",
      },
      {
        isPrimary: false,
        memberId: "322371070495817728",
        playerTag: "#P8Q0G9L0",
      },
      {
        isPrimary: false,
        memberId: "837425338295910420",
        playerTag: "#889JGL9JR",
      },
      {
        isPrimary: false,
        memberId: "483196333105348609",
        playerTag: "#8LU98YR82",
      },
      {
        isPrimary: false,
        memberId: "672496717383335948",
        playerTag: "#9R8C8PCPG",
      },
      {
        isPrimary: false,
        memberId: "442695362734587905",
        playerTag: "#CVQYP8QR",
      },
      {
        isPrimary: false,
        memberId: "1286641057853083662",
        playerTag: "#9VLYC2LVG",
      },
      {
        isPrimary: false,
        memberId: "1008431081021771848",
        playerTag: "#9800RV2RY",
      },
      {
        isPrimary: false,
        memberId: "442695362734587905",
        playerTag: "#9LY8GG8J8",
      },
      {
        isPrimary: false,
        memberId: "445643386284933120",
        playerTag: "#9Y20UQQL",
      },
      {
        isPrimary: false,
        memberId: "268148372399980544",
        playerTag: "#R28LQJG8",
      },
      {
        isPrimary: false,
        memberId: "328101333938733058",
        playerTag: "#GQU29808",
      },
      {
        isPrimary: false,
        memberId: "738004036418142218",
        playerTag: "#2VYRJ82VJ",
      },
      {
        isPrimary: false,
        memberId: "328101333938733058",
        playerTag: "#VL0LG82",
      },
      {
        isPrimary: false,
        memberId: "772088472629411882",
        playerTag: "#2PPCVLR2",
      },
      {
        isPrimary: false,
        memberId: "257141846747250689",
        playerTag: "#8UQ9LGYQ",
      },
      {
        isPrimary: false,
        memberId: "1443250115279061032",
        playerTag: "#2RR9CR8YP",
      },
      {
        isPrimary: false,
        memberId: "1348995162453311499",
        playerTag: "#GPLQ2099P",
      },
      {
        isPrimary: false,
        memberId: "772088472629411882",
        playerTag: "#89GRGL02P",
      },
      {
        isPrimary: false,
        memberId: "1283079105251643464",
        playerTag: "#Q82JLLJ09",
      },
      {
        isPrimary: false,
        memberId: "1283079105251643464",
        playerTag: "#9U0CC8YC0",
      },
      {
        isPrimary: false,
        memberId: "812327986363367475",
        playerTag: "#G29JJRGY",
      },
      {
        isPrimary: false,
        memberId: "358624863524618242",
        playerTag: "#98GRJJCL",
      },
      {
        isPrimary: false,
        memberId: "1392952022919282748",
        playerTag: "#PR89GCRYL",
      },
      {
        isPrimary: false,
        memberId: "210784650333782016",
        playerTag: "#UYGYRLQR",
      },
      {
        isPrimary: false,
        memberId: "318680508076654594",
        playerTag: "#LVG8YV2QQ",
      },
      {
        isPrimary: false,
        memberId: "210784650333782016",
        playerTag: "#9JPY9R0PP",
      },
      {
        isPrimary: false,
        memberId: "1348995162453311499",
        playerTag: "#GLP829G2Y",
      },
      {
        isPrimary: false,
        memberId: "210784650333782016",
        playerTag: "#QC0VQCP09",
      },
      {
        isPrimary: false,
        memberId: "445643386284933120",
        playerTag: "#PCC00RLVR",
      },
      {
        isPrimary: false,
        memberId: "725673039135637525",
        playerTag: "#L9UGC98GU",
      },
      {
        isPrimary: false,
        memberId: "275651868020047873",
        playerTag: "#LPU2JG28Q",
      },
      {
        isPrimary: false,
        memberId: "725673039135637525",
        playerTag: "#LPGY28CVG",
      },
      {
        isPrimary: false,
        memberId: "541723070834933773",
        playerTag: "#C8UURJV8",
      },
      {
        isPrimary: false,
        memberId: "1195850190372999329",
        playerTag: "#Y2Y9QCC8R",
      },
      {
        isPrimary: false,
        memberId: "1545509105257553941",
        playerTag: "#L98P0UP2L",
      },
      {
        isPrimary: false,
        memberId: "600288924321185802",
        playerTag: "#CJR9G0LU",
      },
      {
        isPrimary: false,
        memberId: "1412133342186573905",
        playerTag: "#LYQL9P0U",
      },
      {
        isPrimary: false,
        memberId: "318624257456472065",
        playerTag: "#PYG0J08LC",
      },
      {
        isPrimary: false,
        memberId: "522463098238533657",
        playerTag: "#28CUVG9U",
      },
      {
        isPrimary: false,
        memberId: "404330827993055243",
        playerTag: "#RPLC9GYC",
      },
      {
        isPrimary: false,
        memberId: "129405643034460160",
        playerTag: "#2V8C8GY2",
      },
      {
        isPrimary: false,
        memberId: "763853320640004157",
        playerTag: "#PVGQYPUU",
      },
      {
        isPrimary: false,
        memberId: "404330827993055243",
        playerTag: "#2Q2RPP0J8",
      },
      {
        isPrimary: false,
        memberId: "232592695107911680",
        playerTag: "#YQCYU0PU",
      },
      {
        isPrimary: false,
        memberId: "757283350716350464",
        playerTag: "#2VQLR09UG",
      },
      {
        isPrimary: false,
        memberId: "1201117339651940434",
        playerTag: "#PU82LPGGP",
      },
      {
        isPrimary: false,
        memberId: "318624257456472065",
        playerTag: "#Q8J2YQJUQ",
      },
      {
        isPrimary: false,
        memberId: "556561964654919701",
        playerTag: "#PVG8VPQR",
      },
      {
        isPrimary: false,
        memberId: "318680508076654594",
        playerTag: "#P9J2GJ0CP",
      },
      {
        isPrimary: false,
        memberId: "318680508076654594",
        playerTag: "#PU898RULJ",
      },
      {
        isPrimary: false,
        memberId: "541723070834933773",
        playerTag: "#L8922UPCU",
      },
      {
        isPrimary: false,
        memberId: "373103482925875200",
        playerTag: "#L0CJ0Y29C",
      },
      {
        isPrimary: false,
        memberId: "252397492023459840",
        playerTag: "#8YVYQCUGR",
      },
      {
        isPrimary: false,
        memberId: "380405624913264640",
        playerTag: "#PGYQ2Q88Q",
      },
      {
        isPrimary: false,
        memberId: "971033744511234058",
        playerTag: "#V2Y09LYL",
      },
      {
        isPrimary: false,
        memberId: "868928426613035108",
        playerTag: "#L9RJR92Y2",
      },
      {
        isPrimary: false,
        memberId: "931542086786895912",
        playerTag: "#PVJUVY2L",
      },
      {
        isPrimary: false,
        memberId: "690501365713207337",
        playerTag: "#PJQYJL2Y2",
      },
      {
        isPrimary: false,
        memberId: "373103482925875200",
        playerTag: "#V9Q0Y8C2",
      },
      {
        isPrimary: false,
        memberId: "318624257456472065",
        playerTag: "#YVLC8GRCG",
      },
      {
        isPrimary: false,
        memberId: "318624257456472065",
        playerTag: "#LQU2LQC0U",
      },
      {
        isPrimary: false,
        memberId: "553301098988044289",
        playerTag: "#8PGYC8J80",
      },
      {
        isPrimary: false,
        memberId: "1119153720769400843",
        playerTag: "#9P82CY9LL",
      },
      {
        isPrimary: false,
        memberId: "439449391670099969",
        playerTag: "#28UQ89JP",
      },
      {
        isPrimary: false,
        memberId: "373103482925875200",
        playerTag: "#LQG9QLC",
      },
      {
        isPrimary: false,
        memberId: "805877035951456297",
        playerTag: "#U0RLJ89L",
      },
      {
        isPrimary: false,
        memberId: "558702077677928449",
        playerTag: "#88UC2PRV",
      },
      {
        isPrimary: false,
        memberId: "1252688951848865955",
        playerTag: "#P9CJUQU29",
      },
      {
        isPrimary: false,
        memberId: "409821239381852171",
        playerTag: "#2PLGUJ8P0",
      },
      {
        isPrimary: false,
        memberId: "774279563323899907",
        playerTag: "#P98Q9JPG",
      },
      {
        isPrimary: false,
        memberId: "1252688951848865955",
        playerTag: "#QV2UVQCRR",
      },
      {
        isPrimary: false,
        memberId: "402897012451966976",
        playerTag: "#J9VV89QV",
      },
      {
        isPrimary: false,
        memberId: "115524331269914626",
        playerTag: "#VGL29Q0",
      },
      {
        isPrimary: false,
        memberId: "351595023760097281",
        playerTag: "#VJ9UPPVL",
      },
      {
        isPrimary: false,
        memberId: "1002239445468205187",
        playerTag: "#QVJUVC8P",
      },
      {
        isPrimary: false,
        memberId: "409821239381852171",
        playerTag: "#QQRU2RU80",
      },
      {
        isPrimary: false,
        memberId: "781432342295216210",
        playerTag: "#J88PCGR0",
      },
      {
        isPrimary: false,
        memberId: "774279563323899907",
        playerTag: "#UQL8CCJ0",
      },
      {
        isPrimary: false,
        memberId: "367376597021622273",
        playerTag: "#JY20JJPL",
      },
      {
        isPrimary: false,
        memberId: "533682190324858880",
        playerTag: "#9VYLL0PR",
      },
      {
        isPrimary: false,
        memberId: "712030180079566888",
        playerTag: "#9PQYQ8YYQ",
      },
      {
        isPrimary: false,
        memberId: "566269690310033408",
        playerTag: "#YJQ2J0CJ",
      },
      {
        isPrimary: false,
        memberId: "566269690310033408",
        playerTag: "#99VRRGJ8",
      },
      {
        isPrimary: false,
        memberId: "566269690310033408",
        playerTag: "#99CGCY9LQ",
      },
      {
        isPrimary: false,
        memberId: "566269690310033408",
        playerTag: "#299RJ8Y98",
      },
      {
        isPrimary: false,
        memberId: "1473650637978992681",
        playerTag: "#GQ8VCJ8Y",
      },
      {
        isPrimary: false,
        memberId: "845989456854384670",
        playerTag: "#9U22GJC0V",
      },
      {
        isPrimary: false,
        memberId: "509695842123513876",
        playerTag: "#LV0Q2VU0",
      },
      {
        isPrimary: false,
        memberId: "526472034054832139",
        playerTag: "#YLG2VVCJ",
      },
      {
        isPrimary: false,
        memberId: "1330573280280842392",
        playerTag: "#8CQ9000G",
      },
      {
        isPrimary: false,
        memberId: "714785802839654440",
        playerTag: "#L9LJR8Q8",
      },
      {
        isPrimary: false,
        memberId: "1314769240305303583",
        playerTag: "#222Y9Q0VC",
      },
      {
        isPrimary: false,
        memberId: "595753511988232202",
        playerTag: "#2YU29VJJ",
      },
      {
        isPrimary: false,
        memberId: "688060962921775149",
        playerTag: "#29R2UVPL",
      },
      {
        isPrimary: false,
        memberId: "1114294926914633748",
        playerTag: "#VQQ02QUJ",
      },
      {
        isPrimary: false,
        memberId: "405064257407942667",
        playerTag: "#G8UUUJCYQ",
      },
      {
        isPrimary: false,
        memberId: "294942490170228736",
        playerTag: "#2GPY8JVCQ",
      },
      {
        isPrimary: false,
        memberId: "1147512030924910682",
        playerTag: "#GPYVP29LU",
      },
      {
        isPrimary: false,
        memberId: "332208238395129859",
        playerTag: "#90VJG9",
      },
      {
        isPrimary: false,
        memberId: "764759977859743745",
        playerTag: "#9GPQLUP08",
      },
      {
        isPrimary: false,
        memberId: "1483545519715520653",
        playerTag: "#L9GR8G8RU",
      },
      {
        isPrimary: false,
        memberId: "647112241363025940",
        playerTag: "#Y9CJRV92V",
      },
      {
        isPrimary: false,
        memberId: "141189008272261120",
        playerTag: "#2GCJQJ09Q",
      },
      {
        isPrimary: false,
        memberId: "1306916359929856040",
        playerTag: "#2CCVV8P80",
      },
      {
        isPrimary: false,
        memberId: "1204863911006965825",
        playerTag: "#G8YJGJ982",
      },
      {
        isPrimary: false,
        memberId: "402414582850912256",
        playerTag: "#28PLC2PGJ",
      },
      {
        isPrimary: false,
        memberId: "419492126494031874",
        playerTag: "#2GRGQJU09",
      },
      {
        isPrimary: false,
        memberId: "1220854067308265588",
        playerTag: "#8LU2LVVVY",
      },
      {
        isPrimary: false,
        memberId: "1417805495128948757",
        playerTag: "#LRQY2QQC",
      },
      {
        isPrimary: false,
        memberId: "194536635730362368",
        playerTag: "#RRGPLPU8",
      },
      {
        isPrimary: false,
        memberId: "318680508076654594",
        playerTag: "#RQU9L9R2",
      },
      {
        isPrimary: false,
        memberId: "405064257407942667",
        playerTag: "#GYJ0J2R0J",
      },
      {
        isPrimary: false,
        memberId: "595753511988232202",
        playerTag: "#U088RVV8",
      },
      {
        isPrimary: false,
        memberId: "1304366043606814723",
        playerTag: "#PGPQLUCCU",
      },
      {
        isPrimary: false,
        memberId: "522593664850067470",
        playerTag: "#L8RCUPL8",
      },
      {
        isPrimary: false,
        memberId: "316310821993054210",
        playerTag: "#9U8JUUL0",
      },
      {
        isPrimary: false,
        memberId: "1304366043606814723",
        playerTag: "#LPJ02PGJ",
      },
      {
        isPrimary: false,
        memberId: "307892860567552001",
        playerTag: "#GCJ2VP0J",
      },
      {
        isPrimary: false,
        memberId: "1002239445468205187",
        playerTag: "#9PJ8VCG00",
      },
      {
        isPrimary: false,
        memberId: "969502400580812830",
        playerTag: "#8UQLLVQ",
      },
      {
        isPrimary: false,
        memberId: "709093604647501915",
        playerTag: "#2P02RLGPV",
      },
      {
        isPrimary: false,
        memberId: "322371070495817728",
        playerTag: "#GC98P9L9",
      },
      {
        isPrimary: false,
        memberId: "969502400580812830",
        playerTag: "#8UUV8Y8V0",
      },
      {
        isPrimary: false,
        memberId: "668779425814413332",
        playerTag: "#2P0QRGL2Y",
      },
      {
        isPrimary: false,
        memberId: "969502400580812830",
        playerTag: "#QG0RRRRQP",
      },
      {
        isPrimary: false,
        memberId: "1322239396820287630",
        playerTag: "#QCYC89GG8",
      },
      {
        isPrimary: false,
        memberId: "1141307667453849610",
        playerTag: "#9VJQYVP9U",
      },
      {
        isPrimary: false,
        memberId: "307579551226265601",
        playerTag: "#GGLJR88G",
      },
      {
        isPrimary: false,
        memberId: "806123229407084554",
        playerTag: "#QG2UVRV0",
      },
      {
        isPrimary: false,
        memberId: "298121409245478913",
        playerTag: "#82Y9JPPPY",
      },
      {
        isPrimary: false,
        memberId: "1141307667453849610",
        playerTag: "#L8YRQPPRJ",
      },
      {
        isPrimary: false,
        memberId: "546069390748155924",
        playerTag: "#2CV0P8C92",
      },
      {
        isPrimary: false,
        memberId: "1264203904766181439",
        playerTag: "#20LJ9GCRP",
      },
      {
        isPrimary: false,
        memberId: "487587013218795530",
        playerTag: "#VYC2CJ22",
      },
      {
        isPrimary: false,
        memberId: "931542086786895912",
        playerTag: "#PG9P0GLRC",
      },
      {
        isPrimary: false,
        memberId: "298121409245478913",
        playerTag: "#QG89JJLR8",
      },
      {
        isPrimary: false,
        memberId: "298121409245478913",
        playerTag: "#GPV8QYYYU",
      },
      {
        isPrimary: false,
        memberId: "1322239396820287630",
        playerTag: "#RY9UR998",
      },
      {
        isPrimary: false,
        memberId: "346007523968548864",
        playerTag: "#2QJ0QYJQY",
      },
      {
        isPrimary: false,
        memberId: "1052856449673461800",
        playerTag: "#98VLRJC",
      },
      {
        isPrimary: false,
        memberId: "563824425196060717",
        playerTag: "#8PC20VG8",
      },
      {
        isPrimary: false,
        memberId: "1211633257435897888",
        playerTag: "#QCGC9UVU",
      },
      {
        isPrimary: false,
        memberId: "563824425196060717",
        playerTag: "#9JU9QJLLU",
      },
      {
        isPrimary: false,
        memberId: "566269690310033408",
        playerTag: "#R0Q0RCY88",
      },
      {
        isPrimary: false,
        memberId: "628672199066255370",
        playerTag: "#PU00LLVLC",
      },
      {
        isPrimary: false,
        memberId: "216612164788551690",
        playerTag: "#8JLGGY9YC",
      },
      {
        isPrimary: false,
        memberId: "1322239396820287630",
        playerTag: "#299UYGP8V",
      },
      {
        isPrimary: false,
        memberId: "216612164788551690",
        playerTag: "#CQJJU8L0",
      },
      {
        isPrimary: false,
        memberId: "283569680243752961",
        playerTag: "#QUGCP9UP",
      },
      {
        isPrimary: false,
        memberId: "275189205297004544",
        playerTag: "#8PCVLRU8C",
      },
      {
        isPrimary: false,
        memberId: "1380280404912635985",
        playerTag: "#9JP2Y2U08",
      },
      {
        isPrimary: false,
        memberId: "595753511988232202",
        playerTag: "#GJVGYY9VG",
      },
      {
        isPrimary: false,
        memberId: "1338631087999684668",
        playerTag: "#L9LP9R2",
      },
      {
        isPrimary: false,
        memberId: "1286641057853083662",
        playerTag: "#800RG0CRP",
      },
      {
        isPrimary: false,
        memberId: "298121409245478913",
        playerTag: "#U0Y0GQVU",
      },
      {
        isPrimary: false,
        memberId: "1304366043606814723",
        playerTag: "#PYVY2GG00",
      },
      {
        isPrimary: false,
        memberId: "298121409245478913",
        playerTag: "#QRQ9P0LYR",
      },
      {
        isPrimary: false,
        memberId: "298121409245478913",
        playerTag: "#P9GGVGR9Y",
      },
      {
        isPrimary: false,
        memberId: "691618338215952405",
        playerTag: "#9PG2CUGY",
      },
      {
        isPrimary: false,
        memberId: "397895801335971842",
        playerTag: "#2VRR29P8L",
      },
      {
        isPrimary: false,
        memberId: "178245134515830784",
        playerTag: "#QJ9JVJ0C",
      },
      {
        isPrimary: false,
        memberId: "1085212862844248196",
        playerTag: "#QPQLYC089",
      },
      {
        isPrimary: false,
        memberId: "695321549770719292",
        playerTag: "#G22CJP8UJ",
      },
      {
        isPrimary: false,
        memberId: "1351135001437143070",
        playerTag: "#28VRLL9J",
      },
      {
        isPrimary: false,
        memberId: "1313294168461803540",
        playerTag: "#Y2VCRL9Q",
      },
      {
        isPrimary: false,
        memberId: "1141307667453849610",
        playerTag: "#8LLQP2Q99",
      },
      {
        isPrimary: false,
        memberId: "826020637537206293",
        playerTag: "#29YCV90U",
      },
      {
        isPrimary: false,
        memberId: "764466250285187133",
        playerTag: "#820LYCVPC",
      },
      {
        isPrimary: false,
        memberId: "477551833301123072",
        playerTag: "#9V9RQRYPQ",
      },
      {
        isPrimary: false,
        memberId: "563675882200367104",
        playerTag: "#Y882JQCJY",
      },
      {
        isPrimary: false,
        memberId: "1394003330476408853",
        playerTag: "#YU8V0QJU",
      },
      {
        isPrimary: false,
        memberId: "563675882200367104",
        playerTag: "#QCU2RLGUJ",
      },
      {
        isPrimary: false,
        memberId: "276375902382850048",
        playerTag: "#29UYCLU8",
      },
      {
        isPrimary: false,
        memberId: "882322021353140244",
        playerTag: "#9P9PCCU0J",
      },
      {
        isPrimary: false,
        memberId: "584854361398706176",
        playerTag: "#R9J092YV",
      },
    ])
    .execute()
}
