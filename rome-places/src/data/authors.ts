import type { Resource, ResourceSuccess } from "./resources";

type AuthorInput = Omit<Resource, "category" | "creator" | "successes"> & {
  creator?: string;
  successes: ResourceSuccess[];
};

const bookPurchaseSearch = (author: string, title: string) =>
  `https://www.amazon.com/s?k=${encodeURIComponent(`${title} ${author} French edition`)}`;

const axelPick = "Axel's special recommendation";

const author = ({
  creator = "French literature",
  successes,
  ...resource
}: AuthorInput): Resource => ({
  ...resource,
  category: "books",
  creator,
  successes: successes.map(({ actionLabel, url, ...success }) => ({
    ...success,
    actionLabel: actionLabel ?? "Buy book",
    url: url ?? bookPurchaseSearch(resource.title, success.title),
  })),
});

export const authorResources: Resource[] = [
  author({
    slug: "sylvain-tesson",
    title: "Sylvain Tesson",
    creator: "Travel writer",
    year: 1972,
    yearLabel: "Born 1972",
    tag: "Travel writing",
    size: "lg",
    blurb:
      "A restless traveler, essayist, and climber, Tesson writes about solitude, landscape, escape, and the strange discipline of going far away.",
    why: "He is one of the most vivid modern French guides to adventure as a way of thinking, not only moving.",
    successes: [
      { title: "Une vie à coucher dehors", year: 2009, recommendationLabel: axelPick },
      { title: "Bérézina", year: 2015, recommendationLabel: axelPick },
      { title: "Dans les forêts de Sibérie", year: 2011 },
      { title: "La Panthère des neiges", year: 2019 },
    ],
  }),
  author({
    slug: "joseph-kessel",
    title: "Joseph Kessel",
    creator: "Adventure novelist",
    year: 1898,
    yearLabel: "1898-1979",
    tag: "Adventure",
    size: "md",
    blurb:
      "Reporter, aviator, resistance figure, and novelist, Kessel wrote with the appetite of someone who had seen history from very close range.",
    why: "His books make French literature feel wind-burned, dangerous, and open to the world.",
    successes: [
      { title: "L'Équipage", year: 1923, recommendationLabel: axelPick },
      { title: "Belle de jour", year: 1928 },
      { title: "L'Armée des ombres", year: 1943 },
      { title: "Le Lion", year: 1958 },
      { title: "Les Cavaliers", year: 1967 },
    ],
  }),
  author({
    slug: "albert-camus",
    title: "Albert Camus",
    creator: "Absurdist novelist",
    year: 1913,
    yearLabel: "1913-1960",
    tag: "Absurdism",
    size: "lg",
    blurb:
      "Camus wrote with sun, clarity, moral pressure, and a refusal to let grand ideas excuse human cruelty.",
    why: "He is one of the cleanest entry points into 20th-century French thought because the sentences stay lucid even when the questions are enormous.",
    successes: [
      { title: "L'Étranger", year: 1942, recommendationLabel: axelPick },
      { title: "Le Mythe de Sisyphe", year: 1942 },
      { title: "La Peste", year: 1947 },
      { title: "La Chute", year: 1956 },
    ],
  }),
  author({
    slug: "guy-de-maupassant",
    title: "Guy de Maupassant",
    creator: "Realist storyteller",
    year: 1850,
    yearLabel: "1850-1893",
    tag: "Realism",
    blurb:
      "Maupassant was a master of sharp social observation, desire, cruelty, fear, and the short story that closes like a trap.",
    why: "He gives you 19th-century France in precise, fast, often merciless strokes.",
    successes: [
      { title: "Bel-Ami", year: 1885, recommendationLabel: axelPick },
      { title: "Boule de Suif", year: 1880 },
      { title: "Une vie", year: 1883 },
      { title: "Le Horla", year: 1887 },
      { title: "Pierre et Jean", year: 1888 },
    ],
  }),
  author({
    slug: "gustave-flaubert",
    title: "Gustave Flaubert",
    creator: "Realist novelist",
    year: 1821,
    yearLabel: "1821-1880",
    tag: "Realism",
    size: "md",
    blurb:
      "Flaubert turned prose style into a near-religious discipline, carving irony, boredom, desire, and social illusion sentence by sentence.",
    why: "He is essential for understanding the modern novel's obsession with precision and self-deception.",
    successes: [
      { title: "Madame Bovary", year: 1857, recommendationLabel: axelPick },
      { title: "Salammbô", year: 1862 },
      { title: "L'Éducation sentimentale", year: 1869 },
      { title: "Trois contes", year: 1877 },
      { title: "Bouvard et Pécuchet", year: 1881 },
    ],
  }),
  author({
    slug: "michel-houellebecq",
    title: "Michel Houellebecq",
    creator: "Contemporary novelist",
    year: 1956,
    yearLabel: "Born 1956",
    tag: "Contemporary",
    size: "lg",
    blurb:
      "Houellebecq writes bleak, funny, uncomfortable novels about loneliness, sex, consumer society, religion, decline, and modern emptiness.",
    why: "Whether loved or hated, he is one of the unavoidable voices in contemporary French fiction.",
    successes: [
      { title: "Extension du domaine de la lutte", year: 1994, recommendationLabel: axelPick },
      { title: "Les Particules élémentaires", year: 1998, recommendationLabel: axelPick },
      { title: "Plateforme", year: 2001 },
      { title: "La Carte et le Territoire", year: 2010, recommendationLabel: axelPick },
      { title: "Soumission", year: 2015, recommendationLabel: axelPick },
      { title: "Sérotonine", year: 2019, recommendationLabel: axelPick },
    ],
  }),
  author({
    slug: "romain-gary",
    title: "Romain Gary",
    creator: "Novelist and diplomat",
    year: 1914,
    yearLabel: "1914-1980",
    tag: "Novel",
    size: "md",
    blurb:
      "Gary lived several literary lives at once: pilot, diplomat, mythmaker, stylist, and the only writer to win the Prix Goncourt twice.",
    why: "His work is full of tenderness under bravado, exile under elegance, and identity as a beautiful problem.",
    successes: [
      { title: "Les Racines du ciel", year: 1956 },
      { title: "La Promesse de l'aube", year: 1960 },
      { title: "Chien blanc", year: 1970 },
      { title: "Gros-Câlin", year: 1974, note: "as Émile Ajar" },
      { title: "La Vie devant soi", year: 1975, note: "as Émile Ajar" },
    ],
  }),
  author({
    slug: "moliere",
    title: "Molière",
    creator: "Playwright",
    year: 1622,
    yearLabel: "1622-1673",
    tag: "Theatre",
    size: "lg",
    blurb:
      "Molière made French comedy into a machine for exposing hypocrisy, vanity, pedantry, greed, and all the ways people lie to themselves.",
    why: "His plays still feel alive because the social masks have changed less than we like to think.",
    successes: [
      { title: "Le Misanthrope", year: 1666, recommendationLabel: axelPick },
      { title: "Les Femmes savantes", year: 1672, recommendationLabel: axelPick },
      { title: "Tartuffe", year: 1664 },
      { title: "Dom Juan", year: 1665 },
      { title: "L'Avare", year: 1668, recommendationLabel: axelPick },
      { title: "Le Malade imaginaire", year: 1673, recommendationLabel: axelPick },
    ],
  }),
  author({
    slug: "rene-barjavel",
    title: "René Barjavel",
    creator: "Science-fiction writer",
    year: 1911,
    yearLabel: "1911-1985",
    tag: "Speculative fiction",
    blurb:
      "Barjavel brought disaster, romance, technology, myth, and philosophical anxiety into popular French science fiction.",
    why: "He is a perfect way to find the French taste for apocalypse with heart and metaphysical questions attached.",
    successes: [
      { title: "Ravage", year: 1943, recommendationLabel: axelPick },
      { title: "Le Voyageur imprudent", year: 1944 },
      { title: "La Nuit des temps", year: 1968 },
      { title: "Le Grand Secret", year: 1973 },
    ],
  }),
  author({
    slug: "cedric-gras",
    title: "Cédric Gras",
    creator: "Travel writer",
    year: 1982,
    yearLabel: "Born 1982",
    tag: "Travel writing",
    blurb:
      "Cédric Gras writes from Russia, Central Asia, the Caucasus, and the high places where geography becomes history.",
    why: "He belongs to the contemporary French travel-writing line: literary, physical, curious, and allergic to postcard exoticism.",
    successes: [
      { title: "Le Nord, c'est l'Est", year: 2013 },
      { title: "Saisons du voyage", year: 2018 },
      { title: "Alpinistes de Staline", year: 2020, recommendationLabel: axelPick },
      { title: "Anthracite", year: 2024 },
    ],
  }),
  author({
    slug: "antoine-de-saint-exupery",
    title: "Antoine de Saint-Exupéry",
    creator: "Pilot writer",
    year: 1900,
    yearLabel: "1900-1944",
    tag: "Aviation",
    size: "lg",
    blurb:
      "Saint-Exupéry turned flight, risk, responsibility, friendship, and wonder into luminous moral literature.",
    why: "He is beloved because his books feel simple at first and then keep widening as you grow older.",
    successes: [
      { title: "Terre des hommes", year: 1939, recommendationLabel: axelPick },
      { title: "Courrier Sud", year: 1929, recommendationLabel: axelPick },
      { title: "Vol de nuit", year: 1931, recommendationLabel: axelPick },
      { title: "Pilote de guerre", year: 1942 },
      { title: "Le Petit Prince", year: 1943 },
    ],
  }),
  author({
    slug: "jules-verne",
    title: "Jules Verne",
    creator: "Adventure novelist",
    year: 1828,
    yearLabel: "1828-1905",
    tag: "Adventure",
    size: "md",
    blurb:
      "Verne made geography, machines, exploration, and scientific imagination feel like pure narrative propulsion.",
    why: "He is one of the great engines of French popular literature: readable, inventive, and globally mythic.",
    successes: [
      { title: "Voyage au centre de la Terre", year: 1864 },
      { title: "De la Terre à la Lune", year: 1865 },
      { title: "Vingt mille lieues sous les mers", year: 1870 },
      { title: "Le Tour du monde en quatre-vingts jours", year: 1873 },
      { title: "L'Île mystérieuse", year: 1875 },
      { title: "Michel Strogoff", year: 1876, recommendationLabel: axelPick },
    ],
  }),
  author({
    slug: "alphonse-daudet",
    title: "Alphonse Daudet",
    creator: "Provençal storyteller",
    year: 1840,
    yearLabel: "1840-1897",
    tag: "Stories",
    blurb:
      "Daudet mixed Parisian literary life with Provençal memory, comic tenderness, and the sound of stories told close to home.",
    why: "He is a warm path into the regional imagination of southern France and 19th-century storytelling.",
    successes: [
      { title: "Lettres de mon moulin", year: 1869, recommendationLabel: axelPick },
      { title: "Le Petit Chose", year: 1868 },
      { title: "Tartarin de Tarascon", year: 1872 },
      { title: "L'Arlésienne", year: 1872 },
    ],
  }),
  author({
    slug: "marcel-pagnol",
    title: "Marcel Pagnol",
    creator: "Provence memoirist",
    year: 1895,
    yearLabel: "1895-1974",
    tag: "Memoir and theatre",
    size: "lg",
    blurb:
      "Pagnol gave Provence an unforgettable voice across novels, memoirs, theatre, and cinema: affectionate, funny, and deeply human.",
    why: "His work is one of the clearest emotional maps of southern French family life and spoken warmth.",
    successes: [
      { title: "La Gloire de mon père", year: 1957, recommendationLabel: axelPick },
      { title: "Le Château de ma mère", year: 1957, recommendationLabel: axelPick },
      { title: "Marius", year: 1929 },
      { title: "Fanny", year: 1931 },
      { title: "Jean de Florette", year: 1963 },
      { title: "Manon des sources", year: 1963 },
    ],
  }),
  author({
    slug: "andre-gide",
    title: "André Gide",
    creator: "Modernist novelist",
    year: 1869,
    yearLabel: "1869-1951",
    tag: "Modernism",
    size: "md",
    blurb:
      "Gide wrote about desire, freedom, sincerity, religious pressure, moral ambiguity, and the danger of inherited rules.",
    why: "He is central to modern French literature because his books keep asking how a self becomes honest.",
    successes: [
      { title: "Les Nourritures terrestres", year: 1897, recommendationLabel: axelPick },
      { title: "L'Immoraliste", year: 1902 },
      { title: "La Porte étroite", year: 1909 },
      { title: "Les Caves du Vatican", year: 1914 },
      { title: "La Symphonie pastorale", year: 1919 },
      { title: "Les Faux-monnayeurs", year: 1925 },
    ],
  }),
];
