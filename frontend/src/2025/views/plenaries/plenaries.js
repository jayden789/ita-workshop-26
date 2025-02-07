import BesmaaImg from '../img2024/plenary-profile-pics/Besma Smida.png';
import BertandImg from '../img2024/plenary-profile-pics/Bertrand Hochwald.jpeg';
import SundeepImg from '../img2024/plenary-profile-pics/Sundeep Rangan.jpeg';
import RobertImg from '../img2024/plenary-profile-pics/Robert Heath.jpeg';
import SaikatImg from '../img2024/plenary-profile-pics/Saikat Guha.jpeg';
import UrbashiImg from '../img2024/plenary-profile-pics/Urbashi Mitra.jpeg';
import AylinImg from '../img2024/plenary-profile-pics/Aylin Yener.jpeg';
import StarkImg from '../img2024/plenary-profile-pics/Stark Draper.jpeg';
import AshishImg from '../img2024/plenary-profile-pics/Ashish Goel.jpeg';
import NicoleImg from '../img2024/plenary-profile-pics/Nicole Immorlica.jpeg';
import OmerImg from '../img2024/plenary-profile-pics/Omer Tamuz.jpeg';
import VijayImg from '../img2024/plenary-profile-pics/Vijay Vazirani.jpeg';
import EmmanuelImg from '../img2024/plenary-profile-pics/Emmanuel Abbe.jpeg';
import SamyImg from '../img2024/plenary-profile-pics/Samy Bengio.jpeg';
import MikhailImg from '../img2024/plenary-profile-pics/Mikhail Belkin.jpeg';
import TomImg from '../img2024/plenary-profile-pics/Tom Goldstein.jpeg';
import AnkurImg from '../img2024/plenary-profile-pics/Ankur Moitra.jpeg';
import StefanoImg from '../img2024/plenary-profile-pics/Stefano Soatto.jpeg';
import YuImg from '../img2025/plenary-profile-pics/WeiYu.jpg';
import FlavioImg from '../img2025/plenary-profile-pics/flavio.jpg';
import ChaoImg from '../img2025/plenary-profile-pics/chao.jpg';
import HyejiImg from '../img2025/plenary-profile-pics/hyeji.jpg';
import JonaImg from '../img2025/plenary-profile-pics/jona.jpg';
import AaronImg from '../img2025/plenary-profile-pics/aaron.jpg';
import ZaidImg from '../img2025/plenary-profile-pics/zaid.jpg';
import MahdiImg from '../img2025/plenary-profile-pics/mahdi.jpg';
import RobImg from '../img2025/plenary-profile-pics/rob.jpg';
import PiyaImg from '../img2025/plenary-profile-pics/piya.jpg';
import MichaelImg from '../img2025/plenary-profile-pics/michael.jpg';
import ChiragImg from '../img2025/plenary-profile-pics/chirag.jpg';
import AhmadImg from '../img2025/plenary-profile-pics/ahmad.jpg';
import AdamImg from '../img2025/plenary-profile-pics/adam.jpg';

const mondayTalks = [
  {
    presenter: {
      name: 'Flavio Calmon',
      picUrl: FlavioImg,
      websiteUrl: 'https://people.seas.harvard.edu/~flavio/#',
      affiliation: 'Harvard University',
      bio: `Flavio P. Calmon is the Thomas D. Cabot Associate Professor of 
      Electrical Engineering at the Harvard John A. Paulson School of Engineering 
      and Applied Sciences. Before joining Harvard, he was the inaugural Data 
      Science for Social Good Post-Doctoral Fellow at IBM Research in Yorktown 
      Heights, New York. He received his Ph.D. in Electrical Engineering and 
      Computer Science at MIT. His research develops the information-theoretic 
      foundations of trustworthy and reliable machine learning. Prof. Calmon 
      received the 2024 James L. Massey Award from the IEEE Information Theory Society, 
      the NSF CAREER award, faculty awards from Google, IBM, and Amazon, and the Harvard 
      Dean of Undergraduate Studies Commendation for “Extraordinary Teaching during 
      Extraordinary Times.” He also received the inaugural "Título de Honra ao Mérito" 
      (Honor to the Merit Title) given to alumni from the Universidade de Brasília 
      (Brazil).
      `,
    },
    title:
      'Multigroup Fairness and Representation',
    abstract: `This talk overviews information-theoretic results on trustworthy 
    machine learning and artificial intelligence. We first briefly discuss 
    achievability and converse results for group fairness in prediction and 
    classification tasks. We then overview recent methods for measuring and 
    promoting multi-group proportional representation in image retrieval and 
    generation tasks.`,
    award: '2024 James L. Massey Research and Teaching Award',
  },
  {
    presenter: {
      name: 'Wei Yu',
      picUrl: YuImg,
      affiliation: 'University of Toronto',
      bio: `Wei Yu received the B.A.Sc. degree in computer engineering
            and mathematics from the University of Waterloo, Canada, and the M.S.
            and Ph.D. degrees in electrical engineering from Stanford University. He
            is currently a Professor and Canada Research Chair in Information Theory
            and Wireless Communications in the Electrical and Computer Engineering
            Department at the University of Toronto. Dr. Yu is a Fellow of IEEE and
            a Fellow of the Canadian Academy of Engineering. He was the recipient of
            the IEEE Marconi Prize Paper Award in Wireless Communications in 2019,
            the IEEE Communications Society Award for Advances in Communication in
            2019, the IEEE Signal Processing Society Best Paper Award in 2008, 2017,
            and 2021, and the IEEE Communications Society and Information Theory
            Society Joint Paper Award in 2024. He served as the President of the
            IEEE Information Theory Society in 2021.`,
      websiteUrl: 'https://www.itsoc.org/profile/8735',
    },
    title:
      'Minimum Feedback for Collision-Free Scheduling in Massive Random Access',
    abstract: `Consider a massive random access scenario in which a random
              subset of k active users, out of a large number of n users, need to
              be scheduled into k transmission slots.  What is the minimum number of
              bits that need to be sent to the users to ensure collision-free
              scheduling? Instead of a naive scheme of listing the indices of k
              active users in the order in which they should transmit -- at a cost of
              klog(n) bits, we show that a fixed-length coded transmission strategy
              can be designed using only klog(e) bits, plus an additive term that
              scales as Theta(log log(n)) bits. Further, if variable-length
              coding is used, the dependence on n can be completely removed. This
              coding strategy can be generalized to the problem of coded downlink
              transmission of exchangeable sources in massive random access.
    `,
    award: '2024 IEEE Communication Society and Information Theory Society Joint Paper Award',
  },
];

const tuesdayTalks = [
  {
    presenter: {
      name: 'Jona Ballé',
      picUrl: JonaImg,
      websiteUrl: 'https://balle.io/',
      affiliation: 'Google',
      bio: `My research revolves around data compression and human perception, and is built on principles of 
      signal processing, machine learning, sensory neuroscience, and information theory. I enjoy innovating in 
      my field, and being a lifelong student and teacher.`,
    },
    title: '',
    abstract: ``,
    award: '',
  },
  {
    presenter: {
      name: 'Hyeji Kim',
      picUrl: HyejiImg,
      websiteUrl: 'https://www.ece.utexas.edu/people/faculty/hyeji-kim',
      affiliation: 'UT Austin',
      bio: `Hyeji Kim is an Assistant Professor in the Department of Electrical and Computer Engineering and a Fellow of 
      the Advanced Micro Devices (AMD) Chair in Computer Engineering at The University of Texas at Austin. She received 
      her Ph.D. degree in Electrical Engineering from Stanford University in 2016. She worked as a postdoctoral researcher 
      at the University of Illinois at Urbana-Champaign from 2016 to 2018, after which she served as a researcher at 
      Samsung AI Research Cambridge until 2020. Her research interests lie at the intersection of information theory 
      and machine learning. In applying information theory to machine learning, her current focus includes the information 
      theoretic analysis and development of machine learning algorithms. In applying machine learning to information 
      theory, her current focus includes the development of codes for communication and compression via machine learning. 
      She is a recipient of the Stanford Graduate Fellowship and participant of the Rising Stars in EECS Workshop in 2015.
`,
    },
    title: '',
    abstract:
      ``,
    award: '',
  },
  {
    presenter: {
      name: 'Chao Tian',
      picUrl: ChaoImg,
      websiteUrl: 'https://tiangroup.engr.tamu.edu/',
      affiliation: 'Texas A&M University',
      bio: `Dr. Tian obtained his B.E degree from Tsinghua University, Beijing China, and his M.S. and Ph.D. 
      degrees from Cornell University, Ithaca NY. He worked at AT&T Labs-Research (previously known as the Shannon Labs) 
      as a researcher on communication and signal processing for seven years, before returning to academia. He was with 
      the University of Tennessee Knoxville for a few years before joining Texas A&M University.`,
    },
    title: '',
    abstract: '',
    award: '',
  },
];

const wednesdayTalks = [
  {
    presenter: {
      name: 'Zaid Harchaoui',
      picUrl: ZaidImg,
      websiteUrl: 'https://sites.google.com/uw.edu/zaid-harchaoui/main',
      affiliation: 'University of Washington',
      bio: `Zaid Harchaoui is a Professor at the University of Washington in Seattle, in the Department of 
      Statistics and in the Paul G. Allen School of Computer Science and Engineering (dual appointment), 
      and a Senior Data Science Fellow in the eScience Institute. He is an action editor at the Journal of 
      Machine Learning Research, and an associate editor at the Journal of the Royal Statistical Society - 
      Statistical Methodology, and a member of the editorial board of the Foundations and Trends Monograph 
      Series. He is on the program committee of the inaugural Conference on Language Modeling, and regularly 
      serves on the program committees of the leading machine learning and AI conferences. He is a principal 
      investigator and a cofounder of IFML, the NSF-AI Institute on Foundations of Machine Learning, and of IFDS, 
      the NSF-TRIPODS Institute on Foundations of Data Science. He obtained the doctoral degree from Telecom Paris - 
      Institut Polytechnique de Paris, for his research performed at CNRS - the French National Institute for 
      Fundamental Research. He previously held appointments at the Courant Institute of Mathematical Sciences 
      at New York University, and at INRIA - the French National Institute for Research in Digital Science and 
      Technology. His research has been recognized by several paper awards (Neurips, IEEE, ASA). His research 
      has been supported by several fellowships and honors (CIFAR, CNRS, Criteo, Google, INRIA, ISI, Simons Institute).`,
    },
    title: '',
    abstract: ``,
    award: '',
  },
  {
    presenter: {
      name: 'Adam Klivans',
      picUrl: AdamImg,
      websiteUrl: 'https://www.cs.utexas.edu/~klivans/',
      affiliation: 'UT-Austin',
      bio: `
Adam Klivans is a recipient of the NSF Career Award. His research interests lie in machine learning 
nd theoretical computer science, in particular, Learning Theory, Computational Complexity, 
Pseudorandomness, Limit Theorems, and Gaussian Space. He also serves on the editorial board for 
the Theory of Computing and Machine Learning Journal.
`,
    },
    title: '',
    abstract: ``,
    award: '',
  },
  {
    presenter: {
      name: 'Mahdi Soltanolkotabi',
      picUrl: MahdiImg,
      websiteUrl: 'https://viterbi-web.usc.edu/~soltanol/',
      affiliation: 'USC',
      bio: `I am a professor in the Ming Hsieh Department of Electrical and Computer Engineering, Computer Science, 
      and Industrial and Systems Engeineering (ISE) at the University of Southern California. I am also the inaugural 
      director of the USC Center on AI Foundations for Science (AIF4S). Prior to joining USC I spent a year as a postdoc 
      in the AMPLAB at UC Berkeley mentored by Ben Recht and Martin Wainwright. I obtained my Ph.D. in Electrical 
      Engineering from Stanford in 2014 advised by Emmanuel Candes. On the theoretical side, my research focuses 
      on developing the mathematical foundations of modern data science spanning recent developments in generative 
      AI to more classical deep learning, machine learning, signal processing, and computational imaging. To this 
      aim I often draw upon and develop eclectic new tools in (non)convex optimization, high-dimensional probability, 
      statistical estimation/inference, empirical processes, and learning theory. On the applied side, my focus is on 
      developing reliable AI for applications in science, healthcare and medicine. In colloaboration with domain 
      scientists and physcians we aim to develop new architectures and data curation pipelines that accelarate 
      scientific discovery, enhance mathematical and spatial reasoning capabilities of GenAI, improve their 
      reliability, and develop rigorous evaluation and statistical uncertainty quantification techniques that 
      truely tests their capabilities and limitations. On the weekends, you're most likely to find me cycling on 
      the Pacific coast ranging from Malibu/Santa Monica mountains/Palos Verdes in SoCal to the Marine district in 
      NorthCal. I'm also an amatuer artist, dabbling in Persian calligraphy. I'm very interested in coming up with 
      creative ways to preserve this and other ancient artforms with responsible use of generative AI.`,
    },
    title: '',
    abstract: ``,
    award: '',
  },
];

const thursdayTalks = [
  {
    presenter: {
      name: 'Rob Brekelmans',
      picUrl: RobImg,
      websiteUrl: 'https://brekelma.github.io/',
      affiliation: 'Vector Institute',
      bio: `I am a Postdoctoral Fellow at the Vector Institute in Toronto, working with Alireza Makhzani and Roger 
      Grosse. I graduated with my PhD from University of Southern California in 2022, working with Greg Ver Steeg 
      and Aram Galstyan. I also interned with the AI Safety Analysis team at DeepMind (Blog), working with Pedro 
      Ortega and Tim Genewein.`,
    },
    title: 'Probabilistic Inference in Language Models via Twisted Sequential Monte Carlo',
    abstract:`Numerous capability and safety techniques of Large Language Models (LLMs), including RLHF, automated 
    red-teaming, prompt engineering, and infilling, can be cast as sampling from an unnormalized target distribution 
    defined by a given reward or potential function over the full sequence. In this work, we leverage the rich 
    toolkit of Sequential Monte Carlo (SMC) for these probabilistic inference problems. In particular, we use 
    learned twist functions to estimate the expected future value of the potential at each timestep, which 
    enables us to focus inference-time computation on promising partial sequences. We propose a novel contrastive 
    method for learning the twist functions, and establish connections with the rich literature of soft 
    reinforcement learning. As a complementary application of our twisted SMC framework, we present methods for 
    evaluating the accuracy of language model inference techniques using novel bidirectional SMC bounds on the 
    log partition function. These bounds can be used to estimate the KL divergence between the inference and 
    target distributions in both directions. We apply our inference evaluation techniques to show that twisted 
    SMC is effective for sampling undesirable outputs from a pretrained model (a useful component of harmlessness 
    training and automated red-teaming), generating reviews with varied sentiment, and performing infilling tasks.
    `,
    award: 'ICML 2024 Best Paper Award',
  },
  {
    presenter: {
      name: 'Michael Hahn',
      picUrl: MichaelImg,
      websiteUrl: 'https://www.mhahn.info/',
      affiliation: 'Saarland University',
      bio: `I am a Tenure-Track Professor (W2) at Saarland Informatics Campus at Saarland University, 
      where I direct the Language, Computation, and Cognition Lab (LaCoCo). I'm affiliated with the 
      Departments of Language Science and Technology and Computer Science. I received my PhD from 
      Stanford University in 2022, advised by Judith Degen and Dan Jurafsky.
      `,
    },
    title: 'Why are Sensitive Functions Hard for Transformers?',
    abstract:`Empirical studies have identified a range of learnability biases and limitations of 
    transformers, such as a persistent difficulty in learning to compute simple formal languages 
    such as PARITY, and a bias towards low-degree functions. However, theoretical understanding 
    remains limited, with existing expressiveness theory either overpredicting or underpredicting 
    realistic learning abilities. We prove that, under the transformer architecture, the loss 
    landscape is constrained by the input-space sensitivity: Transformers whose output is sensitive 
    to many parts of the input string inhabit isolated points in parameter space, leading to a 
    low-sensitivity bias in generalization. We show theoretically and empirically that this theory 
    unifies a broad array of empirical observations about the learning abilities and biases of 
    transformers, such as their generalization bias towards low sensitivity and low degree, and 
    difficulty in length generalization for PARITY. This shows that understanding transformers’ 
    inductive biases requires studying not just their in-principle expressivity, but also their 
    loss landscape.
    `,
    award: 'ACL 2024 Best Paper Award',
  },
  {
    presenter: {
      name: 'Chirag Pabbaraju',
      picUrl: ChiragImg,
      websiteUrl: 'https://web.stanford.edu/~cpabbara/',
      affiliation: 'Stanford University',
      bio: `I'm a fourth year PhD student at Stanford University in the CS Theory group. I feel very 
      lucky to be co-advised by Moses Charikar and Gregory Valiant. My primary research interests are 
      in statistical and algorithmic aspects of learning theory. More broadly, I like thinking about 
      various topics in theoretical computer science and machine learning.`,
    },
    title: 'Multiclass Learnability Does Not Imply Sample Compression',
    abstract:`A hypothesis class admits a sample compression scheme, if for every sample labeled by a hypothesis 
    from the class, it is possible to retain only a small subsample, using which the labels on the entire sample 
    can be inferred. The size of the compression scheme is an upper bound on the size of the subsample produced. 
    Every learnable binary hypothesis class (which must necessarily have finite VC dimension) admits a sample 
    compression scheme of size only a finite function of its VC dimension, independent of the sample size. For 
    multiclass hypothesis classes, the analog of VC dimension is the DS dimension. We show that the analogous 
    statement pertaining to sample compression is not true for multiclass hypothesis classes: every learnable 
    multiclass hypothesis class, which must necessarily have finite DS dimension, does not admit a sample 
    compression scheme of size only a finite function of its DS dimension.
    `,
    award: 'ALT 2024 Outstanding Paper Award',
  },
];

const fridayTalks = [
];

export const plenarySessions = [
  {
    dayName: 'Monday',
    topic: 'Information Theory & Signal Processing Paper Awards',
    moderator: {
      name: 'Piya Pal',
      picUrl: PiyaImg,
      websiteUrl: 'https://jacobsschool.ucsd.edu/people/profile/piya-pal',
      affiliation: 'UCSD',
      bio: `Piya Pal received her Ph.D. in Electrical Engineering from California Institute of Technology 
      in 2013.  Prior to her appointment at UC San Diego, she was an Assistant Professor of Electrical and 
      Computer Engineering at the University of Maryland, College Park where she was also affiliated with 
      the Institute for Systems Research. Her doctoral thesis titled “New directions in sparse sampling 
      and estimation for underdetermined systems” was awarded the 2014 Charles and Ellen Wilts Prize for 
      Outstanding Thesis in Electrical Engineering at Caltech. She received an NSF CAREER Award in 2016 
      to pursue her research in “Smart Sampling and Correlation-Driven Inference for High Dimensional Signals."
`,
    },
    moderatorTalk: {
      title: ``,
      abstract: ``,
    },
    talks: mondayTalks,
  },
  {
    dayName: 'Tuesday',
    topic: 'Information Theory for Machine Learning',
    moderator: {
      name: 'Aaron Wagner',
      picUrl: AaronImg,
      websiteUrl: 'https://www.ece.cornell.edu/faculty-directory/aaron-b-wagner',
      bio: `Aaron Wagner joined the School of Electrical and Computer Engineering at Cornell University 
      as an assistant professor in 2006 and was elevated to professor in July 2018. During the 2005-2006 
      academic year, he was a Postdoctoral Research Associate in the Coordinated Science Laboratory at the 
      University of Illinois at Urbana-Champaign and a Visiting Assistant Professor in the School of Electrical 
      and Computer Engineering at Cornell. Wagner did his graduate work at the University of California, Berkeley 
      and received an undergraduate degree from the University of Michigan, Ann Arbor. Wagner's research and 
      teaching have been recognized with several awards including the IEEE Information Theory Society's James 
      L. Massey Research & Teaching Award for Young Scholars(2017), the Douglas Whitney '61 Excellence in Teaching 
      Award from Cornell Engineering (2015), the Cornell Michael Tien '72 College of Engineering Teaching Award 
      (2009), the NSF CAREER award (2007), the David J. Sakrison Memorial Prize from the U.C. Berkeley EECS Dept. 
      (2006), and the Bernard Friedman Memorial Prize in Applied Mathematics from the U.C. Berkeley Dept. of 
      Mathematics (2005). Two of his students won the 2010 Information Theory Society Student Paper Award.`,
      affiliation: 'Cornell',
    },
    moderatorTalk: {
      title: '',
      abstract: ``,
    },
    talks: tuesdayTalks,
  },
  {
    dayName: 'Wednesday',
    topic: 'Foundations of Machine Learning & Artificial Intelligence',
    moderator: {
      name: '',
      picUrl: '',
      websiteUrl: '',
      bio: ``,
      affiliation: '',
    },
    moderatorTalk: {
      title: '',
      abstract: ``,
    },
    talks: wednesdayTalks,
  },
  {
    dayName: 'Thursday',
    topic: 'Machine Learning Paper Awards',
    moderator: {
      name: 'Ahmad Beirami ',
      picUrl: AhmadImg,
      websiteUrl: 'https://sites.google.com/view/beirami',
      bio: `Ahmad Beirami is a research scientist at Google DeepMind, leading 
      new research initiatives on post-training within Gen AI Unit. At Google 
      Research, he led a research team on building safe, helpful, and scalable 
      generative language models. At Meta AI, he led research to power the next 
      generation of virtual digital assistants with AR/VR capabilities through 
      robust generative language modeling. At Electronic Arts, he led the AI 
      agent research program for automated playtesting of video games and 
      cooperative reinforcement learning. Before moving to industry, he held 
      a joint postdoctoral fellow position at Harvard & MIT, focused on problems 
      in the intersection of core machine learning and information theory. He 
      is the recipient of the 2015 Sigma Xi Best PhD Thesis Award from Georgia Tech.
      `,
      affiliation: 'Google DeepMind',
    },
    moderatorTalk: {
      title: '',
      abstract: '',
    },
    talks: thursdayTalks,
  },
  {
    dayName: 'Friday',
    topic: 'Coming Soon',
    moderator: {
      name: '',
      picUrl: '',
      websiteUrl: '',
      affiliation: '',
      bio: ``,
    },
    moderatorTalk: {
      title: '',
      abstract: ``,
    },
    talks: fridayTalks,
  },
];
