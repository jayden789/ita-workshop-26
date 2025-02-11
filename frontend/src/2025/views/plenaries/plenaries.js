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
import TatsImg from '../img2025/plenary-profile-pics/tats.jpg';
import HamedImg from '../img2025/plenary-profile-pics/hamed.jpg';

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
      bio: `Jona Ballé is an Associate Professor at New York University, studying lossy
        image compression, information theory and models of visual perception. They
        defended their master's and doctoral theses on signal processing and image
        compression under the supervision of Jens-Rainer Ohm at RWTH Aachen
        University in 2007 and 2012, respectively. This was followed by a brief
        collaboration with Javier Portilla at CSIC in Madrid, Spain, and a
        postdoctoral fellowship at New York University’s Center for Neural Science
        with Eero P. Simoncelli, where Jona studied the relationship between
        perception and image statistics. While there, they pioneered the use of
        variational Bayesian models and deep learning techniques for end-to-end
        optimized image compression. From 2017 to 2024, Jona deepened their ties to
        industry as a Research Scientist at Google. Jona has served as a reviewer
        for top-tier publications in both machine learning and image processing,
        such as NeurIPS, ICLR, ICML, Picture Coding Symposium, and several IEEE
        Transactions journals. They have co-organized the annual Challenge on
        Learned Image Compression (CLIC) since 2018, and on the program committee
        of the Data Compression Conference (DCC) since 2022.`,
    },
    title: 'Good, Cheap, and Fast: Overfitted Image Compression with Wasserstein',
    abstract: `Inspired by the success of generative image models, recent work on learned
      image compression increasingly focuses on better probabilistic modeling of
      the natural image distribution, leading to excellent realism. This,
      however, comes at the expense of a computational complexity that is several
      orders of magnitude higher than today's commercial codecs, and thus
      prohibitive for most practical applications. In this talk, I'll demonstrate
      that by focusing on models of visual perception, we can achieve a very good
      trade-off between visual quality and bit rate similar to "generative"
      compression models, while simultaneously requiring less than 1% of the
      multiply-accumulate operations (MACs) for decompression. We achieve this by
      optimizing C3, an overfitted image codec, for Wasserstein Distortion (WD),
      a measure of spatial (texture) realism grounded in models of visual
      perception, and evaluating the image reconstructions with a human rating
      study. Our study also reveals that WD outperforms other perceptual quality
      metrics such as LPIPS, DISTS, and MS-SSIM, both as an optimization
      objective and as a predictor of human ratings, achieving over 94% Pearson
      correlation with Elo scores.`,
    award: '',
  },
  {
    presenter: {
      name: 'Hyeji Kim',
      picUrl: HyejiImg,
      websiteUrl: 'https://www.ece.utexas.edu/people/faculty/hyeji-kim',
      affiliation: 'UT Austin',
      bio: `Hyeji Kim is an Assistant Professor in the Department of Electrical and Computer
        Engineering at The University of Texas at Austin and a recipient of the NSF CAREER award.
        Before joining UT Austin, she held research positions as a postdoctoral scholar at the
        University of Illinois at Urbana-Champaign and as a researcher at Samsung AI Research Cambridge
        in the UK. She earned her PhD in Electrical Engineering from Stanford University in 2016. Dr.
        Kim’s research lies at the intersection of information theory and machine learning. Her work
        leverages machine learning to tackle complex problems in information theory, focusing on
        developing advanced codes for communication and compression in challenging scenarios, such as
        high-dimensional channels and distributed data systems. Conversely, she applies principles of
        information theory to machine learning by constructing theoretical frameworks that uncover
        fundamental limits and provide insights into learning processes
        `,
    },
    title: `Modern Compression via Information Theory, Learning, and Generative models, 
      and its Application to Wireless Channel Compression`,
    abstract:
      `In this talk, I will present our work on Channel State Information (CSI) compression,
      leveraging tools from information theory, learning, and generative models. I will cover two
      main topics.

      First, we will discuss the estimation of the rate-distortion function for function computing
      with decoder-only side information and how it can shed light on the value of side information
      for CSI compression.

      Next, we will shift our focus to importance sampling in the context of score-based generative
      models. We will present a novel approach that represents the time-dependent score function of
      the target importance sampling distribution in terms of the score function of the original
      distribution and a desired weight function. This method enables principled importance sampling
      in a variety of applications, including neural CSI compression. By leveraging this framework,
      we provide new insights into the interpretability of learning-based CSI compression models.`,
    award: '',
  },
  {
    presenter: {
      name: 'Chao Tian',
      picUrl: ChaoImg,
      websiteUrl: 'https://tiangroup.engr.tamu.edu/',
      affiliation: 'Texas A&M University',
      bio: `Dr. Tian obtained his B.E degree from Tsinghua University, Beijing China, and his M.S. and
        Ph.D. degrees from Cornell University, Ithaca NY. He was a postdoctoral researcher at EPFL
        2005-2007, then worked at AT&T Labs-Research (previously known as the Shannon Labs) for seven
        years before returning to academia. Dr. Tian was with the University of Tennessee Knoxville for
        a few years before joining Texas A&M University. His coauthored papers received several awards
        including the 2014 IEEE Data Storage Best Paper Award. He was an IEEE Information Theory
        Society Distinguished Lecturer 2023-2024.
        `,
    },
    title: 'Transformers Learn Variable-order Markov Chains in-Context',
    abstract: `We study in-context learning of variable-length Markov chains by viewing language
      modeling as a form of data compression and focusing on variable-order Markov chain (VOMC)
      sources, also known as context tree sources. This perspective allows us to leverage mature
      compression algorithms, such as the context-tree weighting (CTW) algorithm as a baseline, which
      is Bayesian optimal for a general class of priors.  The underlying structural learning
      component makes it a considerably more difficult learning task than the fixed-order
      counterpart. We empirically observe that the performance of transformers is not very sensitive
      to the number of layers, and even a two-layer transformer (but not a one-layer transformer) can
      learn in context well, tracking closely the performance of CTW. To explain this observation, we
      construct a transformer with D+2 layers that can mimic the CTW algorithm accurately for VOMCs
      of maximum order D. A reduced two-layer transformer is further studied with carefully
      controlled counting information, which explains why 2-layer transformers can also perform well.
      `,
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
      bio: `Zaid Harchaoui is a Professor at the University of Washington in Seattle, in the Department 
        of Statistics and in the Paul G. Allen School of Computer Science and Engineering, and a Senior 
        Data Science Fellow in the eScience Institute. He is an action editor at the Journal of Machine 
        Learning Research, and an associate editor at the Journal of the Royal Statistical Society - 
        Statistical Methodology. He is a principal investigator and a cofounder of IFML, the NSF-AI 
        Institute on Foundations of Machine Learning, and of IFDS, the NSF-TRIPODS institute on foundations 
        of data science. He obtained the doctoral degree from Telecom Paris - Institut Polytechnique de 
        Paris, for his research performed at CNRS - the French National Institute for Fundamental Research. 
        He previously held appointments at the Courant Institute of Mathematical Sciences at New York 
        University, and at INRIA - the French National Institute for Research in Digital Science and Technology.`,
    },
    title: 'Alternating Information Projections Apparitions in AI Foundation Models',
    abstract: `Foundation models such as e.g. CLIP or DINO have established new standards for visual features based on 
      contrastive learning and self-supervised learning, respectively. The learning recipes behind these models 
      share a common ingredient, originally motivated by the need to avoid representation collapse. We describe 
      this ingredient as an alternating information projection algorithm, going back to (Deming and Stephan, 1940)
      and (Ireland and Kullback, 1968). This viewpoint leads us to show that this powerful ingredient has an 
      unexpected benefit: reducing variance when estimating statistical functionals across different data sources. 
      This variance reduction effect can be quantified using non-asymptotic statistical bounds involving the 
      singular value decays of appropriate Markov operators. The effect is tangible not only during training 
      but also at prediction in downstream tasks.`,
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
    title: 'A New Paradigm for Learning with Distribution Shift',
    abstract: `We revisit the fundamental problem of learning with distribution shift, where a learner 
      is given labeled samples from training distribution D, unlabeled samples from test distribution D′ 
      and is asked to output a classifier with low test error. The standard approach in this setting is 
      to prove a generalization bound in terms of some notion of distance between D and D′. These 
      distances, however, are difficult to compute, and this has been the main stumbling block for 
      efficient algorithm design. We sidestep this issue and define a new model called TDS learning, 
      where a learner runs a test on the training set and is allowed to reject if this test detects 
      distribution shift relative to a fixed output classifier.  Moreover, when the test accepts, 
      the output classifier is guaranteed to have low test error.  We describe how this approach 
      leads to the first set of efficient algorithms for learning with distribution shift that do 
      not take any assumptions on the test distribution.  Our techniques touch on a wide array of 
      topics including pseudorandomness, property testing, and sum of squares proofs. Joint work 
      with Konstantinos Stavropoulos and Arsen Vasilyan`,
    award: '',
  },
  {
    presenter: {
      name: 'Mahdi Soltanolkotabi',
      picUrl: MahdiImg,
      websiteUrl: 'https://viterbi-web.usc.edu/~soltanol/',
      affiliation: 'USC',
      bio: `Mahdi Soltanolkotabi is the director of the center on AI Foundations for the Sciences 
        (AIF4S) at the University of Southern California. He is also a professor in the 
        Departments of Electrical and Computer Engineering, Computer Science, and 
        Industrial and Systems engineering. Prior to joining USC, he completed his 
        PhD in electrical engineering at Stanford in 2014. He was a postdoctoral 
        researcher in the EECS department at UC Berkeley during the 2014-2015 academic year. 
        Mahdi is the recipient of the Information Theory Society Best Paper Award, 
        Packard Fellowship in Science and Engineering, an NIH Director’s new innovator 
        award, a Sloan Research Fellowship, an NSF Career award, an Airforce Office of 
        Research Young Investigator award (AFOSR-YIP), and faculty awards from Google 
        and Amazon. His research focuses on developing the mathematical foundations of 
        modern data science via characterizing the behavior and pitfalls of contemporary 
        nonconvex learning and optimization algorithms with applications in AI, deep 
        learning, large scale distributed training, federated learning, computational 
        imaging, and AI for scientific and medical applications. Most recently his 
        applied research focuses on developing and deploying reliable and trustworthy 
        AI in healthcare.
      `,
    },
    title: 'Towards More Reliable Generative AI: Probing Failure Modes and Harnessing Test-Time Inference',
    abstract: `Generative AI systems—especially Multimodal Large Language Models (MLLMs)—offer 
      promising avenues across a wide range of tasks, from medical imaging to enhanced 
      reasoning. In this talk, we explore strategies for making generative AI more 
      dependable by examining its vulnerabilities and leveraging adaptive learning. 
      First, we introduce MediConfusion, a benchmark that exposes systemic failure 
      modes of state-of-the-art medical multimodal models in Visual Question 
      Answering—a setting where reliability is paramount. Our findings reveal 
      that even top models fail to distinguish visually dissimilar medical images, 
      underscoring the challenges of deploying AI in clinical contexts. Next, 
      we turn to test-time training (TTT), a gradient-based technique that updates 
      model parameters using information from individual test instances. We provide 
      a theoretical framework that explains how TTT can mitigate distribution shifts 
      and significantly reduce the sample size needed for in-context learning. By 
      bridging these two threads, we demonstrate how identifying and addressing 
      vulnerabilities—through challenges like MediConfusion and adaptive strategies 
      like TTT—can enhance the reliability and impact of generative AI in healthcare 
      and beyond.
    `,
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
      bio: `Michael Hahn received his PhD from Stanford University in 2022, advised by Dan 
      Jurafsky and Judith Degen. He is now an Assistant Professor at Saarland University, 
      Germany. His research focuses on the theoretical foundations and inner workings of LLMs.
      `,
    },
    title: 'Why are Sensitive Functions Hard for Transformers?',
    abstract:`The reasoning capabilities of LLMs have seen enormous progress in the past years, 
      but certain reasoning tasks still are surprisingly challenging. I will argue that some of 
      these difficulties relate to the learnability biases of the underlying Transformer 
      architecture. Empirical studies have identified a range of such biases and limitations, 
      such as a persistent difficulty in learning to compute simple formal languages such as 
      PARITY, and a bias towards low-degree functions. We show that, under the transformer 
      architecture, the loss landscape is constrained by the input-space sensitivity: 
      Transformers whose output is sensitive to many parts of the input string inhabit isolated 
       points in parameter space, leading to a low-sensitivity bias in generalization. We show 
       theoretically and empirically that this theory unifies a broad array of empirical 
       observations about the learning abilities and biases of transformers, such as their 
       generalization bias towards low sensitivity and low degree, and difficulty in length 
       generalization for PARITY. This shows that understanding transformers’ inductive biases 
       requires studying not just their in-principle expressivity, but also their loss 
       landscape. More broadly, these results provide understanding of the sources of 
       persistent reasoning difficulties in LLMs.
    `,
    award: 'ACL 2024 Best Paper Award',
  },
  {
    presenter: {
      name: 'Chirag Pabbaraju',
      picUrl: ChiragImg,
      websiteUrl: 'https://web.stanford.edu/~cpabbara/',
      affiliation: 'Stanford University',
      bio: `Chirag Pabbaraju is a PhD student in the Computer Science department at Stanford University. 
      He is advised by Moses Charikar and Gregory Valiant. His primary research interests are in 
      algorithmic and statistical learning theory, and more recently, in language generation 
      and weak-to-strong generalization`,
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
  {
    presenter: {
      name: 'Tatsunori Hashimoto',
      picUrl: TatsImg,
      websiteUrl: 'https://thashim.github.io/',
      affiliation: 'Stanford University',
      bio: `Tatsunori Hashimoto is an Assistant Professor in the Computer Science Department 
      at Stanford University. Work from his group spans many areas within statistical 
      machine learning and language models including, language model post-training, 
      uncertainty quantification, and data selection. He received his Ph.D. at MIT 
      under the supervision of Tommi Jaakkola and David Gifford and is the recipient 
      of the NSF CAREER, Samsung AI researcher of the year award, a Kavli fellowship 
      as well as best paper awards at ICML, ICLR, and CHI.`,
    },
    title: 'On identifying and updating knowledge in language models',
    abstract:`Language models are remarkable systems - capable of encoding and synthesizing 
      vast amounts of information into its parameters. However, the black-box nature of 
      this encoding process makes it difficult to answer even basic questions about how 
      to evaluate and improve these LLMs — how do we know whether a good benchmark score 
      is due to robust storage of knowledge and not train-test contamination? and how can 
      we robustly incorporate new pieces of knowledge without pretraining? In this talk, 
      we show that simple classic statistical techniques allow us to make progress on each 
      question, including the first guarantees for identifying benchmark contamination and 
      one of the first demonstrations of scalable, post-training parametric knowledge 
      acquisition for language models.
    `,
    award: '',
  },
  {
    presenter: {
      name: 'Hamed Hassani',
      picUrl: HamedImg,
      websiteUrl: 'https://www.seas.upenn.edu/~hassani/',
      affiliation: 'UPenn',
      bio: `I am an associate professor in the Department of Electrical and Systems 
        Engineering (primary) as well as the Department of Computer and Information 
        Systems and Department of Statistics and Data Science at the Wharton Business 
        School. I am the Penn site-lead at EnCORE: Institute for Emerging CORE Methods 
        of Data Science. Before joining Penn, I was a research fellow at the Simons 
        Institute, UC Berkeley (program: Foundations of Machine Learning). Prior to 
        that, I was a post-doctoral scholar and lecturer in the Institute for Machine 
        Learning at ETH Zürich. I received my Ph.D. degree in Computer and Communication 
        Sciences from EPFL.`,
    },
    title: 'Adversarial Reasoning: How Safe Are the Frontier LLMs? ',
    abstract:`Despite efforts to align large language models (LLMs) with human intentions, 
    frontier LLMs such as chatGPT, Claude, and Gemini are susceptible to jailbreaking attacks, 
     wherein an adversary fools a targeted LLM into generating objectionable content. For 
     this reason, interest has grown in improving the robustness of LLMs against such 
     attacks. In this talk, I will review the current state of the jailbreaking literature, 
     including discussions of (new) attacks on LLMs, defenses against jailbreaking attacks, 
     and if time permits, applications within agentic systems. I will also introduce the 
     concept of adversarial reasoning, a framework that has proven effective in bypassing 
     safety mechanisms in frontier LLMs, and discuss its implications for future advancements 
     in AI safety.
    `,
    award: '',
  },
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
      bio: `Aaron Wagner is Professor and Stephen H. Weiss Presidential Fellow in
        the School of Electrical and Computer Engineering at Cornell University.
        He received the B.S. degree from the University of Michigan, Ann Arbor,
        and the M.S. and Ph.D. degrees from the University of California,
        Berkeley, after which he was a Postdoctoral Research Associate in the
        Coordinated Science Laboratory at the University of Illinois at
        Urbana-Champaign. He has received the NSF CAREER award, the U.C.
        Berkeley EECS David J. Sakrison Memorial Prize, the U.C. Berkeley
        Bernard Friedman Memorial Prize in Applied Mathematics, the IEEE
        Information Theory Society James L. Massey Research and Teaching Award
        for Young Scholars, the IEEE Information Theory Society Paper Award, and
        teaching awards at the Department, College, and University level at
        Cornell. He is serving as President of the IEEE Information Theory
        Society for 2025.`,
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
      bio: `Ahmad Beirami is a research scientist at Google DeepMind, leading new 
        research initiatives on language model post-training within Generative AI Unit. 
        Prior to Google, he worked on the next generation of virtual digital assistants 
        using large language models at Meta, and automated playtesting of video games 
        using reinforcement learning at Electronic Arts. Before moving to industry, 
        he held a joint postdoctoral fellow position at Harvard & MIT, focused on 
        problems in the intersection of core machine learning and information theory. 
        He is the recipient of the 2015 Sigma Xi Best PhD Thesis Award from Georgia Tech.
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
    topic: 'Large Language Models',
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
