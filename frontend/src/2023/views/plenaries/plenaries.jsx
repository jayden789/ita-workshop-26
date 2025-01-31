import React from 'react';

import { linkWrapper } from './utils';

import chaudhuriImg from '../img2020/plenary-profile-pics/chaudhuri.jpg';
import diggaviImg from '../img2022/plenary-profile-pics/diggavi.jpg';
import mitraImg from '../img2022/plenary-profile-pics/mitra.jpg';
import pfisterImg from '../img2022/plenary-profile-pics/pfister.jpg';
import sankararamanImg from '../img2022/plenary-profile-pics/sankararaman.jpg';
import javidiImg from '../img2022/plenary-profile-pics/javidi.jpg';
import guImg from '../img2022/plenary-profile-pics/gu.jpg';
import medardImg from '../img2022/plenary-profile-pics/medard.jpg';
import rakhlinImg from '../img2022/plenary-profile-pics/rakhlin.jpg';
import imanImg from '../img2022/plenary-profile-pics/iman.jpg';
import mirarabImg from '../img2022/plenary-profile-pics/mirarab.jpg';
import mazumdarImg from '../img2022/plenary-profile-pics/mazumdar.jpg';
import berryImg from '../img2022/plenary-profile-pics/berry.jpg';
import reevesImg from '../img2022/plenary-profile-pics/reeves.jpg';
import belkinImg from '../img2022/plenary-profile-pics/belkin.jpg';

const mondayTalks = [
  {
    presenter: {
      name: 'Andrew Barron',
      picUrl: 'https://ita.ucsd.edu/workshop/18/users_images/20.jpg',
      affiliation: 'Yale University',
      bio:`Andrew R Barron is a Professor of Statistics and Data Science at Yale University, from 1992 to present. Prior to that he was a faculty member in Statistics and Electrical and Computer Engineering at the University of Illinois at Urbana Champaign.  He received his MS and PhD degrees from Stanford University in Electrical Engineering in 1985 under the direction of Tom Cover and a Bachelor's degree in the fields of Mathematical Science and Electrical Engineering from Rice University in 1981. Andrew Barron has served as a Secretary of the Board of Governors of the IEEE Information Theory Society  and several terms as an elected member of this Board.  He has been an associate editor of the IEEE Transactions on Information Theory and the Annals of Statistics. He is known for the generalization of the AEP to continuous-valued ergodic processes, for an information-theoretic Central Limit Theorem, for the index of resolvability and associated characterization of performance of Minimum Description Length estimators, for characterization of concentration of posteriors at parameters in the information support of the prior, for information-theoretic determination of minimax rates of function estimation, for an early unifying view of statistical learning networks, for early approximation and estimation bounds for artificial neural networks and recent extensions to deep learning, for greedy algorithms for training neural networks, for information-theoretic aggregation of least squares regressions, and for the formulation and proof of capacity-achieving sparse regression codes for Gaussian noise communication channels.`,
      websiteUrl: 'http://www.stat.yale.edu/people/andrewbarron.html'
    },
    title:'Information Theory in Statistical Learning: Foundations and a Modern Perspective',
    abstract: `Information theory builds on and illuminates the foundational statistical principles of Bayes, Laplace, Gauss, and Fisher concerning likelihood and penalized likelihood.  In particular, it is identified in broad generality that when the penalty satisfies an information-theoretic property, then there is a natural one-sided empirical process control. Namely, the minimum difference between a log likelihood ratio plus penalty and a Bhattacharyya-Hellinger loss has non-negative expectation and stochastically exceeds a random variable tightly concentrated around zero. Valid penalties include L_1 penalties on parameters (in linear models and in deep learning) and traditional penalties based on the number of parameters, as arise in minimum description length (MDL) and Bayesian estimators.  This result has previously been developed in work with T. Cover and with J. Li, C. Huang, G. Cheang, and X. Luo (and applied by various scholars) to show that the statistical risk of MDL estimators is controlled by an index of resolvability, expressing optimal tradeoff between Kullback approximation error and complexity relative to sample size. 

    Here we report another use of the same one-sided empirical process concentration bound. Namely, confidence bounds on the loss of statistical machine learning estimators.  For every estimator, and every information-theoretically valid penalty, with probability at least 1- delta, the Bhattacharyy-Hellinger loss is not more than the associated log likelihood ratio plus penalty plus the 1- delta quantile of a random variable tightly concentrated near 0.  In particular, this result can be used to illuminate the phenomenon of "benign overfitting."  Namely, if the log likelihood at an estimate is higher than the log likelihood at a target, then the loss is not more than the penalty plus the indicated small-valued quantile.  Consequently, if the L_1 norm of fitted parameters is small compared to the square root of the sample size divided by the log of the number of parameters, then there is high confidence in the associated generalization accuracy of the fit.`
  },
  {
    presenter: {
      name: 'Lara Dolecek',
      picUrl: 'https://ita.ucsd.edu/workshop/ita_rebuild_files/prod/profile_pictures/cab1f681-447a-4490-aee3-60a33a9d80b6',
      websiteUrl: 'https://loris.seas.ucla.edu/',
      affiliation:'UC Los Angeles',
      bio: `Lara Dolecek is a Professor with the Electrical and Computer Engineering Department at UCLA. She holds B.S., M.S., and Ph.D. degrees in EECS and an M.A. degree in Statistics, all from UC Berkeley. She is a 2021-2023 Distinguished Lecturer of the IEEE Information Theory Society. `
    },
    title:'Channel Coding and Sampling for Overcoming Data Availability Attacks in Blockchain Systems',
    abstract:`Blockchain systems have emerged as a popular decentralized system for performing secure transactions. However, these systems are prone to so-called data availability (DA) attacks wherein a malicious node tricks a client node into accepting an invalid block of transactions, with potentially catastrophic consequences. In this talk, we will discuss how channel coding and sampling methods can be used together to improve robustness of blockchain systems to such DA attacks. Building on classical considerations of storage overhead and communication cost, we will also take into account unique and novel characteristics of blockchain systems to develop resulting strategies. As we will demonstrate, these new constraints lead to novel coding constructions that, interestingly, depart from the well-established approaches. `
  },
  {
    presenter: {
      name: 'Emina Soljanin',
      picUrl: 'https://ita.ucsd.edu/workshop/23/images/plenaries/EminaSoljanin.jpg',
      websiteUrl: 'https://www.ece.rutgers.edu/emina-soljanin',
      affiliation:'UC Los Angeles',
      bio: 'Emina Soljanin is a professor of Electrical and Computer Engineering at Rutgers. Before moving to Rutgers in January 2016, she was a (Distinguished) Member of Technical Staff for 21 years in various incarnations of the Mathematical Sciences Research Center of Bell Labs. Her interests and expertise are broad and currently range from distributed computing to quantum information science. She is an IEEE Fellow, an outstanding alumnus of the Texas A&M School of Engineering, the 2011 Padovani Lecturer, a 2016/17 Distinguished Lecturer, and the 2019 President of the IEEE Information Theory Society.'
    },
    title:'How Light is the Quantum Butterfly?',
    abstract:'We consider networks that deliver quantum information to multiple receivers simultaneously. Since there is no quantum information without physical representation (e.g., by photons) and no cloning, the quantum multicast problem appears to be a multi-commodity flow problem of shipping a collection of different physical commodities through a shared network. However, we show that besides the apparent similarity to the multi-commodity flow problems, quantum networks, to a certain extent, behave as classical information networks. In particular, we show that lossless compression of multicast quantum states is possible and significantly reduces the link capacity requirements of the multicast. '
  }
];

const tuesdayTalks = [
  {
    presenter: {
      name: 'Mahdi Cheraghchi',
      picUrl: 'https://ita.ucsd.edu/workshop/23/images/plenaries/MahdiCheraghchi.jpg',
      affiliation:"University of Michigan",
      bio:`Mahdi Cheraghchi is an Associate Professor of EECS at the University of Michigan, Ann Arbor. Before joining U of M in 2019, he was on the faculty of Imperial College London, UK, and prior to that held postdoctoral appointments at UC Berkeley, MIT, CMU, UT Austin, as well as a visiting engineer position at Qualcomm. He obtained his Ph.D. in 2010 from EPFL, where he received the Patrick Denantes Memorial Prize for outstanding doctoral thesis. Mahdi is broadly interested in all theoretical aspects of computer science, especially the role of information and coding theory in cryptography, complexity, algorithms, and high-dimensional geometry. He is a senior member of the ACM and IEEE and a recipient of the NSF CAREER award.`
    },
    title:'Parameterized inapproximability of the minimum distance problem over all fields and the shortest vector problem',
    abstract:`We prove that the Minimum Distance Problem (MDP) on linear codes over any fixed finite field and parameterized by the input distance bound is W[1]-hard to approximate within any constant factor. We also prove analogous results for the parameterized Shortest Vector Problem (SVP) on integer lattices. Specifically, we prove that SVP in the $\ell_p$ norm is W[1]-hard to approximate within any constant factor for any fixed p > 1 and W[1]-hard to approximate within a factor approaching 2 for p = 1. (These results all hold under randomized reductions.)

    These results answer the main questions left open (and asked) by Bhattacharyya, Bonnet, Egri, Ghoshal, Karthik C. S., Lin, Manurangsi, and Marx (Journal of the ACM, 2021) on the complexity of parameterized MDP and SVP. 
    For MDP, they established similar hardness for binary linear codes and left the case of general fields open. For SVP in $\ell_p$ norms with $p > 1$, they showed inapproximability within some constant factor (depending on p) and left open showing such hardness for arbitrary constant factors. They also left open showing W[1]-hardness even of exact SVP in the $\ell_1$ norm.
    
    `
 },
  {
    presenter: {
      name: 'Sivakanth Gopi',
      picUrl: 'https://ita.ucsd.edu/workshop/23/images/plenaries/SivakanthGopi.jpg',
      affiliation:"Microsoft",
      bio:`Sivakanth Gopi is a senior researcher in the Algorithms group at Microsoft Research Redmond. He received a PhD in Computer Science from Princeton University in 2018 during which he received a STOC best paper award for his work on private information retrieval. He completed his undergraduate studies at IIT Bombay with a major in computer science and a minor in mathematics. His main research interests are in coding theory and its applications to both theory and practice, and differential privacy.`
    },
    title:'Generic Reed-Solomon codes achieve list decoding capacity',
    abstract:`In this talk, we introduce 'higher order MDS codes', a fundamental generalization of MDS codes. An order-m MDS code, denoted by MDS(m), has the property that any m subspaces formed from columns of its generator matrix intersect as minimally as

    possible. Ordinary MDS codes correspond to m=2. We will then show that higher order MDS codes are equivalent to various seemingly unrelated concepts in coding theory: (1) optimally list-decodable codes (2) maximally recoverable tensor codes and (3) MDS codes with support constrained generator matrices (such as in GM-MDS theorem). This equivalence along with the GM-MDS theorem for Reed-Solomon codes implies that random Reed-Solomon codes over large enough alphabet achieve list-decoding capacity, in fact they are as good as random linear codes!
    
     
    
    This closes a long line of work on list-decodability of Reed-Solomon codes starting with the celebrated result of Guruswami and Sudan (1998) who showed that they are list-decodable up to the Johnson bound. Later works showed that "random" Reed-Solomon codes are list-decodable beyond the Johnson bound. We show that they in fact achieve list-decoding capacity! Quantitatively, we show that a random Reed-Solomon code of rate R over a large enough field is list decodable from radius 1-R-(1-R)/(L+1) with list size at most L, which proves a conjecture of Shangguan and Tamo (2020).
    
    
    Based on joint work with Joshua Brakensiek and Visu Makam.`
  },
];

const wednesdayTalks = [
  {
    presenter: {
      name: 'Geoff Penington',
      picUrl: 'https://ita.ucsd.edu/workshop/23/images/plenaries/GeoffPenington.jpg',
      bio: `After studying at Cambridge University as an undergraduate, Geoff Penington obtained his PhD in Physics at Stanford University in 2020. He joined UC Berkeley as an Assistant Professor in July 2020 and was a Visiting Professor at the Institute for Advanced Study from 2021-2022.`,
      affiliation: "Berkeley"
    },
    title: 'Black holes: random or pseudorandom?',
    abstract:`The microscopic laws of physics, whether quantum mechanical or classical, are deterministic. The state of the universe encodes the same information at each moment in time, even if the accessibility of that information might vary. This fundamental paradigm was famously challenged by Stephen Hawking in the 1970s when he posed the "black hole information paradox" and argued that the quantum mechanics of black holes permanently erases information from the universe. Over the last few years, however, techniques from quantum information theory have allowed us to probe the information paradox more deeply than ever before, and for the first time see Hawking's missing information escape back out. I will review some of these developments in a (hopefully) accessible way.`
  },
  {
    presenter: {
      name: 'Henry Yuen',
      picUrl: 'https://ita.ucsd.edu/workshop/23/images/plenaries/HenryYuen.jpg',
      bio:'Henry Yuen is an Assistant Professor of Computer Science at Columbia University. His research focuses on the interplay between quantum computing, complexity theory, cryptography, and information theory. Yuen received a BA in mathematics from the University of Southern California in 2010, and received his PhD in computer science at MIT in 2016. He is a recipient of the NSF CAREER award and a Sloan Fellowship.',
      affiliation: "Columbia"
    },
    title: 'A Tale of Turing Machines, Quantum Entanglement, and Operator Algebras',
    abstract: `n a recent result known as "MIP* = RE," ideas from three disparate fields of study — computational complexity theory, quantum information, and operator algebras — have come together to simultaneously resolve long-standing open problems in each field, including a 45-year old mystery in mathematics known as Connes’ Embedding Problem. In this talk, I will describe the evolution and convergence of ideas behind MIP* = RE: it starts with three landmark discoveries from the 1930s (Turing’s notion of a universal computing machine, the phenomenon of quantum entanglement, and von Neumann’s theory of operators), and ends with some of the most cutting-edge developments from theoretical computer science and quantum computing. This talk is aimed at a general scientific audience, and will not assume any specialized background in complexity theory, quantum physics, or operator algebras.    `
  }
];

const thursdayTalks = [
  {
    presenter: {
      name: 'Andrea Montanari',
      picUrl: 'https://ita.ucsd.edu/workshop/23/images/plenaries/AndreaMontanari.jpg',
      bio:`Andrea Montanari is the Robert and Barbara Kleist Professor in the School of Engineering, and a Professor in Statistics and (by courtesy) Mathematics at Stanford University. He received a Laurea degree in Physics in 1997, and a Ph.D. in Physics in 2001 (both from Scuola Normale Superiore in Pisa, Italy). He has been post-doctoral fellow at Laboratoire de Physique Théorique de l'Ecole Normale Supérieure (LPTENS), Paris, France, and the Mathematical Sciences Research Institute, Berkeley, USA. From 2002 to 2010 he was Chargé de Recherche (with Centre National de la Recherche Scientifique, CNRS) at LPTENS.He was awarded the CNRS bronze medal for theoretical physics in 2006, the National Science Foundation CAREER award in 2008, the Okawa Foundation Research Grant in 2013, the James L. Massey Award of the Information Theory Society in 2016, and the Le Cam Prize of the French Statistical Society in 2020. He received the ACM SIGMETRICS best paper award in 2008 and the Applied Probability Society Best Publication Award in 2015 He was elevated to IEEE Fellow in 2017 and IMS Fellow in 2020. He was an invited sectional speaker at the 2020 International Congress of Mathematicians and an IMS Medallion lecturer for the 2020 Bernoulli-IMS World Congress.`,
      websiteUrl:'https://web.stanford.edu/~montanar/INFO/bio.html',
      affiliation: "Stanford"
    },
    title: 'Analyzing large networks: linear approximation and mean-field theory',
    abstract: `Modern neural network models are largely overparametrized. They 
    can encode functions that are more complex than the ground truth, and in fact
    complex enough to perfectly interpolate white noise. 
    I will briefly compare two mathematical techniques that have been developed to 
    analyze large two-layers networks: (1) Approximation by linear models (an approach
    which makes heavy use of tools from random matrix theory); (2) Mean field theory
    (which is based on ideas from particle systems and optimal transportation).
    Each of these approaches captures in a quantitative way certain interesting behaviors 
    of large networks.`
  },
  {
    presenter: {
      name: 'Matus Telgarsky',
      picUrl: 'https://ita.ucsd.edu/workshop/23/images/plenaries/MatusTelgarsky.jpg',
      affiliation: "UIUC",
      bio:`Matus Telgarsky is an assistant professor at the University of Illinois, Urbana-Champaign, specializing in deep learning theory.  He was fortunate to receive a PhD at UCSD under Sanjoy Dasgupta.  Other highlights include: co-founding, in 2017, the Midwest ML Symposium (MMLS) with Po-Ling Loh; receiving a 2018 NSF CAREER award; and organizing two Simons Institute programs, one on deep learning theory (summer 2019), and one on generalization (fall 2024).`
    },
    title: `Strong and weak implicit biases of first-order methods`,
    abstract: `The implicit bias is an optimization philosophy and associated toolkit, positing that standard descent methods not only minimize the objective function handed to them, but moreover implicitly prefer low-complexity data-adaptive solutions. This talk surveys a few linear and nonlinear results in two styles of implicit bias: the strong implicit bias, which considers convergence to a specific limiting objecting with simultaneously nearly optimal complexity and error, and the weak implicit bias, which merely states that some subset of the gradient descent path has reasonably good complexity and error.`
  },
];

const fridayTalks = [
  {
    presenter: {
      name: 'Aakanksha Chowdhery',
      websiteUrl: 'http://www.achowdhery.com/',
      picUrl: 'https://ita.ucsd.edu/workshop/23/images/plenaries/AakankshaChaudhary.jpg',
      bio: 'Aakanksha has led the effort on training large language models at Google Research which led to the 540B PaLM model. Aakanksha has also been a core member of the Pathways project at Google. Prior to joining Google, Aakanksha led interdisciplinary teams at Microsoft Research and Princeton University across machine learning, distributed systems and networking.  Aakanksha completed her PhD in Electrical Engineering from Stanford University, and was awarded the Paul Baran Marconi Young Scholar Award for the outstanding scientific contributions in the field of communications and the Internet.',
      affiliation: "Google Research"
    },
    title: 'Pathways Language Model and Model Scaling',
    abstract:`Large language models have been shown to achieve remarkable performance across a variety of natural language tasks using few-shot learning, which drastically reduces the number of task-specific training examples needed to adapt the model to a particular application. To further our understanding of the impact of scale on few-shot learning, we trained a 540-billion parameter, dense Transformer language model at Google, which we refer to as Pathways Language Model (PaLM). In this talk, we discuss the system considerations and model improvements necessary to train the PaLM model across 6144 TPU v4 chips using Pathways at very high efficiency levels. Next we share how scaling the model to 540B parameters results in state-of-the-art few shot learning results across hundreds of language understanding and generation benchmarks. We will also share some of the more recent works built on top of PaLM that push the SOTA in various domains and democratize access to natural language processing.`
  },
  {
    presenter: {
      name: 'Sebastien Bubeck',
      picUrl: 'https://ita.ucsd.edu/workshop/23/images/plenaries/SebastienBubeck.jpg',
      bio:`Sebastien Bubeck is a Senior Principal Research Manager in the Machine Learning Foundations group at Microsoft Research (MSR). He joined the Theory Group at MSR in 2014, after three years as an assistant professor at Princeton University. His works on convex optimization, online algorithms and adversarial robustness in machine learning received several best paper awards (NeurIPS 2018 and 2021 best paper, ALT 2018 and 2023 best student paper in joint work with MSR interns, COLT 2016 best paper, and COLT 2009 best student paper). Recently he has been focused on exploring a physics-like theory of neural networks learning.`,
      affiliation: "Microsoft Research"
    },
    title:'Physics of AI — some first steps',
    abstract:`I would like to propose an approach to the science of deep learning that roughly follows what physicists do to understand reality: (1) explore phenomena through controlled experiments, and (2) build theories based on toy mathematical models and non-fully- rigorous mathematical reasoning. I will illustrate (1) with the LEGO study (LEGO stands for Learning Equality and Group Operations), where we observe how transformers learn to solve simple linear systems of equations. I will also briefly illustrate (2) with an analysis of the emergence of threshold units when training a two-layers neural network to solve a simple sparse coding problem. The latter analysis connects to the recently discovered Edge of Stability phenomenon.
    Based on joint works with Kwangjun Ahn, Arturs Backurs, Sinho Chewi Ronen Eldan, Suriya Gunasekar, Yin Tat Lee, Felipe Suarez, Tal Wagner, Yi Zhang, see arxiv.org/abs/2206.04301 and arxiv.org/abs/2212.07469.`
  },
];

export const plenarySessions = [
  {
    dayName: 'Monday',
    topic: 'Three Cheers for Information Theory',
    moderator: {
      name:'Matthieu Bloch',
      picUrl: 'https://ita.ucsd.edu/workshop/23/images/plenaries/MatthieuBloch.jpg',
      affiliation: 'GaTech',
      bio:` Matthieu R. Bloch is a Professor in the School of Electrical and Computer Engineering. He received the Engineering degree from Supélec, Gif-sur-Yvette, France, the M.S. degree in Electrical Engineering from the Georgia Institute of Technology, Atlanta, in 2003, the Ph.D. degree in Engineering Science from the Université de Franche-Comté, Besançon, France, in 2006, and the Ph.D. degree in Electrical Engineering from the Georgia Institute of Technology in 2008. In 2008-2009, he was a postdoctoral research associate at the University of Notre Dame, South Bend, IN. Since July 2009, Dr. Bloch has been on the faculty of the School of Electrical and Computer Engineering, and from 2009 to 2013 Dr. Bloch was based at Georgia Tech Lorraine. His research interests are in the areas of information theory, error-control coding, wireless communications, and cryptography. Dr. Bloch has served on the organizing committee of several international conferences; he was the chair of the Online Committee of the IEEE Information Theory Society from 2011 to 2014, an Associate Editor for the IEEE Transactions on Information Theory from 2016 to 2019 and again since 2021, and he has been on the Board of Governors of the IEEE Information Theory Society since 2016 and currently serves as the President. He has been an Associate Editor for the IEEE Transactions on Information Forensics and Security from 2019 to 2023. He is the co-recipient of the IEEE Communications Society and IEEE Information Theory Society 2011 Joint Paper Award and the co-author of the textbook Physical-Layer Security: From Information Theory to Security Engineering published by Cambridge University Press.`
    },
    moderatorTalk: {
      title: `Three Cheers for Information Theory`,
      abstract: ` The impact that information theory has had on communication systems cannot be understated, yet the application of information theory and coding theory have grown to encompass many fields and areas that were not even conceivable when the foundations of information theory were laid out in 1948. From quantum computing to biological systems, from statistics and machine learning to block chains, the contributions of the information theory community have touched upon a myriad of areas over the last decades.

      Through the talks of our colleagues Andrew Barron, Lara Dolecek, and Emina Soljanin, this session will offer three cheers to information theory and celebrate the diversity of intriguing and exciting research problems tackled in the information theory community. The talks will be followed by an interactive panel to reflect on what lies ahead for information theory and highlight impactful aspects of information theory in areas of growth and broad interest.`
    },
    talks: mondayTalks,
  },
  {
    dayName: 'Tuesday',
    topic: 'Coding and Complexity',
    moderator: {
      name: 'Venkatesan Guruswami',
      picUrl: 'https://ita.ucsd.edu/workshop/23/images/plenaries/VenkatGuruswami.jpg',
      websiteUrl: '',
      bio: `Venkatesan Guruswami is a Professor of Computer Science at UC Berkeley and senior scientist at the Simons Institute for the Theory of Computing. Venkat received his Bachelor's degree from the Indian Institute of Technology, Madras, and his Ph.D. in Computer Science from MIT.

      Venkat's research interests lie in theoretical computer science and related mathematics and include error-correcting codes, approximate optimization, and computational complexity.  He is the Editor-in-Chief of the Journal of the ACM, and was previously president of the Computational Complexity Foundation.  Venkat is a recipient of the Presburger Award, a Simons Investigator award, Packard and Sloan Fellowships, the ACM Doctoral Dissertation Award, and a Distinguished Alumnus Award from IIT Madras. Venkat is a fellow of the ACM, IEEE, and AMS.`,
      affiliation:'Berkeley'
    },
    moderatorTalk: {
      title: 'A near-cubic lower bound for 3-query locally decodable codes',
      abstract: `Locally decodable codes (LDCs) allow for ultra-efficient recovery of
      any single message symbol by querying very few symbols of the
      associated codeword, even in the presence of a constant fraction of
      errors. In addition to their appeal for storage and cryptographic
      applications, locality as a concept drives many connections between
      coding theory and computational complexity. \n
      
      An outstanding challenge concerning LDCs is their optimal encoding
      length for a desired number q of queries. For q=2, it is known that
      exponential blow-up in encoding length is necessary (and the simple
      Hadamard code achieves this). For q > 2, however, there are
      significant gaps in our understanding. For instance, for 3-query LDCs,
      the best known constructions have sub-exponential encoding length,
      whereas the best known lower bound, that has stood for two decades,
      was only quadratic.
      
      In this talk, we will describe a near-cubic lower bound on the
      encoding length of 3-query LDCs. The approach is inspired by and
      borrows from recent advances in refuting semi-random instances of
      constraint satisfaction problems.
      
      Joint work with Omar Alrabiah, Pravesh Kothari, and Peter Manohar.`
    },
    talks: tuesdayTalks,
  },
  {
    dayName: 'Wednesday',
    topic: 'Quantum Computation',
    moderator: {
      name: 'Umesh Vazirani',
      picUrl: 'https://ita.ucsd.edu/workshop/23/images/plenaries/UmeshVazirani.jpg',
      websiteUrl: '',
      bio:  `Umesh Vazirani is Strauch Distinguished Professor of Computer
      Science at UC Berkeley, and Research Director for Quantum
      Computing at the Simons Institute, Berkeley. His 1993 paper with
      Ethan Bernstein laid the foundations of Quantum Complexity
      Theory, and he has worked on classical and quantum algorithms,
      Quantum Hamiltonian Complexity, and Interactive classical testing
      of quantum devices. Vazirani is a member of the NAS, winner of the
      Fulkerson Prize, and co-author of two books: An Introduction to
      Computational Learning Theory (MIT Press) and Algorithms (McGraw-Hill).`,
      affiliation:'Berkeley'
    },
    moderatorTalk: {
      title: 'Testing “Quantumness”',
      abstract: `Can a classical observer (computer) test that a system it is interacting with is 
      “truly quantum?” This is the basic question at the heart of the “quantum supremacy” 
      experiments from the last few years. In this talk I will describe the theoretical basis 
      of these experiments. I will also describe how concepts from cryptography have 
      provided novel and counter-intuitive ways of probing quantum systems, and the 
      prospects that they might provide the “quantum supremacy” challenge for the next 
      generation of quantum computers.`
    },
    talks: wednesdayTalks,
  },
  {
    dayName: 'Thursday',
    topic: 'Deep Learning Theory',
    moderator: {
      name: 'Nathan Srebro',
      picUrl: 'https://ita.ucsd.edu/workshop/23/images/plenaries/NathanSrebro1.jpg',
      websiteUrl: '',
      bio:'',
      affiliation:'TTIC'
    },
    moderatorTalk: {
      title:'Coming Soon',
      abstract:''
    },
    talks: thursdayTalks,
  },
  {
    dayName: 'Friday',
    topic: 'Machine and Deep Learning Applications',
    moderator: {
      name: 'Vahab Mirrokni',
      picUrl: 'https://ita.ucsd.edu/workshop/23/images/plenaries/VahabMirrokni.jpg',
      websiteUrl: '',
      affiliation:'Google Research',
      bio: `Vahab Mirrokni is a Google Fellow and VP at Google Research, leading research teams in market algorithms, large-scale graph-based learning, and large-scale optimization. Previously he was a distinguished scientist and senior research director at Google. He joined Google Research in 2008, after research positions at Microsoft Research, MIT and Amazon.com. He received his PhD from MIT in 2005 and his B.Sc. from Sharif University of Technology in 2001. He is the co-winner of best paper awards at KDD, ACM EC, and SODA. His research areas include algorithms, distributed and stochastic optimization, and computational economics. Recently he has been working on various algorithmic problems in machine learning, online optimization and mechanism design, and distributed algorithms for large-scale graph-based learning .  `,
    },
    moderatorTalk: {
      title: 'Recent trends for ML at Scale: Markets, Graphs, and Optimization',
      abstract:`I will discuss problems in the space of large-scale ML in three major areas: market algorithms, graph-based learning, and ML optimization. I will focus on "Theory to Practice" stories and discuss algorithmic solutions, and new challenges. The talk will touch upon topics like graph-based learning at scale, ads in auto-bidding, online ad allocation, causal inference for markets, and optimization and privacy for large-scale ML models.`
    },
    talks: fridayTalks,
  },
];
