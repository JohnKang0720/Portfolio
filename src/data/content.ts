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
  linkedin: 'https://www.linkedin.com/in/gyo-jin-kang-877634211/',
  resume: import.meta.env.BASE_URL + 'Gyo-Jin-Kang-Resume.pdf?v=3',
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
  demo?: string // live demo URL
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
    id: 'hotel-svd',
    index: '02',
    title: 'Hotel Recommender — SVD from scratch',
    subtitle: 'Power-iteration SVD + FunkSVD, benchmarked on ranking',
    domain: 'Recommender Systems · Linear Algebra',
    year: '2025',
    summary:
      'Matrix factorization built from first principles: a hand-written power-iteration SVD (matches NumPy to ~1e-14) plus FunkSVD trained only on the ratings that exist. That fixes the missing-as-zero bug that broke the original and beats item-based CF and mean-imputed SVD on RMSE, Recall@K and NDCG.',
    highlights: [
      'From-scratch power-iteration SVD + deflation, validated against NumPy',
      'FunkSVD (observed-only SGD) wins: RMSE 0.71 vs 1.09 for plain SVD',
      'Interactive latent-space map + matrix-completion heatmaps',
    ],
    stack: ['NumPy', 'scikit-learn', 'Plotly', 'Streamlit'],
    why: 'Latent-factor models are the same math behind the embeddings powering modern retrieval and LLM search — this shows I understand recsys, not just call .fit().',
    demo: 'https://johnkang0720.github.io/Hotel-Recommendation/',
    link: { label: 'GitHub', href: 'https://github.com/JohnKang0720/Hotel-Recommendation' },
  },
  {
    id: 'ghostwriter',
    index: '03',
    title: 'Ghostwriter — Human vs. AI text',
    subtitle: 'Detecting LLM-generated writing, in the browser',
    domain: 'NLP · LLM Safety',
    year: '2025',
    summary:
      'Three detectors decide if text was written by a human or an LLM: a stylometric logistic model, gradient boosting over cross-fit n-gram perplexity, and a BiLSTM with attention. The attention model hits 0.98 AUC, and the whole thing runs client-side with token-level "AI-ness" highlighting.',
    highlights: [
      'BiLSTM + attention detector at 0.98 AUC (the ported core of my NLP work)',
      'Cross-fit perplexity so held-out human text isn\'t mis-flagged',
      'Runs entirely in-browser via ONNX / Transformers.js',
    ],
    stack: ['PyTorch', 'Transformers', 'ONNX', 'Transformers.js'],
    why: 'AI-text detection and content authenticity is one of the hottest text problems, and attention is the conceptual core of every transformer.',
    demo: 'https://johnkang0720.github.io/hate-speech-detection/',
    link: { label: 'GitHub', href: 'https://github.com/JohnKang0720/hate-speech-detection' },
  },
  {
    id: 'captioning',
    index: '04',
    title: 'Assistive Image Captioning',
    subtitle: 'Show, Attend & Tell — captions with per-word attention + speech',
    domain: 'Multimodal · Vision-Language',
    year: '2025',
    summary:
      'A ViT/CNN encoder feeds an attention LSTM decoder I trained on Flickr8k (BLEU-4 0.18). For every word it generates, it shows the image region it looked at — and reads the caption aloud, aimed at describing scenes for people who can\'t see them.',
    highlights: [
      'Attention decoder trained from scratch (Show, Attend & Tell), BLEU-4 0.18',
      'Per-word attention heatmaps overlaid on the image',
      'Text-to-speech accessibility demo, running in-browser',
    ],
    stack: ['PyTorch', 'ViT / ResNet', 'ONNX', 'Web Speech API'],
    why: 'Multimodal vision-language is the current frontier, and the attention maps prove the model genuinely learned where to look.',
    demo: 'https://johnkang0720.github.io/Caption-Generator/',
    link: { label: 'GitHub', href: 'https://github.com/JohnKang0720/Caption-Generator' },
  },
  {
    id: 'unet',
    index: '05',
    title: 'Breast Cancer U-Net Segmentation',
    subtitle: 'In-browser tumor segmentation on ultrasound',
    domain: 'Computer Vision · Medical',
    year: '2025',
    summary:
      'A U-Net trained with a Dice + BCE loss and paired augmentation to segment tumors in breast-ultrasound scans (Dice 0.62 on the hard malignant subset). Exported to ONNX and running client-side — upload a scan and get a mask overlay in real time.',
    highlights: [
      'Dice + BCE loss and augmentation; honest eval including a failure case',
      'ONNX export running fully in-browser via ONNX Runtime Web',
      'Responsible-AI model card — research demo, not a medical device',
    ],
    stack: ['PyTorch', 'ONNX', 'onnxruntime-web', 'NumPy'],
    why: 'Medical imaging is a durable, high-impact CV market, and segmentation fluency (U-Net, Dice, skip connections) transfers straight to healthcare and QA.',
    demo: 'https://johnkang0720.github.io/breast-cancer-unet/',
    link: { label: 'GitHub', href: 'https://github.com/JohnKang0720/breast-cancer-unet' },
  },
  {
    id: 'course-search',
    index: '06',
    title: 'Course Semantic Search',
    subtitle: 'Embeddings + vector search over 1,200 UBC courses',
    domain: 'NLP · Retrieval',
    year: '2025',
    summary:
      'Search the UBC Science catalog by meaning, not keywords. Course descriptions are embedded with MiniLM; your query is embedded in the browser (Transformers.js) and matched by nearest-neighbor. K-Means clusters color an interactive topic map where your results light up.',
    highlights: [
      'MiniLM embeddings + cosine kNN over 1,203 scraped courses',
      'Query embedded in-browser — zero backend, instant search',
      'Interactive UMAP topic map with a K-Means clustering baseline',
    ],
    stack: ['sentence-transformers', 'FAISS', 'Transformers.js', 'scikit-learn'],
    why: 'Embeddings and vector search are the core of today\'s RAG and retrieval systems, here on real scraped data with a zero-backend deploy.',
    demo: 'https://johnkang0720.github.io/course_recommender/',
    link: { label: 'GitHub', href: 'https://github.com/JohnKang0720/course_recommender' },
  },
  {
    id: 'ecg',
    index: '07',
    title: 'ECG Anomaly Monitor',
    subtitle: 'Real-time heartbeat screening with a conv-autoencoder',
    domain: 'Time-Series · Anomaly Detection',
    year: '2025',
    summary:
      'A 1-D convolutional autoencoder trained only on normal heartbeats flags arrhythmias by reconstruction error (AUC 0.976, beating an Isolation Forest baseline). A live in-browser monitor streams an ECG and lights up abnormal beats as they scroll past.',
    highlights: [
      'One-class conv-autoencoder, AUC 0.976 vs 0.948 for Isolation Forest',
      'Reconstruction-error scoring with a calibrated threshold',
      'Live streaming monitor running the model in-browser (ONNX)',
    ],
    stack: ['PyTorch', 'ONNX', 'onnxruntime-web', 'scikit-learn'],
    why: 'Streaming plus anomaly detection transfers directly to monitoring, fraud, and observability — always-in-demand systems work.',
    demo: 'https://johnkang0720.github.io/ecg_anomaly_detection/',
    link: { label: 'GitHub', href: 'https://github.com/JohnKang0720/ecg_anomaly_detection' },
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

export type DiagramKind = 'loop' | 'hub' | 'pipeline' | 'gate' | 'pca' | 'vae'

export type BlogPost = {
  id: string
  title: string
  kicker: string
  date: string
  readingTime: string
  tags: string[]
  excerpt: string
  diagram: DiagramKind
  // Body is rendered as lightweight markdown-ish blocks (see BlogModal).
  body: string
}
