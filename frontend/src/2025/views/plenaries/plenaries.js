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

const mondayTalks = [
  {
    presenter: {
      name: 'Wei Yu',
      picUrl: YuImg,
      affiliation: 'University of Toronto',
      bio: `Wei Yu received the B.A.Sc. degree in Computer Engineering and Mathematics from the University of Waterloo, 
      Waterloo, Ontario, Canada in 1997 and M.S. and Ph.D. degrees in Electrical Engineering from Stanford University, 
      Stanford, CA, in 1998 and 2002, respectively. Since 2002, he has been with the Electrical and Computer Engineering 
      Department at the University of Toronto, where he is currently Professor and holds a Canada Research Chair in 
      Information Theory and Wireless Communications. His main research interests include multiuser information theory, 
      optimization, wireless communications and broadband access networks. Prof. Wei Yu serves as the First Vice President 
      of the IEEE Information Theory Society in 2020, and has served on its Board of Governors since 2015. He is currently 
      an Area Editor for the IEEE Transactions on Wireless Communications, and in the past served as an Associate Editor 
      for IEEE Transactions on Information Theory (2010-2013), as an Editor for IEEE Transactions on Communications 
      (2009-2011), and as an Editor for IEEE Transactions on Wireless Communications (2004-2007). He served as the Chair 
      of the Signal Processing for Communications and Networking Technical Committee of the IEEE Signal Processing Society 
      in 2017-18. Prof. Wei Yu was an IEEE Communications Society Distinguished Lecturer in 2015-16. He received the 
      Steacie Memorial Fellowship in 2015, the IEEE Marconi Prize Paper Award in Wireless Communications in 2019, the 
      IEEE Communications Society Award for Advances in Communication in 2019, the IEEE Signal Processing Society Best 
      Paper Award in 2017 and 2008, the Journal of Communications and Networks Best Paper Award in 2017, the IEEE 
      Communications Society Best Tutorial Paper Award in 2015. Prof. Wei Yu is a Fellow of the Canadian Academy of 
      Engineering, and a member of the College of New Scholars, Artists and Scientists of the Royal Society of Canada.
`,
      websiteUrl: 'https://www.itsoc.org/profile/8735',
    },
    title:
      'Minimum Feedback for Collision-Free Scheduling in Massive Random Access',
    abstract: `Consider a massive random access scenario in which a small set of k active users out of a large number 
    of n potential users need to be scheduled in b≥k slots. What is the minimum common feedback to the users needed to 
    ensure that scheduling is collision-free? Instead of a naive scheme of listing the indices of the k active users in 
    the order in which they should transmit, at a cost of klog(n) bits, this paper shows that for the case of b=k , the 
    rate of the minimum fixed-length common feedback code scales only as klog(e) bits, plus an additive term that scales 
    in n as Θ(loglog(n)) for fixed k . If a variable-length code can be used, assuming uniform activity among the users, 
    the minimum average common feedback rate still requires klog(e) bits, but the dependence on n can be reduced to O(1) . 
    When b>k , the number of feedback bits needed for collision-free scheduling can be significantly further reduced. 
    Moreover, a similar scaling on the minimum feedback rate is derived for the case of scheduling m users per slot, 
    when k≤mb . The problem of constructing a minimum collision-free feedback scheduling code is connected to that of 
    constructing a perfect hashing family, which allows practical feedback scheduling codes to be constructed from 
    perfect hashing algorithms.
    `,
  },
  {
    presenter: {
      name: 'Flavio Calmon',
      picUrl: FlavioImg,
      websiteUrl: 'https://people.seas.harvard.edu/~flavio/#',
      affiliation: 'Harvard University',
      bio: `I am an Associate Professor of Electrical Engineering at Harvard's John A. Paulson School of Engineering 
      and Applied Sciences. Before joining Harvard I was a social good post-doctoral fellow at IBM Research in Yorktown 
      Heights, New York. I received my Ph.D. in Electrical Engineering and Computer Science at MIT. My main research 
      interests are information theory, signal processing, and machine learning.
      `,
    },
    title:
      '',
    abstract: ``,
  },
];

const tuesdayTalks = [
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
  },
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
    title: '',
    abstract:
      '',
  },
];

const fridayTalks = [
];

export const plenarySessions = [
  {
    dayName: 'Monday',
    topic: 'Information Theory & Signal Processing Paper Awards',
    moderator: {
      name: '',
      picUrl: '',
      websiteUrl: '',
      affiliation: '',
      bio: ``,
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
    topic: 'Advances in Large Language Models',
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
