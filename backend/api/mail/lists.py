import functools
import logging

from django.contrib.auth import get_user_model
from django.db import models as db_models

from api import models
from api.mail import templating

logger = logging.getLogger(__name__)  # pylint: disable=invalid-name

User = get_user_model()  # pylint: disable=invalid-name

MAILING_LIST_CLASSES = {}


class MailingList:
    """
    Represents a list of email addresses, along with additional context, to
    which we can send mass email messages.
    """

    def __init__(self, **kwargs):
        pass

    def get_contexts(self):
        """
        Returns contexts with which to render a template. Each context must at
        least contain a "user" key, which denotes the target user, and a
        "user_profile" key, which contains the first and last name.
        """
        raise NotImplementedError


def _named_list(name):
    """
    Registers the provided ``MailingList`` class in the
    ``MAILING_LIST_CLASSES`` dict.
    """

    def decorator(list_class):
        assert issubclass(
            list_class, MailingList
        ), "list_class must be a subclass of MailingList"
        assert name not in MAILING_LIST_CLASSES, "Duplicate named list"
        MAILING_LIST_CLASSES[name] = list_class
        return list_class

    return decorator


@_named_list("current_user_only")
class CurrentUserOnlyList(MailingList):
    """Mailing list containing only the current user."""

    def __init__(self, *, current_user=None):
        super().__init__()
        self.current_user = current_user

    def get_contexts(self):
        yield {
            "user": self.current_user,
            "user_profile": self.current_user.user_profile,
        }


@_named_list("staff")
class StaffList(MailingList):
    """Mailing list containing all admins user."""

    def get_contexts(self):
        for user in User.objects.filter(is_staff=True):
            yield {"user": user, "user_profile": user.user_profile}


@_named_list("all_users")
class AllUserList(MailingList):
    """Mailing list containing all registered users."""

    def get_contexts(self):
        for user in User.objects.all():
            yield {"user": user, "user_profile": user.user_profile}

@_named_list("unsent_users")
class UnsentUserList(MailingList):
    """Mailing list containing all unsent users."""

    def get_contexts(self):
        for user in User.objects.all():
            if user.user_profile.email_original in ['fdcalmon@us.ibm.com','flavio@mit.edu','matthew.nokleby@wayne.edu','guswn3995@gist.ac.kr','jdonlon@nsf.gov','yingtai@gmail.com','ramin@mojix.com','jiangli.zhu@sandisk.com','fcheng@nus.edu.sg','yif051@ucsd.edu','barelsamba@yahoo.fr','jshi@broadcom.com','iamshkim@skku.edu','reisizadeh@ucla.edu','smccurdy@berkeley.edu','galstyan@isi.edu','junwchoi@hanyang.ac.kr','yhjung@kau.ac.kr','xionghongkai@sjtu.edu.cn','allender@cs.rutgers.edu','wujun@tongji.edu.cn','salehifar@ece.ucsb.edu','vijaykamble@berkeley.edu','aakanksha.sarda@deshaw.com','lauren.huie@us.af.mil','pulakesh@tamu.edu','saeed@salk.edu','sachinas@ucsd.edu','aterdogan@gmail.com','wlee76@jhu.edu','sedatist@gmail.com','jovovic.milan@gmail.com','miguelangelbautistamartin@gmail.com','soteri0s@me.com','malvarez@edu.edu','malvarez@udel.edu','stauber@uci.edu','huwang@cs.umn.edu','yuanwang.research@gmail.com','s.shuaib@outlook.com','w.nawaz@innopolis.ru','hichem.taghouti@live.fr','dgarg77@yahoo.com','sdrsunil76@gmail.com','mumageed@gmail.com','mabdulma@umail.iu.edu','tmensink@gmail.com','armanrz@uw.edu','m.omar.nazeer@gmail.com','aboumous@cs.ualberta.ca','tc2668@columbia.edu','vpathak@uwaterloo.ca','zahid.eltc@gmail.com','tomasz.maszczyk@gmail.com','zoltan.szabo@gatsby.ucl.ac.uk','zxwtroy87@gmail.com','amukhe14@jhu.edu','bhrgav.adair@gmail.com','dr.yi.lu@ieee.org','thekump2@illinois.edu','bcici@uci.edu','pshah@discovery.wisc.edu','kysong@uc.ac.kr','ilya.soloveychik@mail.huji.ac.il','seokhwan@jbnu.ac.kr','azaliamirh@gmail.com','yasiny@umich.edu','gguvense@uci.edu','mohamed.amir@qu.edu.qa','santi@cs.drexel.edu','kuhuang@ucsc.edu','wansu.lim@kumoh.ac.kr','dsnover@ucsd.edu','liulianggoodluck@gmail.com','farinaz@rice.edu','jwmillerusa@gmail.com','yewang@merl.com','saleemabdullah81@yahoo.com','xian1108@outlook.com','pengfei.xia@gmail.com','aliakbar.aghamohammadi@jpl.nasa.gov','david.wasserman@navy.mil','x23wu@stanford.edu','pjyothi@illinois.edu','ywhong@ee.nthu.edu.tw','roiwei@cs.bgu.ac.il','ozanbasciftci@gmail.com','moh_bash@hotmail.com','ssingh@nitttrbpl.ac.in','omrit1248@gmail.com','trungkhoa726150@yahoo.com','rcassidy@alumni.stanford.edu','zhangxiujunbj@163.com','jdy@ece.neu.edu','mtpatter@uchicago.edu','wkazuho@cs.tut.ac.jp','sarana@iastate.edu','this.is.the.agarwal@gmail.com','mroh@intven.com','tsypherd@asu.edu','jbusemey@indiana.edu','jennifer.s.trueblood@vanderbilt.edu','martin.mittelbach@tu-dresden.de','jzou@fas.harvard.edu','kenichiro.furuta@toshiba.co.jp','sk669@njit.edu','ymaval@gmail.com','dorien.herremans@gmail.com','cenyioha@seas.harvard.edu','sai_nagarajan@mymail.sutd.edu.sg','katagres@gmail.com','b-hajek@illinois.edu','kevinlb@cs.ubc.ca','jerry.pi@spathinc.com','sihuanghu@post.tau.ac.il','sumbose@berkeley.edu','c.song@ut.ac.kr','sa677@njit.edu','nir.wein@gmail.com','kgatsis@seas.upenn.edu','tamuz@caltech.edu','sfatemi@hawaii.edu','julian.togelius@gmail.com','tabuada@ee.ucla.edu','kmin.lee33@gmail.com','oteke@caltech.edu','xiaohan.kang@asu.edu','gade3@illinois.edu','singhal.vi@husky.neu.edu','mohamed.kafsi@epfl.ch','qxie3@illinois.edu','xxwu.eesissi@gmail.com','xxwu.eesissi@asu.edu','xiaoxi12@asu.edu','xxwu@asu.edu','nfarsad@stanford.edu','maryam_hosseini1986@yahoo.com','haiziyu7@illinois.edu','vahid.alireza@gmail.com','nmatni@caltech.edu','dchklovskii@simonsfoundation.org','anastasios@utexas.edu','segarra@mit.edu','manujscientific@gmail.com','vahid@seas.harvard.edu','supratik@qti.qualcomm.com','yingjiebi@berkeley.edu','geek@kellywired.com','byuan@ccny.cuny.edu','phingturner@google.com','vickie_kearn@press.princeton.edu','larrywasserman.cool@gmail.com','jinxl77@gmail.com','kmoore14@illinois.edu','abp4@rice.edu','ali.khayrallah@ericsson.com','dilse.ayan@gmail.com','steedhuang@ujs.edu.cn','jackberkowitz88@gmail.com','asani@qti.qualcomm.com','rduan@syr.edu','mvasconc@usc.edu','alexamm4@uci.edu','jpb7@att.net','amirreza.asadi@gmail.com','jsobel@ucsd.edu','agrawal@us.ibm.com','matthew.grob@ita.ucsd.edu','peiying.zhu@huawei.com','sramamir@eng.ucsd.edu','cobaker@eng.ucsd.edu','minsker@usc.edu','niagarwa@eng.ucsd.edu','cristina.rea@igi.cnr.it','julie.mcdonough@interdigital.com','meik.doerpinghaus@tu-dresden.de','robert.mateescu@hgst.com','kelmaleh@qualcomm.com','yshoukry@eecs.berkeley.edu','s5cho@eng.ucsd.edu','nambiseshari@gmail.cvom','wb1@us.ibm.com','avishek_ghosh@berkeley.edu','yyang.ohiostate@gmail.com','us-15@gmx-topmail.de','farinaz@ucsd.edu','hasanuzzaman.im@gmail.com','waqas@knu.ac.kr','zahid.akhtar@uniud.it','miticm@gmail.com','yaqwang@cuit.edu.cn','rarmanan@gmu.edu','cedric.mesnage@gmail.com','dao.lam@mst.edu','meghana.ksagar@gmail.com','liuli@eecs.oregonstate.edu','shahab1396@gmail.com','ali.koochakzade@gmail.com','ryavas@caltech.edu','adleram@cs.technion.ac.il','gfp.1@hotmail.com','dianigon@decom.fee.unicamp.br','shifrin@tx.technion.ac.il','anton.bankevich@gmail.com','ita@ucsd.edu','eebobai@tsinghua.edu.cn','ehsan.nekouei@gmail.com','debasishbera.hw@gmail.com','aelmosli@asu.edu','pk.srijith@gmail.com','damoncrockett@gmail.com','morteza.razavi@ed-alumni.net','edmondmitchell@gmail.com','shashank271089@gmail.com','jeff.macinnes@duke.edu','daniel.leite@deg.ufla.br','mohammed.fatehy@science.suez.edu.eg','eesteves@qti.qualcomm.com','monicarafaila@yahoo.com','mrezaeian@swin.edu.au','samcrooks.ashes@gmail.com','poojaalld@yahoo.com','ram@email.arizona.edu','mohammad.esmaeilzadeh@anu.edu.au','ahmad.salim@asu.edu','pooya.zakeri@esat.kuleuven.be','yangli@us.ibm.com','sakzad.amin@gmail.com','jayzy_huang@hust.edu.cn','sandraavilabr@gmail.com','aamoumena@gmail.com','dkasamat@gmail.com','selma.belhadjamor@gmail.com','siavash.ghavami@gmail.com','pranava@cs.upc.edu','tzsmile@126.com','ghanizade@shahed.ac.ir','godularu@live.com','sliu0403@gmail.com','mvcelentano@gmail.com','genovese@cmu.edu','ahmadou.diabagate@gmail.com','taherpour@gmail.com','praneshb01@yahoo.com','nathan_frey@brown.edu','lempel@cs.technion.il.co','joneidi@knights.ucf.edu','mj.emadi@aut.ac.ir','arved.huebler@mb.tu-chemnitz.de','jguan1@email.arizona.edu','zhao0146@e.ntu.edu.sg','zhoujing@stanford.edu','hirofumi.muratani@toshiba.co.jp','hoda.heidari@gmail.com','jhurtad2@fau.edu','nikos@umn.edu','visa.koivunen@aalto.fi','hvikalo@ece.utexas.edu','remi.chou@psu.edu','mezzavilla@nyu.edu','chou.remi@gmail.com','yeemmi@gmail.com','nanliu@seu.edu.cn','wkang@seu.edu.cn','asmith@cse.psu.edu','shashank@inc.cuhk.edu.hk','suhanc@dankook.ac.kr','svanka@alumni.nd.edu','pbarooah@ufl.edu','slu@gifu-u.ac.jp','brent.harrison@cc.gatech.edu','weiy@princeton.edu','yzli@utexas.edu','ddss@gmail.com','raskutti@stat.wisc.edu','tsourolampis@gmail.com','whoami28@gmx.com','okwenm47065@chacuo.net','venkat.rpr@gmail.com','nwallis@cambridge.org','goldenbaum@princeton.edu','kipnisal@stanford.edu','koushik@ecse.rpi.edu','koushik.kar@gmail.com','szou3@illinois.edu','raoanupb@gmail.com','ggong@uwaterloo.ca','amine.mezghani@tum.de','amine.mezghani@utexas.edu','duy.nguyen@sdsu.edu','anup.rao@gatech.edu','jimi@gmail.com','ekiru@live.com','xuaolin@gmail.com','kaiserg7@hotmail.com','pwalk@caltech.edu','vivickylj@gmail.com','mark.monte@l3t.com','navlakha@salk.edu','zvjutn48920@chacuo.net','joya.deri@gmail.com','khchang@inha.ac.kr','alongnn@gmail.com','anhthuph88@gmail.com','dmitripa@gmail.com','rhuerta@amazon.com','lilisu3@illinois.edu','pursley1@mindspring.com','alex@mehr.us','hassan.zivari-fard@utdallas.edu','sunilkukreja.sinapse@gmail.com','etesami2@illinois.edu','kasravn@gmail.com','josep.font@ieee.org','wwang@mail.sdsu.edu','kkchen@ccrwest.org','riccardo.righi.1985@gmail.com','jcheng@mail.doshisha.ac.jp','jaikim@ajou.ac.kr','smaric@ucsd.edu','cbird998@yahoo.com','majed.alsanea@gmail.com','pjohansson@maxentric.com','acgamst@ucsd.edu','pj.go@cirrascale.com','ita+default_email.Tupas.Frank.4778@ucsd.edu','ramr@stanford.edu','ialtintas@ucsd.edu','p.paraskevopoulos@unitn.it','wdukecho@gmail.com','apcarr@eng.ucsd.edu','liangshiyu@icloud.com','joe.antognini@persyst.com','lichung.chu@olympus.com','siavash.ekbatani@gmail.com','juntingc@usc.edu','arpanc.ju@gmail.com','mad@ucsd.edu','james@caltech.edu','categorysemantics@gmail.com','mahdizamany@gmail.com','heechul2070@gmail.com','raghuram@qti.qualcomm.com','patrick.kenekayoro@outlook.com','work.venkat@gmail.com','lcastrogarcia@uiowa.edu','fay.mehr@gmail.com','laksh.2@gmail.com','sathyan.munirathinam@gmail.com','aowabin.rahman@utah.edu','fos@es.aau.dk','sanjibanroy09@gmail.com','lzhou@u.nus.edu','rosana.gomes@ufrgs.br','tyagi@belmaks.in','amogh.rajanna@ieee.org','shuow22@gmail.com','houman@optics.arizona.edu','moazzami@msu.edu','m.hashemi1987@gmail.com','thirulic@gmail.com','supartha@gmail.com','rajeshchitnis@gmail.com','ahmad.waqas@iba-suk.edu.pk','jrouot@zoho.com','h_mahdiyan@graduate.org','mrsonuk@gmail.com','ramin.soltani@gmail.com','jse@unimelb.edu.au','iain.collings@mq.edu.au','romero@dte.uma.es','iman.rasekh@gmail.com','panageasj@gmail.com','daniellewajngart@foar.unesp.br','suman@sumankundu.info','m.khalilishoja@gmail.com','imansaj@gmail.com','akjalbani@sau.edu.pk','g@csail.mit.edu','rodolfo.lourenzutti@gmail.com','mireya.paredes@gmail.com','profharimohanpandey','rhu@ncsu.edu','tflynn@gradcenter.cuny.edu','anaozaki@tu-dresden.de','sinhagaur88@gmail.com','enislay@gmail.com','haden.lee@cs.stanford.edu','maciej.skorski@gmail.com','chad.r.bernier@gmail.com','maparabo@msu.edu','hongchao@foxmail.com','alexgolovnev@gmail.com','dr.abhay.bhadani@gmail.com','mccauleysam@gmail.com','wyshin@dankook.ac.kr','zzheng3@tulane.edu','hc_zhou@foxmail.com','faraz.hasan@live.in','georgios@umn.edu','shahin@seas.harvard.edu','oasarumi@futa.edu.ng','tadrous@gonzaga.edu','shana.cit.edu.in','antonio.ortega@sipi.usc.edu','jhelum.chakravorty@mail.mcgill.ca','xiedaomei@gmail.com','kulkarni.ankur@gmail.com','zqliu12@gmail.com','jleonard@physics.ucsd.edu','djc426@cornell.edu','chenjun14@tsinghua.org.cn','junil@postech.ac.kr','jwlee2@cau.ac.kr','erenbalevi@mail.usf.edu','pedro.a.forero@navy.mil','ioannidis@ece.neu.edu','flavio@seas.harvard.edu','shivam.guness@ieee.org','slkim@yonsei.ac.kr','wangc@nus.edu.sg','agonen@cs.princeton.edu','jm4520@columbia.edu','maziar.sanjabi@gmail.com','nuwanferdinand@gmail.com','jingbo@princeton.edu','acgamst@math.ucsd.edu','gongie@umich.edu','svardi@caltech.edu','salimehy@umich.edu','cynthia.rush@columbia.edu','adytso@princeton.edu','eaamari@ucsd.edu','mdiaztor@asu.edu','malgor21@gmail.com','zhiyjiang@foxmail.com','sgyounis@lonprox.com','laura.conde-canencia@univ-ubs.fr','xzg0017@auburn.edu','jingj@qti.qualcomm.com','pyzhang@cs.stanford.edu','yssong618@gmail.com','antonmonk1@gmail.com','mohammed.eltayeb@csus.edu','jrs@cs.washington.edu','yhebron@gmail.com','shachar.kons@cohere-technologies.com','rpankaj@qti.qualcomm.com','tiglio@fastechmedia.com','cinna@ou.edu','lantruong@u.nus.edu','shahrouz.alm@gmail.com','jozef@roupsolver.com','rosarioc@qti.qualcomm.com','alfonso.limon@oneirix.com','jozef.hudacek@groupsolver.com','mike.j.horton@gmail.com','shiva.khoshnoud@gmail.com','masnadi@gmail.com','masnadi2@gmail.com','pragathipriyadharsini@gmail.com','ftesler@gmail.com','asif.shakeel@gmail.com','lfakhraei@gmail.com','dramanathan@ucsd.edu','scott.heath@uqconnect.edu.au','yizh0001@e.ntu.edu.sg','zisha-zhong@uiowa.edu','modiashutosh@gmail.com','earneodo@ucsd.edu','subodhdeolekar@gmail.com','r.rahmadi@cs.ru.nl','abram10@gmail.com','siva0056@umn.edu','mbadieikhuzani@g.harvard.edu','j9wagner@ucsd.edu','ntienvu@gmail.com','kthivya21@gmail.com','tuanminhlv@gmail.com','hoomanhm@gmail.com','a.bhat@uea.ac.uk','lmuller@salk.edu','jaredgordon619@gmail.com','ecpoem@gmail.com','daniel.salinas@msu.montana.edu','rahoberg@gmail.com','murzabulatov85@gmail.com','becker@informatik.uni-wuerzburg.de','ankurgupta7621@gmail.com','zlee@ssu.ac.kr','shin@hanyang.ac.kr']:
                yield {"user": user, "user_profile": user.user_profile}

@_named_list("all_student_users")
class AllStudentUserList(MailingList):
    """Mailing list containing all registered student."""

    def get_contexts(self):
        for user in User.objects.all():
            if user.user_profile.is_student==True:
                yield {"user": user, "user_profile": user.user_profile}

@_named_list("all_non_student_users_pbd")
class AllNonStudentPBDList(MailingList):
    """Mailing list containing all registered presenting by default non student."""

    def get_contexts(self):    
        for user in User.objects.filter(user_profile__presenting_default=True):
            if user.user_profile.is_student==False:
                yield {"user": user, "user_profile": user.user_profile}
                
@_named_list("all_non_student_users_non_pbd_non_ucsd")
class AllNonStudentNonPBDList(MailingList):
    """Mailing list containing all registered non presenting by default non student."""

    def get_contexts(self):
        for user in User.objects.filter(user_profile__presenting_default=False):
            if user.user_profile.is_student==False:
                if user.user_profile.affiliation_title not in ['UCSD', 'UC San Diego', 'University of California San Diego']:
                    yield {"user": user, "user_profile": user.user_profile}

@_named_list("all_non_student_users_ucsd")
class AllNonStudentNonPBDList(MailingList):
    """Mailing list containing all registered non presenting by default non student."""

    def get_contexts(self):
        for user in User.objects.all():
            if user.user_profile.is_student==False:
                if user.user_profile.affiliation_title in ['UCSD', 'UC San Diego', 'University of California San Diego']:
                    yield {"user": user, "user_profile": user.user_profile}

@_named_list("participating")
class ParticipatingList(MailingList):
    """Mailing list containing all participating users in the current workshop."""

    def get_contexts(self):
        regns = models.Registration.objects.filter(
            workshop__slug="ita25",
            participation_status__in=models.PARTICIPATING_STATUSES,
        ).select_related("user", "user_profile")
        for regn in regns:
            yield {"user": regn.user, "user_profile": regn.user_profile}


@_named_list("participating_students")
class ParticipatingStudentsList(MailingList):
    """Mailing list containing all participating students in the current workshop."""

    def get_contexts(self):
        regns = models.Registration.objects.filter(
            workshop__slug="ita25",
            participation_status__in=models.PARTICIPATING_STATUSES,
            user_profile__is_student=True,
        ).select_related("user", "user_profile")
        for regn in regns:
            yield {"user": regn.user, "user_profile": regn.user_profile}


@_named_list("unpaid_particiapants")
class unpaid_participants(MailingList):
    def get_contexts(self):
        regns = models.Registration.objects.filter(
            workshop__slug="ita25",
            participation_status__in = models.PARTICIPATING_STATUSES,
            has_approved_payment = False
        ).exclude(
            fee_type__in = models.FEE_TYPE_EXEMPT_WAIVED,
        ).select_related("user","user_profile")
        for regn in regns:
            yield {"user": regn.user, "user_profile": regn.user_profile}

@_named_list("participating_non_students")
class ParticipatingNonStudentsList(MailingList):
    """Mailing list containing all participating non students in the current workshop."""

    def get_contexts(self):
        regns = models.Registration.objects.filter(
            workshop__slug="ita25",
            participation_status__in=models.PARTICIPATING_STATUSES,
            user_profile__is_student=False,
        ).select_related("user", "user_profile")
        for regn in regns:
            yield {"user": regn.user, "user_profile": regn.user_profile}


@_named_list("presenting_but_missing_talk_info")
class PresentingButMissingTalkInfoList(MailingList):
    """
    Users who have indicating that they are participating, and are marked as
    presenting, but are missing both talk title and topic comment (we need at
    least one in order to schedule the talk).
    """

    def get_contexts(self):
        regns = models.Registration.objects
        # We only care about registrations for the current workshop, and which
        # are presenting, and which are participating
        regns = regns.filter(
            workshop__slug="ita25",
            presenting=True,
            participation_status__in=models.PARTICIPATING_STATUSES,
        )

        # A talk is "satisfactory" if it has either title or topic_comment -
        # "we can go by either" (Alon) for scheduling their talks
        regns = regns.annotate(
            has_satisfactory_talk=db_models.Exists(
                models.Talk.objects.filter(
                    registration=db_models.OuterRef("pk")
                ).exclude(title="", topic_comment="")
            )
        )
        regns = regns.filter(has_satisfactory_talk=False)

        regns = regns.select_related("user", "user_profile")

        for regn in regns:
            yield {"user": regn.user, "user_profile": regn.user_profile}

@_named_list("prof_or_doc_not_presenting")
class ProfOrDocAttentingButNotPresentingList(MailingList):
    """
    Users who have indicating that they are participating, and are not
    presenting, but are doctors or professors.
    """

    def get_contexts(self):
        regns = models.Registration.objects
        regns = regns.filter(
            workshop__slug="ita25",
            presenting=False,
            participation_status__in=models.PARTICIPATING_STATUSES
        )

        regns = regns.select_related("user", "user_profile")

        for regn in regns:
            if regn.user_profile.honorific in models.DOC_OR_PROF:
                yield {"user": regn.user, "user_profile": regn.user_profile}

@_named_list("presenting_but_missing_title")
class PresentingButMissingTalkInfoList(MailingList):
    """
    Users who have indicating that they are participating, and are marked as
    presenting, but are missing a talk title.
    """

    def get_contexts(self):
        regns = models.Registration.objects
        # We only care about registrations for the current workshop, and which
        # are presenting, and which are participating
        regns = regns.filter(
            workshop__slug="ita25",
            presenting=True,
            participation_status__in=models.PARTICIPATING_STATUSES,
        )

        # A talk is "satisfactory" if it has a title 
        regns = regns.annotate(
            has_satisfactory_talk=db_models.Exists(
                models.Talk.objects.filter(
                    registration=db_models.OuterRef("pk")
                ).exclude(title="")
            )
        )
        regns = regns.filter(has_satisfactory_talk=False)

        regns = regns.select_related("user", "user_profile")

        for regn in regns:
            yield {"user": regn.user, "user_profile": regn.user_profile}

@_named_list("participating_and_presenting")
class PresentingButMissingTalkInfoList(MailingList):
    """
    Users who have indicating that they are participating, and are marked as
    presenting.
    """

    def get_contexts(self):
        regns = models.Registration.objects
        # We only care about registrations for the current workshop, and which
        # are presenting, and which are participating
        regns = regns.filter(
            workshop__slug="ita25",
            presenting=True,
            participation_status__in=models.PARTICIPATING_STATUSES,
        )

        regns = regns.select_related("user", "user_profile")

        for regn in regns:
            yield {"user": regn.user, "user_profile": regn.user_profile}

@_named_list("participating_and_not_presenting")
class PresentingButMissingTalkInfoList(MailingList):
    """
    Users who have indicating that they are participating, and are marked as
    presenting.
    """

    def get_contexts(self):
        regns = models.Registration.objects
        # We only care about registrations for the current workshop, and which
        # are presenting, and which are participating
        regns = regns.filter(
            workshop__slug="ita25",
            presenting=False,
            participation_status__in=models.PARTICIPATING_STATUSES,
        )

        regns = regns.select_related("user", "user_profile")

        for regn in regns:
            yield {"user": regn.user, "user_profile": regn.user_profile}

@_named_list("attending_on_monday")
class AttendingOnMonday(MailingList):
    """
    Users who are attending on Monday.
    """

    def get_contexts(self):
        regns = models.Registration.objects
        # We only care about registrations for the current workshop, and which
        # are presenting, and which are participating
        regns = regns.filter(
            workshop__slug="ita25",
            attending_dates__contains="2025-02-10",
            participation_status__in=models.PARTICIPATING_STATUSES,
        )

        regns = regns.select_related("user", "user_profile")

        for regn in regns:
            yield {"user": regn.user, "user_profile": regn.user_profile}

@_named_list("attending_on_tuesday")
class AttendingOnTuesday(MailingList):
    """
    Users who are attending on Monday.
    """

    def get_contexts(self):
        regns = models.Registration.objects
        # We only care about registrations for the current workshop, and which
        # are presenting, and which are participating
        regns = regns.filter(
            workshop__slug="ita25",
            attending_dates__contains="2025-02-11",
            participation_status__in=models.PARTICIPATING_STATUSES,
        )

        regns = regns.select_related("user", "user_profile")

        for regn in regns:
            yield {"user": regn.user, "user_profile": regn.user_profile}

@_named_list("attending_on_wednesday")
class AttendingOnWednesday(MailingList):
    """
    Users who are attending on Monday.
    """

    def get_contexts(self):
        regns = models.Registration.objects
        # We only care about registrations for the current workshop, and which
        # are presenting, and which are participating
        regns = regns.filter(
            workshop__slug="ita25",
            attending_dates__contains="2025-02-12",
            participation_status__in=models.PARTICIPATING_STATUSES,
        )

        regns = regns.select_related("user", "user_profile")

        for regn in regns:
            yield {"user": regn.user, "user_profile": regn.user_profile}

@_named_list("attending_on_thursday")
class AttendingOnMonday(MailingList):
    """
    Users who are attending on Monday.
    """

    def get_contexts(self):
        regns = models.Registration.objects
        # We only care about registrations for the current workshop, and which
        # are presenting, and which are participating
        regns = regns.filter(
            workshop__slug="ita25",
            attending_dates__contains="2025-02-13",
            participation_status__in=models.PARTICIPATING_STATUSES,
        )

        regns = regns.select_related("user", "user_profile")

        for regn in regns:
            yield {"user": regn.user, "user_profile": regn.user_profile}

@_named_list("attending_on_friday")
class AttendingOnMonday(MailingList):
    """
    Users who are attending on Monday.
    """

    def get_contexts(self):
        regns = models.Registration.objects
        # We only care about registrations for the current workshop, and which
        # are presenting, and which are participating
        regns = regns.filter(
            workshop__slug="ita25",
            attending_dates__contains="2025-02-14",
            participation_status__in=models.PARTICIPATING_STATUSES,
        )

        regns = regns.select_related("user", "user_profile")

        for regn in regns:
            yield {"user": regn.user, "user_profile": regn.user_profile}

@_named_list("attending_on_saturday")
class AttendingOnMonday(MailingList):
    """
    Users who are attending on Monday.
    """

    def get_contexts(self):
        regns = models.Registration.objects
        # We only care about registrations for the current workshop, and which
        # are presenting, and which are participating
        regns = regns.filter(
            workshop__slug="ita25",
            attending_dates__contains="2025-02-15",
            participation_status__in=models.PARTICIPATING_STATUSES,
        )

        regns = regns.select_related("user", "user_profile")

        for regn in regns:
            yield {"user": regn.user, "user_profile": regn.user_profile}


@_named_list("presenting_but_missing_coauthors")
class PresentingButMissingCoauthorsList(MailingList):
    """
    Users who have indicating that they are participating, and are marked as
    presenting, but are missing coauthors (authors_comment).
    """

    def get_contexts(self):
        regns = models.Registration.objects
        # We only care about registrations for the current workshop, and which
        # are presenting, and which are participating
        regns = regns.filter(
            workshop__slug="ita25",
            presenting=True,
            participation_status__in=models.PARTICIPATING_STATUSES,
        )
        regns = regns.annotate(
            has_talk_with_coauthors=db_models.Exists(
                models.Talk.objects.filter(
                    registration=db_models.OuterRef("pk")
                ).exclude(authors_comment="")
            )
        )
        regns = regns.filter(has_talk_with_coauthors=False)
        regns = regns.select_related("user", "user_profile")

        for regn in regns:
            yield {"user": regn.user, "user_profile": regn.user_profile}


@_named_list("pbd_without_participation_status")
class PbdWithoutParticipationStatusList(MailingList):
    """
    PBD users who don't have an ita23 registration with non-blank
    participation_status.
    """

    def get_contexts(self):
        users_with_participation = (
            models.Registration.objects.filter(workshop__slug="ita25")
            .exclude(participation_status="")
            .values_list("user__id", flat=True)
        )
        users_without_participation = (
            User.objects.filter(user_profile__presenting_default=True)
            .exclude(pk__in=users_with_participation)
            .select_related("user_profile")
        )
        for user in users_without_participation:
            yield {"user": user, "user_profile": user.user_profile}


@_named_list("invited_by_ucsd_student_inviter")
class InvitedByUcsdStudentInviterList(MailingList):
    """Users invited by UCSD Student Inviter to ita23."""

    def get_contexts(self):
        regns = (
            models.Registration.objects.filter(
                workshop__slug="ita25",
                inviter__isnull=False,
                inviter__email=models.INVITER_UCSD_STUDENT_EMAIL,
            )
        ).select_related("user", "user_profile")
        for regn in regns:
            yield {"user": regn.user, "user_profile": regn.user_profile}


@_named_list("invited_by_ucsd_faculty_inviter")
class InvitedByUcsdFacultyInviterList(MailingList):
    """Users invited by UCSD Faculty Inviter to ita23."""

    def get_contexts(self):
        regns = (
            models.Registration.objects.filter(
                workshop__slug="ita25",
                inviter__isnull=False,
                inviter__email=models.INVITER_UCSD_FACULTY_EMAIL,
            )
        ).select_related("user", "user_profile")
        for regn in regns:
            yield {"user": regn.user, "user_profile": regn.user_profile}

@_named_list("attending_sunday_reception")
class AttendingSundayReception(MailingList):
    """
    Users who are attending Sunday reception.
    """

    def get_contexts(self):
        regns = models.Registration.objects
        # We only care about registrations for the current workshop, and which
        # are presenting, and which are participating
        regns = regns.filter(
            options__slug__startswith="ita25_sundayReception",
            participation_status__in=models.PARTICIPATING_STATUSES,
        ).exclude(options__slug="ita25_sundayReception_notAttending")

        regns = regns.select_related("user", "user_profile")

        for regn in regns:
            yield {"user": regn.user, "user_profile": regn.user_profile}

@_named_list("ucsd_students")
class UcsdStudents(MailingList):
    """
    Users who are UCSD students
    """

    def get_contexts(self):
        for user in User.objects.all():
            if user.user_profile.is_student==True:
                if user.user_profile.affiliation_title in ['UCSD', 'UC San Diego', 'University of California San Diego']:
                    yield {"user": user, "user_profile": user.user_profile}

@_named_list("ucsd_faculty")
class UcsdFaculty(MailingList):
    """
    Users who are attending on UCSD faculty.
    """

    def get_contexts(self):
        for user in User.objects.all():
            if user.user_profile.is_student==False:
                if user.user_profile.affiliation_title in ['UCSD', 'UC San Diego', 'University of California San Diego']:
                    yield {"user": user, "user_profile": user.user_profile}

@_named_list("first_500_users")
class First500Users(MailingList):
    """
    First 500 users out of all users (0-499)
    This is for testing
    """
    
    def get_contexts(self):
        for user in User.objects.all().order_by('id')[:500]:
            yield {"user": user, "user_profile": user.user_profile}
            
@_named_list("second_1000_users")
class Second1000Users(MailingList):
    """
    Second 1000 users out of all users (500-1499)
    This is for testing
    """
    
    def get_contexts(self):
        for user in User.objects.all().order_by('id')[500:1500]:
            yield {"user": user, "user_profile": user.user_profile}

@_named_list("third_1000_users")
class Third1000Users(MailingList):
    """
    Third 1000 users out of all users (1500-2499)
    This is for testing
    """
    
    def get_contexts(self):
        for user in User.objects.all().order_by('id')[1500:2500]:
            yield {"user": user, "user_profile": user.user_profile}
            
@_named_list("fourth_1000_users")
class Fourth1000Users(MailingList):
    """
    Fourth 1000 users out of all users (2500-3499)
    This is for testing
    """
    
    def get_contexts(self):
        for user in User.objects.all().order_by('id')[2500:3500]:
            yield {"user": user, "user_profile": user.user_profile}
            
@_named_list("fifth_1000_users")
class Fifth1000Users(MailingList):
    """
    Fifth 1000 users out of all users (3500-4499)
    This is for testing
    """
    
    def get_contexts(self):
        for user in User.objects.all().order_by('id')[3500:4500]:
            yield {"user": user, "user_profile": user.user_profile}
            
@_named_list("sixth_1000_users")
class Sixth1000Users(MailingList):
    """
    Sixth 1000 users out of all users (4500-5499)
    This is for testing
    """
    
    def get_contexts(self):
        for user in User.objects.all().order_by('id')[4500:]:
            yield {"user": user, "user_profile": user.user_profile}
            
@_named_list("unsent_users(2024)")
class UnsentUsers(MailingList):
    """
    Unsent users (2500+229-3500, 3500+622-4500)
    This is for testing
    """
    
    def get_contexts(self):
        all_user = User.objects.all().order_by('id')
        for user in all_user[2500+228:3500]:
            yield {"user": user, "user_profile": user.user_profile}
        for user in all_user[3500+621:4500]:
            yield {"user": user, "user_profile": user.user_profile}
    
# @_named_list("user_mailing_list")
class UserMailingList(MailingList):
    """A mailing list consisting of a specific set of users."""

    users = None

    def __init__(self, users):
        super().__init__()
        self.users = users

    def get_contexts(self):
        for user in self.users:
            yield {"user": user, "user_profile": user.user_profile}


def get_mailing_list(name, list_init_args):
    """
    Returns the ``MailingList`` corresponding to the given name, or raises
    KeyError if no such mailing list exists.
    """
    return MAILING_LIST_CLASSES.get(name)(**list_init_args)
