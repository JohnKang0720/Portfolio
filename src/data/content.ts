// ─────────────────────────────────────────────────────────────
// Central content registry for the portfolio.
// Everything the site renders (projects, experience, skills, blog
// metadata) lives here so copy edits never require touching JSX.
// ─────────────────────────────────────────────────────────────

export const PROFILE = {
  name: 'Gyo-Jin Kang',
  shortName: 'John Kang',
  particleLines: ['GYO-JIN', 'KANG'],
  role: 'Data Scientist & AI Engineer',
  tagline:
    'I build agentic AI systems, production LLM pipelines, and rigorous machine learning — from self-evolving evaluation loops to models of the brain.',
  location: 'Vancouver, BC',
  email: 'gkang03@student.ubc.ca',
  github: 'https://github.com/JohnKang0720',
  linkedin: 'https://www.linkedin.com/in/gyojin-kang',
  resume: '/Gyo-Jin-Kang-Resume.pdf',
}

export type SkillGroup = { label: string; items: string[] }

export const SKILLS: SkillGroup[] = [
  {
    label: 'Languages',
    items: ['Python', 'SQL', 'R', 'Java', 'TypeScript', 'JavaScript', 'Bash'],
  },
  {
    label: 'AI / ML',
    items: [
      'PyTorch',
      'TensorFlow',
      'Scikit-Learn',
      'LangChain',
      'MCP',
      'LLM-as-a-Judge',
      'RAG / Embeddings',
    ],
  },
  {
    label: 'Data',
    items: ['Snowflake', 'dbt', 'Pandas', 'NumPy', 'Hex', 'Pinecone'],
  },
  {
    label: 'Platform',
    items: [
      'Docker',
      'Kubernetes',
      'AWS (EKS/ECR)',
      'GCP',
      'GitHub Actions',
      'FastAPI',
      'ArgoCD',
    ],
  },
]

// Flat marquee list for the moving skills strip.
export const SKILL_MARQUEE = [
  'Python',
  'PyTorch',
  'TensorFlow',
  'LangChain',
  'MCP',
  'Snowflake',
  'dbt',
  'Scikit-Learn',
  'FastAPI',
  'Kubernetes',
  'Docker',
  'AWS',
  'GCP',
  'SQL',
  'Pandas',
  'NumPy',
  'React',
  'TypeScript',
  'Pinecone',
  'Hex',
  'LLM-as-a-Judge',
  'RAG',
]

export type Project = {
  id: string
  index: string
  title: string
  subtitle: string
  domain: string
  year: string
  org?: string
  summary: string
  highlights: string[]
  stack: string[]
  why: string // market argument
  link?: { label: string; href: string }
}

export const PROJECTS: Project[] = [
  {
    id: 'eeg',
    index: '01',
    title: 'EEG Motor-Imagery Decoder',
    subtitle: 'CNN-LSTM + Riemannian geometry for brain-computer interfaces',
    domain: 'Deep Learning · Signals',
    year: '2024–25',
    org: 'UBC MINT',
    summary:
      'A hybrid deep model that decodes imagined movement from raw EEG. Spatio-temporal features are learned by a CNN-LSTM and fused with Riemannian tangent-space features from signal covariance, reaching 82% classification accuracy despite heavy noise and session-to-session drift.',
    highlights: [
      'CNN-LSTM hybrid reaching 82% motor-imagery classification accuracy',
      'Riemannian geometry pipeline (covariance + tangent-space mapping) for robustness to noise',
      'Strict causal train/test temporal splitting to prevent data leakage on time-series EEG',
    ],
    stack: ['PyTorch', 'NumPy', 'SciPy', 'Riemannian geometry'],
    why: 'Deep learning on messy real-world signals is exactly what medical-AI, wearables, and neurotech teams hire for. The leakage-free evaluation shows the scientific discipline production ML actually requires.',
  },
  {
    id: 'unet',
    index: '02',
    title: 'Breast Cancer U-Net Segmentation',
    subtitle: 'Encoder–decoder tumor segmentation on ultrasound imagery',
    domain: 'Computer Vision · Medical',
    year: '2024',
    summary:
      'A U-Net that segments malignant tumor regions in breast ultrasound images. Built the full encoder–decoder with transposed-convolution up-sampling, skip connections, batch normalization, and dropout, evaluated with the Dice coefficient.',
    highlights: [
      'Full U-Net encoder–decoder implemented from scratch in TensorFlow',
      'Transposed-convolution up-sampling with skip connections for pixel-precise masks',
      'Dice-coefficient evaluation with batch-norm + dropout regularization',
    ],
    stack: ['TensorFlow', 'Keras', 'OpenCV', 'NumPy'],
    why: 'Medical imaging is one of the most durable, high-impact CV markets. Segmentation architecture fluency (U-Net, skip connections, Dice) transfers directly to healthcare, manufacturing QA, and geospatial roles.',
    link: {
      label: 'View on GitHub',
      href: 'https://github.com/JohnKang0720/breast-cancer-unet',
    },
  },
  {
    id: 'hate-speech',
    index: '03',
    title: 'Hate-Speech Detection',
    subtitle: 'LSTM + Attention for content moderation',
    domain: 'NLP · Deep Learning',
    year: '2024',
    summary:
      'A sequence model that flags offensive language, pairing a bidirectional LSTM with an attention mechanism so the network learns which tokens drive a classification. SMOTE handles severe class imbalance; evaluation spans precision, recall, F1, and confusion analysis.',
    highlights: [
      'LSTM + attention architecture that surfaces the tokens behind each decision',
      'SMOTE oversampling to correct heavy minority-class imbalance',
      'Full evaluation: accuracy, precision, recall, F1, confusion matrix',
    ],
    stack: ['TensorFlow', 'Keras', 'NLTK', 'imbalanced-learn'],
    why: 'Attention is the conceptual core of every modern transformer — building it by hand proves you understand what LLMs are doing underneath. Trust & Safety and content-moderation ML remain in constant demand.',
    link: {
      label: 'View on GitHub',
      href: 'https://github.com/JohnKang0720/hate-speech-detection',
    },
  },
  {
    id: 'course-rec',
    index: '04',
    title: 'Course Recommendation Engine',
    subtitle: 'Web-scraped data + clustering-based recommendations',
    domain: 'Unsupervised ML · Data Eng',
    year: '2024',
    summary:
      'An end-to-end recommender that scrapes university course data, engineers numerical features, and groups courses with three clustering strategies — K-Means, agglomerative hierarchical, and spectral — to surface similar courses to students.',
    highlights: [
      'Custom web-scraping pipeline to build the course dataset from scratch',
      'Three clustering algorithms compared: K-Means, hierarchical, spectral',
      'Feature engineering + similarity-based recommendation within clusters',
    ],
    stack: ['Python', 'Scikit-Learn', 'BeautifulSoup', 'Pandas'],
    why: 'It pairs two in-demand skills in one project: the data engineering to acquire messy real data, and the unsupervised ML to structure it. Clustering + recommendation is the backbone of personalization systems everywhere.',
    link: {
      label: 'View on GitHub',
      href: 'https://github.com/JohnKang0720/course_recommender',
    },
  },
  {
    id: 'hotel-svd',
    index: '05',
    title: 'Hotel Recommender (SVD)',
    subtitle: 'Matrix factorization vs. item-based collaborative filtering',
    domain: 'Recommender Systems',
    year: '2024',
    summary:
      'A recommendation study that decomposes the user–hotel interaction matrix with Singular Value Decomposition to learn latent preference factors, benchmarked against an item-based cosine-similarity baseline.',
    highlights: [
      'SVD matrix factorization to learn latent user & item factors',
      'Item-based collaborative filtering baseline for comparison',
      'Analysis of the trade-offs between memory-based and model-based recsys',
    ],
    stack: ['Python', 'NumPy', 'Scikit-Learn', 'SciPy'],
    why: 'Latent-factor models are the same mathematical family as the embeddings powering modern retrieval and LLM search. Recommender/personalization skills are a perennial revenue-driver for consumer tech.',
    link: {
      label: 'View on GitHub',
      href: 'https://github.com/JohnKang0720/Hotel-Recommendation',
    },
  },
  {
    id: 'swish',
    index: '06',
    title: 'Swish or Brick',
    subtitle: 'NBA shot-quality classification, end to end',
    domain: 'Supervised ML · Analytics',
    year: '2024',
    summary:
      'A full ML lifecycle on NBA shot data: exploration, feature engineering over shot distance, shot-clock, and player context, then a classifier that separates good shots from bad — with standard classification metrics and visual diagnostics.',
    highlights: [
      'Complete pipeline: EDA → feature engineering → model → evaluation',
      'Domain features from shot distance, shot clock, and player context',
      'Interpretable shot-quality classification with visual diagnostics',
    ],
    stack: ['Python', 'Scikit-Learn', 'Pandas', 'Matplotlib', 'Seaborn'],
    why: 'Sports analytics is a crowded-but-loved way to prove the full supervised-learning lifecycle. The muscle — framing a business question, engineering features, and validating honestly — is what every DS role tests.',
    link: {
      label: 'View on GitHub',
      href: 'https://github.com/JohnKang0720/swish-or-brick',
    },
  },
]

export type Experience = {
  role: string
  org: string
  location: string
  period: string
  blurb: string
  points: string[]
  tags: string[]
}

export const EXPERIENCE: Experience[] = [
  {
    role: 'Data Scientist',
    org: 'Workstream',
    location: 'Burnaby, BC',
    period: 'Jan 2026 – Aug 2026',
    blurb:
      'Owned agentic AI and the data platform for a QSR-focused HR/payroll company.',
    points: [
      'Built a multi-agent legal-compliance platform for QSR franchises using incremental dbt models and automated CI checks to flag statutory violations — cutting manual compliance review time by 73%.',
      'Developed a FastAPI + LangChain text-to-SQL agent backed by custom MCP servers and embedding-based retrieval over Snowflake, reducing ad-hoc analytics requests by 30%.',
      'Built a self-evolving LLM-as-a-Judge evaluation loop that scores agent responses against a rubric and auto-refines its own prompts, catching regressions pre-release.',
      'Containerized and deployed the agent suite with Docker + Kubernetes on AWS EKS, with GitHub Actions CI/CD.',
      'Built and maintained ELT pipelines landing 5+ SaaS sources into Snowflake, plus a custom pipeline into Datadog for mobile performance.',
    ],
    tags: ['Agentic AI', 'LangChain', 'MCP', 'dbt', 'Snowflake', 'Kubernetes'],
  },
  {
    role: 'Data Analyst',
    org: 'British Columbia Lottery Corporation',
    location: 'Vancouver, BC',
    period: 'Jan 2025 – Aug 2025',
    blurb:
      'Experimentation, fraud detection, and causal uplift on a large gaming platform.',
    points: [
      'Designed and ran A/B tests with power-analysis-driven sample sizing to optimize slot return-to-player; the winning variant lifted digital GGR by 8%.',
      'Developed an Isolation Forest anomaly-detection service to streamline automated fraud review.',
      'Built player segmentation (Gaussian Mixture Models) and uplift modeling (X-Learner, CATE) to target high-responsiveness players — informing campaigns credited with $1M+ incremental Q4 revenue.',
    ],
    tags: ['A/B Testing', 'Causal Inference', 'Uplift / CATE', 'GMM', 'Isolation Forest'],
  },
  {
    role: 'Machine Learning Engineer (Part-Time)',
    org: 'UBC MINT',
    location: 'Vancouver, BC',
    period: 'Sep 2024 – Jul 2025',
    blurb: 'Neurotech research decoding movement intention from EEG.',
    points: [
      'Built a CNN-LSTM hybrid model for EEG motor-imagery decoding, reaching 82% classification accuracy via optimized spatio-temporal feature extraction.',
      'Engineered a robust feature-extraction pipeline using Riemannian geometry (signal covariance + tangent-space mapping) to keep decoding accurate despite noise and session variability.',
      'Prevented data leakage by enforcing strict causal temporal splitting between train and test windows.',
    ],
    tags: ['PyTorch', 'EEG', 'Riemannian Geometry', 'Time-Series'],
  },
]

export const RESEARCH = {
  role: 'Undergraduate Researcher — PIVAE',
  org: 'Tang Lab, UBC',
  period: '2025',
  blurb:
    'Built and evaluated Poisson Identifiable VAEs (PIVAE) for latent modeling of neural spike data, stress-testing robustness across sessions and subjects.',
}

export type BlogPost = {
  id: string
  title: string
  kicker: string
  date: string
  readingTime: string
  tags: string[]
  excerpt: string
  // Body is rendered as lightweight markdown-ish blocks (see BlogModal).
  body: string
}
