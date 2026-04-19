// ============================================================
// HSMZF SITE CONTENT — EDIT THIS FILE TO UPDATE THE WEBSITE
// ============================================================
// You don't need to know how to code to edit this file.
// Just change the text between the quote marks ("...").
// After saving, the website updates automatically.
// ============================================================

export const siteConfig = {

  // ── ORGANISATION DETAILS ──────────────────────────────────
  org: {
    name: "HSMZF",
    fullName: "Hadhrat Shaykh Maulana Muhammad Zakariyya Foundation",
    tagline: "Rumworth Ward, Bolton",
    charityNumber: "1200619",
    founded: "2021",
    phone: "(+44) 07450 375304",
    email: "Admin@hsmzf.org",
    address: "Rumworth Ward, Bolton, Greater Manchester, UK",
  },

  // ── SOCIAL MEDIA ─────────────────────────────────────────
  social: {
    instagram: "https://www.instagram.com/hsmzfeducation/",
    twitter: "https://twitter.com/HSMZFeducation",
    facebook: "https://www.facebook.com/profile.php?id=100086390480190",
  },

  // ── EXTERNAL PAYMENT LINKS ───────────────────────────────
  payments: {
    paypal: "http://paypal.com/gb/fundraiser/charity/4701327",
    gocardless: "https://pay.gocardless.com/AL0005VAEHT2Q6",
    ramadhanGiving: "https://ramadhangiving.com/hadhrat-shaykh-muhammad-zakariyya-foundation-516/campaign",
  },

  // ── HOME PAGE ─────────────────────────────────────────────
  home: {
    hero: {
      badge: "Rumworth Ward, Bolton",
      heading: "Our Children,",
      headingItalic: "Our Legacy",
      subtext: "Transforming a derelict 6,000m² site into a world-class educational and community hub — nurturing the next generation, especially children with special educational needs.",
    },
    progressBar: {
      label: "Phase 2 – Foundation Build Appeal",
      sublabel: "Help us lay the foundations — every contribution counts",
      amountLabel: "£350 per m²",
      percent: 38, // change this number (0–100) to update the progress bar
    },
    missionQuote: "Every child deserves access to quality education and resources, regardless of their background.",
    about: {
      paragraph1: "The Hadhrat Shaykh Maulana Muhammad Zakariyya Foundation is a Charitable Incorporated Organisation founded in 2021. Our mission is to make a lasting, positive impact on underprivileged children in the Rumworth ward of Bolton.",
      paragraph2: "With the generous support of our community, we have already acquired a significant 6,000m² site — previously derelict for over 25 years — and are now working to transform it into a thriving educational and community hub.",
      values: [
        {
          icon: "🎓",
          title: "Quality Education",
          desc: "State-of-the-art classrooms with modern technology for all learners",
        },
        {
          icon: "💚",
          title: "SEND Inclusion",
          desc: "Dedicated facilities designed for children with special educational needs",
        },
        {
          icon: "🏘️",
          title: "Community Regeneration",
          desc: "Revitalising a neglected neighbourhood and reducing anti-social behaviour",
        },
      ],
    },
    hadith: {
      text: "When a person dies, all their deeds come to an end except three: ongoing charity, beneficial knowledge, or a righteous child who prays for them.",
      source: "Prophet Muhammad ﷺ — Sahih Muslim",
    },
    stats: [
      { number: "14", label: "Modern classrooms planned" },
      { number: "2", label: "Dedicated SEND classrooms" },
      { number: "6,000", label: "m² site secured" },
      { number: "25+", label: "Years derelict — now transformed" },
    ],
  },

  // ── PROJECT PAGE ──────────────────────────────────────────
  project: {
    hero: {
      badge: "Phase 2 Underway",
      heading: "Creating an Outstanding Educational Hub",
      subtext: "Transforming a 6,000m² derelict site in the heart of Rumworth, Bolton, into a vibrant centre of education, inclusion, and community.",
    },
    specs: [
      { icon: "🏫", number: "14", label: "Spacious Classrooms" },
      { icon: "♿", number: "2", label: "SEND Specialist Rooms" },
      { icon: "🔬", number: "2", label: "Science & IT Labs" },
      { icon: "🍽️", number: "2", label: "Refectories" },
      { icon: "📐", number: "6,000", label: "Square Metres" },
      { icon: "🏗️", number: "2", label: "Modular Buildings" },
      { icon: "🧑‍💼", number: "Admin", label: "Office Facilities" },
      { icon: "🌿", number: "Outdoor", label: "Community Green Space" },
    ],
    phases: [
      {
        number: "01",
        status: "done", // "done" | "active" | "upcoming"
        statusLabel: "✓ Complete",
        title: "Land Acquisition",
        desc: "With the generous financial support of our community, the Foundation successfully purchased the 6,000m² site in the heart of Rumworth — a formerly derelict piece of land that had been abandoned for over 25 years.",
      },
      {
        number: "02",
        status: "active",
        statusLabel: "🔄 Active Appeal",
        title: "Foundation Build Appeal — £350 per m²",
        desc: "We are now raising funds to lay the physical foundations of our SEND and educational facilities. By sponsoring a square metre for £350 (Lillah), donors can contribute directly to this vital phase.",
      },
      {
        number: "03",
        status: "upcoming",
        statusLabel: "Coming Soon",
        title: "Construction of Modular Buildings",
        desc: "Two state-of-the-art modular educational buildings will be constructed, housing 14 classrooms, science and IT laboratories, refectories, SEND suites, and administrative offices.",
      },
      {
        number: "04",
        status: "upcoming",
        statusLabel: "Coming Soon",
        title: "School & Community Hub Launch",
        desc: "The completed facility will open as an independent school with out-of-hours provision for children with physical disabilities and SEND, alongside accessible community services for local residents.",
      },
    ],
  },

  // ── DONATION OPTIONS ──────────────────────────────────────
  donations: [
    {
      id: "sqm",
      icon: "🏗️",
      title: "Square Metre Sponsor",
      amount: "Phase 2 Appeal · £350",
      desc: "Sponsor a square metre of the foundation build for £350 (Lillah). Your name or dedication can be recorded on our honour wall.",
      buttonLabel: "Sponsor a m² — £350",
      featured: true,
      presetAmounts: [350, 700, 1050, 1750, 3500, 7000],
    },
    {
      id: "lillah",
      icon: "🤲",
      title: "Lillah Donation",
      amount: "General Charity · Any Amount",
      desc: "Give freely for the sake of Allah. Your Lillah goes directly toward the Foundation's educational mission and community programme.",
      buttonLabel: "Give Lillah",
      featured: false,
      presetAmounts: [10, 25, 50, 100, 250, 500],
    },
    {
      id: "foundation",
      icon: "🏛️",
      title: "Foundation Appeal",
      amount: "Building Works · £350 Lillah",
      desc: "Donate specifically to the cost of laying the physical foundations for our SEND and educational facilities.",
      buttonLabel: "Donate to Foundation",
      featured: false,
      presetAmounts: [350, 700, 1050, 1750, 3500, 7000],
    },
    {
      id: "standing",
      icon: "📅",
      title: "Standing Order",
      amount: "Monthly Commitment",
      desc: "Set up a regular monthly gift by standing order. Consistent giving helps us plan and deliver with confidence.",
      buttonLabel: "Set Up Standing Order",
      featured: false,
      presetAmounts: [5, 10, 25, 50, 100, 250],
    },
    {
      id: "daily",
      icon: "☀️",
      title: "Daily Sadaqah",
      amount: "Sadaqah Jariyah · From £1/day",
      desc: "A small daily commitment that adds up to meaningful change. Your ongoing Sadaqah Jariyah brings perpetual reward.",
      buttonLabel: "Donate Daily",
      featured: false,
      presetAmounts: [30, 60, 91, 180, 365, 730],
    },
    {
      id: "isaale",
      icon: "🌹",
      title: "Isaale Thawab",
      amount: "In Memory · Any Amount",
      desc: "Donate in memory of a loved one, dedicating the reward (thawab) to their soul. A beautiful and lasting form of remembrance.",
      buttonLabel: "Give in Memory",
      featured: false,
      presetAmounts: [25, 50, 100, 250, 500, 1000],
    },
    {
      id: "qardh",
      icon: "🌟",
      title: "Qardh e Hasanah",
      amount: "Beautiful Loan",
      desc: '"If you lend Allah a beautiful loan, He will multiply it for you and forgive you." — Surah Al-Taghābun 64:17',
      buttonLabel: "Offer Qardh e Hasanah",
      featured: false,
      presetAmounts: [500, 1000, 2500, 5000, 10000, 25000],
    },
  ],
}
