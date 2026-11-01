const CONFIG = {
  nickname: "Bebii",
  // Months start at 0, so 5 = June. Change the year if it's not 2026!
  startDate: new Date(2026, 5, 8)
};

const TIMELINE = [
  {
    date: "June 8, 2026",
    title: "We became official 💜",
    text: "The day our story officially began.",
    image: "images/june.jpg"
  },
  {
    date: "July 8, 2026",
    title: "Our 1st Monthsary",
    text: "We went to Kaimall to eat and used the photobooth. Thanks to my professor for dismissing class early, we got to meet up that day!",
    image: "images/july.jpg"
  },
  {
    date: "August 8, 2026",
    title: "Our 2nd Monthsary",
    text: "She gave me a handwritten letter, perfume, and a Lego. 🧱",
    image: "images/august.jpg"
  },
  {
    date: "September 8, 2026",
    title: "Our 3rd Monthsary",
    text: "Back to the mall for our monthly photobooth!",
    image: "images/september.jpg"
  },
  {
    date: "October 8, 2026",
    title: "Our 4th Monthsary",
    text: "We stayed in this time. We took our monthly photobooth pictures on the laptop and played Roblox together.",
    image: "images/october.jpg"
  },
  {
    date: "November 8, 2026",
    title: "Our 5th Monthsary 🎉",
    text: "Counting down the days to the next chapter...",
    image: "",
    upcoming: true
  }
];

const GALLERY = [
  { image: "images/june.jpg",      caption: "The day we became official 💜", date: "June 8, 2026" },
  { image: "images/july.jpg",      caption: "Kaimall photobooth 📸",         date: "July 8, 2026" },
  { image: "images/august.jpg",    caption: "Her letter, perfume & Lego 🧱",  date: "August 8, 2026" },
  { image: "images/september.jpg", caption: "Monthly photobooth again!",     date: "September 8, 2026" },
  { image: "images/october.jpg",   caption: "Laptop photobooth + Roblox 🎮",  date: "October 8, 2026" }
  // To add more, copy a line, put the photo in /images, and change the text.
  // Don't forget the comma at the end of the line before it!
];

const REASONS = [
  { emoji: "😊", title: "Your smile",
    message: "Hehe, nilagay ko yung smile kasi one of the reasons nmn talaga ih yung ngiti mo na parang bampira lalo na pag nagpapa cute kaaa. AGHHH I LOVE ITT SOOMUCHHHH" },
  { emoji: "😍", title: "Your Eyes",
    message: "Syempreee ito pa mawawala? HAHHSAH alam mo nmn na kung bakit to nandito dibe pero sasabihin ko padinnn, nilagay koto kasi ito ang kaunaunahang napansin ko sayo sumunod yung ngiti mo..yung mata na akala ko na sobrang talas may ilalambing din pala hshahhsuahsuha and the way your eyes look at me... i'm dyinggg" },
  { emoji: "✉️", title: "The way you care",
    message: "Nilagay ko to kasi dahil sa mga letters na binibigay mo sakin mas na ffeel ko na mahal mo talaga ako like yung efforts na nilalagay mo dun and yung love na nasa letters kahit hindi pa tayo sobrang ganda talgaa, and ofc pang IG story talaga HAUSHAUHSAW" },
  { emoji: "🎮", title: "You make everything fun",
    message: "Ahmm, nandito kasi minsan na kapag naiinis ako sa laro alam mo kung paano ako mapainahon at ganun din sayo kilala na natin ang isa't-isa" },
  { emoji: "📸", title: "Our monthly photobooth",
    message: "Etooo talaga pinag iipunan ko eh, kaso di talaga lagi umaabot konti nalnggg I loved yung pagiging conssitent natin sa mga PBs kasi minsan walng wala tayo nakaka gawa parin tayo ng paraan" },
  { emoji: "💜", title: "You're you",
    message: "Ito talaga hinuli ko, kasi yung pagiging IKAW ang mas nagustuhan ko ih, akala ko dati lagi kang masungit naka taray..ganun, pero nung mas nakilala kita napagtanto ko na sobrang cute mo pala pag nagpapababy HSHAUSHAUHW jokk langg pero legitt lang yung pagiging selosa or yung mga overthinks mo na sinasabi mo sakin at kung paano moko mahalin gustong gusto ko talaga yun at dahil dun mas minahal kita ng sobra." }
  // Add more any time. Copy a block, edit the text, and mind the commas!
];

const LETTER = {
  buttonText: "Open your surprise 💌",
  greeting: `To my ${CONFIG.nickname},`,
  paragraphs: [
    "Hiiiii bebiii first of all bago yung pag gawa ko ng letter HSUHAUSHAUHE, I hope nagustuhan mo hehehe, HAPPY 5TH MONTHSARYYY bebiii kooo, we made it here naaa isang buwan nalang kalahating taon na tayooooo...I'm supper happy dahil ikaw parin kasama ko, lagi mo akong tinutulungan minomotivate na mag patuloy paa...wala nmn na akong ibang sasabihin, thank youuu soooo muchhh bebiii iscelll kooo I LOVE YOUUU AND I LOVE YOUUU MOREEEEE, HAPPY 5TH MOTMOTTTT ULITTT<3."
  ],
  closing: "Forever yours,",
  signature: "Your bebii jorell 💜"
};