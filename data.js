const portfolioData = {
  version: "1.0.1-cleaned",

  // ─── HERO ───────────────────────────────────────────────
  name: "Ega Hemachandra",
  tagline: "CS Student · AI & ML Builder · Problem Solver",
  photo: "you.jfif",
  resumePDF: "GeneralCV-Hemachandra.pdf",

  // ─── ABOUT ──────────────────────────────────────────────
  about: "I'm a Computer Science & Engineering student at LPU with a passion for building AI-powered solutions. From music genre classifiers to government query systems, I love turning complex problems into clean, working code. Currently focused on machine learning, full-stack development, and open source.",

  stats: [
    { value: 4, label: "Projects Built" },
    { value: 3, label: "Certificates" },
    { value: 1, label: "Leadership Role" },
    { value: 300, label: "Problems Solved" }
  ],

  // ─── SOCIAL LINKS ───────────────────────────────────────
  socials: {
    linkedin: "https://www.linkedin.com/in/hemachandra-ega-8942b9288/",
    github: "https://github.com/Hems0",
    email: "e.hemachandra1@gmail.com"
  },

  // ─── EDUCATION ──────────────────────────────────────────
  education: [
    {
      institution: "Lovely Professional University",
      degree: "B.Tech — Computer Science & Engineering",
      score: "In Progress",
      duration: "Aug 2024 – Present",
      location: "Phagwara, Punjab"
    },
    {
      institution: "Geethanjali Institute of Science & Technology",
      degree: "Diploma",
      score: "69.9%",
      duration: "Aug 2021 – June 2024",
      location: "Nellore, Andhra Pradesh"
    },
    {
      institution: "Kendriya Vidyalaya, Nellore",
      degree: "Matriculation (Class X)",
      score: "56%",
      duration: "Apr 2020 – Mar 2021",
      location: "Nellore, Andhra Pradesh"
    }
  ],

  // ─── SKILLS ─────────────────────────────────────────────
  // icon: devicon class name (e.g. "devicons devicons-python") OR null
  skills: {
    "Programming & Markup": [
      { name: "Python", icon: "devicon-python-plain" },
      { name: "C", icon: "devicon-c-plain" },
      { name: "C++", icon: "devicon-cplusplus-plain" },
      { name: "Java", icon: "devicon-java-plain" },
      { name: "HTML", icon: "devicon-html5-plain" },
      { name: "CSS", icon: "devicon-css3-plain" }
    ],
    "Frameworks & Libraries": [
      { name: "Pandas", icon: "devicon-pandas-plain" },
      { name: "NumPy", icon: "devicon-numpy-plain" },
      { name: "Matplotlib", icon: "devicon-matplotlib-plain" }
    ],
    "Tools & Platforms": [
      { name: "MySQL", icon: "devicon-mysql-plain" },
      { name: "Git", icon: "devicon-git-plain" },
      { name: "GitHub", icon: "devicon-github-original" },
      { name: "Blender", icon: "devicon-blender-original" },
      { name: "Unity", icon: "devicon-unity-original" }
    ],
    "Core CS Fundamentals": [
      { name: "DSA", icon: null },
      { name: "OOPs", icon: null },
      { name: "DBMS", icon: null },
      { name: "Operating Systems", icon: null },
      { name: "Computer Networks", icon: null },
      { name: "Machine Learning", icon: null }
    ],
    "Soft Skills": [
      { name: "Problem Solving", icon: null },
      { name: "Adaptability", icon: null },
      { name: "Team Collaboration", icon: null },
      { name: "Critical Thinking", icon: null },
      { name: "Attention to Detail", icon: null }
    ]
  },

  // ─── PROJECTS ───────────────────────────────────────────
  projects: [
    {
      title: "AI Music Genre Classifier",
      description: "Machine learning system classifying 7 music genres via SVM. Includes a Streamlit web app with dynamic 10-band equalizer UI.",
      bullets: [
        "~73% SVM accuracy on GTZAN dataset using MFCC features",
        "Adaptive frequency equalizer auto-adjusting to predictions"
      ],
      techStack: ["Python", "Streamlit", "Scikit-learn", "Librosa", "NumPy"],
      githubURL: "https://github.com/Hems0/AI-Powered-Adaptive-Music-Equalizer-Prototype",
      demoURL: null,
      featured: true
    },
    {
      title: "AI-Powered RTI Query System",
      description: "AI system classifying Right to Information queries into government sectors. Features a knowledge base and admin dashboard.",
      bullets: [
        "Automated responses via keyword-matching knowledge base",
        "Human-in-the-loop admin dashboard for review / responses"
      ],
      techStack: ["Python", "Flask", "SQLite", "Scikit-learn", "HTML/CSS", "JavaScript"],
      githubURL: "https://github.com/Hems0/Prompt-Based-Classification-Of-RTI-Queries-With-Human-In-The-Loop",
      demoURL: null,
      featured: true
    },
    {
      title: "Isolated-Bob",
      description: "A fully hand-modeled 3D scene built in Blender. Features a swimming pool, spiral water slide, floating balls, grass environment, and original robot character 'Bob'.",
      bullets: [
        "All 3D models built from scratch in Blender — no pre-made assets",
        "Realistic water simulation with dynamic surface ripples"
      ],
      techStack: ["Blender", "3D Modeling", "Water Simulation", "Lighting & Rendering"],
      githubURL: null,
      demoURL: "https://drive.google.com/drive/folders/1HgU363PNL7z7O-EdEYP6x3HCJyC8GSXu?usp=sharing",
      featured: true
    },
    {
      title: "CBSE SARAS Data Extraction Bot",
      description: "Selenium-based Python bot automating the extraction of state-wise CBSE school data from government portals directly to Google Sheets. Developed during my role as Senior Officer to ensure reliable, high-volume data aggregation.",
      bullets: [
        "Auto-paginates through targets, safely extracting 8 core data columns",
        "Appends records via Sheets API with strict resume / no-duplication logic"
      ],
      techStack: ["Python", "Selenium", "Google Sheets API", "gspread"],
      githubURL: "https://github.com/Hems0/Data-Extract-Bot",
      demoURL: null,
      featured: true
    }
  ],

  // ─── CERTIFICATES ───────────────────────────────────────
  certificates: [
    {
      name: "Computer Networks",
      issuer: "Coursera",
      date: "Oct 2024",
      link: "https://drive.google.com/drive/folders/1W3WcccPyw239d2WHs5M-Xg_LZacNBmGL?usp=drive_link"
    },
    {
      name: "Hack-A-Thron",
      issuer: "AIESEC",
      date: "Aug 2024",
      link: "https://drive.google.com/file/d/19QNNV5kffy9oncSO42X5KoiUo8hRf75t/view?usp=sharing"
    },
    {
      name: "Web-A-Thon",
      issuer: "Student Welfare Wing, LPU",
      date: "Sep 2024",
      link: "https://drive.google.com/file/d/1R-eh0PENxvKlrEFLYh38yVQlIacR6zbs/view?usp=sharing"
    }
  ],

  // ─── TRAINING ───────────────────────────────────────────
  training: [
    {
      title: "Fundamentals of Data Structures: Learn, Apply and Build Projects",
      provider: "LPU",
      duration: "Jan 2025 – Aug 2025",
      link: "https://drive.google.com/file/d/1nJxi_ZDasjMuq50dQl5mh0P8yy5MWC06/view?usp=sharing",
      bullets: [
        "Arrays, linked lists, stacks, queues, trees, graphs, hash tables",
        "Time and space complexity analysis",
        "Hands-on implementation in code"
      ]
    }
  ],

  // ─── EXTRA-CURRICULAR ───────────────────────────────────
  extracurricular: [
    {
      role: "Senior Officer (Prev. Deputy Manager & Core Member)",
      org: "Student Career Committee, SCSE (LPU)",
      duration: "Dec 2025 – Present",
      link: null,
      bullets: [
        "Organized and managed major technical events including Tech Fluence 6, Leaders Talk, and GSoC expert sessions.",
        "Engineered an automated data extraction bot, reducing 4 days of manual data-entry work to under 2 hours.",
        "Collaborated with mentors for smooth event execution and maintained accurate records via Google Sheets."
      ]
    }
  ]

};
