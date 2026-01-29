// ============================================================
// ITA 2026 Plenary Sessions
// ============================================================
//
// MISSING ITEMS TO ADD:
//
// IMAGES NEEDED (save to ../img2026/plenary-profile-pics/):
//   - abbasElGamal.jpg (Abbas El Gamal)
//   - benRecht.jpg (Ben Recht)
//   - nisheethVishnoi.jpg (Nisheeth Vishnoi)
//   - moderator images as needed
//
// WEBSITE URLs NEEDED:
//   - Adam Kalai
//   - Muriel Medard
//   - Mingyan Liu
//   - Bane Vasic
//   - Ilias Diakonikolas
//   - David Woodruff
//   - Prabhakar Raghavan
//   - Sergei Gukov
//   - Abbas El Gamal
//   - Ben Recht
//   - Nisheeth Vishnoi
//
// BIOS NEEDED:
//   - Ilias Diakonikolas
//   - Jerry Li
//   - David Woodruff
//   - Prabhakar Raghavan
//   - Abbas El Gamal
//   - Ben Recht
//   - Nisheeth Vishnoi
//
// TITLES/ABSTRACTS NEEDED:
//   - Flavio Calmon (for 2026)
//   - Ilias Diakonikolas
//   - Jerry Li
//   - Dimitry Drusvyatskiy
//   - Prabhakar Raghavan
//   - Abbas El Gamal
//   - Ben Recht
//   - Nisheeth Vishnoi
//
// MODERATOR INFO NEEDED:
//   - All days need moderator info (name, pic, bio, affiliation)
//
// ============================================================

// TODO: Uncomment and update paths once images are added
import AdamKalaiImg from '../img2026/plenary-profile-pics/adamKalai.jpg';
import MurielMedardImg from '../img2026/plenary-profile-pics/murielMedard.jpg';
import KrishnaNarayananImg from '../img2026/plenary-profile-pics/krishnaNarayanan.jpg';
import MingyanLiuImg from '../img2026/plenary-profile-pics/mingyanLiu.jpg';
import BaneVasicImg from '../img2026/plenary-profile-pics/baneVasic.jpg';
import IliasDiakonikolasImg from '../img2026/plenary-profile-pics/iliasDiakonikolas.jpg';
import JerryLiImg from '../img2026/plenary-profile-pics/jerryLi.jpg';
import DimaDrusvyatskiyImg from '../img2026/plenary-profile-pics/dimaDrusvyatskiy.jpg';
import DavidWoodruffImg from '../img2026/plenary-profile-pics/davidWoodruff.jpg';
import PrabhakarRaghavanImg from '../img2026/plenary-profile-pics/prabhakarRaghavan.jpg';
import SergeiGukovImg from '../img2026/plenary-profile-pics/sergeiGukov.jpg';
// import AbbasElGamalImg from '../img2026/plenary-profile-pics/abbasElGamal.jpg';
// import BenRechtImg from '../img2026/plenary-profile-pics/benRecht.jpg';
// import NisheethVishnoiImg from '../img2026/plenary-profile-pics/nisheethVishnoi.jpg';

import FlavioImg from '../img2025/plenary-profile-pics/flavio.jpg';

// Placeholder for missing images - replace with actual imports
const PlaceholderImg = null;

const mondayTalks = [
  {
    presenter: {
      name: 'Adam Kalai',
      picUrl: AdamKalaiImg,
      websiteUrl: '', // TODO: Add website URL
      affiliation: 'OpenAI',
      bio: `Adam Tauman Kalai is a Research Scientist at OpenAI, specializing in AI Safety and Ethics. His research interests also include algorithms, fairness, AI theory, game theory, and crowdsourcing. He has served as an Assistant Professor at TTIC and Georgia Tech and a Senior Principal Researcher at Microsoft Research New England. He is also a member of Project CETI's science team. He is the inaugural recipient of the Majulook Prize.`,
    },
    title: 'Consensus Sampling for Safer Generative AI',
    abstract: `I will briefly overview AI alignment as an information theoretic challenge and then illustrate with a specific sampling algorithm. A generative AI model is simply a probability distribution over outputs, conditional on a given prompt. Building on this view, I'll present consensus sampling: given k distributions and a prompt, we sample only when the distributions sufficiently agree, and otherwise abstain. We show the resulting system attains risk competitive with the average risk of the safest s models (for a chosen s), without knowing which models are safe, and we bound the abstention probability when enough safe models have adequate "overlap." The approach is model-agnostic and inspired by provable copyright-protection techniques, offering a clean risk–coverage tradeoff for safer generation.

Joint work with: Yael Tauman Kalai (MIT) and Or Zamir (Tel Aviv University)`,
    award: '',
  },
  {
    presenter: {
      name: 'Muriel Médard',
      picUrl: MurielMedardImg,
      websiteUrl: '', // TODO: Add website URL
      affiliation: 'MIT',
      bio: `Muriel Médard is the co-founder of Optimum, and holds the NEC Chair of Software Science and Engineering for the School of Engineering at MIT, and is a Professor in EECS. She obtained three Bachelors degrees, her M.S. and Sc.D, all from MIT. Muriel is a Member of the US National Academy of Engineering (elected 2020), a Member of the German National Academy of Sciences Leopoldina (elected 2022), a Fellow of the US National Academy of Inventors (elected 2018), American Academy of Arts and Sciences (elected 2021), and a Fellow of the Institute of Electrical and Electronics Engineers (elected 2008). She holds Honorary Doctorates from the Technical University of Munich (2020), the University of Aalborg (2022) and the Budapest University of Technology and Economics (2023). Muriel was awarded the 2022 IEEE Kobayashi Computers and Communications Award and the 2026 Hamming Medal. She received the 2019 Best Paper award for IEEE Transactions on Network Science and Engineering, the 2018 ACM SIGCOMM Test of Time Paper Award, as well as nine conference paper awards. Muriel served as the Editor-in-Chief (EIC) of IEEE Transactions on Information Theory, and was EiC of IEEE JSAC. She was president of the IEEE Information Theory Society. Muriel received the inaugural MIT Postdoctoral Association Mentoring Award in 2022, the inaugural MIT EECS Graduate Student Association Mentor Award, voted by the students, in 2013. She set up the Women in the Information Theory Society (WithITS) and Information Theory Society Mentoring Program. She was recognized with the 2017 IEEE Aaron Wyner Distinguished Service Award. Muriel has over seventy US and international patents awarded, the vast majority of which have been licensed or acquired. Muriel has supervised over 40 master students, over 20 doctoral students and over 25 postdoctoral fellows.`,
    },
    title: 'Coding for Decentralized Data in Web3',
    abstract: `Traditional computing follows the von Neumann architecture that has underpinned decades of innovation. In this paradigm a compute/control unit interacts with read/write memory via a bus and therefore crucially relies on memory and access to it.

Web3 has developed technologies such as virtual machines (VMs), that map onto von Neumann's compute/control framework. Data propagation (bus) and access (read/write memory), however present critical constraints in decentralized environments.

We introduce a decentralized high-performance memory infrastructure that utilizes randomized network coding to derive the fastest and most efficient Web3 protocol to date.`,
    award: '',
  },
  {
    presenter: {
      name: 'Krishna Narayanan',
      picUrl: KrishnaNarayananImg,
      websiteUrl: 'https://engineering.tamu.edu/electrical/profiles/knarayanan.html',
      affiliation: 'Texas A&M',
      bio: `Krishna Narayanan is the Sanchez chair professor in the Dept. of Electrical and Computer Engineering at Texas A&M University. He recently held visiting positions at Qualcomm research and at the Simons Institute for Theory of Computing. His research interests are broadly in coding theory, information theory, signal processing, and machine learning with applications to wireless communications. He received the 2025 SPAWC best paper award, the 2022 joint communications society and information theory best paper award, the 2020 best paper award in data storage from the IEEE communications society and a university-level distinguished teaching award in 2018.`,
    },
    title: 'Compression and Estimation: Transformers and Classical Problems in Information Theory',
    abstract: `Transformer models achieve strong empirical performance through accurate next-token prediction and in-context adaptation from limited context. This talk explores how these capabilities can be leveraged and interpreted in canonical problems in information theory, with an emphasis on lossless compression and estimation. We first revisit lossless compression via the well-known predict-then-code paradigm, showing that modern language models, when coupled with arithmetic coding, can yield exceptional compression. We then consider channel estimation in communication systems, casting channel estimation as an in-context estimation problem in which observations depend on unknown latent parameters. Recent results suggest that attention-based transformers can act as adaptive estimators that implicitly perform Bayesian inference. Together, these examples illustrate how transformer models and, more broadly, generative models can help us revisit classical problems in information theory and communication theory when common simplifying assumptions break down.`,
    award: '',
  },
];

const tuesdayTalks = [
  {
    presenter: {
      name: 'Mingyan Liu',
      picUrl: MingyanLiuImg,
      websiteUrl: '', // TODO: Add website URL
      affiliation: 'University of Michigan',
      bio: `Mingyan Liu is the T. C. Chang Professor of Engineering, a professor of Electrical Engineering & Computer Science, and the Associate Dean for Academic Affairs of the College of Engineering at the University of Michigan, Ann Arbor. She received her Ph.D. Degree in electrical engineering from the University of Maryland, College Park, in 2000 and has been with the University of Michigan ever since. Her research interests are in resource allocation, sequential decision and learning theory, game theory and incentive mechanisms, with applications to large-scale networked systems, cybersecurity and cyber risk quantification. Some of her research in this space has been successfully commercialized. She is a Fellow of the IEEE and a member of the ACM.`,
    },
    title: 'Transforming Cybersecurity Research with AI-Assisted Data Curation',
    abstract: `Annotating security, privacy, and related regulatory documents, often written in an unstructured manner, has long been a prohibitively difficult and labor-intensive effort that has prevented the research community from extracting and obtaining valuable information that could enable critical analysis and inform policy making. A prime example is the analysis of corporate privacy policies: prior to the modern AI era, the largest such study consisted of a few hundred policies annotated by legal scholars. The emergence of LLMs has completely transformed our ability to automate document annotation (or producing structured data) scalably. In this talk, I present two AI pipelines for the large-scale acquisition and curation of such data, generating highly accurate and consistent annotations. The first, using a corpus of public/news reports, resulted in a unique large-scale dataset of ransomware incidents with fine-grained features, the largest of this nature to the best of our knowledge. The second, using over 10,000 corporate privacy policies obtained through web crawls, resulted in a first-ever large-scale dataset on what user data is being collected, its purpose, how data is handled and protected, and user rights. Furthermore, I will showcase interesting analysis such structured data has enabled, such as, in the former, testing the hypothesis that a large ransom payment (or a high-profile refusal to pay) has an encouraging (or deterring) downstream effect, the impact and evolution of double extortion, and the difference in payment attitude across different industries; and in the latter, quantifying the inherent tension between corporate interests, consumer protection, and compliance requirement, and why some do better than others. All our datasets are publicly available and we welcome more researchers to use them.`,
    award: '',
  },
  {
    presenter: {
      name: 'Bane Vasic',
      picUrl: BaneVasicImg,
      websiteUrl: '', // TODO: Add website URL
      affiliation: 'University of Arizona',
      bio: `Dr. Bane Vasić is a Professor of Electrical and Computer Engineering and Mathematics at the University of Arizona and Director of the Error Correction Laboratory. At Bell Labs and the University of Arizona, he has made key contributions to the design of data storage read channels and structured low-density parity-check (LDPC) codes, as well as their decoding algorithms. Dr. Vasić leads the Quantum Error Correction Group within a U.S. Department of Energy multi-institutional research center led by Fermi National Accelerator Laboratory. His research on quantum codes has been supported by NASA's Jet Propulsion Laboratory and the National Science Foundation. He is an IEEE Fellow, a Fulbright Scholar, and a past Chair of the IEEE Data Storage Technical Committee. He is a co-founder of Codelucida, a company providing advanced error correction solutions for flash memories worldwide since 2012, and a co-founder of QEC Labs, a startup developing QLDPC codes for quantum computers.`,
    },
    title: 'Coding Theory for Fault Tolerance of Quantum Algorithms',
    abstract: `While much of the early research in quantum error correction (QEC) focused on stabilizing quantum memories, recent efforts have increasingly shifted toward understanding how QEC can be deployed within fault-tolerant quantum algorithms. Although reliable quantum memory remains a fundamental requirement, the long-term promise of quantum computing lies not merely in preserving quantum information, but in executing nontrivial quantum computations in the presence of noise. This shift in perspective raises deeper questions about how errors propagate during quantum algorithms and how QEC must be integrated dynamically with computation. In this talk, we discuss the principles of fault-tolerant quantum computation, the role of logical operations compatible with error-correcting codes, and the necessity of incorporating QEC throughout the computational process.
In particular, we show how sparse stabilizer codes—commonly referred to as quantum low-density parity-check (QLDPC) codes—which have risen to the forefront of QEC research in recent years, can be naturally embedded within Pauli measurement-based quantum computation, itself a leading candidate architecture for fault-tolerant quantum computing. We discuss how this framework provides leads to new and challenging coding-theory problems, and why progress on these problems and new ideas are essential for realization of practical, large-scale quantum computing systems.`,
    award: '',
  },
  {
    presenter: {
      name: 'Flavio Calmon',
      picUrl: FlavioImg,
      websiteUrl: 'https://people.seas.harvard.edu/~flavio/#',
      affiliation: 'Harvard University',
      bio: `Flavio P. Calmon is the Thomas D. Cabot Associate Professor of Electrical Engineering at the Harvard John A. Paulson School of Engineering and Applied Sciences. Before joining Harvard, he was the inaugural Data Science for Social Good Post-Doctoral Fellow at IBM Research in Yorktown Heights, New York. He received his Ph.D. in Electrical Engineering and Computer Science at MIT. His research develops the information-theoretic foundations of trustworthy and reliable machine learning. Prof. Calmon received the 2024 James L. Massey Award from the IEEE Information Theory Society, the NSF CAREER award, faculty awards from Google, IBM, and Amazon, and the Harvard Dean of Undergraduate Studies Commendation for "Extraordinary Teaching during Extraordinary Times." He also received the inaugural "Título de Honra ao Mérito" (Honor to the Merit Title) given to alumni from the Universidade de Brasília (Brazil).`,
    },
    title: '', // TODO: Add title for 2026
    abstract: '', // TODO: Add abstract for 2026
    award: '',
  },
];

const wednesdayTalks = [
  {
    presenter: {
      name: 'Ilias Diakonikolas',
      picUrl: IliasDiakonikolasImg,
      websiteUrl: '', // TODO: Add website URL
      affiliation: 'University of Wisconsin',
      bio: '', // TODO: Add bio
    },
    title: '', // TODO: Add title
    abstract: '', // TODO: Add abstract
    award: '',
  },
  {
    presenter: {
      name: 'Jerry Li',
      picUrl: JerryLiImg,
      websiteUrl: 'https://jerryzli.github.io',
      affiliation: 'University of Washington',
      bio: 'Jerry Li is an associate professor at the University of Washington. Previously, Li was a principal research scientist at Microsoft Research Redmond. In Fall 2018 Li was the VMware Research Fellow at the Simons Institute. He did his Ph.D. at MIT, where he was fortunate to work with Ankur Moitra. He also did his masters at MIT under the wonderful supervision of Nir Shavit.Li’s primary research interests are in learning theory, (very) broadly defined, including quantum information theory, the science of large foundation models, and high-dimensional statistics. He particularly likes applications of analysis and analytic techniques to TCS problems. As an undergrad at the University of Washington, Li worked on complexity of branching programs, and how we could prove hardness of techniques used for naturally arising learning problems in database theory and AI.',
    },
    title: '', // TODO: Add title
    abstract: '', // TODO: Add abstract
    award: '',
  },
  {
    presenter: {
      name: 'Dimitry Drusvyatskiy',
      picUrl: DimaDrusvyatskiyImg,
      websiteUrl: 'https://datascience.ucsd.edu/people/dima-drusvyatskiy/',
      affiliation: 'UCSD',
      bio: 'Dmitriy Drusvyatskiy received his PhD from the Operations Research and Information Engineering department at Cornell University in 2013, followed by a post doctoral appointment in the Combinatorics and Optimization department at University of Waterloo, 2013-2014. He joined the Mathematics department at University of Washington as an Assistant Professor in 2014 and was promoted to Full Professor in 2022. Since 2025, Dmitriy is a Professor at the Halıcıoğlu Data Science Institute (HDSI) at UC San Diego. Dmitriy’s research broadly focuses on designing and analyzing algorithms for large-scale optimization problems, primarily motivated by applications in data science. Dmitriy has received a number of awards, including the Air Force Office of Scientific Research (AFOSR) Young Investigator Program (YIP) Award, NSF CAREER, SIAG/OPT Best Paper Prize 2023, Paul Tseng Faculty fellowship 2022-2026, INFORMS Optimization Society Young Researcher Prize 2019, and finalist citations for the Tucker Prize 2015 and the Young Researcher Best Paper Prize at ICCOPT 2019.'
    },
    title: '', // TODO: Add title
    abstract: '', // TODO: Add abstract
    award: '',
  },
];

const thursdayTalks = [
  {
    presenter: {
      name: 'David Woodruff',
      picUrl: DavidWoodruffImg,
      websiteUrl: '', // TODO: Add website URL
      affiliation: 'CMU', // TODO: Add affiliation
      bio: '', // TODO: Add bio
    },
    title: 'AI-Aided Research',
    abstract: `In this talk, I will present results on how AI can enhance and accelerate the research process. I will also describe an experiment we conducted for STOC 2026 in which AI improved many of the submitted manuscripts.`,
    award: '',
  },
  {
    presenter: {
      name: 'Prabhakar Raghavan',
      picUrl: PrabhakarRaghavanImg,
      websiteUrl: 'https://research.google/people/prabhakarraghavan/?&',
      affiliation: 'Google',
      bio: 'Prabhakar Raghavan is the Chief Technologist at Google. He was previously Senior Vice President for Google’s Knowledge & Information products, including Google Search, Geo, and Ads & Commerce. Prabhakar’s research interests span algorithms, web search, and databases. He is the co-author of two widely-used graduate texts, Randomized Algorithms and Introduction to Information Retrieval. He is a Fellow of the IEEE, a Fellow of the ACM, a member of the US National Academy of Engineering, and a recipient of a Laurea Honoris Causa from the University of Bologna.',
    },
    title: '', // TODO: Add title
    abstract: 'In this talk we share our experience using LLMs to prove new results in mathematics and computer science. While it is too soon to derive definitive conclusions about the power of AI in Math/CS research, these results show promise. Specifically, we describe our experience with AlphaEvolve, an evolutionary language model from Google Deepmind, and suggest that our results in the theory of inapproximability and Ramsey theory could not have been discovered by hand. ',
    award: '',
  },
  {
    presenter: {
      name: 'Sergei Gukov',
      picUrl: SergeiGukovImg,
      websiteUrl: '', // TODO: Add website URL
      affiliation: 'Caltech',
      bio: `After receiving his PhD from Princeton University, Sergei Gukov spent five years at Harvard University as a research fellow of the Clay Mathematics Institute and two years at the school of mathematics at the Institute for Advanced Studies, Princeton. His passion is building new bridges between different areas of mathematical physics and pure mathematics, such as quantum topology, mirror symmetry, and gauge theory. His more recent interests involve new connections between mathematics and machine learning.`,
    },
    title: 'The role of AI in mathematical (re)search',
    abstract: `At its core, scientific research is a search — a search for new ideas, new patterns, and new ways to explain or prove things. In this talk, I invite you to explore how AI is reshaping different stages of this process. We will see that while AI excels at many tasks, it still hesitates on others, such as long-horizon reasoning or far-out-of-distribution generalization. I view this as good news: it highlights how much meaningful AI research remains to be done. In fact, the goal of expanding AI's role in mathematical research has become a motivation for advancing AI itself. I am genuinely excited that these two fields have come into such close contact over the past few years.`,
    award: '',
  },
];

// Thursday Special Plenary - "Information without borders"
const thursdaySpecialTalks = [
  {
    presenter: {
      name: 'Abbas El Gamal',
      picUrl: PlaceholderImg, // TODO: Replace with AbbasElGamalImg
      websiteUrl: '', // TODO: Add website URL
      affiliation: '', // TODO: Add affiliation
      bio: '', // TODO: Add bio
    },
    title: '', // TODO: Add title
    abstract: '', // TODO: Add abstract
    award: '',
  },
  {
    presenter: {
      name: 'Ben Recht',
      picUrl: PlaceholderImg, // TODO: Replace with BenRechtImg
      websiteUrl: '', // TODO: Add website URL
      affiliation: '', // TODO: Add affiliation
      bio: '', // TODO: Add bio
    },
    title: '', // TODO: Add title
    abstract: '', // TODO: Add abstract
    award: '',
  },
  {
    presenter: {
      name: 'Nisheeth Vishnoi',
      picUrl: PlaceholderImg, // TODO: Replace with NisheethVishnoiImg
      websiteUrl: '', // TODO: Add website URL
      affiliation: '', // TODO: Add affiliation
      bio: '', // TODO: Add bio
    },
    title: '', // TODO: Add title
    abstract: '', // TODO: Add abstract
    award: '',
  },
];

// Friday - Coming soon (no speakers yet)
const fridayTalks = [];

export const plenarySessions = [
  {
    dayName: 'Monday',
    topic: 'Algorithms and codes',
    moderator: {
      name: '', // TODO: Add moderator name
      picUrl: PlaceholderImg,
      websiteUrl: '',
      affiliation: '',
      bio: '',
    },
    moderatorTalk: {
      title: '',
      abstract: '',
    },
    talks: mondayTalks,
  },
  {
    dayName: 'Tuesday',
    topic: 'Trends in Information Theory',
    moderator: {
      name: '', // TODO: Add moderator name
      picUrl: PlaceholderImg,
      websiteUrl: '',
      affiliation: '',
      bio: '',
    },
    moderatorTalk: {
      title: '',
      abstract: '',
    },
    talks: tuesdayTalks,
  },
  {
    dayName: 'Wednesday',
    topic: 'AI Theory',
    moderator: {
      name: '', // TODO: Add moderator name
      picUrl: PlaceholderImg,
      websiteUrl: '',
      affiliation: '',
      bio: '',
    },
    moderatorTalk: {
      title: '',
      abstract: '',
    },
    talks: wednesdayTalks,
  },
  {
    dayName: 'Thursday',
    topic: 'AI for Research',
    moderator: {
      name: '', // TODO: Add moderator name
      picUrl: MingyanLiuImg,
      websiteUrl: '',
      affiliation: '',
      bio: '',
    },
    moderatorTalk: {
      title: '',
      abstract: '',
    },
    talks: thursdayTalks,
  },
  {
    dayName: 'Friday',
    topic: 'Coming soon',
    moderator: {
      name: '',
      picUrl: PlaceholderImg,
      websiteUrl: '',
      affiliation: '',
      bio: '',
    },
    moderatorTalk: {
      title: '',
      abstract: '',
    },
    talks: fridayTalks,
  },
];

// Special Plenary Session - Thursday "Information without borders"
export const specialPlenarySession = {
  dayName: 'Thursday',
  topic: 'Information without borders',
  talks: thursdaySpecialTalks,
};
