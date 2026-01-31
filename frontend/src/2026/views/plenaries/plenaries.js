// ============================================================
// ITA 2026 Plenary Sessions
// ============================================================
//
// MISSING ITEMS TO ADD:
//
// IMAGES NEEDED (save to ../img2026/plenary-profile-pics/):
//   - moderator images as needed
//

//
// BIOS NEEDED:
//   - Ilias Diakonikolas
//   - Jerry Li
//   - David Woodruff
//   - Prabhakar Raghavan
//
// TITLES/ABSTRACTS NEEDED:
//   - Flavio Calmon (for 2026)
//   - Ilias Diakonikolas
//   - Jerry Li
//   - Dimitry Drusvyatskiy
//   - Prabhakar Raghavan
//   - Nisheeth Vishnoi
//
// MODERATOR INFO NEEDED:
//   - All days need moderator info (name, pic, bio, affiliation)
//
// ============================================================

// TODO: Uncomment and update paths once images are added
import AdamKalaiImg from '../img2026/plenary-profile-pics/adamKalai.jpg';
import KrishnaNarayananImg from '../img2026/plenary-profile-pics/krishnaNarayanan.jpg';
import MingyanLiuImg from '../img2026/plenary-profile-pics/mingyanLiu.jpg';
import BaneVasicImg from '../img2026/plenary-profile-pics/baneVasic.jpg';
import IliasDiakonikolasImg from '../img2026/plenary-profile-pics/iliasDiakonikolas.jpg';
import JerryLiImg from '../img2026/plenary-profile-pics/jerryLi.jpg';
import DimaDrusvyatskiyImg from '../img2026/plenary-profile-pics/dimaDrusvyatskiy.jpg';
import DavidWoodruffImg from '../img2026/plenary-profile-pics/davidWoodruff.jpg';
import PrabhakarRaghavanImg from '../img2026/plenary-profile-pics/prabhakarRaghavan.jpg';
import SergeiGukovImg from '../img2026/plenary-profile-pics/sergeiGukov.jpg';
import AbbasElGamalImg from '../img2026/plenary-profile-pics/abbasElGamal.jpg';
import BenRechtImg from '../img2026/plenary-profile-pics/benRecht.jpg';
import NisheethVishnoiImg from '../img2026/plenary-profile-pics/nisheethVishnoi.jpg';
import BaBakHassibiImg from '../img2026/plenary-profile-pics/babak.jpg';
import AryaImg from '../img2026/plenary-profile-pics/aryaMazumdar.jpg';

import FlavioImg from '../img2025/plenary-profile-pics/flavio.jpg';

// Placeholder for missing images - replace with actual imports
const PlaceholderImg = null;

// Helper function to extract last name from full name
const getLastName = (fullName) => {
  const parts = fullName.trim().split(' ');
  return parts[parts.length - 1].toLowerCase();
};

// Helper function to sort talks by presenter's last name
const sortByLastName = (talks) => {
  return [...talks].sort((a, b) =>
    getLastName(a.presenter.name).localeCompare(getLastName(b.presenter.name))
  );
};

const mondayTalks = [
  {
    presenter: {
      name: 'Adam Kalai',
      picUrl: AdamKalaiImg,
      websiteUrl: 'https://kal.ai/',
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
      name: 'Mingyan Liu',
      picUrl: MingyanLiuImg,
      websiteUrl: 'https://experts.umich.edu/1536-mingyan-liu',
      affiliation: 'University of Michigan',
      bio: `Mingyan Liu is the T. C. Chang Professor of Engineering, a professor of Electrical Engineering & Computer Science, and the Associate Dean for Academic Affairs of the College of Engineering at the University of Michigan, Ann Arbor. She received her Ph.D. Degree in electrical engineering from the University of Maryland, College Park, in 2000 and has been with the University of Michigan ever since. Her research interests are in resource allocation, sequential decision and learning theory, game theory and incentive mechanisms, with applications to large-scale networked systems, cybersecurity and cyber risk quantification. Some of her research in this space has been successfully commercialized. She is a Fellow of the IEEE and a member of the ACM.`,
    },
    title: 'Transforming Cybersecurity Research with AI-Assisted Data Curation',
    abstract: `Annotating security, privacy, and related regulatory documents, often written in an unstructured manner, has long been a prohibitively difficult and labor-intensive effort that has prevented the research community from extracting and obtaining valuable information that could enable critical analysis and inform policy making. A prime example is the analysis of corporate privacy policies: prior to the modern AI era, the largest such study consisted of a few hundred policies annotated by legal scholars. The emergence of LLMs has completely transformed our ability to automate document annotation (or producing structured data) scalably. In this talk, I present two AI pipelines for the large-scale acquisition and curation of such data, generating highly accurate and consistent annotations. The first, using a corpus of public/news reports, resulted in a unique large-scale dataset of ransomware incidents with fine-grained features, the largest of this nature to the best of our knowledge. The second, using over 10,000 corporate privacy policies obtained through web crawls, resulted in a first-ever large-scale dataset on what user data is being collected, its purpose, how data is handled and protected, and user rights. Furthermore, I will showcase interesting analysis such structured data has enabled, such as, in the former, testing the hypothesis that a large ransom payment (or a high-profile refusal to pay) has an encouraging (or deterring) downstream effect, the impact and evolution of double extortion, and the difference in payment attitude across different industries; and in the latter, quantifying the inherent tension between corporate interests, consumer protection, and compliance requirement, and why some do better than others. All our datasets are publicly available and we welcome more researchers to use them.`,
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
      name: 'Bane Vasic',
      picUrl: BaneVasicImg,
      websiteUrl: 'https://ece.engineering.arizona.edu/faculty-staff/faculty/bane-vasic',
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
      bio: `Flavio P. Calmon is the Thomas D. Cabot Associate Professor of Electrical Engineering at the Harvard John A. Paulson School of Engineering and Applied Sciences. Before joining Harvard, he was the inaugural Data Science for Social Good Post-Doctoral Fellow at IBM Research in Yorktown Heights, New York. He received his Ph.D. in Electrical Engineering and Computer Science from MIT. His research develops the information-theoretic foundations of trustworthy and reliable machine learning and artificial intelligence. In February 2026, he will join Google as a Visiting Faculty Researcher.
            Prof. Calmon received the 2024 James L. Massey Award from the IEEE Information Theory Society, the NSF CAREER award, faculty awards from Google, IBM, JPMorganChase, and Amazon, and the Harvard Dean of Undergraduate Studies Commendation for "Extraordinary Teaching during Extraordinary Times." He also received the inaugural "Título de Honra ao Mérito" (Honor to the Merit Title) given to alumni from the Universidade de Brasília (Brazil).`,
    },
    title: 'Inference-Time Information Theory',
    abstract: 'Large language models (LLMs) have rapidly evolved into systems capable of mathematical reasoning, code generation, and complex question-answering. How can we control these models without re-training them? \n In this talk, we argue that "inference-time" LLM operation, where we interact with these models post-training without modifying their weights, is fertile ground for information-theoretic methods. We focus on one challenge in particular: watermarking LLM-generated text. Watermarks enable authentication of text provenance and help curb misuse of machine-generated content. We present recent results establishing a close connection between LLM watermarking and coding theory, showing that classical tools such as the Plotkin bound yield fundamental limits on watermark performance. This perspective also informs the design of two practical watermarks: SimplexWater and HeavyWater. We show that these watermarks achieve high detection accuracy with minimal impact on text quality, even in low-entropy tasks such as code generation. We also briefly survey other inference-time challenges that can be addressed with information theory, such as inference-time alignment. These results illustrate a broader opportunity: as LLMs increasingly serve as black-box components of more complex systems, information and coding theory offer a principled toolkit for shaping, verifying, and controlling their outputs.',
    award: '',
  },
  {
    presenter: {
      name: 'Babak Hassibi',
      picUrl: BaBakHassibiImg,
      websiteUrl: 'https://www.ee.caltech.edu/people/hassibi',
      affiliation: 'Caltech',
      bio: 'Hassibi\'s research spans various aspects of information theory, signal processing, control theory, and machine learning. He has made contributions to the theory and practice of wireless communications and wireless networks, as well as to robust control, adaptive filtering and neural networks, network information theory, coding for control, phase retrieval, structured signal recovery, high dimensional statistics, epidemic spread in complex networks, and DNA micro-arrays. On the mathematical side, he is interested in linear algebra, with an emphasis on fast algorithms, random matrices, and group representation theory.',
    },
    title: '', // TODO: Add title
    abstract: '', // TODO: Add abstract
    award: '',
  },
];

const wednesdayTalks = [
  {
    presenter: {
      name: 'Ilias Diakonikolas',
      picUrl: IliasDiakonikolasImg,
      websiteUrl: 'http://www.iliasdiakonikolas.org/',
      affiliation: 'University of Wisconsin',
      bio: 'Ilias Diakonikolas is the Lubar Professor in the Department of Computer Sciences at UW Madison. He obtained a Diploma in electrical and computer engineering from the National Technical University of Athens and a Ph.D. in computer science from Columbia University where he was advised by Mihalis Yannakakis. Before moving to UW, he was an Andrew and Erna Viterbi Early Career Chair at USC and a faculty member at the University of Edinburgh. Prior to that, he was the Simons postdoctoral fellow in theoretical computer science at the University of California, Berkeley. His research is on the algorithmic foundations of massive data sets, in particular on designing efficient algorithms for fundamental problems in machine learning. He is a recipient of the ACM Grace Murray Hopper award, a Sloan Fellowship, an NSF CAREER Award, a Romnes Faculty Fellowship, a Google Faculty Research Award, a Marie Curie Fellowship, best paper awards at NeurIPS and COLT, the IBM Research Pat Goldberg Best Paper Award, and an honorable mention in the George Nicholson competition from the INFORMS society. Ilias wrote with Daniel Kane the textbook "Algorithmic High-dimensional Robust Statistics" published by Cambridge University Press.',
    },
    title: 'Learning Multi-Index Models',
    abstract: 'Multi-index models (MIMs) are functions that depend on the projection onto a low-dimensional subspace. These models provide a useful framework for analyzing a wide range of machine learning problems. In this talk, we will survey recent algorithmic work on learning MIMs. In particular, we will present a robust noise-tolerant learning algorithm that works for a broad class of MIMs, under standard distributional assumptions. As applications, we will demonstrate how this framework leads to faster noise-tolerant learning algorithms for multiclass linear classifiers, intersections of halfspaces, and constant depth ReLU networks.',
    award: '',
  },
  {
    presenter: {
      name: 'Jerry Li',
      picUrl: JerryLiImg,
      websiteUrl: 'https://jerryzli.github.io',
      affiliation: 'University of Washington',
      bio :'Jerry Li is an associate professor (without tenure) in the Paul G. Allen School of Computer Science & Engineering at the University of Washington. Previously, he was a principal research scientist at Microsoft Research Redmond. He received his PhD from Massachusetts Institute of Technology, where he was advised by Ankur Moitra. He was subsequently a postdoctoral researcher at the Simons Institute for the Theory of Computing as a VMware Research Fellowship recipient. His research lies at the intersection of theoretical computer science, machine learning, and quantum information, focusing on the computational and statistical limits of learning (broadly defined), robust ML, and high-dimensional data analysis.',
    },
    title: 'Optimal Inference Schedules for Masked Diffusion Models',
    abstract: 'A major bottleneck of standard auto-regressive large language models is that their inference process is inherently sequential, resulting in very long and costly inference times. To circumvent this, practitioners proposed a class of language models called diffusion language models, of which the masked diffusion model (MDM) is one of the most promising and successful. The MDM is able to sample out-of-order and, ostensibly, many tokens at once and in parallel. However, there is very limited rigorous understanding of how much parallel sampling these models can perform without noticeable degradation in their sampling performance. In this work, we give a new, exact characterization of the expected divergence between the true distribution and the sampled distribution, for any distribution and any unmasking schedule for the sampler, showing an elegant connection between MDM sampling and the classical theory of univariate function approximation.',
    award: '',
  },
  {
    presenter: {
      name: 'Dimitry Drusvyatskiy',
      picUrl: DimaDrusvyatskiyImg,
      websiteUrl: 'https://datascience.ucsd.edu/people/dima-drusvyatskiy/',
      affiliation: 'UCSD',
      bio: 'Dmitriy Drusvyatskiy received his PhD from Cornell University in 2013, followed by a post-doctoral appointment at University of Waterloo, 2013-2014. He joined the Mathematics department at University of Washington as an Assistant Professor in 2014 and was promoted to Full Professor in 2022. Since 2025, Dmitriy is a Professor at the Halıcıoğlu Data Science Institute (HDSI) at UC San Diego. Dmitriy\'s research broadly focuses on designing and analyzing algorithms for large-scale optimization problems, primarily motivated by applications in data science. Dmitriy has received a number of awards, including the Air Force Office of Scientific Research (AFOSR) Young Investigator Program (YIP) Award, NSF CAREER, SIAG/OPT Best Paper Prize 2023, Paul Tseng Faculty fellowship 2022-2026, INFORMS Optimization Society Young Researcher Prize 2019, and finalist citations for the Tucker Prize 2015 and the Young Researcher Best Paper Prize at ICCOPT 2019.',
    },
    title: 'When do spectral gradient updates help in deep learning?',
    abstract: 'Spectral gradient methods, such as the recently proposed Muon optimizer, are a promising alternative to standard gradient descent for training deep neural networks and transformers. Yet, it remains unclear in which regimes these spectral methods are expected to perform better. In this talk, I will present a simple condition that predicts when a spectral update yields a larger decrease in the loss than a standard gradient step. Informally, this criterion holds when, on the one hand, the gradient of the loss with respect to each parameter block has a nearly uniform spectrum while, on the other hand, the incoming activation matrix has low stable rank. It is this mismatch in the spectral behavior of the gradient and the propagated data that underlies the advantage of spectral updates. Reassuringly, this condition naturally arises in a variety of settings, including random feature models, neural networks, and transformer architectures. I will conclude by showing that these predictions align with empirical results in synthetic regression problems and in small-scale language model training.',
    award: '',
  },
];

const thursdayTalks = [
  {
    presenter: {
      name: 'David Woodruff',
      picUrl: DavidWoodruffImg,
      websiteUrl: 'https://www.cs.cmu.edu/~dwoodruf/',
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
    title: 'Can AI help with mathematics and computer science research?',
    abstract: 'In this talk we share our experience using LLMs to prove new results in mathematics and computer science. While it is too soon to derive definitive conclusions about the power of AI in Math/CS research, these results show promise. Specifically, we describe our experience with AlphaEvolve, an evolutionary language model from Google Deepmind, and suggest that our results in the theory of inapproximability and Ramsey theory could not have been discovered by hand.',
    award: '',
  },
  {
    presenter: {
      name: 'Sergei Gukov',
      picUrl: SergeiGukovImg,
      websiteUrl: 'https://gukov.caltech.edu/',
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
      picUrl: AbbasElGamalImg,
      websiteUrl: 'https://profiles.stanford.edu/abbas-el-gamal',
      affiliation: 'Stanford University',
      bio: `Abbas El Gamal is the Hitachi America Professor in the School of Engineering and Senior Fellow at the Precourt Institute for Energy at Stanford University. He received his M.S. in Statistics and Ph.D. in Electrical Engineering both from Stanford University in 1977 and 1978, respectively. From 1978 to 1980, he was an Assistant Professor of Electrical Engineering at USC. He has been on the faculty of the Department of Electrical Engineering at Stanford University since 1981. From 2003 to 2012, he was Director of the Information Systems Laboratory at Stanford. From 2012-2017 he was Chair of the Department of Electrical Engineering at Stanford. His research contributions have been in network information theory, FPGAs, digital imaging devices and systems, and smart grid modeling and control. He has authored or coauthored over 230 papers and holds over 35 patents in these areas. He is coauthor of the book Network Information Theory (Cambridge Press 2011). He is a member of the US National Academy of Engineering and a Life Fellow of the IEEE. He received several honors and awards for his research contributions, including the 2016 IEEE Richard Hamming Medal and the 2012 Claude E. Shannon Award. He served on the Board of Governors of the Information Theory Society from 2009 to 2016 and was President in 2014.`,
    },
    title: `A Preview of Cover and Thomas's Elements of Information Theory, Third Edition`,
    abstract: `Since its first publication in 1991, Elements of Information Theory has been the most widely used textbook for courses on information theory and a standard reference for students and researchers in statistics, AI, computer science, and the natural and physical sciences. In January 2022, Wiley reached out to me with a proposal to honor the legacy of Cover and Thomas by producing a third edition of their book. After two years of consultation with many colleagues and reflection on the daunting task of revising a classic, I concluded that there are compelling reasons to undertake it.

The third edition, titled Cover and Thomas's Elements of Information Theory, seeks to preserve the purpose, scope and distinctive exposition of the first two editions—guided by the ethos of the Einstein quote: "Everything should be made as simple as possible, but not simpler." Consistent with the central thesis of the original book—that information theory is a field in its own right, with applications far beyond communication theory—the treatment of its intersections with other disciplines is substantially expanded.

The new edition will feature new chapters on channel codes, statistical learning, limits on estimation and learning, communication complexity, secrecy, and privacy. In addition, existing chapters will be revised and updated to varying degrees. Taken together, these additions and revisions aim to remain faithful to the original while reflecting the rapid evolution of the field and its applications over the past three decades.`,
    award: '',
  },
  {
    presenter: {
      name: 'Ben Recht',
      picUrl: BenRechtImg,
      websiteUrl: 'https://vcresearch.berkeley.edu/faculty/benjamin-recht',
      affiliation: 'UC Berkeley',
      bio: 'Benjamin Recht is a Professor in the Department of Electrical Engineering and Computer Sciences at the University of California, Berkeley. Ben studies the foundations of machine learning, be they mathematical, statistical, and computational, or philosophical, sociological, and historical.',
    },
    title: 'The Irrational Decision: How We Gave Computers the Power to Choose for Us',
    abstract: `Mathematicians and engineers of the 1940s set out to design machines that could act as ideal rational agents in the face of uncertainty. In this pursuit, a cluster of foundational mathematical technologies—including information theory, linear programming, game theory, and neural networks—emerged as a foundation for a mathematical formalization of rationality, reshaping how we think about human decision-making itself. Recht's forthcoming book, The Irrational Decision: How We Gave Computers the Power to Choose for Us, traces the intellectual history of automated decision-making into the present, highlighting both the power and limitations of mathematical rationality and how we must temper machine judgment with human intuition and morality.

The Irrational Decision will be published by Princeton University Press in March, 2026.`,
    award: '',
  },
  {
    presenter: {
      name: 'Nisheeth Vishnoi',
      picUrl: NisheethVishnoiImg,
      websiteUrl: 'https://engineering.yale.edu/research-and-faculty/faculty-directory/nisheeth-vishnoi',
      affiliation: 'Yale University',
      bio: 'Vishnoi\'s research spans several areas of theoretical computer science, optimization, and machine learning. He is particularly interested in understanding and addressing key questions that arise in nature and society from a computational viewpoint, including the emergence of intelligence and the interface of artificial intelligence, ethics, and society. His recent work extends these ideas to understand and design computational frameworks that support responsible and effective human–AI interaction, with a particular interest in how AI systems shape human work, learning, and agency, and how they can be designed to complement human decision-making and serve broader societal needs. Vishnoi earned a B. Tech. in computer science and engineering at the Indian Institute of Technology Bombay and a Ph.D. in algorithms, combinatorics, and optimization from the Georgia Institute of Technology. He worked in both industrial research labs and academia before joining Yale, most recently at Microsoft Research in India from 2009 to 2014, and then as an associate professor with tenure at École Polytechnique Fédérale de Lausanne in Switzerland. He joined the Yale faculty as a full professor in the Department of Computer Science in 2019.',
    },
    title: 'The Information Loop',
    abstract: '', // TODO: Add abstract
    award: '',
  },
];

// Friday - Coming soon (no speakers yet)
const fridayTalks = [];

export const plenarySessions = [
  {
    dayName: 'Monday',
    topic: 'AI Applications',
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
    talks: sortByLastName(mondayTalks),
  },
  {
    dayName: 'Tuesday',
    topic: 'Trends in Information Theory',
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
    talks: sortByLastName(tuesdayTalks),
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
    talks: sortByLastName(wednesdayTalks),
  },
  {
    dayName: 'Thursday',
    topic: 'AI for Research',
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
    talks: sortByLastName(thursdayTalks),
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
    talks: sortByLastName(fridayTalks),
  },
];

// Special Plenary Session - Thursday "Information without Borders"
export const specialPlenarySession = {
  dayName: 'Thursday',
  topic: 'Information without Borders',
  description: `Three distinguished researchers and authors will examine how the expanding horizons of information, intelligence, and rationality are shaping technology, science, and society. Abbas El Gamal will introduce his forthcoming new edition of Elements of Information Theory, focusing on the field's emerging applications. Ben Recht will discuss his upcoming book The Irrational Decision, exploring the limits of mathematical rationality in real-world decision making. Nisheeth Vishnoi, author of The Intelligence Loop, will describe the evolving relationship between human and artificial intelligence. The three out-of-the box presentations, along with accompanying in-the-box alimentations, promise ample food for thought.`,
  moderator: {
    name: 'Arya Mazumdar',
    picUrl: AryaImg,
    websiteUrl: '',
    affiliation: 'UCSD, Moderator',
  },
  talks: sortByLastName(thursdaySpecialTalks),
};
