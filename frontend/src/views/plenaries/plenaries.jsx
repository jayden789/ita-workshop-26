import React from 'react';

import { linkWrapper } from './utils';

const PIC_DIR =
  'https://ita.ucsd.edu/workshop/ita_rebuild_files/ita19_plenary_pics';

const mondayTalks = [
  {
    presenter: {
      name: 'Andrea Goldsmith',
      picUrl: `${PIC_DIR}/AndreaGoldsmith_resized.jpg`,
      websiteUrl: 'https://wsl.stanford.edu/~andrea/',
      bio:
        'Andrea Goldsmith is the Stephen Harris professor in the School of Engineering and a professor of Electrical Engineering at Stanford University. She co-founded and served as Chief Technical Officer of Plume WiFi  and of Quantenna (QTNA), and she currently serves on the Corporate or Technical Advisory Boards of multiple public and private companies. She has also held industry positions at Maxim Technologies, Memorylink Corporation, and AT&T Bell Laboratories. Dr. Goldsmith is a member of the National Academy of Engineering and the American Academy of Arts and Sciences, a Fellow of the IEEE and of Stanford, and has received several awards for her work, including the IEEE Sumner Award, the ACM Athena Lecturer Award, the IEEE Comsoc Edwin H. Armstrong Achievement Award, the National Academy of Engineering Gilbreth Lecture Award, the Women in Communications Engineering Mentoring Award, and the Silicon Valley/San Jose Business Journal’s Women of Influence Award. She is author of the book "Wireless Communications" and co-author of the books "MIMO Wireless Communications" and "Principles of Cognitive Radio," all published by Cambridge University Press, as well as an inventor on 29 patents. Her research interests are in information theory and communication theory, and their application to wireless communications and related fields. She received the B.S., M.S. and Ph.D. degrees in Electrical Engineering from U.C. Berkeley.',
    },
    title: 'What’s beyond 5G?',
    abstract:
      'Wireless technology has enormous potential to change the way we live, work, and play over the next several decades. Future wireless networks will support 100 Gbps communication between people, devices, and the “Internet of Things,” with high reliability and uniform coverage indoors and out. New architectures that incorporate “fog” optimization and edge computing will drastically enhance efficient resource allocation while also reducing latency for real-time control. The shortage of spectrum will be alleviated by advances in massive MIMO and mmW technology, and breakthrough energy-efficiency architectures, algorithms and hardware will allow wireless networks to be powered by tiny batteries, energy-harvesting, or over-the-air power transfer. There are many technical challenges that must be overcome in order to make this vision a reality. This talk will describe what the wireless future might look like along with some of the innovations and breakthroughs required to realize this vision.',
  },
  {
    presenter: {
      name: 'Yury Polyanskiy',
      picUrl: `${PIC_DIR}/YuryPolyanskiy_resized.jpg`,
      websiteUrl: 'http://people.lids.mit.edu/yp/homepage/',
      bio:
        'Yury Polyanskiy is an Associate Professor of Electrical Engineering and Computer Science and a member of LIDS at MIT. Yury received Ph.D. degree in electrical engineering from Princeton University, Princeton, NJ in 2010. He won the 2013 NSF CAREER award and 2011 IEEE Information Theory Society Paper Award.',
    },
    title: 'Information theory of massive MAC: need for new codes',
    abstract:
      "The radio networks' load is gradually shifting from a few simultaneously-active traffic-hungry (human) users in pre-4G to hundreds of thousands of low-rate (machine) users in post-5G. We will formalize new information-theoretic questions arising from this shift. A surprising discovery is existence of coded-access schemes that are able to almost perfectly reject the multi-user interference, so that increasing the density of users (without increasing space-time-frequency resources) does not lead to any deterioration of service. Practically important is that known MAC architectures are not capable of attaining this effect.",
  },
  {
    presenter: {
      name: 'John Smee',
      picUrl: `${PIC_DIR}/JohnSmee_resized.jpg`,
      bio:
        "Dr. John E. Smee is a Vice President of Engineering at Qualcomm Technologies Inc. He joined Qualcomm in 2000, holds over 100 U.S. Patents, and has been involved in the system design for a variety of projects focused on the innovation of wireless communications systems such as 5G NR, 4G LTE, CDMA EVDO, and IEEE 802.11. His work involves taking advanced systems designs and signal processing techniques from theory through design, standardization, implementation, and productization.  He is currently the WAN R&D lead, responsible for overseeing all 5G research projects including systems design and advanced RF/HW/SW prototype implementations in Qualcomm’s wireless research and development group.  He also leads Qualcomm’s companywide academic collaboration program across technologies including wireless, semiconductor, multimedia, security, and machine learning.  John was chosen to participate in the National Academy of Engineering Frontiers of Engineering program, and received his Ph.D. in electrical engineering from Princeton University and also holds an M.A. from Princeton and an M.Sc. and B.Sc. from Queen's University.",
    },
    title: 'Realizing the full potential of 5G',
    abstract:
      'We have now officially entered the 5G Era with many commercial networks and devices launching globally in the first half of 2019. While the first phase of 5G NR, based on 3GPP Release 15, primarily focuses on enhanced mobile broadband, our vision for 5G encompasses much more through Release 16, 17, 18 and beyond. 5G is designed to scale for a wide range of devices, services, and deployment types, from bands below 1GHz to above 100 GHz, and including new shared spectrum deployment approaches. One key attribute of 5G is its ability to deliver ultra-low latency services that complement advanced edge cloud computing and on-device processing – enabling new devices like next-generation extended reality (XR). Underpinning this wireless expansion is the need for advanced end-end wireless systems designs across reliability, latency, energy, computing, and network deployment models. We are now at the beginning of the 5G revolution, with future 5G NR releases poised to bring even better capabilities and efficiencies for mobile broadband and to deliver new designs targeting connective vehicles, industrial applications, and many more.',
  },
];

const tuesdayTalks = [
  {
    presenter: {
      name: 'Alex Dimakis',
      picUrl: `${PIC_DIR}/AlexDimakis_resized.jpg`,
      websiteUrl: 'https://users.ece.utexas.edu/~dimakis/',
      bio:
        'Alex Dimakis is an Associate Professor at the Electrical and Computer Engineering department, University of Texas at Austin. He received his Ph.D. in 2008 in EECS from UC Berkeley and the Diploma degree from the National Technical University of Athens in 2003. He is the co-recipient of several best paper awards including the joint Information Theory and Communications Society Best Paper Award in 2012, the NSF Career award, and the James Massey award in 2017. His research interests include information theory, coding theory and machine learning.',
    },
    title: 'How Coding Theory can help in Distributed Learning',
    abstract:
      'Coding theoretic methods can be used to add redundancy of different types to provide fault tolerance for several varieties of errors. As data is increasingly stored and processed in a distributed manner over multiple servers, new types of distributed learning problems arise. We will discuss how coding methods can provide fault tolerance over distributed training of machine learning models for various types of errors or threats. Also, we will discuss how technological trends are changing the bottlenecks and how new coding techniques can have a role in these new information processing challenges.',
  },
  {
    presenter: {
      name: 'Brendan McMahan',
      picUrl: `${PIC_DIR}/BrendanMcMahan_resized.jpg`,
      websiteUrl: 'https://ai.google/research/people/author35837',
      bio:
        'Brendan McMahan is a research scientist at Google, where he leads efforts on decentralized and privacy-preserving machine learning. His team pioneered the concept of federated learning, and continues to push the boundaries of what is possible when working with decentralized data using privacy-preserving techniques. Previously, he has worked in the fields of online learning, large-scale convex optimization, and reinforcement learning. Brendan received his Ph.D. in computer science from Carnegie Mellon University.',
    },
    title: 'Federated Learning from Research to Practice',
    abstract:
      'Federated Learning enables mobile devices to collaboratively learn a shared prediction model while keeping all the training data on device, decoupling the ability to do machine learning from the need to store the data in the cloud. In this talk, I will discuss: (1) how federated learning differs from more traditional machine learning paradigms; (2) practical algorithms for federated learning that address the unique challenges of this setting; (3) extensions to federated learning, including differential privacy, secure aggregation, and compression for model updates, and (4) a quick overview of federated learning applications and systems at Google.',
  },
  {
    presenter: {
      name: 'Ayfer Özgür',
      picUrl: `${PIC_DIR}/AyferOzgur_resized.jpg`,
      websiteUrl: 'https://stanford.edu/~aozgur/',
      bio:
        'Ayfer Özgür received her Ph.D. degree in 2009 from the Information Processing Group at EPFL, Switzerland. In 2010 and 2011, she was a post-doctoral scholar at the same institution. She is an Assistant Professor in the Electrical Engineering Department at Stanford University since 2012. Her research interests include distributed communication and learning, wireless systems, and information theory. Dr. Özgür received the EPFL Best Ph.D. Thesis Award in 2010, an NSF CAREER award in 2013, the Okawa Foundation Research Grant and the IEEE Communication Theory Technical Committee (CTTC) Early Achievement Award in 2018.',
    },
    title:
      'Learning Distributions from their Samples under Communication Constraints',
    abstract:
      'Modern data sets are  distributed across multiple machines and processors, and bandwidth and energy limitations in networks and within multiprocessor systems often impose significant bottlenecks on the performance of algorithms. Motivated by this trend, we consider the problem of estimating high-dimensional distributions and parameters in a distributed network, where each node in the network observes an independent sample from an underlying distribution and can communicate it to a central processor (independently or in an interactive fashion) by using a fixed communication budget. We obtain matching upper and lower bounds for the minimax risk of estimating the underlying distribution or parameter under various common statistical models, revealing the impact of the communication constraint in each model. The key ingredient in our proof is a geometric characterization of Fisher information from quantized samples.',
  },
];

const wednesdayTalks = [
  {
    presenter: {
      name: 'David Gleich',
      picUrl: `${PIC_DIR}/DavidGleich_resized.jpg`,
      websiteUrl: 'https://www.cs.purdue.edu/homes/dgleich/',
      bio:
        'David Gleich is the Jyoti and Aditya Mathur Associate Professor in the Computer Science Department at Purdue University whose research is on novel models and fast large-scale algorithms for data-driven scientific computing including scientific data analysis, bioinformatics, and network analysis. He is committed to making software available based on this research and has written software packages such as MatlabBGL with thousands of users worldwide. Gleich has received a number of awards for his research including a SIAM Outstanding Publication prize (2018), a Sloan Research Fellowship (2016), an NSF CAREER Award (2011), the John von Neumann post-doctoral fellowship at Sandia National Laboratories in Livermore CA (2009). His research is funded by the NSF, DOE, DARPA, and NASA.',
    },
    title: 'Higher-order structure in networks',
    abstract:
      'Much of the data now routinely produced in applications ranging from neuroscience to social networks and text has rich structure that cannot be captured with traditional pairwise-based analysis procedures. We will describe a general theoretical framework to study networks of data based on higher-order motifs instead of edges and show how it is simple to use in practice.',
  },
  {
    presenter: {
      name: 'Jiawei Han',
      picUrl: `${PIC_DIR}/JiaweiHan_resized.jpg`,
      websiteUrl: 'https://hanj.cs.illinois.edu/',
      bio:
        'Jiawei Han is Abel Bliss Professor in the Department of Computer Science, University of Illinois at Urbana-Champaign. He has been researching into data mining, text mining, information network mining, and database systems, with over 900 journal and conference publications. He has chaired or served on many program committees of international conferences in most data mining and database conferences. He also served as the founding Editor-In-Chief of ACM Transactions on Knowledge Discovery from Data, the Director of Information Network Academic Research Center supported by U.S. Army Research Lab (2009-2016), and the co-Director of KnowEnG, an NIH funded Center of Excellence in Big Data Computing (2014-2018). He is Fellow of ACM, Fellow of IEEE, and received 2004 ACM SIGKDD Innovations Award, 2005 IEEE Computer Society Technical Achievement Award, 2009 M. Wallace McDowell Award from IEEE Computer Society, and Japan\'s Funai Achievement Award in 2018. His co-authored book "Data Mining: Concepts and Techniques" has been adopted as a textbook popularly worldwide.',
    },
    title: 'On the Power of Prediction with Heterogeneous Information Networks',
    abstract:
      'A heterogeneous information network models massive interconnected data with a structured network of heterogeneous types. Quality prediction can be conducted with such an information network structure. However, the real world is soaked with unstructured (such as text) data. It is challenging to do quality prediction on unstructured data. We lay out a potential path to structured heterogeneous information networks from unstructured text data and point out the potential for quality prediction with such an information network structure.',
  },
  {
    presenter: {
      name: 'Jure Leskovec',
      picUrl: `${PIC_DIR}/JureLeskovec_resized.jpg`,
      websiteUrl: 'https://cs.stanford.edu/~jure/',
      bio:
        "Jure Leskovec is Associate Professor of Computer Science at Stanford University, Chief Scientist at Pinterest, and investigator at Chan Zuckerberg Biohub. His research focuses on machine learning and data mining large social and information networks, their evolution, and the diffusion of information and influence over them. Computation over massive data is at the heart of his research and has applications in computer science, social sciences, and biomedicine. This research has won several awards including a Lagrange Prize, Microsoft Research Faculty Fellowship, the Alfred P. Sloan Fellowship, and numerous best paper awards. Leskovec received his bachelor's degree in computer science from University of Ljubljana, Slovenia, and his PhD in in machine learning from the Carnegie Mellon University and postdoctoral training at Cornell University.",
    },
    title: 'Deep Learning with Graphs',
    abstract:
      'Machine learning on graphs is an important and ubiquitous task with applications ranging from drug design to friendship recommendation in social networks. The primary challenge in this domain is finding a way to represent, or encode, graph structure so that it can be easily exploited by machine learning models. However, traditionally machine learning approaches relied on user-defined heuristics to extract features encoding structural information about a graph. In this talk I will discuss methods that automatically learn to encode graph structure into low-dimensional embeddings, using techniques based on deep learning and nonlinear dimensionality reduction. I will provide a conceptual review of key advancements in this area of representation learning on graphs, including random-walk based algorithms, and graph convolutional networks. We will discuss applications to web-scale recommender systems, drug discovery, and knowledge representation and reasoning.',
  },
];

const thursdayTalks = [
  {
    presenter: {
      name: 'Karthikeyan Ramamurthy',
      picUrl: `${PIC_DIR}/KarthikeyanRamamurthy_resized.jpg`,
      websiteUrl:
        'https://researcher.watson.ibm.com/researcher/view.php?person=us-knatesa',
      bio:
        'Karthikeyan Natesan Ramamurthy is a Research Staff Member in IBM Research AI at the Thomas J. Watson Research Center, Yorktown Heights, NY. He received his PhD in Electrical Engineering from Arizona State University. His broad research interests are in understanding the geometry and topology of high-dimensional data and developing theory and methods for efficiently modeling the data. He has also been intrigued by the interplay between humans, machines, and data, and the societal implications of machine learning. His papers have won best paper awards at the IEEE International Conference on Data Science and Advanced Analytics and the SIAM International Conference on Data Mining conferences. He is an active member of the Signal Processing and Machine Learning research communities.',
    },
    title: 'Fairness in the Absence of Protected Attributes',
    abstract: (
      <React.Fragment>
        <p>
          Risk assessment is a growing use for machine learning models. When
          used in high-stakes applications, especially ones regulated by
          anti-discrimination laws or governed by societal norms for fairness,
          it is important to ensure that learned models do not propagate and
          scale any biases that may exist in training data. Metrics for
          measuring unwanted bias and approaches for enhancing fairness
          typically require access to protected attributes. However, such access
          may be unavailable in many applications where regulations prevent
          recording of protected attributes or where historical policies did not
          track them. We will provide an overview of works that address this
          scenario. We will also discuss transfer learning solutions to this
          problem, where we exploit related datasets that have protected
          attributes available.
        </p>
        <p>
          The talk is based on joint work with Amanda Coston, Dennis Wei, Kush
          Varshney, Skyler Speakman, Zairah Mustahsan, and Supriyo Chakraborty.
        </p>
      </React.Fragment>
    ),
  },
  {
    presenter: {
      name: 'Omer Reingold',
      picUrl: `${PIC_DIR}/OmerReingold_resized.jpg`,
      websiteUrl: 'https://omereingold.wordpress.com/',
      bio:
        'Omer Reingold is a Professor of Computer Science at Stanford University. Past positions include Samsung Research America, the Weizmann Institute of Science, Microsoft Research, the Institute for Advanced Study in Princeton, NJ, and AT&T Labs. His research is in the Foundations of Computer Science and most notably in Computational Complexity, the Foundations of Cryptography and Algorithmic Fairness. He is an ACM Fellow and among his distinctions are the 2005 Grace Murray Hopper Award and the 2009 Gödel Prize.',
    },
    title: 'A Complexity-Theoretic Perspective on Algorithmic Fairness',
    abstract: (
      <React.Fragment>
        <p>
          Machine learning and data analysis have enjoyed tremendous success in
          a broad range of domains. These advances hold the promise of great
          benefits to individuals, organizations, and society as a whole.
          Undeniably, algorithms are informing decisions that reach ever more
          deeply into our lives, from news article recommendations to criminal
          sentencing decisions to healthcare diagnostics. This progress,
          however, raises (and is impeded by) a host of concerns regarding the
          societal impact of computation. A prominent concern is that left to
          their own devices, algorithms will propagate - even amplify - existing
          biases.
        </p>
        <p>
          Often, definitions of fairness are group-based, typically requiring
          that a given statistic be equal across a few demographic groups,
          socially identified as deserving protection. Other definitions aim at
          individual-level protections. Broad-stroke statistical guarantees tend
          to be much easier to satisfy (information and complexity
          theoretically) but tend to be much weaker in the protections they
          provide.
        </p>
        <p>
          We will discuss recent research towards bridging the gap between
          statistical and individual protections. These works provide efficient
          learning algorithms that ensure protection (according to some fairness
          notion) to every sub-population within some rich class of sets. Our
          approach to defining the class of sets to protect is
          complexity-theoretic. We aim at obtaining the strongest fairness
          guarantees that can be obtained with the available computational
          resources.
        </p>
        <p>
          Based on joint works with Úrsula Hébert-Johnson, Michael P. Kim and
          Guy Rothblum.
        </p>
      </React.Fragment>
    ),
  },
  {
    presenter: {
      name: 'Suresh Venkatasubramanian',
      picUrl: `${PIC_DIR}/SureshVenkatasubramanian_resized.jpg`,
      websiteUrl: 'http://www.cs.utah.edu/~suresh/',
      bio:
        'Suresh Venkatasubramanian is a professor at the University of Utah. His background is in algorithms and computational geometry, as well as data mining and machine learning. His current research interests lie in algorithmic fairness, and more generally the problem of understanding and explaining the results of black box decision procedures. Suresh was the John and Marva Warnock Assistant Professor at the U, and has received a CAREER award from the NSF for his work in the geometry of probability, as well as a test-of-time award at ICDE 2017 for his work in privacy. His research on algorithmic fairness has received press coverage across North America and Europe, including NPR’s Science Friday, NBC, and CNN, as well as in other media outlets. He is a member of the Computing Community Consortium Council of the CRA, a member of the board of the ACLU in Utah, and a member of  New York City’s Failure to Appear Tool (FTA) Research Advisory Council.',
    },
    title: 'Fairness and Abstraction in Sociotechnical Systems',
    abstract: (
      <React.Fragment>
        <p>
          A key goal of the fair-ML community is to develop machine-learning
          based systems that, once introduced into a social context, can achieve
          social and legal outcomes such as fairness, justice, and due process.
          Bedrock concepts in computer science—such as abstraction and modular
          design—are used to define notions of fairness and discrimination, to
          produce fairness-aware learning algorithms, and to intervene at
          different stages of a decision-making pipeline to produce "fair"
          outcomes. In this paper, however, we contend that these concepts
          render technical interventions ineffective, inaccurate, and sometimes
          dangerously misguided when they enter the societal context that
          surrounds decision-making systems. We outline this mismatch with five
          "traps" that fair-ML work can fall into even as it attempts to be more
          context-aware in comparison to traditional data science. We draw on
          studies of sociotechnical systems in Science and Technology Studies to
          explain why such traps occur and how to avoid them. Finally, we
          suggest ways in which technical designers can mitigate the traps
          through a refocusing of design in terms of process rather than
          solutions, and by drawing abstraction boundaries to include social
          actors rather than purely technical ones.
          <p />
          Joint work with Andrew D. Selbst, danah boyd, Sorelle Friedler and
          Janet Vertesi.
        </p>
      </React.Fragment>
    ),
  },
];

const fridayTalks = [
  {
    presenter: {
      name: 'Christopher Ré',
      picUrl: `${PIC_DIR}/ChrisRe_resized.jpg`,
      websiteUrl: 'https://cs.stanford.edu/people/chrismre/',
      bio:
        "Christopher (Chris) Ré is an associate professor in the Department of Computer Science at Stanford University who is affiliated with the Statistical Machine Learning Group, Pervasive Parallelism Lab, and Stanford AI Lab. His work's goal is to enable users and developers to build applications that more deeply understand and exploit data. His contributions span database theory, database systems, and machine learning, and his work has won best paper at a premier venue in each area, respectively, at PODS 2012, SIGMOD 2014, and ICML 2016. In addition, work from his group has been incorporated into major scientific and humanitarian efforts, including the IceCube neutrino detector, PaleoDeepDive and MEMEX in the fight against human trafficking, and into commercial products from major web and enterprise companies. He cofounded a company, based on his research, that was acquired by Apple in 2017. He received a SIGMOD Dissertation Award in 2010, an NSF CAREER Award in 2011, an Alfred P. Sloan Fellowship in 2013, a Moore Data Driven Investigator Award in 2014, the VLDB early Career Award in 2015, the MacArthur Foundation Fellowship in 2015, and an Okawa Research Grant in 2016.",
    },
    title: 'Latent Variable Models for the Training Set Labeling Process',
    abstract: (
      <p>
        High quality training data sets are critical ingredients to most machine
        learning applications. However, in comparison to the large amount of
        progress in improving discriminative prediction, comparatively little
        attention has been paid to modeling the generative process of labeling
        training data. This talk describes some of our recent work modeling the
        quality of training sets, including a theoretical framework that makes
        the connection to a class of latent variable models that allow us to
        understand basic questions of data quality, correlation among sources,
        and more. This theoretical work is the basis of a software system called
        Snorkel (
        {linkWrapper('snorkel.stanford.edu', 'http://snorkel.stanford.edu')})
        that has been successfully deployed by some of the world's largest
        machine learning organizations.
      </p>
    ),
  },
  {
    presenter: {
      name: 'Benjamin Recht',
      picUrl: `${PIC_DIR}/BenjaminRecht_resized.jpg`,
      websiteUrl: 'https://people.eecs.berkeley.edu/~brecht/',
      bio:
        "Benjamin Recht is an Associate Professor in the Department of Electrical Engineering and Computer Sciences at the University of California, Berkeley.  Ben's research group studies the theory and practice of optimization algorithms with a particular focus on applications in machine learning and data analysis. Ben is the recipient of a Presidential Early Career Award for Scientists and Engineers, an Alfred P. Sloan Research Fellowship, the 2012 SIAM/MOS Lagrange Prize in Continuous Optimization, the 2014 Jamon Prize, the 2015 William O. Baker Award for Initiatives in Research, and the 2017 NIPS Test of Time Award.",
    },
    title: 'Training on the Test Set and Other Heresies',
    abstract:
      "This talk will survey recent empirical evidence challenging the 'best practices' frequently taught in machine learning. Conventional wisdom taboos training on the test set, interpolating the training data, and optimizing to high precision. This talk will present evidence demonstrating that this conventional wisdom is wrong. Moreover, I will highlight new experiments illuminating two significant downsides to contemporary machine learning practice: surprising sensitivity to how data is generated and significant diminishing returns in model accuracies given increased compute resources. Both of these phenomena imperil the reliability of current learning systems, and new best practices to mitigate these effects are critical for truly robust and reliable machine learning.",
  },
  {
    presenter: {
      name: 'Edo Liberty',
      picUrl: `${PIC_DIR}/EdoLiberty_resized.jpg`,
      websiteUrl: 'https://edoliberty.github.io/',
      bio:
        'Edo Liberty is a Director of Research at AWS and the head of Amazon AI Labs. He received his B.Sc. in Physics and Computer Science from Tel Aviv University and his PhD in Computer Science from Yale University, where he was also a postdoctoral fellow in the Applied Mathematics program. His research topics include theoretical machine learning, data mining, streaming algorithms, and optimization.',
    },
    title: 'Coresets, Discrepancy, and Sketches in Machine Learning',
    abstract:
      'We explore the notion of coresets in machine learning. Coresets are small sets of data points (or examples) that approximate the entire data distribution. Much research was devoted to finding small coresets for logistic regression, linear regression, classification, clustering, density estimation, covariance approximation and many other problems. This talk presents a new measure of function class complexity in machine learning, namely, class discrepancy. Class discrepancy bounds the coreset complexity (minimal coreset size) for all the above problems and many others. These coresets are asymptotically smaller than those currently known and are often provably optimal. In fact, there exist mergeable streaming coreset constructions for all machine learning problems with bounded class discrepancy. This, at least information theoretically, allows for communication-free, distributed, order-agnostic, streaming machine learning.',
  },
];

export const plenarySessions = [
  {
    dayName: 'Monday',
    topic: '6G',
    moderator: {
      name: 'Jeff Andrews',
      picUrl: `${PIC_DIR}/JeffAndrews_resized.jpg`,
      websiteUrl: 'https://sites.utexas.edu/jandrews/',
      bio: (
        <React.Fragment>
          <p>
            Jeffrey Andrews is the Cullen Trust Endowed Professor (#1) of ECE at
            the University of Texas at Austin and holds a Ph.D. in Electrical
            Engineering from Stanford University. He has worked at Qualcomm and
            Intel and consulted widely in the wireless industry. He was the
            Editor-in-Chief of the IEEE Transactions on Wireless Communications
            from 2014-2016, is Chair of the IEEE Communications Society Emerging
            Technologies Committee, and is the Chair of the Steering Committee
            for the IEEE Journal on Selected Areas in Information Theory.
          </p>
          <p>
            Dr. Andrews is an ISI Highly Cited Researcher and has been
            co-recipient of best paper awards including the 2016 IEEE
            Communications Society &amp; Information Theory Society Joint Paper
            Award, the 2014 IEEE Stephen O. Rice Prize, the 2014 and 2018 IEEE
            Leonard G. Abraham Prize, the 2011 and 2016 IEEE Heinrich Hertz
            Prize, and the 2010 IEEE ComSoc Best Tutorial Paper Award. He
            received the 2015 Terman Award, the NSF CAREER Award, the 2019 IEEE
            Kiyo Tomiyasu Technical Field Award, and is an IEEE Fellow.
          </p>
        </React.Fragment>
      ),
    },
    talks: mondayTalks,
  },
  {
    dayName: 'Tuesday',
    topic: 'Distributed Learning',
    moderator: {
      name: 'Nati Srebro',
      picUrl: `${PIC_DIR}/NatiSrebro_resized.jpg`,
      websiteUrl: 'http://ttic.uchicago.edu/~nati/',
      bio:
        'Nati (Nathan) Srebro is a professor at the Toyota Technological Institute at Chicago, with cross-appointments at the University of Chicago Dept. of Computer Science and Committee on Computational and Applied Mathematics. He obtained his PhD at the Massachusetts Institute of Technology (MIT) in 2004, and previously was a post-doctoral fellow at the University of Toronto, a Visiting Scientist at IBM, and an Associate Professor of the Technion. Prof. Srebro’s research encompasses methodological, statistical and computational aspects of Machine Learning, as well as related problems in Optimization. Some of Prof. Srebro’s significant contributions include work on learning “wider” Markov networks; introducing the use of the nuclear norm for machine learning and matrix reconstruction; and work on fast optimization techniques for machine learning, and on the relationship between learning and optimization. His current interests include understanding deep learning through a detailed understanding of optimization; distributed and federated learning; algorithmic fairness and practical adaptive data analysis.',
    },
    talks: tuesdayTalks,
  },
  {
    dayName: 'Wednesday',
    topic: 'Mining Higher-Order Structures in Networks',
    moderator: {
      name: 'Olgica Milenkovic',
      picUrl: `${PIC_DIR}/OlgicaMilenkovic_resized.jpg`,
      websiteUrl: 'https://publish.illinois.edu/milenkovic/',
      bio:
        'Olgica Milenkovic is a professor of Electrical and Computer Engineering at the University of Illinois, Urbana-Champaign (UIUC), and Research Professor at the Coordinated Science Laboratory. She obtained her Masters Degree in Mathematics in 2001 and PhD in Electrical Engineering in 2002, both from the University of Michigan, Ann Arbor. Prof. Milenkovic heads a group focused on addressing unique interdisciplinary research challenges spanning the areas of algorithm design and computing, bioinformatics, coding theory, machine learning and signal processing. Her scholarly contributions have been recognized by multiple awards, including the NSF Faculty Early Career Development (CAREER) Award, the DARPA Young Faculty Award, the Dean’s Excellence in Research Award, and several best paper awards. In 2013, she was elected a UIUC Center for Advanced Study Associate and Willett Scholar while in 2015 she was elected a Distinguished Lecturer of the Information Theory Society. In 2018 she became an IEEE Fellow. She has served as Associate Editor of the IEEE Transactions of Communications, the IEEE Transactions on Signal Processing, the IEEE Transactions on Information Theory and the IEEE Transactions on Molecular, Biological and Multi-Scale Communications. In 2009, she was the Guest Editor in Chief of a special issue of the IEEE Transactions on Information Theory on Molecular Biology and Neuroscience.',
    },
    talks: wednesdayTalks,
  },
  {
    dayName: 'Thursday',
    topic: 'Algorithmic Fairness',
    moderator: {
      name: 'Maya Gupta',
      picUrl: `${PIC_DIR}/MayaGupta_resized.jpg`,
      websiteUrl: 'https://ai.google/research/people/MayaGupta',
      bio:
        'Maya Gupta is a Google Principal Research Scientist and leads the Glassbox Machine Learning R&D team in Google AI, which focuses on designing and developing controllable and debuggable machine learning algorithms that solve Google product needs. Prior to Google, Gupta was an Associate Professor of Electrical Engineering at the University of Washington from 2003-2013. Her PhD in EE is from Stanford where she worked with Bob Gray, and she holds a BS EE and BA Econ from Rice. Gupta has also worked for research groups at NATO, Ricoh, AT&T, and HP, and founded and runs the wooden jigsaw puzzle company, Artifact Puzzles.',
    },
    talks: thursdayTalks,
  },
  {
    dayName: 'Friday',
    topic: 'Denial in Machine Learning',
    moderator: {
      name: 'Dimitris Achlioptas',
      picUrl: `${PIC_DIR}/DimitrisAchlioptas_resized.jpg`,
      websiteUrl: 'https://users.soe.ucsc.edu/~optas/',
    },
    moderatorTalk: {
      title:
        'How to Get Awesome Results by Solving the Wrong Problem with the Wrong Algorithm',
      abstract:
        'Clustering is usually cast as an optimization problem, where we seek the “best fitting” partition of a collection of objects, given a set of measurements about the objects. Fit is expressed as a numerical score and often corresponds to the likelihood under some generative model. We show that in nearly all circumstances this is the wrong thing to do, as it is equivalent to presuming a very specific utility for the clustering task, which is almost never the true utility. Motivated by this observation, we show how to incorporate utility in the formulation of the clustering problem, so that different utility functions lead to different optimal clusterings. In particular, our viewpoint gives a stand-alone, quantitative criterion for choosing between wide vs. narrow optima of the scoring function. Finally, we discuss how optimization algorithms such as Stochastic Gradient Descent (SGD) fit in this picture.',
    },
    talks: fridayTalks,
  },
];
