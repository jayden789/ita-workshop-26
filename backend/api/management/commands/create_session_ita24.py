"""
Set up Workshop and RegistrationOption instances for ITA 2024.

This command is idempotent and preserves the integrity of data; thus, one may
safely run it on app startup (for example).
"""

import datetime
from decimal import Decimal
import random

from django.core.management.base import BaseCommand
from django.db import transaction

from api import models
random_titles = [
    "Exploring the Future of Quantum Computing",
    "AI and Ethics: Navigating the Moral Landscape",
    "Advancements in Biomedical Engineering",
    "Blockchain Applications in Supply Chain Management",
    "Cybersecurity in the Age of IoT",
    "The Intersection of Art and Technology",
    "Sustainable Development: Innovations in Renewable Energy",
    "Understanding Neural Networks: From Theory to Practice",
    "The Rise of Augmented Reality in Education",
    "Data Privacy in the Digital Age",
    "Emerging Trends in E-commerce",
    "The Psychology of User Experience Design",
    "Robotics and Automation in Manufacturing",
    "Innovations in Telemedicine",
    "Cryptocurrency: Beyond Bitcoin",
    "The Future of Work: Remote Collaboration Tools",
    "Space Exploration and Colonization",
    "Deep Learning for Natural Language Processing",
    "Climate Change Mitigation Strategies",
    "The Impact of 5G Technology on Society",
    "Advances in Genetic Engineering",
    "Virtual Reality in Healthcare",
    "Smart Cities: Building the Urban Landscape of Tomorrow",
    "Quantum Cryptography: Securing Communications",
    "The Role of Big Data in Business Intelligence",
    "Bioinformatics: Revolutionizing Healthcare",
    "Fintech Innovations and Disruptions",
    "Cognitive Computing: Mimicking Human Thought Processes",
    "The Evolution of Social Media Platforms",
    "Renewable Energy Technologies: A Global Perspective",
    "Human-Centered Design Principles",
    "The Future of Transportation: From Hyperloop to Flying Cars",
    "Ethical Hacking: Protecting Systems from Cyber Threats",
    "Augmented Intelligence: Enhancing Human Capabilities",
    "Advancements in 3D Printing Technology",
    "The Internet of Things: Connecting the World",
    "The Psychology of Decision Making in Consumer Behavior",
    "Exploring the Dark Web",
    "The Role of AI in Healthcare Diagnosis",
    "Next-Generation Mobile Networks: 6G and Beyond",
    "The Art of Digital Storytelling",
    "Cyber-Physical Systems: Bridging the Physical and Virtual Worlds",
    "Advancements in Quantum Biology",
    "Digital Transformation in Banking and Finance",
    "The Future of Gaming: Virtual Reality Experiences",
    "Ethics in Autonomous Vehicles",
    "The Impact of Artificial Intelligence on Job Markets",
    "The Power of Nanotechnology",
    "Disruptive Innovations in Retail",
    "Human Augmentation Technologies",
    "Advances in Brain-Computer Interfaces",
    "The Future of Cryptocurrencies: Trends and Predictions",
    "Biologically Inspired Computing Systems",
    "The Ethics of Biotechnology",
    "Advancements in Brain Implant Technology",
    "The Role of AI in Climate Change Solutions",
    "Exploring the Metaverse",
    "Neuroergonomics: Designing for the Brain",
    "The Psychology of Virtual Reality Experiences",
    "Privacy-Preserving Machine Learning Techniques",
    "The Future of Quantum Communication Networks",
    "Advancements in Quantum Materials",
    "The Intersection of AI and Healthcare",
    "Cybersecurity Challenges in a Hyperconnected World",
    "Biohacking: DIY Biology for the Masses",
    "The Future of Autonomous Drones",
    "Cognitive Neuroscience and Machine Learning",
    "Blockchain for Social Impact",
    "The Role of AI in Drug Discovery",
    "Next-Generation Wearable Technology",
    "The Future of Agriculture: Precision Farming",
    "Ethical Considerations in AI Research",
    "Advancements in Quantum Sensing",
    "The Psychology of Internet Addiction",
    "Digital Twins: Simulating Real-World Systems",
    "The Future of Quantum Computing: Applications and Challenges",
    "The Intersection of Quantum Computing and AI",
    "Biometric Authentication: Balancing Security and Privacy",
    "Advancements in Quantum Algorithms",
    "The Future of Quantum Cryptography",
    "Neuroethics: Ethical Implications of Brain Research",
    "The Role of AI in Climate Modeling",
    "The Psychology of Cybersecurity Threats",
    "Quantum Supremacy and Beyond",
    "The Future of Personalized Medicine",
    "Ethical AI: Ensuring Fairness and Transparency",
    "The Impact of AI on Creative Industries",
    "Advancements in Quantum Error Correction",
    "Digital Health: Transforming Healthcare Delivery",
    "The Future of Quantum Simulation",
    "Quantum Machine Learning: Algorithms and Applications",
    "The Psychology of Virtual Assistants",
    "The Role of AI in Space Exploration",
    "Quantum Computing for Optimization Problems",
    "The Future of Quantum Networking",
    "Advancements in Quantum Hardware",
    "The Intersection of AI and Cybersecurity",
    "Quantum Computing in Finance",
    "The Future of Quantum Software",
    "The Ethics of Quantum Computing",
    "Advancements in Quantum Cryptanalysis",
    "The Psychology of Quantum Information",
    "Quantum Computing for Materials Science",
    "The Future of Quantum Communication",
    "Quantum Computing in Drug Discovery",
    "The Role of Quantum Computing in Climate Change Modeling"
]


class Command(BaseCommand):
    """The main command."""

    def handle(self, *args, **options):
        count= 0
        count_talk = 0
        with transaction.atomic():
            talklist = models.Talk.objects.filter(created_on__year= '2024')
            userinstance = models.User.objects.get(id= 3)
            roominstances= models.Room.objects.all()

            
            schedule= []
            week_array= ['M', 'T', 'W', 'R', 'F']
            for day in week_array:
                timeslots= []
                timeslots.append(models.Timeslot.objects.create(type= 'RE', start_time= datetime.time(10, 0, 0), end_time= datetime.time(11, 20, 0), day=  day))
                timeslots.append(models.Timeslot.objects.create(type= 'LU', start_time= datetime.time(10, 0, 0), end_time= datetime.time(11, 20, 0), day=  day))
                timeslots.append(models.Timeslot.objects.create(type= 'RE', start_time= datetime.time(12, 0, 0), end_time= datetime.time(13, 20, 0), day=  day))
                timeslots.append(models.Timeslot.objects.create(type= 'BR', start_time= datetime.time(13, 20, 0), end_time= datetime.time(14, 0, 0), day=  day))
                timeslots.append(models.Timeslot.objects.create(type= 'RE', start_time= datetime.time(14, 0, 0), end_time= datetime.time(15, 20, 0), day=  day))
                
                for timeslot in timeslots:
                    sessions=[]
                    if(timeslot.type=='RE'):
                        print('YO!')
                        sessions.append(models.Session.objects.create(title= random_titles[count], chair= userinstance, room_id= roominstances[0], timeslot_id= timeslot))
                        count+=1
                        sessions.append(models.Session.objects.create( title= random_titles[count], chair= userinstance, room_id= roominstances[1], timeslot_id= timeslot))
                        count+=1
                        sessions.append(models.Session.objects.create( title= random_titles[count], chair= userinstance, room_id= roominstances[2], timeslot_id= timeslot))
                        count+=1
                        sessions.append(models.Session.objects.create( title= random_titles[count], chair= userinstance, room_id= roominstances[3], timeslot_id= timeslot))
                        count+=1
                        sessions.append(models.Session.objects.create( title= random_titles[count], chair= userinstance, room_id= roominstances[4], timeslot_id= timeslot))
                        count+=1
                        sessions.append(models.Session.objects.create( title= random_titles[count], chair= userinstance, room_id= roominstances[5], timeslot_id= timeslot))
                        count+=1
                        print(sessions)
                    else:
                        sessions.append(models.Session.objects.create(title= 'Have a break', timeslot_id= timeslot))

                    for session in sessions:
                        talks=[]
                        if(timeslot.type=='RE'):
                            for i in range(1,4):
                                talks.append(models.Talk.objects.filter(id= talklist[i].id).update(session_id= session))
                            # talks.append(.update(session_id= s.id))
                            
            

                        


                        


                        
