/**
 * ============================================
 * PORTFOLIO CONFIGURATION
 * ============================================
 * Modifiez ce fichier pour personnaliser votre portfolio.
 * Toutes les informations personnelles sont centralisées ici.
 */

const CONFIG = {
  // ── Informations personnelles ──
  personal: {
    firstName: "Mohamed",
    lastName: "Moutahir",
    fullName: "Mohamed Moutahir",
    logo: "MOHAMED",
    title: "Étudiant en informatique | AI & Cybersecurity Enthusiast",
    greeting: "Bonjour, je suis",
    description:
      "Étudiant en informatique, je développe progressivement mes compétences en programmation, conception logicielle et technologies numériques. Je m'intéresse particulièrement à l'intelligence artificielle et à la cybersécurité.",
    // Remplacez par le chemin vers votre photo (ex: "assets/photo.jpg")
    // Laissez vide pour afficher l'avatar par défaut
    photo: "",
  },

  // ── À propos ──
  about: {
    paragraphs: [
      "Actuellement en troisième année d'informatique à l'Université Ibn Tofaïl au Maroc, j'ai obtenu mon DEUG en informatique à la Faculté des Sciences. Ce parcours m'a permis de construire des bases solides en programmation, algorithmique et mathématiques appliquées.",
      "Je suis passionné par la résolution de problèmes et l'approche analytique qu'offre l'informatique. Mon esprit mathématique me pousse à chercher des solutions élégantes et efficaces aux défis techniques.",
      "Ma volonté est de transformer mes connaissances théoriques en projets concrets, en explorant progressivement des domaines comme l'intelligence artificielle et la cybersécurité. Chaque projet est pour moi une opportunité d'apprendre et de progresser.",
    ],
    highlights: [
      { icon: "ri-graduation-cap-line", text: "DEUG obtenu en informatique" },
      { icon: "ri-code-s-slash-line", text: "Programmation C, C++, Python" },
      { icon: "ri-brain-line", text: "Passionné par l'IA et la cybersécurité" },
      { icon: "ri-lightbulb-line", text: "Esprit analytique et mathématique" },
    ],
  },

  // ── Compétences ──
  skills: [
    {
      category: "Programmation",
      icon: "ri-terminal-box-line",
      description: "Langages étudiés durant mon parcours universitaire",
      items: [
        { name: "C", level: "Pratique régulière", icon: "ri-code-line" },
        { name: "C++", level: "Pratique régulière", icon: "ri-code-s-slash-line" },
        { name: "Python", level: "Pratique régulière", icon: "ri-code-box-line" },
      ],
    },
    {
      category: "Développement web",
      icon: "ri-global-line",
      description: "Technologies web utilisées dans mes projets",
      items: [
        { name: "HTML", level: "Pratique régulière", icon: "ri-html5-line" },
        { name: "CSS", level: "En apprentissage", icon: "ri-css3-line" },
      ],
    },
    {
      category: "Bases de données",
      icon: "ri-database-2-line",
      description: "Gestion et modélisation de données",
      items: [
        { name: "SQL", level: "Pratique régulière", icon: "ri-database-line" },
        { name: "MySQL", level: "En apprentissage", icon: "ri-server-line" },
      ],
    },
    {
      category: "Concepts informatiques",
      icon: "ri-git-branch-line",
      description: "Fondements théoriques et méthodologiques",
      items: [
        { name: "Programmation orientée objet", level: "En apprentissage", icon: "ri-shape-line" },
        { name: "Algorithmique", level: "Pratique régulière", icon: "ri-flow-chart" },
        { name: "Structures de données", level: "En apprentissage", icon: "ri-node-tree" },
      ],
    },
    {
      category: "Domaines d'intérêt",
      icon: "ri-rocket-line",
      description: "Domaines que je souhaite approfondir",
      items: [
        { name: "Intelligence artificielle", level: "Notions", icon: "ri-brain-line" },
        { name: "Cybersécurité", level: "Notions", icon: "ri-shield-keyhole-line" },
        { name: "Réseaux & Systèmes", level: "Notions", icon: "ri-router-line" },
      ],
    },
  ],

  // ── Projets ──
  projects: [
    {
      title: "Application bancaire en Python",
      description:
        "Application en ligne de commande permettant de consulter un solde, effectuer des dépôts et réaliser des retraits avec validation des entrées utilisateur.",
      technologies: ["Python"],
      // Remplacez par votre vrai lien GitHub
      github: "#",
      // Mettez un lien uniquement si une démo existe réellement
      demo: "",
      // Remplacez par un vrai screenshot (ex: "assets/projects/banking-app.png")
      image: "",
      status: "completed",
    },
    {
      title: "Générateur de QR codes",
      description:
        "Application Python permettant de générer des QR codes à partir de données textuelles ou d'URL.",
      technologies: ["Python"],
      github: "#",
      demo: "",
      image: "",
      status: "completed",
    },
    {
      title: "Gestion de bases de données MySQL",
      description:
        "Projet d'apprentissage portant sur la création de tables, les relations entre entités et les requêtes SQL avancées.",
      technologies: ["SQL", "MySQL"],
      github: "#",
      demo: "",
      image: "",
      status: "completed",
    },
    {
      title: "Projet de troisième année",
      description:
        "Projet académique de fin d'année en cours de définition. Plus de détails seront ajoutés prochainement.",
      technologies: ["À définir"],
      github: "",
      demo: "",
      image: "",
      status: "upcoming",
    },
  ],

  // ── Formation ──
  education: [
    {
      degree: "Licence en informatique",
      institution: "Faculté des Sciences — Université Ibn Tofaïl",
      location: "Kénitra, Maroc",
      // Remplacez par les vraies dates
      period: "En cours",
      description: "Troisième année d'études en informatique.",
      status: "in-progress",
    },
    {
      degree: "DEUG en informatique",
      institution: "Faculté des Sciences — Université Ibn Tofaïl",
      location: "Kénitra, Maroc",
      period: "Obtenu",
      description:
        "Formation couvrant les fondamentaux de l'informatique : programmation, algorithmique, mathématiques appliquées, bases de données et systèmes.",
      status: "completed",
    },
  ],

  // ── Langues ──
  languages: [
    { name: "Arabe", level: "Langue maternelle" },
    { name: "Français", level: "Intermédiaire" },
    { name: "Anglais", level: "Intermédiaire" },
  ],

  // ── Contact & Liens ──
  contact: {
    // Remplacez par votre vrai e-mail
    email: "votre.email@exemple.com",
    // Remplacez par votre vrai profil LinkedIn
    linkedin: "#",
    // Remplacez par votre vrai profil GitHub
    github: "#",
  },

  // ── CV ──
  // Placez votre CV dans le dossier assets/ et mettez à jour le chemin
  cvPath: "assets/cv-mohamed-moutahir.pdf",

  // ── Couleurs (modifiables) ──
  theme: {
    primaryColor: "#3b82f6",
    secondaryColor: "#06b6d4",
  },

  // ── Métadonnées SEO ──
  seo: {
    title: "Mohamed Moutahir — Portfolio",
    description:
      "Portfolio de Mohamed Moutahir, étudiant en informatique à l'Université Ibn Tofaïl. Passionné par l'IA, la cybersécurité et le développement logiciel.",
    keywords:
      "Mohamed Moutahir, portfolio, informatique, étudiant, développeur, Python, IA, cybersécurité, Ibn Tofaïl",
    language: "fr",
  },
};
