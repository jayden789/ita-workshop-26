import React from 'react';

import { linkWrapper } from './utils';

import chaudhuriImg from '../img2020/plenary-profile-pics/chaudhuri.jpg';
import dimakisImg from '../img2020/plenary-profile-pics/dimakis.jpg';
import hazanImg from '../img2020/plenary-profile-pics/hazan.jpg';
import kakadeImg from '../img2020/plenary-profile-pics/kakade.jpg';
import mehtaImg from '../img2020/plenary-profile-pics/mehta.jpg';
import razImg from '../img2020/plenary-profile-pics/raz.jpg';
import rechtImg from '../img2020/plenary-profile-pics/recht.jpg';
import royImg from '../img2020/plenary-profile-pics/roy.jpg';
import gargImg from '../img2020/plenary-profile-pics/jugal.jpg';
import salakhutdinovImg from '../img2020/plenary-profile-pics/salakhutdinov.jpg';
import sobelImg from '../img2020/plenary-profile-pics/sobel.jpg';
import talwarImg from '../img2020/plenary-profile-pics/talwar.jpg';
import valiantImg from '../img2020/plenary-profile-pics/valiant.jpg';
import vaziraniImg from '../img2020/plenary-profile-pics/vazirani.jpg';
import viswanathImg from '../img2020/plenary-profile-pics/viswanath.jpg';
import willetImg from '../img2020/plenary-profile-pics/willet.jpg';

const mondayTalks = [
  {
    presenter: {
      name: 'Rebecca Willet',
      picUrl: willetImg,
      websiteUrl: 'https://voices.uchicago.edu/willett/',
      bio:'Rebecca Willett is a Professor of Statistics and Computer Science at the University of Chicago. Her research is focused on machine learning, signal processing, and large-scale data science. She completed her PhD in Electrical and Computer Engineering at Rice University in 2005 and was an Assistant then tenured Associate Professor of Electrical and Computer Engineering at Duke University from 2005 to 2013. She was an Associate Professor of Electrical and Computer Engineering, Harvey D. Spangler Faculty Scholar, and Fellow of the Wisconsin Institutes for Discovery at the University of Wisconsin-Madison from 2013 to 2018. Willett received the National Science Foundation CAREER Award in 2007, was a member of the DARPA Computer Science Study Group, and received an Air Force Office of Scientific Research Young Investigator Program award in 2010.',
      affiliation: 'University of Wisconsin',
    },
    title: 'Learned regularization and information theory',
    abstract: 'Many challenging tasks in signal decoding or reconstruction can be described by an ill-posed linear inverse problem; in the context of image reconstruction, deblurring, deconvolution, inpainting, compressed sensing, and superresolution all lie in this framework. Traditional inverse problem solvers minimize a cost function consisting of a data-fit term, which measures how well an image matches the observations, and a regularizer, which reflects prior knowledge and promotes images with desirable properties like smoothness. Recent advances in machine learning have illustrated that it is often possible to learn a regularizer from training data that can outperform more traditional regularizers. In this talk, I will describe various classes of approaches to learned regularization, ranging from source coding to unrolled optimization perspectives, and offer an information theory perspective on their relative merits and sample complexities.',
  },
  {
    presenter: {
      name: 'Pramod Viswanath',
      picUrl: viswanathImg,
      websiteUrl: 'http://www.ece.uiuc.edu/faculty/faculty.asp?pramodv',
      bio:'Pramod Viswanath received the Ph.D. degree in electrical engineering and computer science from University of California at Berkeley in 2000. From 2000 to 2001, he was a member of research staff at Flarion technologies, NJ. Since 2001, he is on the faculty at University of Illinois at Urbana Champaign in Electrical and Computer Engineering, where he currently is a professor. He received the Eliahu Jury Award from the EECS department of UC Berkeley in 2000, the Bernard Friedman Prize from the mathematics department of UC Berkeley in 2000, a NSF CAREER award in 2002, the Xerox faculty research award from the college of engineering of UIUC in 2010 and the Best Paper Award at the Sigmetrics conference in 2015. He is a coauthor, with David Tse, of the text Fundamentals of Wireless Communication, which has been used in over 60 institutions around the world. He is coinventor of the opportunistic beamforming method and codesigner of Flash-OFDM communication algorithms used in all fourth-generation cellular systems.',
      affiliation: 'UIUC'
    },
    title: 'Inventing Communication Algorithms via Deep Learning',
    abstract:
      "Communication/Coding theory is a central discipline underpinning wireline and wireless modems that are the workhorses of the information age. Progress in coding theory is largely driven by individual human ingenuity with sporadic breakthroughs over the past century. In this work we look to automate the discovery of communication algorithms via deep learning. We present the first family of codes in the presence of noisy feedback - designed via learning. While the problem is classical (initiated by Shannon) and feedback is known to improve practical performance, good codes are unknown and linear codes are known to be highly sub-optimal. Our learnt codes significantly outperform known codes by several orders of magnitude in reliability. For the channel without feedback, we show that we can construct near-optimal codes directly via learning. These codes are more robust and adaptive than the state-of-the-art code",
  },
];

const tuesdayTalks = [
  {
    presenter: {
      name: 'Elad Hazan',
      picUrl: hazanImg,
      websiteUrl: 'http://www.cs.princeton.edu/~ehazan/',
      bio:
        'Elad Hazan is a professor of computer science at Princeton University. His research focuses on the design and analysis of algorithms for basic problems in machine learning and optimization. Amongst his contributions are the co-development of the AdaGrad optimization algorithm, and the first sublinear-time algorithms for convex optimization. He is the recipient of the Bell Labs prize, (twice) the IBM Goldberg best paper award in 2012 and 2008, a European Research Council grant, a Marie Curie fellowship and Google Research Award (twice). He served on the steering committee of the Association for Computational Learning and has been program chair for COLT 2015. In 2017 he co-founded In8 inc. focusing on efficient optimization and control, acquired by Google in 2018. He is the co-founder and director of Google AI Princeton.',
      affiliation:"Princeton University"
    },
    title: 'The Non-Stochastic Control Problem',
    abstract:
      'Linear dynamical systems are a continuous subclass of reinforcement learning models that are widely used in robotics, finance, engineering, and meteorology. Classical control, since the work of Kalman, has focused on dynamics with Gaussian i.i.d. noise, quadratic loss functions and, in terms of provably efficient algorithms, known statespace realization and observed state. We\'ll discuss how to apply new machine learning methods which relax all the above: efficient control with adversarial noise, general loss functions, unknown systems, and partial observation.',
  },
  {
    presenter: {
      name: 'Sham Kakade',
      picUrl: kakadeImg,
      websiteUrl: 'http://homes.cs.washington.edu/~sham/',
      bio:'Sham Kakade is a Washington Research Foundation Data Science Chair, with a joint appointment in the Department of Computer Science and the Department of Statistics at the University of Washington, and is a co-director for the Algorithmic Foundations of Data Science Institute. He works on the mathematical foundations of machine learning and AI. Sham\'s thesis helped in laying the foundations of the PAC-MDP framework for reinforcement learning. With his collaborators, his additional contributions include: one of the first provably efficient policy search methods, Conservative Policy Iteration, for reinforcement learning; developing the mathematical foundations for the widely used linear bandit models and the Gaussian process bandit models; the tensor and spectral methodologies for provable estimation of latent variable models (applicable to mixture of Gaussians, HMMs, and LDA); the first sharp analysis of the perturbed gradient descent algorithm, along with the design and analysis of numerous other convex and non-convex algorithms. He is the recipient of the IBM Goldberg best paper award (in 2007) for contributions to fast nearest neighbor search and the best paper, INFORMS Revenue Management and Pricing Section Prize (2014). He has been program chair for COLT 2011.',
      affiliation:"University of Washington"
    },
    title:
      'The Provable Effectiveness of Policy Gradient Methods in Reinforcement Learning',
    abstract:(
      <React.Fragment>
        <p>
        Reinforcement learning is now the dominant paradigm for how an agent learns to interact with the world in order to achieve some long term objectives. Here, policy gradient methods are among the most effective methods in challenging reinforcement learning problems, due to that they: are applicable to any differentiable policy parameterization; admit easy extensions to function approximation; easily incorporate structured state and action spaces; are easy to implement in a simulation based, model-free manner.
        </p>
        <p>
        However, little is known about even their most basic theoretical convergence properties, including:
        <br></br> - do they converge to a globally optimal solution, say with a sufficiently rich policy class?
        <br></br>  - how well do they cope with approximation error, say due to using a class of neural policies?
        <br></br>  - what is their finite sample complexity?
        <br></br>This talk will survey a number of results on these basic questions. We will  highlight the interplay of theory, algorithm design, and practice.
        </p>
        <p>
        Joint work with: Alekh Agarwal, Jason Lee, Gaurav Mahajan
        </p>
      </React.Fragment>
    ),
  },
];

const wednesdayTalks = [
  {
    presenter: {
      name: 'Jugal Garg',
      picUrl: gargImg,
      websiteUrl: 'http://jugal.ise.illinois.edu/',
      bio:'Jugal Garg is an Assistant Professor in Industrial and Enterprise Systems Engineering and an Affiliate Assistant Professor in the Department of Computer Science at the University of Illinois at Urbana-Champaign. Prior to that, he was a postdoctoral fellow at Max-Planck-Institute for Informatics, Germany, and Georgia Tech, USA. He received his Ph.D. from IIT-Bombay in 2012. Jugal is broadly interested in computational aspects of economics and game theory, design and analysis of algorithms, and mathematical programming. Currently, he is working on designing fast algorithms for computing competitive equilibria and their applications to fair division problems. For his research, he has been awarded the NSF CRII Award and the NSF CAREER Award.',
      affiliation: "UIUC"
    },
    presenter: {
    title: 'A Strongly Polynomial Algorithm for Linear Exchange Markets',
    abstract:
      'In this talk, I will present the first strongly polynomial algorithm for computing equilibrium in exchange markets with linear utilities. The exchange market model has been extensively studied since its introduction by Walras in 1874. This problem has a non-separable convex flow formulation and the property that we can find an equilibrium in strongly polynomial time given its support, i.e., the flow variables which are non-zero. Using a variant of the Duan and Mehlhorn (DM) algorithm, we gradually reveal new variables that are in the support of equilibrium. We show that a new variable can be revealed in strongly polynomial time if we start the DM algorithm with the best possible solution corresponding to the current revealed set. Finding the best solution can be reduced to solving a linear program (LP). Even though we are unable to solve this LP in strongly polynomial time, we show that it can be approximated by a simpler LP with two variables per inequality that is solvable in strongly polynomial time and it turns out to be good enough to make the overall algorithm run in strongly polynomial time.<br>This is based on joint work with Laszlo Vegh.',
      name: 'Ruta Mehta',
      picUrl: mehtaImg,
      websiteUrl: 'http://rutamehta.cs.illinois.edu/',
      bio:'My main research interests lie in the areas of algorithmic game theory, mathematical economics, and in design of efficient algorithms. I am interested in exploring the computability of equilibria, both market and Nash, under various settings, and related total search problems from classes PPAD, PLS, and CLS. In addition, I am interested in understanding the impact of strategic behaviour in multi-agent systems, e.g., social networks, fair division of scarce resources, and markets for cloud computing, and avenues for their interdisciplinary applications.',
      affiliation: "UIUC"
    },
    title: 'Computability of Nash Equilibrium through Sum-of-Squares',
    abstract:
      'One of the most extensively studied problems within algorithmic game theory is the computability of Nash equilibrium, especially in two-player games. In this talk, I will explore the power of sum-of-squares (SoS) based algorithmic framework to find any equilibrium, both exact and approximate. Circumventing the decision problem vs. total problem issue, we will first define an SoS framework for Nash Equilibrium based on oblivious rounding and verification oracle. This framework is powerful enough to capture most known SoS based approximation algorithms in combinatorial optimization including the celebrated semidefinite programming based algorithms for Max-Cut, Constraint-Satisfaction Problems, and the recent works on SoS relaxations for Unique Games/Small-Set Expansion, Best Separable State, and many problems in unsupervised machine learning. Next, I will discuss optimal unconditional lower bounds to find an equilibrium under this framework. (Based on joint work with Pravesh Kothari)'
    },
  {
    presenter: {
      name: 'Joel Sobel',
      picUrl: sobelImg,
      websiteUrl: 'https://econweb.ucsd.edu/~jsobel/',
      bio:'Joel Sobel is professor of economics at the University of California at San Diego. He does research in economic theory and studies game theoretic models of communication and signaling. Sobel is a fellow of the Econometric Society, the Game Theory Society,  and the American Academy of Arts and Sciences. He is the recipient of Sloan and Guggenheim Foundation Fellowships. He has been a  co-editor of the American Economic Review and the editor of Econometrica.',
      affiliation: "UCSD"
    },
    title: 'Following the Gale Trail: Some Fundamental Results of David Gale and Their Consequences',
    abstract: 'The talk will provide an overview of several beautiful contributions of David Gale that are less well known than the famous Gale-Shapley Algorithm for Finding Stable Matches.  These contributions include Gale\'s results on two-player zero sum games and  the notion of a "top trading cycle" to find the core in markets with indivisibilities.',
  }
];

const thursdayTalks = [
  {
    presenter: {
      name: 'Ran Raz',
      picUrl: razImg,
      websiteUrl:
        'https://engineering.princeton.edu/faculty/ran-raz',
      bio:'',
      affiliation: "Princeton University"
    },
    title: 'Learning Fast Requires Good Memory: Time-Space Tradeoff Lower Bounds for Learning',
    abstract: 'Can one prove unconditional lower bounds on the number of samples needed for learning, under memory constraints? A recent line of works shows that for a large class of learning problems, any learning algorithm requires either a memory of super-linear size or a super-polynomial number of samples. For example, any algorithm for learning parities of size n, from a stream of samples, requires either a memory of quadratic size or an exponential number of samples. A main message of these works is that for some learning problems, access to a relatively large memory is crucial. The results also have applications in bounded-storage cryptography and relations to computational complexity.',

  },
  {
    presenter: {
      name: 'Kunal Talwar',
      picUrl: talwarImg,
      websiteUrl: 'http://www.kunaltalwar.org',
      bio:'Kunal Talwar is a research scientist at Apple, working on differential privacy, foundations of machine learning and algorithms. He graduated from UC Berkeley in 2004 and previously worked at Microsoft Research and at Google Brain. He co-developed the Exponential mechanism that was the first private mechanism for non-numerical queries and established connections between Differential Privacy and Game Theory. He co-invented the Moments Accountant that underlies implementations of differentially private machine learning in industry. He is a recipient of the Privacy Enhancing Technologies award and the ICLR best paper award.',
      affiliation: "Apple"
    },
    title: 'Differentially Private Machine Learning',
    abstract: 'Modern machine learning models memorize training data and often contain it in an extractable form. Differential privacy has emerged as the standard definition of privacy for statistical settings and provably prevents leakage of training data from the trained model. This talk will discuss this definition and its implication for protecting training data privacy in machine learning models. It will then survey some by-now standard techniques in differentially private machine learning as well as some very recent advances in the theory of private machine learning.',
  },
];

const fridayTalks = [
  {
    presenter: {
      name: 'Ruslan Salakhutdinov',
      picUrl: salakhutdinovImg,
      websiteUrl:
        'http://www.cs.toronto.edu/~rsalakhu/',
      bio:'Ruslan Salakhutdinov received his PhD in machine learning (computer science) from the University of Toronto in 2009. After spending two post-doctoral years at the Massachusetts Institute of Technology Artificial Intelligence Lab, he joined the University of Toronto as an Assistant Professor in the Department of Computer Science and Department of Statistics. In February of 2016, he joined the Machine Learning Department at Carnegie Mellon University as an Associate Professor. Ruslan\'s primary interests lie in deep learning, machine learning, and large-scale optimization. His main research goal is to understand the computational and statistical principles required for discovering structure in large amounts of data. He is an action editor of the Journal of Machine Learning Research and served on the senior programme committee of several learning conferences including NIPS and ICML. He is an Alfred P. Sloan Research Fellow, Microsoft Research Faculty Fellow, Canada Research Chair in Statistical Machine Learning, a recipient of the Early Researcher Award, Connaught New Researcher Award, Google Faculty Award, Nvidia\'s Pioneers of AI award, and is a Senior Fellow of the Canadian Institute for Advanced Research.',
      affiliation: "University of Toronto"
    },
    title: 'Integrating Domain-Knowledge into Deep Learning.',
    abstract: 'In this talk I will discuss autoregressive deep learning models with applications to natural language understanding and show how these models can find semantically meaningful representations of words, learn to read documents and answer questions about their content. I will introduce methods that can augment neural representation of sequential text data with structured data from Knowledge Bases (KBs) for complex multi-hop questions, and show how we can use structured prior knowledge from Knowledge Graphs for image classification tasks. I will further introduce a novel neural architecture, Transformer-XL, that enables learning long-term dependencies in sequential data by introducing the notion of recurrence into our deep self-attention network, while not disrupting temporal coherence.',

  },
  {
    presenter: {
      name: 'Daniel Roy',
      picUrl: royImg,
      websiteUrl: 'http://danroy.org/',
      bio:'',
      affiliation: "University of Toronto"
    },
    title: 'Information-Theoretic Generalization Bounds for SGLD via Data-Dependent Estimates',
    abstract: 'In this work, we improve upon the stepwise analysis of noisy iterative learning algorithms initiated by Pensia, Jog, and Loh (2018) and recently extended by Bu, Zou, and Veeravalli (2019). Our main contributions are significantly improved mutual information bounds for Stochastic Gradient Langevin Dynamics via data-dependent estimates. Our approach is based on the variational characterization of mutual information and the use of data-dependent priors that forecast the mini-batch gradient based on a subset of the training samples. Our approach is broadly applicable within the information-theoretic framework of Russo and Zou (2015) and Xu and Raginsky (2017). Our bound can be tied to a measure of flatness of the empirical risk surface. As compared with other bounds that depend on the squared norms of gradients, empirical investigations show that the terms in our bounds are orders of magnitude smaller.',
  },
];

export const plenarySessions = [
  {
    dayName: 'Monday',
    topic: 'Deep Learning for Source and Channel Coding',
    moderator: {
      name: 'Alex Dimakis',
      picUrl: dimakisImg,
      websiteUrl: 'https://users.ece.utexas.edu/~dimakis/',
      bio:'Alex Dimakis is an Associate Professor at the Electrical and Computer Engineering department, University of Texas at Austin. From 2009 until 2012 he was with the Viterbi School of Engineering, University of Southern California. He received his Ph.D. in 2008 and M.S. degree in 2005 in electrical engineering and computer sciences from UC Berkeley and the Diploma degree from the National Technical University of Athens in 2003. During 2009 he was a CMI postdoctoral scholar at Caltech. He received an ARO young investigator award in 2014, the NSF Career award in 2011, a Google faculty research award in 2012 and the Eli Jury dissertation award in 2008. He is the co-recipient of several best paper awards including the joint Information Theory and Communications Society Best Paper Award in 2012. He served two terms as an associate editor for IEEE Signal Processing letters and is currently serving as an associate editor for IEEE Transactions on Information Theory. His research interests include information theory, coding theory and machine learning.',
      affiliation:'UT, Austin'
    },moderatorTalk: {
      title:
        'Deep Learning for Source and Channel Coding',
      abstract:
        'We will discuss how deep learning techniques may impact the two core areas of our business, as laid out in Shannon\'s paper. For channel coding,  error correction, channel modeling and other aspects of communications may benefit from deep learning techniques. For source coding, modeling natural images with deep generative models is impacting compression, denoising and inverse problems for medical imaging.  We will discuss ongoing trends and open for a panel discussion after the presentations. ',
    },
    talks: mondayTalks,
  },
  {
    dayName: 'Tuesday',
    topic: 'Reinforcement Learning',
    moderator: {
      name: 'Ben Recht',
      picUrl: rechtImg,
      websiteUrl: 'http://eecs.berkeley.edu/~brecht',
      bio: 'Benjamin Recht is an Associate Professor in the Department of Electrical Engineering and Computer Sciences at the University of California, Berkeley. He was previously an Assistant Professor in the Department of Computer Sciences at the University of Wisconsin-Madison. Ben received his B.S. in Mathematics from the University of Chicago, and received a M.S. and PhD from the MIT Media Laboratory. After completing his doctoral work, he was a postdoctoral fellow in the Center for the Mathematics of Information at Caltech.',
      affiliation:'UC, Berkeley'
    },
    talks: tuesdayTalks,
  },
  {
    dayName: 'Wednesday',
    topic: 'Algorithmic Game Theory',
    moderator: {
      name: 'Vijay Vazirani',
      picUrl: vaziraniImg,
      websiteUrl: 'https://www.ics.uci.edu/~vazirani/',
      bio:'',
      affiliation:'UC, Irvine'
    },moderatorTalk: {
      title:
        'Hylland-Zeckhauser: Partially Settling a 40-Year-Old Problem',
      abstract:
        'In a brilliant, and by-now classic, paper written in 1979, Hylland and Zeckhauser gave an attractive mechanism for implementing a one-sided matching market using the power of a pricing mechanism. Their mechanism, which has several desirable properties such as Pareto optimality and incentive compatibility, can be viewed as a marriage between fractional perfect matching and a linear Fisher market. Polynomial time algorithms are known for both these ingredients and yet the problem of obtaining a similar algorithm for Hylland-Zeckhauser, or proving intractability, has remained open for over four decades. <br>We give a partial resolution of this problem. The solution is most unexpected! <br>This is joint work with Mihalis Yannanakakis. ',
    },
    talks: wednesdayTalks,
  },
  {
    dayName: 'Thursday',
    topic: 'Constrained Learning',
    moderator: {
      name: 'Gregory Valiant',
      picUrl: valiantImg,
      websiteUrl: 'http://theory.stanford.edu/~valiant/index.html',
      bio:'Greg Valiant joined the Computer Science Department at Stanford as an Assistant Professor in Fall 2013, after completing a postdoc at Microsoft Research, New England. His main research interests are in algorithms, learning, applied probability and statistics; he is also interested in game theory, and has enjoyed working on problems in database theory. Valiant graduated from Harvard with a BA in Math and an MS in Computer Science, and obtained his PhD in Computer Science from UC Berkeley in 2012.',
      affiliation:'Stanford University'
    },moderatorTalk: {
      title:
        'Constrained Learning',
      abstract:
        'The expanding scale and scope of machine learning has prompted a consideration of how different types of resource constraints impact the ability to learn.  This session centers around exciting recent progress in two such veins: learning with memory constraints, and learning with privacy constraints. ',
    },
    talks: thursdayTalks,
  },
  {
    dayName: 'Friday',
    topic: 'Deep Learning',
    moderator: {
      name: 'Kamalika Chaudhuri',
      picUrl: chaudhuriImg,
      websiteUrl: 'http://cseweb.ucsd.edu/~kamalika/',
      affiliation:'UCSD',
      bio: 'Kamalika Chaudhuri received a Bachelor of Technology degree in Computer Science and Engineering in 2002 from the Indian Institute of Technology, Kanpur, and a PhD in Computer Science from UC Berkeley in 2007. She is currently a postdoctoral researcher at the Computer Science and Engineering Department at UC San Diego. Kamalika\'s research is on the design and analysis of machine-learning algorithms and their applications. In particular, her interests lie in clustering, online learning, and privacy-preserving machine-learning, and applications of machine-learning and algorithms to practical problems in other areas.'
    },
    moderatorTalk: {
      title:
        'Deep Learning',
      abstract:
        'This session will provide a vignette into the state-of-the-art in the theory and practice of deep learning. On the practical side, we will look at deep autoregressive models for complex text sequences. On the theoretical side, we will take a closer look at some interesting generalization phenomena that arise while analyzing deep learning.',
    },
    talks: fridayTalks,
  },
];
