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

const mondayTalks = [
  {
    presenter: {
      name: 'Besma Smida',
      picUrl: BesmaaImg,
      affiliation: 'UIC',
      bio: `Besma Smida (Senior Member, IEEE) is an Associate Professor of electrical and computer engineering with the University of Illinois at Chicago. After completing her appointment as a Post-Doctoral Researcher and later a Lecturer at Harvard University, she became an Assistant Professor of electrical and computer engineering with Purdue University Northwest. She received the M.Sc. and Ph.D. degrees from the University of Quebec (INRS), Montreal, QC, Canada. She was a Research Engineer with the Technology Evolution and Standards Group of Microcell, Inc., (now Rogers Wireless), Montreal. She took part in wireless normalization committees (3GPP, T1P1). 
      She currently serves as Area Editor for the IEEE TRANSACTION ON GREEN COMMUNICATIONS AND NETWORKING, Editor for the IEEE TRANSACTIONS ON COMMUNICATIONS and IEEE OPEN JOURNAL OF THE COMMUNICATIONS SOCIETY. Previously she served as Editor for the IEEE TRANSACTIONS ON WIRELESS COMMUNICATIONS, an Associate Editor for the IEEE COMMUNICATION LETTERS, and a Guest Lead Editor for special issues of the IEEE JOURNAL ON SELECTED AREAS IN COMMUNICATIONS. 
      She is a Communication Society Distinguished Lecturer for 2021-2023. She was highlighted by IEEE Communications Society in their women in engineering in communications series. She was also included in the "100 Brilliant and Inspiring Women in 6G" List.  She was awarded the INSIGHT Into Diversity Magazine’s 2015 “100 Inspiring Women in STEM”. She received the Academic Gold Medal of the Governor General of Canada in 2007 and the NSF CAREER award in 2015. She was a recipient of the IEEE GLOBECOM best paper award 2021. Her research focuses on In-band Full-Duplex systems and applications, backscatter modulation, IoT, and two-way communication networks.`,
      websiteUrl: 'http://www.stat.yale.edu/people/andrewbarron.html',
    },
    title:
      'Integrated Sensing and Communications: A Communication Theory Perspective',
    abstract: `In-band full-duplex Multiple-Input Multiple-Output (MIMO) systems provide an opportunity for Integrated Sensing and Communication (ISAC) systems to realize spectrum-efficient simultaneous information transmission and environmental awareness. This line of research is typically referred to as FD-ISAC. This talk will review the unique characteristics and challenges of mono-static FD-ISAC, show simulation results (considering 6G Orthogonal Frequency Division Multiplexing (OFDM) waveforms), and outline several directions of future research.
    `,
  },
  {
    presenter: {
      name: 'Bertrand Hochwald',
      picUrl: BertandImg,
      websiteUrl: 'https://wireless.nd.edu/team/bertrand-hochwald',
      affiliation: 'Notre Dame',
      bio: `Bertrand Hochwald is the Freimann Professor of Electrical Engineering and
      co-Director of the Wireless Institute at the University of Notre Dame.  He and
      his students have published extensively in multi-antenna communication systems
      and the effects of coupling and correlation, including extending the Bode-Fano
      bandwidth bound for antenna arrays, and the design of decoupling circuits.  He
      has also created information-theoretic models of non-linear circuits and
      applied them to high-frequency communication systems.  He is a Fellow of the
      IEEE and the National Academy of Inventors.
      `,
    },
    title:
      'Examples of Information-Theoretic Models of Circuits in Wireless Communication Systems',
    abstract: `This talk will present information-theoretic models for circuits that are encountered in wireless communication systems.  Of particular interest are systems where high bandwidths, antenna coupling, or high carrier frequencies require imperfect matching and nonlinearities to be considered.`,
  },
  {
    presenter: {
      name: 'Sundeep Rangan',
      picUrl: SundeepImg,
      websiteUrl: 'https://wireless.engineering.nyu.edu/sundeep-rangan/',
      affiliation: 'NYU',
      bio: 'Sundeep Rangan received the B.A.Sc. at the University of Waterloo, Canada and the M.Sc. and Ph.D. at the University of California, Berkeley, all in Electrical Engineering. He has held postdoctoral appointments at the University of Michigan, Ann Arbor and Bell Labs.In 2000, he co-founded (with four others) Flarion Technologies, a spin off of Bell Labs, that developed Flash OFDM, one of the first cellular OFDM data systems and pre-cursor to 4G systems including LTE and WiMAX.  In 2006, Flarion was acquired by Qualcomm Technologies where Dr. Rangan was a Director of Engineering involved in OFDM infrastructure products. He joined the ECE department at NYU Tandon (formerly NYU Polytechnic) in 2010. He is a Fellow of the IEEE and Associate Director of NYU WIRELESS, an academic-industry research center researching next-generation wireless systems.',
    },
    title: 'Cellular Wireless Networks in the Upper Mid-Band',
    abstract:
      'The upper mid-band -- approximately from 7 to 24 GHz --- has recently attracted considerable interest for new cellular services.  This frequency range has vastly more spectrum than the highly congested bands below 7 GHz while offering more favorable propagation and coverage than the millimeter wave (mmWave) frequencies. In 3GPP, this frequency range has been referred to as FR3.   Realizing systems that exploit the full range of the FR3 bands, however, presents significant challenges.  Most importantly, spectrum will likely need to be shared with incumbents including communication satellites, military RADAR, and radio astronomy.   Also, the upper mid-band is simply a vast frequency range. Due to this wide bandwidth, combined with the directional nature of transmission and intermittent occupancy of incumbents, cellular systems will likely need to be agile to sense and intelligently use large spatial and frequency degrees of freedom.  In this talk, we review initial results on feasibility and potential gains of such systems including:  (1) ray tracing simulation to assess potential gains of multi-band frequency adaptive systems; (2) machine learning methods for multi-band channel modeling;  (3) an evaluation of potential  cross interference between satellites and terrestrial cellular services and interference nulling to reduce that interference; and (4) some information theoretic  perspectives on spectrum sensing.  Joint work with Seongjoon Kim, Marco Mezzavilla (NYU), Aditya Dhananjay, Mike Zappe (Pi-Radio)',
  },
];

const tuesdayTalks = [
  {
    presenter: {
      name: 'Saikat Guha',
      picUrl: SaikatImg,
      websiteUrl: 'http://web.mit.edu/saikat/www/',
      affiliation: 'University of Arizona',
      bio: '',
    },
    title: '',
    abstract: '',
  },
  {
    presenter: {
      name: 'Urbashi Mitra',
      picUrl: UrbashiImg,
      websiteUrl: 'http://ee.usc.edu/faculty_staff/bios/mitra.html',
      affiliation: 'University of Southern California',
      bio: "Urbashi Mitra received the B.S. and the M.S. degrees from the University of California at Berkeley and her Ph.D. from Princeton University.  She began her academic career at The Ohio State University.  Dr. Mitra is currently the Gordon S. Marshall Professor in Engineering at the University of Southern California with appointments in Electrical Engineering and Computer Science. Dr. Mitra is a Fellow of the IEEE.   She was the inaugural Editor-in-Chief for the IEEE Transactions on Molecular, Biological and Multi-scale Communications. Dr. Mitra has served as an Associate or Area Editor for multiple IEEE publications.  Dr. Mitra was a member of the IEEE Information Theory Society's Board of Governors (2002-2007, 2012-2017), the IEEE Signal Processing Society's Technical Committee on Signal Processing for Communications and Networks (2012-2017, Vice-Chair 2024), the IEEE Signal Processing Society’s Awards Board (2017-2018), and the Chair/Vice Chair of the IEEE Communications Society, Communication Theory Technical Committee (2017-2020). She is the recipient of: IEEE Communications Society (2015-2016)  and Signal Processing Society (2024) Distinguished Lecturer,  the 2021 USC Viterbi School of Engineering Senior Research Award, the 2017 IEEE Communications Society Women in Communications Engineering Technical Achievement Award, a 2016 UK Royal Academy of Engineering Distinguished Visiting Professorship, a 2016 US Fulbright Scholar Award, a 2016-2017 UK Leverhulme Trust Visiting Professorship, 2012 Globecom Signal Processing for Communications Symposium Best Paper Award, 2012 US National Academy of Engineering Lillian Gilbreth Lectureship, Student Best Paper Award, as co-advisor, at the International Conference on Signal Processing and Communications, Bangalore India 2012, the 2009 DCOSS Applications & Systems Best Paper Award, Texas Instruments Visiting Professor (Fall 2002, Rice University), 2001 Okawa Foundation Award, 2000 OSU College of Engineering Lumley Award for Research, 1997 OSU College of Engineering MacQuigg Award for Teaching, and a 1996 National Science Foundation CAREER Award.  She is most recently, the general co-chair for the IEEE International Symposium on Information Theory, 2024, Athens Greece.  Dr. Mitra has held visiting appointments at: King’s College, London, Imperial College, the Delft University of Technology, Stanford University, Rice University, and the Eurecom Institute. Her research interests are in:  model-based machine learning, wireless communications, communication and sensor networks, biological communication systems, and the interface of communication, sensing and control.",
    },
    title: '(My)Asymptopia and Science',
    abstract:
      'Some forays into mixing information theory, statistical signal processing, and communications with decidedly science applications will be shared.  A key challenge is the modeling and abstraction of these systems to enable the use of the tools typical in the afore-mentioned disciplines.  Another hurdle to overcome is in the validation of any developed theory or algorithm.  Both of these efforts are often stymied by a limited number of realizations of experimental data. Some recent work gives hope that ITA-like theorists can make meaningful contributions to the analysis and understanding of some of these science problems. In particular, we will talk about molecular communication, bacterial interaction and quantum chemistry.',
  },
  {
    presenter: {
      name: 'Aylin Yener',
      picUrl: AylinImg,
      websiteUrl: 'https://ece.osu.edu/people/yener.5',
      affiliation: 'Ohio State',
      bio: `Aylin Yener is the Roy and Lois Chope Chair in Engineering at The Ohio State University and holds
      professor appointments jointly at the Departments of Electrical and Computer Engineering, Computer
      Science and Engineering, and Integrated Systems Engineering. Her research group, Information and
      Networked Systems Powered by Innovation and Research in Engineering (INSPIRE@OhioState) houses
      researchers from ECE, CS and ISE, designing the next generation of networked systems. Her interests are
      in communications, information theory and learning, with recent focus on various pillars of 6G including
      advances in wireless physical layer designs, edge learning, confluence of sensing, communications,
      computing and learning, energy conscious networked systems, security and privacy.
      In her previous life, she was a Distinguished Professor of Electrical Engineering and Dean’s Fellow at
      Penn State where she developed her entire academic career, before leaving for a more urban living (and
      apparently even more football loyalty). During her small-town existence of nearly two decades, she held
      visiting appointments at Stanford University and Telecom Paris Tech. She received her PhD and MS
      degrees in Electrical and Computer Engineering from Wireless Information Networks Lab (WINLAB),
      Rutgers University, and her two Bachelor’s degrees in Electrical and Electronics Engineering and in
      Physics from Bogazici University. Aylin received a number of scholarly recognitions including the 2020
      IEEE Communication Theory Technical Achievement Award, 2019 IEEE Communications Society Best
      Tutorial Paper Award, 2018 IEEE Women in Communications Engineering (WICE) Outstanding
      Achievement Award, and the 2014 IEEE Marconi Paper Award. She is a fellow of the IEEE, AAIA, and is an
      elected member of The Science Academy of Turkey.
      Aylin is presently on the IEEE board of directors and is the director of Division IX (consisting of Aerospace
      and Electronic Systems Society, Geoscience and Remote Sensing Society, Information Theory Society,
      Intelligent Transportation Systems Society, Oceanic Engineering Society, Signal Processing Society and
      Vehicular Technology Society) for 2024-2025. She is the Editor-in-Chief of IEEE Transactions on Green
      Communications and Networking and is an area editor for IEEE Transactions on Information Theory. She
      previously served as president of the IEEE Information Theory Society, as well as in other posts for the
      society. In 2008, she co-founded the IEEE North American School of Information Theory.`,
    },
    title: 'Not Beyond, but With Shannon',
    abstract: `6G vision is quickly emerging as one of massive and complete connectivity, and of true
    convergence of communications, computing, and AI; enabling unprecedented applications in
    transportation, medicine, agriculture, and digital access for all. 6G, with its envisioned
    programmable open network architectures, is expected to be the first generation where
    fundamental innovations at the wireless edge can truly be integrated into network design.
    Semantic communications is an emerging paradigm for 6G that is attracting a lot of attention
    from the communications community. Broadly defined as transceiver design to convey the
    meaning of information, this field continues to receive various interpretations, including it
    being “beyond” Shannon. We argue that semantic communications is in fact aligned with
    Shannon theoretic thinking, and as such presents an opportunity for the information theory
    community to continue to make its impact in this very important application space.
    Implementing judicious designs that guarantees reliable communication of semantics, this
    paradigm, still in its naissance, promotes efficient use and reuse of wireless resources.
    Information theoretic insights, aided by advances in learning, could bring back the popularity
    network information theory enjoyed a couple of decades ago. We will provide some examples
    in point-to-point and relayed semantic communications and discuss the role of our community
    in this regard, going forward, with Shannon.`,
  },
];

const wednesdayTalks = [
  {
    presenter: {
      name: 'Ashish Goel',
      picUrl: AshishImg,
      websiteUrl: 'http://www.stanford.edu/~ashishg/',
      affiliation: 'Stanford',
      bio: `Ashish Goel is a Professor of Management Science and Engineering and
      (by courtesy) Computer Science at Stanford University, and a member of
      Stanford's Institute for Computational and Mathematical Engineering.
      He received his PhD in Computer Science from Stanford in 1999, and was
      an Assistant Professor of Computer Science at the University of
      Southern California from 1999 to 2002. His research interests lie in
      the design, analysis, and applications of algorithms; current
      application areas of interest include social networks, participatory
      democracy, Internet commerce, and large scale data processing.
      Professor Goel is a recipient of an Alfred P. Sloan faculty fellowship
      (2004-06), a Terman faculty fellowship from Stanford, an NSF Career
      Award (2002-07), and a Rajeev Motwani mentorship award (2010). He was
      a co-author on the paper that won the best paper award at WWW 2009, an
      Edelman Laureate in 2014, a co-winner of the SigEcom Test of Time
      Award in 2018, and a recipient of the 2023 Distinguished Alumnus Award
      from IIT Kanpur.
      
      Professor Goel was a research fellow and technical advisor at Twitter,
      Inc. from July 2009 to Aug 2014.  He has also served as a technical
      advisor to Coinbase Inc, Infosys Inc, and to the Chief Economic
      Advisor of India.`,
    },
    title: 'Optimum Design of Automated Market Makers',
    abstract: `Automated Market makers in general, and Constant Function Market
    Makers (CFMMs) in particular, have become a prominent component of the
    Decentralized Finance ecosystem. CFMMs provide liquidity between a
    pair of assets by maintaining a liquidity pool where the quantities of
    the two assets are required to vary according to  a prescribed
    "trading function". We present a tractable convex optimization
    framework to compute the optimum trading function, given any set of
    initial beliefs about future asset prices. Our convex optimization
    framework further extends to capture the tradeoffs between fee
    revenue, arbitrage loss, and opportunity costs of liquidity providers.
    We also present an axiomatic approach to integrating CFMMs into more
    traditional batch exchanges.
    
    Joint work with Mohak Goyal, David Mazieres, and Geoffrey Ramseyer.`,
  },
  {
    presenter: {
      name: 'Nicole Immorlica',
      picUrl: NicoleImg,
      websiteUrl: 'http://www.ece.northwestern.edu/~nickle/',
      affiliation: 'Microsoft',
      bio: 'Nicole Immorlica is a senior principal researcher at Microsoft Research New England (MSR NE) where she leads the economics and computation group.  She received her BS in 2000, MEng in 2001 and PhD in 2005 in theoretical computer science from MIT in Cambridge, MA.  She joined MSR NE in 2012 after completing postdocs at Microsoft in Redmond, WA and Centruum vor Wiskunde en Informatics (CWI) in Amsterdam, Netherlands, and a professorship in computer science at Northwestern University.  Nicole is known for her work on social networks, matching markets, and mechanism design.  She is the recipient of a number of fellowships and awards including the ACM Fellow, Sloan Fellowship, the Microsoft Faculty Fellowship and the NSF CAREER Award.',
    },
    title: 'Algorithmic Persuasion through Simulation',
    abstract: `In this talk, we study (Bayesian) persuasion with oracle access. In the standard persuasion setup, a sender uses knowledge about a receiver's beliefs to persuade her to take certain actions. However, in many settings the sender may only have limited information about the receiver she is trying to persuade. Motivated by recent empirical research showing that Generative AI can simulate economic agents, we introduce a model of persuasion in which the sender is uncertain about the receiver's beliefs, but has access to an oracle which can simulate the receiver's behavior under any messaging policy. These simulations allow the sender to refine her information about the receiver, enabling her to be more persuasive. We show how the sender can leverage her ability to simulate the receiver in order to design querying policies which maximize her utility. This talk is based on joint work with Keegan Harris, Brendan Lucier and Alex Slivkins. `,
  },
  {
    presenter: {
      name: 'Omer Tamuz',
      picUrl: OmerImg,
      websiteUrl: 'https://www.hss.caltech.edu/people/omer-tamuz',
      affiliation: 'Caltech',
      bio: 'Omer Tamuz is a professor of economics and mathematics at Caltech. His interests lie in probability, dynamics and group theory, and in their applications to topics in microeconomic theory, including information, risk and uncertainty, and social choice. He got his B.Sc. in computer science and physics from Tel Aviv University, where he participated in the search for extrasolar planets with Tsevi Mazeh. In 2013 he received his Ph.D. in mathematics from the Weizmann Institute, advised by Elchanan Mossel. From 2013 until 2015 he was a Schramm postdoctoral fellow at the MIT math department & Microsoft Research. He has been at Caltech since 2015.',
    },
    title: 'Private Private Information',
    abstract:
      'A private private information structure delivers information about an unknown state while preserving privacy: An agent’s signal contains information about the state but remains independent of others’ sensitive or private information. We study how informative such structures can be, and characterize those that are optimal in the sense that they cannot be made more informative without violating privacy. We connect our results to fairness in recommendation systems and explore a number of further applications.',
  },
];

const thursdayTalks = [
  {
    presenter: {
      name: 'Emmanuel Abbe',
      picUrl: EmmanuelImg,
      websiteUrl: 'http://princeton.edu/~eabbe',
      affiliation: 'EPFL',
      bio: 'Emmanuel Abbe received his Ph.D. degree from the EECS Department at MIT in 2008, and his M.S. degree from the Mathematics Department at EPFL in 2003. He was at Princeton University as an assistant professor in 2012-2016 and an associate professor in 2016-2019, jointly in the Program for Applied and Computational Mathematics and the Electrical and Computer Engineering Department, as well as an associate faculty in the Mathematics Department in 2016-2019. He joined EPFL in 2018 as a Full Professor, jointly in the Mathematics Institute and the School of Computer and Communication Sciences, where he holds the Chair of Mathematical Data Science. He is co-director of the EPFL Bernoulli Center for Fundamental Studies and Senior Research Scientist at Apple AIML-MLR. He is the recipient of the Foundation Latsis International Prize, the Bell Labs Prize, the von Neumann Fellowship fat the Institute for Advanced Study, the Simons-NSF Mathematics of Deep Learning Collaborative Research Award, the IEEE Information Theory Society Paper Award, the ICML Outstanding Paper Award.',
    },
    title: 'Can neural networks learn complex functions?',
    abstract:
      'Can we characterize the class of functions that neural networks trained by (S)GD can learn? Can it learn complex reasoning/logic functions? This should depend on the types of architectures and training methods considered. We provide here a first characterization based on the architecture complexity: (i) for ‘unconstrained architectures’, the framework can learn essentially any function class that is efficiently learnable by some algorithm, thereby showing the hypothetical universality of the framework, (ii) for ‘regular architectures’ such as MLPs and isotropic data, the framework is instead constrained by the “leap complexity” of the functions, a measure of how “hierarchical” the functions are in their Fourier/L2 expansion. In particular, it is shown that SGD on such networks learns with a saddle-to-saddle dynamic that recovers the functions by climbing its hierarchical features. We conclude by discussing how this “feature climbing” insight leads to new training methods based on curriculum learning and symbolic regression to improve the efficiency of learning complex logic functions.',
  },
  {
    presenter: {
      name: 'Samy Bengio',
      picUrl: SamyImg,
      websiteUrl: 'http://bengio.abracadoudou.com/',
      affiliation: 'Apple',
      bio: `Samy Bengio (PhD in computer science, University of Montreal, 1993) is a
      senior director of machine learning research at Apple since 2021. Before that,
      he was a distinguished scientist at Google Research since 2007 where he was
      heading part of the Google Brain team, and at IDIAP in the early 2000s where
      he co-wrote the well-known open-source Torch machine learning library.
      His research interests span many areas of machine learning such as deep
      architectures, representation learning, vision and language processing and
      more recently, reasoning. He is action editor of the Journal of Machine
      Learning Research and on the board of the NeurIPS foundation. He was on the
      editorial board of the Machine Learning Journal, has been program chair (2017)
      and general chair (2018) of NeurIPS, program chair of ICLR (2015, 2016),
      general chair of BayLearn (2012-2015), MLMI (2004-2006), as well as NNSP
      (2002), and on the program committee of several international conferences such
      as NeurIPS, ICML, ICLR, ECML and IJCAI. More details can be found at
      http://bengio.abracadoudou.com.
      `,
    },
    title: 'Length generalization can be hard: two insights',
    abstract:
      "Learning to generalize to problems that are longer at test time than during training can be hard. We present two insights into this problem. The first one considers the general concept of 'generalization of the unseen', or GOTU, where part of the domain is completely unseen during training (some combination of inputs values are never seen at train time) and try to understand how the model will behave when they are seen at test time. In the second vignette, we present a hypothesis that distinguishes between hard length generalization problems (like parity) and easy ones (like counting) when using Transformers, through the introduction of the RASP-L conjecture.",
  },
  {
    presenter: {
      name: 'Mikhail Belkin',
      picUrl: MikhailImg,
      websiteUrl: 'http://misha.belkin-wang.org/',
      affiliation: 'UCSD',
      bio: '',
    },
    title:
      'The puzzle of dimensionality and feature learning in neural networks and kernel machines',
    abstract: `Remarkable progress in AI has far surpassed expectations of just a few
    years ago.
    At their core, modern models, such as transformers, implement
    traditional statistical models -- high order Markov chains.
    Nevertheless, it is not generally possible to estimate Markov models of
    that order given any possible amount of data. Therefore these methods
    must implicitly exploit low-dimensional structures present in data. 
    Furthermore, these structures must be reflected in high-dimensional
    internal parameter spaces of the models.  Thus, to build  fundamental
    understanding of modern AI, it is necessary to identify and analyze
    these latent low-dimensional structures.  In this talk, I will discuss
    how deep neural networks of various architectures learn low-dimensional
    features and how the lessons of deep learning can be incorporated in
    non-backpropagation-based algorithms that we call Recursive Feature
    Machines. I will provide a number of experimental results on different
    types of data, as well as some connections to classical sparse learning
    methods, such as Iteratively Reweighted Least Squares.`,
  },
];

const fridayTalks = [
  {
    presenter: {
      name: 'Tom Goldstein',
      websiteUrl: 'https://www.cs.umd.edu/~tomg/',
      picUrl: TomImg,
      bio: 'Tom Goldstein is the Volpi-Cupal Professor of Computer Science at the University of Maryland, and Director of the Maryland Center for Machine Learning.  His research focuses on the safety, security, and reliability of generative AI systems.  Professor Goldstein has been the recipient of several awards, including SIAM’s DiPrima Prize, a DARPA Young Faculty Award, a JP Morgan Faculty award, an Amazon Research Award, and a Sloan Fellowship.',
      affiliation: 'University of Maryland',
    },
    title: 'Flatness believers are people too',
    abstract: `It is widely believed that generalization in overparameterized neural networks arises largely from the implicit regularization of stochastic gradient descent.  At the same time, there are those who believe instead that the primary engine behind generalization is not the optimizer, but rather loss landscape geometry.   We call these people "flatness believers."  Some of them live silently among us.  Some speak out, refusing to be a cog in the (support vector) machine.  Is the flatness theory legit?  Or is it just a (gradient) descent into madness?  In this talk, I will argue that theories of optimizer-based implicit regularization are not supported by experimental evidence, and that loss landscape geometry is likely to play a major role in generalization.`,
  },
  {
    presenter: {
      name: 'Ankur Moitra',
      websiteUrl: 'http://people.csail.mit.edu/moitra/',
      picUrl: AnkurImg,
      bio: 'Ankur Moitra is the Norbert Wiener Professor of Mathematics at MIT and the Director of the Statistics and Data Science Center. The aim of his work is to bridge the gap between theoretical computer science and machine learning by developing algorithms with provable guarantees and foundations for reasoning about their behavior. He has won several awards for his research and teaching, including a Packard Fellowship, a Sloan Fellowship, an ONR Young Investigator Award, an NSF CAREER Award, a Hertz Fellowship and a School of Science Excellence in Graduate Teaching Prize.',
      affiliation: 'MIT',
    },
    title: 'Learning From Dynamics',
    abstract: `Linear dynamical systems are the canonical model for time series data. They have wide-ranging applications and there is a vast literature on learning them from data. But as I will explain, there are wide gaps in our understanding. We give a new approach, based on the method of moments, that is computationally efficient and gives algorithms that work under essentially minimal assumptions. `,
  },
  {
    presenter: {
      name: 'Stefano Soatto',
      websiteUrl: 'http://www.cs.ucla.edu/~soatto/',
      picUrl: StefanoImg,
      bio: `Stefano Soatto is Vice President at AWS, where he has led the teams that have developed AWS AI applications in the areas of Vision, Speech, Language, and Verticals, including and most recently Foundation Models as a Service. These include Amazon Bedrock, Amazon Titan Models, Amazon CodeWhisperer, and Amazon Q, in addition to Amazon Comprehend, Amazon DevOps Guru, Amazon Forecast, Amazon Kendra, Amazon Lex, Amazon Lookout for Vision, Lookout for Metrics, Lookout for Equipment, Amazon Personalize, Amazon Rekognition, Amazon Textract, Amazon Translate, Amazon Transcribe. HE is also a Professor of Computer Science and Electrical Engineering at UCLA, where he i the founding director of the UCLA Vision Lab, and a Fellow of the IEEE and the ACM.`,
      affiliation: 'UCLA & Amazon',
    },
    title:
      'Representation and Control of Information and Meaning in Large Language Models',
    abstract:
      "Information, Knowledge, Meaning, and Understanding are being talked about informally in reference to large-scale generative models. Large Language Models and World Models are alternatively described as stochastic parrots or human-like reasoning agents, in both cases without sound definitions. I will describe a notion of accessible information in large-scale trained models that works for instantiated dataset and deterministic trained maps at scale, and relate it to classical notions from Fisher, Shannon, Kolmogorov, and Solomonoff. I will also show how the learning dynamics challenge traditional notions of regularization and generalization, and engender complex behavior such as the emergence of critical learning periods and latent topological and algebraic structures in the representation (“neuralese”).  I will then describe how today's generative models, viewed as stochastic dynamical systems, represent and instantiate ``meanings,'' which are equivalence classes of expressions (tokenized data sequences), and view them alternatively as vectors or distributions over continuations of trajectories.  These allow representing asymmetric relations such as entailment and containment, and formalize the notion of control of the ``state of mind'' of AI bots, which is key to their safe and secure realization and deployment. Along the way, I will point to how current models, viewed mechanistically, can help reframe some old epistemological questions for the modern age. Finally, I will describe how these ideas can be defined to address current challenge in measuring conceptual similarity in the context of privacy and attribution, and to ensure safety through disgorgement of information and knowledge stored in the models' weights.",
  },
];

export const plenarySessions = [
  {
    dayName: 'Monday',
    topic: 'Innovations that May Empower 6G',
    moderator: {
      name: 'Robert Heath',
      picUrl: RobertImg,
      websiteUrl: 'www.profheath.org',
      affiliation: 'UCSD',
      bio: `Robert W. Heath Jr. is a Professor in the Department of ECE at the University of California, San Diego. He is excited to begin a new journey in San Diego, and is looking forward to staying for a while.`,
    },
    moderatorTalk: {
      title: ``,
      abstract: ``,
    },
    talks: mondayTalks,
  },
  {
    dayName: 'Tuesday',
    topic: 'Advances in Information Theory',
    moderator: {
      name: 'Stark Draper',
      picUrl: StarkImg,
      websiteUrl: 'http://stark.draper@utoronto.ca',
      bio: `Stark Draper is a Professor of Electrical and Computer Engineering at the University of Toronto.  He is serving as ITSoc President in 2024.  He spent the pandemic endeavoring to make hand-pulled Lanzhou Lamian noodles; his noodles still break after about 4 doublings.  He is excited to return to ITA to hear engaging and inspiring talks while enjoying a respite from the Canadian winter.`,
      affiliation: 'University of Toronto',
    },
    moderatorTalk: {
      title: '',
      abstract: ``,
    },
    talks: tuesdayTalks,
  },
  {
    dayName: 'Wednesday',
    topic: 'New Developments in Algorithmic Economics',
    moderator: {
      name: 'Vijay Vazirani',
      picUrl: VijayImg,
      websiteUrl: 'https://ics.uci.edu/~vazirani/',
      bio: ``,
      affiliation: 'UC Irvine',
    },
    moderatorTalk: {
      title: '',
      abstract: ``,
    },
    talks: wednesdayTalks,
  },
  {
    dayName: 'Thursday',
    topic: 'Learning and Reasoning',
    moderator: {
      name: '',
      picUrl: '',
      websiteUrl: '',
      bio: '',
      affiliation: '',
    },
    moderatorTalk: {
      title: '',
      abstract: '',
    },
    talks: thursdayTalks,
  },
  {
    dayName: 'Friday',
    topic: 'Information, Meaning, and Understanding in Large Models',
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
