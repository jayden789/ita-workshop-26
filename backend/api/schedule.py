import pandas as pd
import os
from datetime import datetime


class Schedule:
    def __init__(self) -> None:
        path_csv = os.path.join(
            os.path.dirname(__file__), "ITA_2025_Schedule.csv"
        )

        self.df = pd.read_csv(path_csv)

        self.df["authors"] = self.df["First name"] + " " + self.df["Last name"]

        self.df = self.df.fillna("")

        self.days = {"M": 0, "T": 1, "W": 2, "R": 3, "F": 4}
        self.rooms = {"1": 0, "2": 1, "3": 2, "4": 3, "5": 4}
        self.daynames = ["Mon", "Tue", "Wed", "Thu", "Fri"]
        self.roomnames = ["George", "Abe", "Jack", "Eva", "Cory"]
        self.dayindices = {0: "M", 1: "T", 2: "W", 3: "R", 4: "F"}

        self.plenary_titles = {
            0: "Information Theory & Signal Processing Paper Awards",
            1: "Information Theory for Machine Learning",
            2: "Foundations of Machine Learning & Artificial Intelligence",
            3: "Machine Learning Paper Awards",
            4: "Coming Soon",
        }
        self.lunch_titles = {
            0: "Know My Neighbor",
            1: "Town Hall with information theory society president",
            3: "Hello Boss",
            4: "Startup ITAcubator",
        }
        self.lunch_abstract = {
            0: "Lunch and lightning introductions to fellow participants.",
            1: "",
            3: "The event will match students and postdocs to internship mentors, postdoc supervisors, and companies. Each will present one slide for at most a minute, and fun matching will follow. Microsoft, Qualcomm, Samsung, and others have expressed interest in participating.",
            4: "This event will consist of researchers who started companies, sharing their experience and providing advice to aspiring entrepreneurs. You can propose your ideas or ask questions. Our last session has resulted in seed funding.",
        }
        self.special_titles = {
            0: "Surviving as a researcher",
            1: "Taco Tuesday outing",
            2: "",
            3: "",
            4: "Farewell bash, light food",
        }

        self.speaker_list = [
            [
                "Flavio Calmon, Harvard University",
                "Wei Yu, University of Toronto",
                "Moderator: Piya Pal, UCSD",
                "",
            ],
            [
                "Jona Ballé, Google",
                "Hyeji Kim, UT Austin",
                "Chao Tian, Texas A&M University",
                "Moderator: Aaron Wagner, Cornell",
            ],
            [
                "Adam Klivans, UT-Austin",
                "Zaid Harchaoui, University of Washington",
                "Mahdi Soltanolkotabi, USC",
                "",
            ],
            [
                "Rob Brekelmans, Vector Institute",
                "Michael Hahn, Saarland University",
                "Chirag Pabbaraju, Stanford University",
                "Moderator: Ahmad Beirami, Google DeepMind",
            ],
            ["", "", "", ""],
        ]

        self.plenary_talk_titles = {
            "Flavio Calmon, Harvard University": "Multigroup Fairness and Representation",
            "Wei Yu, University of Toronto": "Minimum Feedback for Collision-Free Scheduling in Massive Random Access",
            "Moderator: Piya Pal, UCSD": "",
            "": "",
            "Jona Ballé, Google": "",
            "Hyeji Kim, UT Austin": "",
            "Chao Tian, Texas A&M University": "",
            "Moderator: Aaron Wagner, Cornell": "",
            "Adam Klivans, UT-Austin": "",
            "Zaid Harchaoui, University of Washington": "",
            "Mahdi Soltanolkotabi, USC": "",
            "": "",
            "Rob Brekelmans, Vector Institute": "Probabilistic Inference in Language Models via Twisted Sequential Monte Carlo",
            "Michael Hahn, Saarland University": "Why are Sensitive Functions Hard for Transformers?",
            "Chirag Pabbaraju, Stanford University": "Multiclass Learnability Does Not Imply Sample Compression",
            "Moderator: Ahmad Beirami, Google DeepMind": "",
            "": "",
            "": "",
            "": "",
            "": "",
        }

        self.plenary_abstract = {
            "Flavio Calmon, Harvard University": "This talk overviews information-theoretic results on trustworthy machine learning and artificial intelligence. We first briefly discuss achievability and converse results for group fairness in prediction and classification tasks. We then overview recent methods for measuring and promoting multi-group proportional representation in image retrieval and generation tasks.",
            "Wei Yu, University of Toronto": "Consider a massive random access scenario in which a random subset of k active users, out of a large number of n users, need to be scheduled into k transmission slots. What is the minimum number of bits that need to be sent to the users to ensure collision-free scheduling? Instead of a naive scheme of listing the indices of k active users in the order in which they should transmit -- at a cost of klog(n) bits, we show that a fixed-length coded transmission strategy can be designed using only klog(e) bits, plus an additive term that scales as Theta(log log(n)) bits. Further, if variable-length coding is used, the dependence on n can be completely removed. This coding strategy can be generalized to the problem of coded downlink transmission of exchangeable sources in massive random access.",
            "Moderator: Piya Pal, UCSD": "",
            "Jona Ballé, Google": "",
            "Hyeji Kim, UT Austin": "",
            "Chao Tian, Texas A&M University": "",
            "Moderator: Aaron Wagner, Cornell": "",
            "Adam Klivans, UT-Austin": "",
            "Zaid Harchaoui, University of Washington": "",
            "Mahdi Soltanolkotabi, USC": "",
            "Rob Brekelmans, Vector Institute": "Numerous capability and safety techniques of Large Language Models (LLMs), including RLHF, automated red-teaming, prompt engineering, and infilling, can be cast as sampling from an unnormalized target distribution defined by a given reward or potential function over the full sequence. In this work, we leverage the rich toolkit of Sequential Monte Carlo (SMC) for these probabilistic inference problems. In particular, we use learned twist functions to estimate the expected future value of the potential at each timestep, which enables us to focus inference-time computation on promising partial sequences. We propose a novel contrastive method for learning the twist functions, and establish connections with the rich literature of soft reinforcement learning. As a complementary application of our twisted SMC framework, we present methods for evaluating the accuracy of language model inference techniques using novel bidirectional SMC bounds on the log partition function. These bounds can be used to estimate the KL divergence between the inference and target distributions in both directions. We apply our inference evaluation techniques to show that twisted SMC is effective for sampling undesirable outputs from a pretrained model (a useful component of harmlessness training and automated red-teaming), generating reviews with varied sentiment, and performing infilling tasks.",
            "Michael Hahn, Saarland University": "Empirical studies have identified a range of learnability biases and limitations of transformers, such as a persistent difficulty in learning to compute simple formal languages such as PARITY, and a bias towards low-degree functions. However, theoretical understanding remains limited, with existing expressiveness theory either overpredicting or underpredicting realistic learning abilities. We prove that, under the transformer architecture, the loss landscape is constrained by the input-space sensitivity: Transformers whose output is sensitive to many parts of the input string inhabit isolated points in parameter space, leading to a low-sensitivity bias in generalization. We show theoretically and empirically that this theory unifies a broad array of empirical observations about the learning abilities and biases of transformers, such as their generalization bias towards low sensitivity and low degree, and difficulty in length generalization for PARITY. This shows that understanding transformers’ inductive biases requires studying not just their in-principle expressivity, but also their loss landscape.",
            "Chirag Pabbaraju, Stanford University": "A hypothesis class admits a sample compression scheme, if for every sample labeled by a hypothesis from the class, it is possible to retain only a small subsample, using which the labels on the entire sample can be inferred. The size of the compression scheme is an upper bound on the size of the subsample produced. Every learnable binary hypothesis class (which must necessarily have finite VC dimension) admits a sample compression scheme of size only a finite function of its VC dimension, independent of the sample size. For multiclass hypothesis classes, the analog of VC dimension is the DS dimension. We show that the analogous statement pertaining to sample compression is not true for multiclass hypothesis classes: every learnable multiclass hypothesis class, which must necessarily have finite DS dimension, does not admit a sample compression scheme of size only a finite function of its DS dimension.",
            "Moderator: Ahmad Beirami, Google DeepMind": "",
            "": "",
            "": "",
            "": "",
            "": "",
        }

        self.award_speakers = {
            0: ["Piya Pal"],
            3: ["Rob Brekelmans"],
        }

    def metadata_parser(self, metdata_string):
        data = metdata_string.split("-")
        day = data[0]
        room = data[1]
        session = data[2]
        talk_no = data[3]
        return day, room, session, talk_no

    def create_talk_object(self, df_item, tslot, talk_no):
        t = tslot.split(" - ")
        start = t[0]
        end = t[1]
        hm = start.split(":")
        start_time_hour = int(hm[0])
        start_time_minute = int(hm[1])
        talk_start_hour = (
            start_time_hour
            + (start_time_minute + 20 * (int(talk_no) - 1)) // 60
        ) % 24
        talk_start_minute = (start_time_minute + 20 * (int(talk_no) - 1)) % 60
        if talk_start_minute == 0:
            talk_start = str(talk_start_hour) + ":" + "00"
        else:
            talk_start = str(talk_start_hour) + ":" + str(talk_start_minute)

        talk_end_hour = (
            start_time_hour + (start_time_minute + 20 * int((talk_no))) // 60
        ) % 24
        talk_end_minute = (start_time_minute + 20 * int(talk_no)) % 60
        if talk_end_minute == 0:
            talk_end = str(talk_end_hour) + ":" + "00"
        else:
            talk_end = str(talk_end_hour) + ":" + str(talk_end_minute)

        talk_time = str(talk_start) + " - " + str(talk_end)

        return {
            "time": talk_time,
            "title": df_item["Title.1"],
            "paper": "https://itaws.ucsd.edu/api/v0/mobile/page_not_available",
            "mail": "https://itaws.ucsd.edu/api/v0/mobile/page_not_available",
            "authors": df_item["authors"],
            "abstract": df_item["Abstract"],
        }

    def get_timeslot(self, day, session):
        if day == "W":
            TIMELIST = ["9:00 - 10:20", "10:40 - 12:00"]
        else:
            TIMELIST = [
                "10:40 - 12:00",
                "2:00 - 3:20",
                "3:40 - 5:00",
            ]
        return TIMELIST[int(session) - 1]

    def get_time_encoded(self, day, time):
        DATES = {
            "M": "2025-02-10 ",
            "T": "2025-02-11 ",
            "W": "2025-02-12 ",
            "R": "2025-02-13 ",
            "F": "2025-02-14 ",
        }
        start_time = time[0:4]
        end_time = time[6:]
        time_encoded = (
            DATES[day]
            + start_time
            + ":00Z"
            + "#"
            + DATES[day]
            + end_time
            + ":00Z"
        )
        return time_encoded

    def create_session(
        self,
        title,
        time,
        time_encoded,
        chair="",
        chair_email="",
        venue="TBA",
        plenary=False,
        lunch=False,
        abstract="",
        speakers=["", "", "", ""],
    ):
        talklist = []
        if plenary:
            for i in range(0, 4):
                dummy_talk = {
                    "time": "",
                    "title": self.plenary_talk_titles[speakers[i]],
                    "paper": "https://itaws.ucsd.edu/api/v0/mobile/page_not_available",
                    "mail": "https://itaws.ucsd.edu/api/v0/mobile/page_not_available",
                    "authors": speakers[i],
                    "abstract": self.plenary_abstract[speakers[i]],
                }
                talklist.append(dummy_talk)

        else:
            dummy_talk = {
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
        session_to_talks = [0] * 75
        for index, row in self.df.iterrows():
            if type(row["Metadata"]) is str and len(row["Metadata"]) > 0:
                day, room, session, talk_no = self.metadata_parser(
                    row["Metadata"]
                )
                day_index = self.days[day]
                room_index = self.rooms[room]
                position = (
                    15 * (day_index) + 3 * (room_index) + int(session) - 1
                )
                session_to_talks[position] += 1

        session_array = [None] * 75
        for index, row in self.df.iterrows():
            if type(row["Metadata"]) is str and len(row["Metadata"]) > 0:
                day, room, session, talk_no = self.metadata_parser(
                    row["Metadata"]
                )
                day_index = self.days[day]
                room_index = self.rooms[room]
                time = self.get_timeslot(day, session)
                time_encoded = self.get_time_encoded(day, time)
                talk_object = self.create_talk_object(row, time, talk_no)
                session_title = row["Scheduled"]

                position = (
                    15 * (day_index) + 3 * (room_index) + int(session) - 1
                )
                if session_array[position] == None:
                    session_array[position] = {
                        "title": session_title,
                        "time": time,
                        "time_encoded": time_encoded,
                        "chair": "",
                        "chair_email": "",
                        "venue": "TBA",
                        "plenary": False,
                        "lunch": False,
                        "talks": [],
                    }

                session_array[position]["talks"].append(talk_object)

        depth, rows, cols = 3, 5, 5
        matrix = [[None for _ in range(cols)] for _ in range(rows)]
        counter = 0
        for i in range(cols):
            for j in range(rows):
                session_list = []
                ctr = 0
                if i != 2:

                    t = "8:00 - 9:00"
                    tenc = self.get_time_encoded(self.dayindices[i], t)
                    extra_session = self.create_session(
                        title="Breakfast",
                        lunch=True,
                        time=t,
                        time_encoded=tenc,
                        venue="ITA Cove (Beach)",
                        abstract="Catered breakfast",
                    )
                    session_list.append(extra_session)

                    t = "9:00 - 10:15"
                    tenc = self.get_time_encoded(self.dayindices[i], t)
                    extra_session = self.create_session(
                        title=self.plenary_titles[i],
                        time=t,
                        plenary=True,
                        time_encoded=tenc,
                        venue="Nelson (5th floor ballroom)",
                        speakers=self.speaker_list[i],
                    )
                    session_list.append(extra_session)

                    t = "10:15 - 10:40"
                    tenc = self.get_time_encoded(self.dayindices[i], t)
                    extra_session = self.create_session(
                        title="Break",
                        lunch=True,
                        time=t,
                        time_encoded=tenc,
                        venue="Breakout Rooms",
                        abstract="Light Refreshments",
                    )
                    session_list.append(extra_session)

                else:

                    t = "8:00 - 9:00"
                    tenc = self.get_time_encoded(self.dayindices[i], t)
                    extra_session = self.create_session(
                        title="Breakfast",
                        lunch=True,
                        time=t,
                        time_encoded=tenc,
                        venue="ITA Cove (Beach)",
                        abstract="Catered breakfast",
                    )
                    session_list.append(extra_session)

                for k in range(depth):

                    if session_array[counter] != None:
                        session_list.append(session_array[counter])
                    counter += 1

                    ctr += 1
                    if ctr == 1:
                        if i == 2:
                            t = "10:20 - 10:40"
                            tenc = self.get_time_encoded(self.dayindices[i], t)
                            extra_session = self.create_session(
                                title="Break",
                                lunch=True,
                                time=t,
                                time_encoded=tenc,
                                venue="Breakout Rooms",
                                abstract="Light Refreshments",
                            )
                            session_list.append(extra_session)
                        else:
                            t = "12:00 - 2:00"
                            tenc = self.get_time_encoded(self.dayindices[i], t)
                            extra_session = self.create_session(
                                title=self.lunch_titles[i],
                                lunch=True,
                                time=t,
                                time_encoded=tenc,
                                venue="Nelson (5th floor ballroom)",
                                abstract=self.lunch_abstract[i],
                            )
                            session_list.append(extra_session)

                    elif ctr == 2 and i != 2:
                        t = "3:20 - 3:40"
                        tenc = self.get_time_encoded(self.dayindices[i], t)
                        extra_session = self.create_session(
                            title="Break",
                            lunch=True,
                            time=t,
                            time_encoded=tenc,
                            venue="Breakout Rooms",
                            abstract="Refreshments",
                        )
                        session_list.append(extra_session)

                if i == 2:
                    t = "12:00 - 2:00"
                    tenc = self.get_time_encoded(self.dayindices[i], t)
                    extra_session = self.create_session(
                        title="Graduation day posters and general posters",
                        lunch=True,
                        time=t,
                        time_encoded=tenc,
                        venue="Breakout Rooms",
                        abstract="catered lunch",
                    )
                    session_list.append(extra_session)

                    t = "2:00 - 3:15"
                    tenc = self.get_time_encoded(self.dayindices[i], t)
                    extra_session = self.create_session(
                        title="Plenary session: Foundations of Machine Learning & Artificial Intelligence",
                        plenary=True,
                        time=t,
                        time_encoded=tenc,
                        speakers=self.speaker_list[i],
                        venue="Ballroom",
                    )
                    session_list.append(extra_session)

                    t = "3:15 - 3:35"
                    tenc = self.get_time_encoded(self.dayindices[i], t)
                    extra_session = self.create_session(
                        title="Break",
                        lunch=True,
                        time=t,
                        time_encoded=tenc,
                        venue="Breakout Rooms",
                        abstract="Refreshments",
                    )
                    session_list.append(extra_session)

                    t = "3:35 - 6:50"
                    tenc = self.get_time_encoded(self.dayindices[i], t)
                    dummy_talk = {
                        "time": t,
                        "title": "Entertainment Session",
                        "paper": "https://itaws.ucsd.edu/api/v0/mobile/page_not_available",
                        "mail": "https://itaws.ucsd.edu/api/v0/mobile/page_not_available",
                        "authors": "Anand Sarwate and Mary Wootters",
                        "abstract": "Lightning introductions to fellow participants.",
                    }
                    extra_session_2 = {
                        "title": "Entertainment Session",
                        "time": t,
                        "time_encoded": tenc,
                        "chair": "",
                        "chair_email": "",
                        "venue": "Ballroom",
                        "plenary": True,
                        "lunch": False,
                        "talks": [dummy_talk],
                    }
                    session_list.append(extra_session_2)
                    t = "6:50 - 7:50"
                    tenc = self.get_time_encoded(self.dayindices[i], t)
                    extra_session = self.create_session(
                        title="Banquet, Entertainment, Graduation Day Awards",
                        lunch=True,
                        time=t,
                        time_encoded=tenc,
                        venue="Ballroom",
                        abstract="",
                    )
                    session_list.append(extra_session)

                else:
                    t = "5:00 - 5:10"
                    tenc = self.get_time_encoded(self.dayindices[i], t)
                    extra_session = self.create_session(
                        title="Break",
                        lunch=True,
                        time=t,
                        time_encoded=tenc,
                        venue="Breakout Rooms",
                    )
                    session_list.append(extra_session)

                    t = "5:10 - 7:00"
                    tenc = self.get_time_encoded(self.dayindices[i], t)
                    extra_session = self.create_session(
                        title=self.special_titles[i],
                        plenary=True,
                        time=t,
                        time_encoded=tenc,
                        venue="Nelson (5th floor ballroom)",
                    )
                    session_list.append(extra_session)

                    t = "7:00 - 8:00"
                    tenc = self.get_time_encoded(self.dayindices[i], t)
                    extra_session = self.create_session(
                        title="Friends, TV, Games",
                        lunch=True,
                        time=t,
                        time_encoded=tenc,
                        venue="Cabillo Suite",
                        abstract="Refreshments",
                    )
                    session_list.append(extra_session)

                matrix[i][j] = session_list

        final_result = {
            "days": list(self.daynames),
            "rooms": list(self.roomnames),
            "events": matrix,
        }

        return final_result
