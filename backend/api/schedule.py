import pandas as pd
import os
from datetime import datetime
class Schedule:
    def __init__(self) -> None:
        path_csv = os.path.join(os.path.dirname(__file__), 'ITA_2024_Schedule.csv')

        self.df = pd.read_csv(path_csv)

        self.df['authors'] = self.df['First name'] + ' ' + self.df['Last name']

        self.df = self.df.fillna('')


        self.days = {"M": 0, "T": 1, "W":2, "R":3, "F":4}
        self.rooms = {"1":0, "2":1, "3":2, "4":3,"5":4}
        self.daynames= ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
        self.roomnames= ['George', 'Abe', 'Jack', 'Eva', 'Cory']
        self.dayindices = {0: "M", 1: "T", 2: "W", 3: "R", 4:"F"}

        self.plenary_titles= {0: 'Innovation that may empower 6G', 1: 'Three cheers for information theory', 2: '', 3: 'Learning and reasoning', 4: 'Information, meaning, and understanding in large models'}
        self.lunch_titles= {0: 'Know Thy Neighbor', 1: 'State of the Information Theory Society', 3: 'NSF Presentation ; Hello Boss: Recruitment Event', 4: 'Fun by the Beach'}
        self.special_titles= {0: 'Award Sessions: Best 2023 papers from IT, IT/Comm, SP societies',
                              1: 'The secret to your success',
                              2: '',
                              3: 'Award Sessions: Best 2023 papers from NeurIPS, ICML, ACL',
                              4: 'Farewell Bash'}
        
        self.speaker_list= [
            ["Besma Smida, UIC", "Bertrand Hochwald, Notre Dame", "Sundeep Rangan, NYU", "Moderator: Robert Heath, UCSD"], 
            ["Saikat Guha, University of Arizona", "Urbashi Mitra, USC", "Aylin Yener, Ohio State", "Moderator: Stark Draper, University of Toronto"],
            ["Ashish Goel, Stanford", "Nicole Immorilica, Microsoft", "Omer Tamuz, Caltech", "Moderator: Vijay Vazirani, UC Irvine"],
            ["Emmanuel Abbe, EPFL", "Samy Bengio, Apple", "Mikhail Belkin, UCSD", ""],
            ["Tom Goldstein, University of Maryland", "Anur Moitra, MIT", "Stefano Soatto, UCLA & Amazon", ""]
            ]
        
        self.plenary_talk_titles= {'Besma Smida, UIC': 'Integrated Sensing and Communications: A Communication Theory Perspective',
                                   'Bertrand Hochwald, Notre Dame': 'Examples of Information-Theoretic Models of Circuits in Wireless Communication Systems',
                                   'Sundeep Rangan, NYU': 'Cellular Wireless Networks in the Upper Mid-Band',
                                   'Moderator: Robert Heath, UCSD': 'Robert W. Heath Jr. is a Professor in the Department of ECE at the University of California, San Diego. He is excited to begin a new journey in San Diego, and is looking forward to staying for a while.',
                                   'Moderator: Stark Draper, University of Toronto': 'Stark Draper is a Professor of Electrical and Computer Engineering at the University of Toronto.  He is serving as ITSoc President in 2024.  He spent the pandemic endeavoring to make hand-pulled Lanzhou Lamian noodles; his noodles still break after about 4 doublings.  He is excited to return to ITA to hear engaging and inspiring talks while enjoying a respite from the Canadian winter.',
                                   'Moderator: Vijay Vazirani, UC Irvine': '',
                                    '':'',
                                    'TBA':'',
                                   'Saikat Guha, University of Arizona': '',
                                   'Urbashi Mitra, USC': '(My)Asymptopia and Science',
                                   'Aylin Yener, Ohio State': 'Not Beyond, but With Shannon',
                                   "Ashish Goel, Stanford": 'Optimum Design of Automated Market Makers',
                                   "Nicole Immorilica, Microsoft": 'Algorithmic Persuasion through Simulation',
                                   "Omer Tamuz, Caltech": 'Private Private Information',
                                   "Emmanuel Abbe, EPFL": 'Can neural networks learn complex functions?',
                                   "Samy Bengio, Apple": 'Length generalization can be hard: two insight',
                                   "Mikhail Belkin, UCSD": 'The puzzle of dimensionality and feature learning in neural networks and kernel machines',
                                   "Tom Goldstein, University of Maryland": 'Flatness believers are people too',
                                   "Anur Moitra, MIT": 'Learning From Dynamics',
                                   "Stefano Soatto, UCLA & Amazon": '',
                                   "Cheuk Ting Li, Venkat Anantharam": 'Information Theory Paper Award',
                                   "Xingran Chen, Konstantinos Gatsis, Hamed Hassani, Shirin Saeedi Bidokhti": 'Information Theory / Communication Societies Paper Award',
                                   "Hossein Talebi, Peyman Milanfar": 'Signal Processing Best Paper Award',
                                   "John Kirchenbauer, Jonas Geiping, Yuxin Wen, Jonathan Katz, Ian Miers, Tom Goldstein": 'International Conference on Machine Learning (ICML) Outstanding Paper Award',
                                   "Rylan Schaeffer, Brando Miranda, Sanmi Koyejo": 'Neural Information Processing Symposium (NeurIPS) Outstanding Main Track Paper Award',
                                   "Jack Hessel, Ana Marasovic, Jena D. Hwang, Lillian Lee, Jeff Da, Rowan Zellers, Robert Mankoff, Yejin Choi": "Association for Computational Linguistics (ACL) Best Paper Award"
                                   }
        
        self.plenary_abstract= {   'Besma Smida, UIC': 'In-band full-duplex Multiple-Input Multiple-Output (MIMO) systems provide an opportunity for Integrated Sensing and Communication (ISAC) systems to realize spectrum-efficient simultaneous information transmission and environmental awareness. This line of research is typically referred to as FD-ISAC. This talk will review the unique characteristics and challenges of mono-static FD-ISAC, show simulation results (considering 6G Orthogonal Frequency Division Multiplexing (OFDM) waveforms), and outline several directions of future research.',
                                   'Bertrand Hochwald, Notre Dame': 'This talk will present information-theoretic models for circuits that are encountered in wireless communication systems.  Of particular interest are systems where high bandwidths, antenna coupling, or high carrier frequencies require imperfect matching and nonlinearities to be considered.',
                                   'Sundeep Rangan, NYU': 'The upper mid-band -- approximately from 7 to 24 GHz --- has recently attracted considerable interest for new cellular services.  This frequency range has vastly more spectrum than the highly congested bands below 7 GHz while offering more favorable propagation and coverage than the millimeter wave (mmWave) frequencies. In 3GPP, this frequency range has been referred to as FR3.   Realizing systems that exploit the full range of the FR3 bands, however, presents significant challenges.  Most importantly, spectrum will likely need to be shared with incumbents including communication satellites, military RADAR, and radio astronomy.   Also, the upper mid-band is simply a vast frequency range. Due to this wide bandwidth, combined with the directional nature of transmission and intermittent occupancy of incumbents, cellular systems will likely need to be agile to sense and intelligently use large spatial and frequency degrees of freedom.  In this talk, we review initial results on feasibility and potential gains of such systems including:  (1) ray tracing simulation to assess potential gains of multi-band frequency adaptive systems; (2) machine learning methods for multi-band channel modeling;  (3) an evaluation of potential  cross interference between satellites and terrestrial cellular services and interference nulling to reduce that interference; and (4) some information theoretic  perspectives on spectrum sensing.  Joint work with Seongjoon Kim, Marco Mezzavilla (NYU), Aditya Dhananjay, Mike Zappe (Pi-Radio)',
                                   'Moderator: Robert Heath, UCSD': '',
                                   'Moderator: Stark Draper, University of Toronto': '',
                                   'Moderator: Vijay Vazirani, UC Irvine': '',
                                    '':'',
                                    'TBA':'',
                                   'Saikat Guha, University of Arizona': '',
                                   'Urbashi Mitra, USC': 'Some forays into mixing information theory, statistical signal processing, and communications with decidedly science applications will be shared.  A key challenge is the modeling and abstraction of these systems to enable the use of the tools typical in the afore-mentioned disciplines.  Another hurdle to overcome is in the validation of any developed theory or algorithm.  Both of these efforts are often stymied by a limited number of realizations of experimental data. Some recent work gives hope that ITA-like theorists can make meaningful contributions to the analysis and understanding of some of these science problems. In particular, we will talk about molecular communication, bacterial interaction and quantum chemistry.',
                                   'Aylin Yener, Ohio State': '6G vision is quickly emerging as one of massive and complete connectivity, and of true convergence of communications, computing, and AI; enabling unprecedented applications in transportation, medicine, agriculture, and digital access for all. 6G, with its envisioned programmable open network architectures, is expected to be the first generation where fundamental innovations at the wireless edge can truly be integrated into network design. Semantic communications is an emerging paradigm for 6G that is attracting a lot of attention from the communications community. Broadly defined as transceiver design to convey the meaning of information, this field continues to receive various interpretations, including it being “beyond” Shannon. We argue that semantic communications is in fact aligned with Shannon theoretic thinking, and as such presents an opportunity for the information theory community to continue to make its impact in this very important application space. Implementing judicious designs that guarantees reliable communication of semantics, this paradigm, still in its naissance, promotes efficient use and reuse of wireless resources. Information theoretic insights, aided by advances in learning, could bring back the popularity network information theory enjoyed a couple of decades ago. We will provide some examples in point-to-point and relayed semantic communications and discuss the role of our community in this regard, going forward, with Shannon.',
                                   "Ashish Goel, Stanford": "Automated Market makers in general, and Constant Function Market Makers (CFMMs) in particular, have become a prominent component of the Decentralized Finance ecosystem. CFMMs provide liquidity between apair of assets by maintaining a liquidity pool where the quantities ofthe two assets are required to vary according to  a prescribed \"trading function\". We present a tractable convex optimization framework to compute the optimum trading function, given any set of initial beliefs about future asset prices. Our convex optimization framework further extends to capture the tradeoffs between fee revenue, arbitrage loss, and opportunity costs of liquidity providers. We also present an axiomatic approach to integrating CFMMs into more traditional batch exchanges. \n Joint work with Mohak Goyal, David Mazieres, and Geoffrey Ramseyer.",
                                   "Nicole Immorilica, Microsoft": 'In this talk, we study (Bayesian) persuasion with oracle access. In the standard persuasion setup, a sender uses knowledge about a receiver\'s beliefs to persuade her to take certain actions. However, in many settings the sender may only have limited information about the receiver she is trying to persuade. Motivated by recent empirical research showing that Generative AI can simulate economic agents, we introduce a model of persuasion in which the sender is uncertain about the receiver\'s beliefs, but has access to an oracle which can simulate the receiver\'s behavior under any messaging policy. These simulations allow the sender to refine her information about the receiver, enabling her to be more persuasive. We show how the sender can leverage her ability to simulate the receiver in order to design querying policies which maximize her utility. This talk is based on joint work with Keegan Harris, Brendan Lucier and Alex Slivkins.',
                                   "Omer Tamuz, Caltech": 'A private private information structure delivers information about an unknown state while preserving privacy: An agent\’s signal contains information about the state but remains independent of other\’ sensitive or private information. We study how informative such structures can be, and characterize those that are optimal in the sense that they cannot be made more informative without violating privacy. We connect our results to fairness in recommendation systems and explore a number of further applications.',
                                   "Emmanuel Abbe, EPFL": 'Can we characterize the class of functions that neural networks trained by (S)GD can learn? Can it learn complex reasoning/logic functions? This should depend on the types of architectures and training methods considered. We provide here a first characterization based on the architecture complexity: (i) for ‘unconstrained architectures’, the framework can learn essentially any function class that is efficiently learnable by some algorithm, thereby showing the hypothetical universality of the framework, (ii) for ‘regular architectures’ such as MLPs and isotropic data, the framework is instead constrained by the “leap complexity” of the functions, a measure of how “hierarchical” the functions are in their Fourier/L2 expansion. In particular, it is shown that SGD on such networks learns with a saddle-to-saddle dynamic that recovers the functions by climbing its hierarchical features. We conclude by discussing how this “feature climbing” insight leads to new training methods based on curriculum learning and symbolic regression to improve the efficiency of learning complex logic functions.',
                                   "Samy Bengio, Apple": 'Learning to generalize to problems that are longer at test time than during training can be hard. We present two insights into this problem. The first one considers the general concept of \'generalization of the unseen\', or GOTU, where part of the domain is completely unseen during training (some combination of inputs values are never seen at train time) and try to understand how the model will behave when they are seen at test time. In the second vignette, we present a hypothesis that distinguishes between hard length generalization problems (like parity) and easy ones (like counting) when using Transformers, through the introduction of the RASP-L conjecture.',
                                   "Mikhail Belkin, UCSD": 'Remarkable progress in AI has far surpassed expectations of just a few years ago. At their core, modern models, such as transformers, implement traditional statistical models -- high order Markov chains. Nevertheless, it is not generally possible to estimate Markov models of that order given any possible amount of data. Therefore these methods must implicitly exploit low-dimensional structures present in data. Furthermore, these structures must be reflected in high-dimensional internal parameter spaces of the models.  Thus, to build fundamental understanding of modern AI, it is necessary to identify and analyze these latent low-dimensional structures.  In this talk, I will discuss how deep neural networks of various architectures learn low-dimensional features and how the lessons of deep learning can be incorporated in non-backpropagation-based algorithms that we call Recursive Feature Machines. I will provide a number of experimental results on different types of data, as well as some connections to classical sparse learning methods, such as Iteratively Reweighted Least Squares.',
                                   "Tom Goldstein, University of Maryland": 'It is widely believed that generalization in overparameterized neural networks arises largely from the implicit regularization of stochastic gradient descent.  At the same time, there are those who believe instead that the primary engine behind generalization is not the optimizer, but rather loss landscape geometry.   We call these people "flatness believers."  Some of them live silently among us.  Some speak out, refusing to be a cog in the (support vector) machine.  Is the flatness theory legit?  Or is it just a (gradient) descent into madness?  In this talk, I will argue that theories of optimizer-based implicit regularization are not supported by experimental evidence, and that loss landscape geometry is likely to play a major role in generalization.',
                                   "Anur Moitra, MIT": 'Linear dynamical systems are the canonical model for time series data. They have wide-ranging applications and there is a vast literature on learning them from data. But as I will explain, there are wide gaps in our understanding. We give a new approach, based on the method of moments, that is computationally efficient and gives algorithms that work under essentially minimal assumptions. ',
                                   "Stefano Soatto, UCLA & Amazon": '',
                                   "Cheuk Ting Li, Venkat Anantharam": 'A Unified Framework for One-shot Achievability via the Poisson Matching Lemma',
                                   "Xingran Chen, Konstantinos Gatsis, Hamed Hassani, Shirin Saeedi Bidokhti": 'Age of Information in Random Access Channels',
                                   "Hossein Talebi, Peyman Milanfar": 'NIMA: Neural Image Assessment',
                                   "John Kirchenbauer, Jonas Geiping, Yuxin Wen, Jonathan Katz, Ian Miers, Tom Goldstein": 'A Watermark for Large Language Models',
                                   "Rylan Schaeffer, Brando Miranda, Sanmi Koyejo": 'Are Emergent Abilities of Large Language Models a Mirage?',
                                   "Jack Hessel, Ana Marasovic, Jena D. Hwang, Lillian Lee, Jeff Da, Rowan Zellers, Robert Mankoff, Yejin Choi": "Do Androids Laugh at Electric Sheep? Humor “Understanding” Benchmarks from The New Yorker Caption Contest"        
                                }
        
        self.award_speakers= {0: ["Cheuk Ting Li, Venkat Anantharam", "Xingran Chen, Konstantinos Gatsis, Hamed Hassani, Shirin Saeedi Bidokhti", "Hossein Talebi, Peyman Milanfar", ""],
                              3: ["John Kirchenbauer, Jonas Geiping, Yuxin Wen, Jonathan Katz, Ian Miers, Tom Goldstein", "Rylan Schaeffer, Brando Miranda, Sanmi Koyejo", "Jack Hessel, Ana Marasovic, Jena D. Hwang, Lillian Lee, Jeff Da, Rowan Zellers, Robert Mankoff, Yejin Choi", ""],
                              }
        

    def metadata_parser(self, metdata_string):
        data = metdata_string.split("|")
        day = data[0]
        room = data[1]
        session = data[2]
        talk_no = data[3]
        return day, room, session, talk_no

    def create_talk_object(self, df_item, tslot, talk_no ):
        t= tslot.split(' - ')
        start= t[0]
        end= t[1]
        hm = start.split(':')
        start_time_hour= int(hm[0])
        start_time_minute= int(hm[1])
        talk_start_hour = (start_time_hour + (start_time_minute + 20* (int(talk_no) -1)) // 60) % 24
        talk_start_minute = (start_time_minute + 20 * (int(talk_no)-1)) % 60
        if(talk_start_minute==0):
          talk_start= str(talk_start_hour) + ":" + "00"
        else:
          talk_start= str(talk_start_hour) + ":" + str(talk_start_minute)

        talk_end_hour = (start_time_hour + (start_time_minute + 20* int((talk_no))) // 60) % 24
        talk_end_minute = (start_time_minute + 20 * int(talk_no)) % 60
        if (talk_end_minute==0):
          talk_end= str(talk_end_hour) + ":" + "00"
        else:
          talk_end= str(talk_end_hour) + ":" + str(talk_end_minute)

        talk_time= str(talk_start) + ' - ' + str(talk_end)

        return {
                "time": talk_time,
                "title": df_item["Title.1"],
                "paper": "https://itaws.ucsd.edu/api/v0/mobile/page_not_available",
                "mail": "https://itaws.ucsd.edu/api/v0/mobile/page_not_available",
                "authors": df_item["authors"],
                "abstract": df_item["Abstract"],
                }

    def get_timeslot(self, day, session):
        if(day == 'W'):
            TIMELIST = ['9:00 - 10:20', '10:40 - 12:00']
        else:
            TIMELIST = ['10:30 - 11:50', '1:20 - 2:40', '3:00 - 4:20',]
        return TIMELIST[int(session)-1]

    def get_time_encoded(self, day, time):
        DATES = {'M':'2025-02-10 ', 'T': '2025-02-11 ', 'W': '2025-02-12 ', 'R': '2025-02-13 ', 'F': '2025-02-14 '}
        start_time= time[0:4]
        end_time= time[6:]
        time_encoded= DATES[day] + start_time + ':00Z' + '#' + DATES[day] + end_time + ':00Z'
        return time_encoded
    
    def create_session(self, title, time, time_encoded, chair='', chair_email='', venue='TBA', plenary=False, lunch=False, abstract= "", speakers=["", "", "", ""]):
        talklist =[]
        if(plenary):
            for i in range(0,4):
                dummy_talk= {
                    "time": "",
                    "title": self.plenary_talk_titles[speakers[i]],
                    "paper": "https://itaws.ucsd.edu/api/v0/mobile/page_not_available",
                    "mail": "https://itaws.ucsd.edu/api/v0/mobile/page_not_available",
                    "authors": speakers[i],
                    "abstract": self.plenary_abstract[speakers[i]],
                    }
                talklist.append(dummy_talk)
            
        else: 
            dummy_talk= {
                "time": time,
                "title": title,
                "paper": "https://itaws.ucsd.edu/api/v0/mobile/page_not_available",
                "mail": "https://itaws.ucsd.edu/api/v0/mobile/page_not_available",
                "authors": "",
                "abstract": abstract,
                }
            talklist.append(dummy_talk)

        return {
            "title": title,
            "time": time,
            "time_encoded": time_encoded,
            "chair": chair,
            "chair_email": chair_email,
            "venue": venue,
            "plenary": plenary,
            "lunch": lunch,
            "talks": talklist,
        }

    def get_schedule(self):
        session_to_talks= [0]* 75
        for index, row in self.df.iterrows():
            if type(row["Metadata"]) is str and len(row["Metadata"]) > 0:
                day, room, session, talk_no = self.metadata_parser(row["Metadata"])
                day_index = self.days[day]
                room_index = self.rooms[room]
                position = 15*(day_index) + 3*(room_index) + int(session) -1
                session_to_talks[position]+=1

        session_array = [None]*75
        for index, row in self.df.iterrows():
            if type(row["Metadata"]) is str and len(row["Metadata"]) > 0:
                day, room, session, talk_no = self.metadata_parser(row["Metadata"])
                day_index = self.days[day]
                room_index = self.rooms[room]
                time= self.get_timeslot(day, session)
                time_encoded= self.get_time_encoded(day, time)
                talk_object = self.create_talk_object(row, time, talk_no)
                session_title= row["Scheduled"][2:]
     
                position = 15*(day_index) + 3*(room_index) + int(session) -1
                if(session_array[position] == None):
                    session_array[position] = {"title": session_title, "time": time, "time_encoded": time_encoded, "chair": "", "chair_email": "",
                                                "venue":'TBA', "plenary": False, "lunch": False, "talks": []}
                    
                session_array[position]["talks"].append(talk_object)  
    

        depth, rows, cols = 3, 5, 5
        matrix = [[None for _ in range(cols)] for _ in range(rows)]
        counter= 0
        for i in range(cols):
            for j in range(rows):
                session_list = []
                ctr= 0
                if(i!=2):
                
                    t= '8:00 - 9:00'
                    tenc= self.get_time_encoded(self.dayindices[i], t)
                    extra_session= self.create_session(title= 'Breakfast', lunch= True, time= t, time_encoded= tenc, venue= "ITA Cove (Beach)", abstract= "Continental Breakfast")
                    session_list.append(extra_session)

                    t= '9:00 - 10:15'
                    tenc= self.get_time_encoded(self.dayindices[i], t)
                    extra_session= self.create_session(title= self.plenary_titles[i], time= t, plenary= True, time_encoded= tenc, venue= "Nelson (5th floor ballroom)", speakers= self.speaker_list[i])
                    session_list.append(extra_session)

                    t= '10:15 - 10:30'
                    tenc= self.get_time_encoded(self.dayindices[i], t)
                    extra_session= self.create_session(title= 'Break', lunch= True, time= t, time_encoded= tenc, venue= "Bahia Patio", abstract= "Light Refreshments")
                    session_list.append(extra_session)
                
                else:

                    t= '8:00 - 9:00'
                    tenc= self.get_time_encoded(self.dayindices[i], t)
                    extra_session= self.create_session(title= 'Breakfast', lunch= True, time= t, time_encoded= tenc, venue= "ITA Cove (Beach)", abstract= "Continental Breakfast")
                    session_list.append(extra_session)

                for k in range(depth):

                    if (session_array[counter]!=None):
                        session_list.append(session_array[counter])
                    counter+=1

                    ctr+=1
                    if(ctr==1):
                        if(i==2):
                            t= '10:20 - 10:40'
                            tenc= self.get_time_encoded(self.dayindices[i], t)
                            extra_session= self.create_session(title= "Break", lunch= True, time= t, time_encoded= tenc, venue= "Bahia Patio", abstract= "Light Refreshments")
                            session_list.append(extra_session)
                        
                        elif(i==4):
                            t= '11:50 - 1:20'
                            tenc= self.get_time_encoded(self.dayindices[i], t)
                            extra_session= self.create_session(title= self.lunch_titles[i], lunch= True, time= t, time_encoded= tenc, venue= "Bahia Patio", abstract= "Lunch on your own")
                            session_list.append(extra_session)
                        else:
                            t= '11:50 - 1:20'
                            tenc= self.get_time_encoded(self.dayindices[i], t)
                            extra_session= self.create_session(title= self.lunch_titles[i], lunch= True, time= t, time_encoded= tenc, venue= "Nelson (5th floor ballroom)", abstract= "Lunch for session participants")
                            session_list.append(extra_session)

                    elif(ctr==2 and i!=2):
                        t= '2:40 - 3:00'
                        tenc= self.get_time_encoded(self.dayindices[i], t)
                        extra_session= self.create_session(title= "Break", lunch= True, time= t, time_encoded= tenc, venue= "Bahia Patio", abstract= "Light Refreshments")
                        session_list.append(extra_session)


                if(i==2):
                    #wednesday
                    # t= '10:40 - 12:00'
                    # tenc= self.get_time_encoded(self.dayindices[i], t)
                    # dummy_talk= { "time": t, "title": "Graduation Day Talks", "paper": "https://itaws.ucsd.edu/api/v0/mobile/page_not_available", 
                    #             "mail": "https://itaws.ucsd.edu/api/v0/mobile/page_not_available", "authors": "Parinaz Naghizadeh", 
                    #             "abstract": "Graduation Day provides a forum for exceptional graduate students and recently-graduated postdocs seeking research careers to present expository talks about their work. Distinguished judges will select roughly ten presentations for award.",
                    #             }
                    # extra_session_1= {"title": "Graduation Day Talks", "time": t, "time_encoded": tenc, "chair": "", "chair_email": "", 
                    #                 "venue": "TBA", "plenary": True, "lunch": False, "talks": [dummy_talk], }
                    # session_list.append(extra_session_1)

                    t= '12:00 - 1:40'
                    tenc= self.get_time_encoded(self.dayindices[i], t)
                    extra_session= self.create_session(title= "Graduation day posters and general posters", lunch= True, time= t, time_encoded= tenc, venue= "Bahia Patio", abstract= 'Lunch catered')
                    session_list.append(extra_session)

                    t= '1:40 - 2:55'
                    tenc= self.get_time_encoded(self.dayindices[i], t)
                    extra_session= self.create_session(title= "New Developments in Algorithmic Economics", plenary= True, time= t, time_encoded= tenc, speakers= self.speaker_list[i], venue= "Ballroom")
                    session_list.append(extra_session)

                    t= '2:55 - 3:10'
                    tenc= self.get_time_encoded(self.dayindices[i], t)
                    extra_session= self.create_session(title= "Break", lunch= True, time= t, time_encoded= tenc, venue= "Bahia Patio", abstract= 'Refreshments')
                    session_list.append(extra_session)

                    t= '3:10 - 3:45'
                    tenc= self.get_time_encoded(self.dayindices[i], t)
                    dummy_talk= { "time": t, "title": "ITA 2025 Challenge", "paper": "https://itaws.ucsd.edu/api/v0/mobile/page_not_available", 
                                "mail": "https://itaws.ucsd.edu/api/v0/mobile/page_not_available", "authors": "", 
                                "abstract": "We are starting a new tradition, the ITA challenge. Propose a new, important, interesting, and quantifiable challenge",
                                }
                    extra_session_2= {"title": "ITA 2025 Challenge Kickoff session: Where we formulate a challenge for next year’s ITA", "time": t, "time_encoded": tenc, "chair": "", "chair_email": "", 
                                    "venue": "Ballroom", "plenary": True, "lunch": False, "talks": [dummy_talk], }
                    session_list.append(extra_session_2)

                    t= '3:45 - 3:55'
                    tenc= self.get_time_encoded(self.dayindices[i], t)
                    extra_session= self.create_session(title= "Break", lunch= True, time= t, time_encoded= tenc, venue= "Bahia Patio")
                    session_list.append(extra_session)

                    t= '3:55 - 6:45'
                    tenc= self.get_time_encoded(self.dayindices[i], t)
                    dummy_talk= { "time": t, "title": "Entertainment Session", "paper": "https://itaws.ucsd.edu/api/v0/mobile/page_not_available", 
                                "mail": "https://itaws.ucsd.edu/api/v0/mobile/page_not_available", "authors": "Anand Sarwate and Mary Wootters", 
                                "abstract": "Lightning introductions to fellow participants.",
                                }
                    extra_session_2= {"title": "Entertainment Session", "time": t, "time_encoded": tenc, "chair": "", "chair_email": "", 
                                    "venue": "Ballroom", "plenary": True, "lunch": False, "talks": [dummy_talk], }
                    session_list.append(extra_session_2)
                    t= '6:45 - 7:45'
                    tenc= self.get_time_encoded(self.dayindices[i], t)
                    extra_session= self.create_session(title= "Banquet, Entertainment, Graduation Day Awards", lunch= True, time= t, time_encoded= tenc, venue= "Ballroom", abstract= "")
                    session_list.append(extra_session)
                
                else:

                    t= '4:20 - 4:30'
                    tenc= self.get_time_encoded(self.dayindices[i], t)
                    extra_session= self.create_session(title= "Break", lunch= True, time= t, time_encoded= tenc, venue= "Bahia Patio" )
                    session_list.append(extra_session)
                    
                    if(i==1):
                        t= '4:30 - 5:30'
                        tenc= self.get_time_encoded(self.dayindices[i], t)
                        tue_talk= { "time": t, "title": "WHITHITS Session", "paper": "https://itaws.ucsd.edu/api/v0/mobile/page_not_available", 
                                     "mail": "https://itaws.ucsd.edu/api/v0/mobile/page_not_available", "authors": "Rashmi Vinayak, Sanghamitra Dutta", 
                                     "abstract": "Lively discussion and proven advice about careers in academia and research, navigating the tangled academic / research career path, productivity tips, how to engage with industry and make an impact, and maintaining a healthy work-life balance. Moderated by the IT Society WHITHITS officers Rashmi Vinayak and Sanghamitra Dutta.",
                                     }
                        
                        extra_session_1= {"title": "The secret to your success", "time": t, "time_encoded": tenc, "chair": "", "chair_email": "", 
                                          "venue": "Nelson (5th floor ballroom)", "plenary": True, "lunch": False, "talks": [tue_talk], }
                        session_list.append(extra_session_1)

                    elif (i==4):
                        t= '4:30 - 5:30'
                        tenc= self.get_time_encoded(self.dayindices[i], t)
                        extra_session= self.create_session(title= "Farewell Bash", lunch= True, time= t, time_encoded= tenc, venue= "TBA", abstract= "Light Food")
                        session_list.append(extra_session)

                    else:
                        t= '4:30 - 5:30'
                        tenc= self.get_time_encoded(self.dayindices[i], t)
                        extra_session= self.create_session(title= self.special_titles[i], plenary= True, time= t, time_encoded= tenc, venue= "Nelson (5th floor ballroom)", speakers= self.award_speakers[i])
                        session_list.append(extra_session)
                        

                    if(i==1):
                        t= '5:30 - 7:00'
                        tenc= self.get_time_encoded(self.dayindices[i], t)
                        extra_session= self.create_session(title= "Taco Tuesday", lunch= True, time= t, time_encoded= tenc, venue= "Cabrillo Suite")
                        session_list.append(extra_session)

                        t= '7:00 - 8:00'
                        tenc= self.get_time_encoded(self.dayindices[i], t)
                        extra_session= self.create_session(title= "Friends, TV, Games", lunch= True, time= t, time_encoded= tenc, venue="Cabillo Suite", abstract= "Refreshments")
                        session_list.append(extra_session)
                    
                    elif(i==4):
                        pass
                    
                    else:
                        t= '5:30 - 7:00'
                        tenc= self.get_time_encoded(self.dayindices[i], t)
                        extra_session= self.create_session(title= "Dinner on your own", lunch= True, time= t, time_encoded= tenc, venue="Cabillo Suite", abstract="Socialize at the Cabrillo Suite")
                        session_list.append(extra_session)

                        t= '7:00 - 8:00'
                        tenc= self.get_time_encoded(self.dayindices[i], t)
                        extra_session= self.create_session(title= "Friends, TV, Games", lunch= True, time= t, time_encoded= tenc, venue="Cabillo Suite", abstract= "Refreshments")
                        session_list.append(extra_session)
            

                matrix[i][j]= session_list
       
        final_result = {
                "days": list(self.daynames),
                "rooms": list(self.roomnames),
                "events" : matrix
            }

        return final_result

