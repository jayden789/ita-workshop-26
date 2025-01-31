"""
send ita19 invitation
"""

import re

from django.conf import settings
from django.core.management.base import BaseCommand
from django.core import mail

from api import models


TEMPLATE_RAW = """Dear {formal_last_name},

We write to invite you to <a href="https://ita.ucsd.edu/workshop/register/">participate and present a talk</a> at the
<a href="https://ita.ucsd.edu/workshop/">2019 ITA Workshop</a>, to be held Sunday 2/10 to Friday 2/15 at the
<a href="https://catamaranresort.com/">Catamaran Resort</a> in San Diego.

We apologize for the late invitation. Redesigning our website took
longer than we thought. We went through the effort ostensibly to
enhance clarity flexibility and security - that we hope you
will like, but frankly to permanently enshrine ourselves in the
<a href="https://ita.ucsd.edu/workshop/world-record">Guinness Book of World Records</a>.

Of the workshop's many unique features, we would like to highlight
the two (out of six) tracks held aboard a boat, Graduation Day where
outstanding graduating students and postdocs review their research,
a Poster Perfect Session where students present their work, and a
Valentine's Day soiree with food, prizes, and collaborative fun.
For more information, please <a href="https://ita.ucsd.edu/workshop/">check the website</a> or <a href="mailto:ita@ucsd.edu">contact us</a>.

If you hunger for more than knowledge, registration includes multiple
chow-wows: daily breakfasts, am/pm provisions, three light lunches,
evening socials with beer, snacks, and morre beerr, and a farewell
pow-ciao. This year's banquet will be a Polynesian Luau with
polynomial entertainment and audience participation.

Since we are very late, we ask you to please <a href="
https://ita.ucsd.edu/workshop/register/">login to your account</a>
very soon and indicate whether you plan to attend. Please note that
your old-site password no longer works, and you will need to select
a new password.

Also, by January 20th, please kindly upload your talk title and indicate
your planned attendance days so we know when you can present. Please
be as generous with these days as you can, and if you indicate at least
two days besides Wednesday (e.g. Monday and Thursday) we guarantee
to schedule your presentation on one of them, so that you can plan your
trip right away. You can also add an optional scheduling comment at
your profile presentation tab.

The Catamaran kindly kept the same room rates as last year. You can
book a discounted hotel room <a href="https://gc.synxis.com/rez.aspx?Hotel=64071&Chain=17551&template=GROUP&arrive=2/8/2019&depart=2/18/2019&adult=1&child=0&group=ITAW">here</a>. Please note that some of the suites
do not show on their website, but may be available if you call the hotel
directly. Last year, the hotel sold out on some days, so please reserve
your room soon.

We again apologize for the late announcement and hope you can join
us at another informative and enjoyable workshop.

Sincerely,

ITA
"""
TEMPLATE = re.sub(r"\n", "<br />", TEMPLATE_RAW)

SUBJECT = "Invitation to the 2019 ITA Workshop"

SENT_IN_FIRST_BATCH = [
    "moes@math.ku.dk",
    "syed@uci.edu",
    "ayanoglu@uci.edu",
    "rajeev.agrawal@motorola.com",
    "agrell@chalmers.se",
    "alanyali@bu.edu",
    "andrews@shannon.jpl.nasa.gov",
    "axa@cc.gatech.edu",
    "arikan@ee.bilkent.edu.tr",
    "aea@research.bell-labs.com",
    "baccelli@math.utexas.edu",
    "pfbaldi@ics.uci.edu",
    "angbar@wmatem.eis.uva.es",
    "abarg@umd.edu",
    "amink@cs.duke.edu",
    "hassibi@systems.caltech.edu",
    "zemel@cs.toronto.edu",
    "tho@caltech.edu",
    "e.biglieri@ieee.org",
    "andrew.barron@yale.edu",
    "rberry@eecs.northwestern.edu",
    "bickel@stat.berkeley.edu",
    "bilmes@ee.washington.edu",
    "blahut@uiuc.edu",
    "ifblake@ece.ubc.ca",
    "boutros@ieee.org",
    "bruck@paradise.caltech.edu",
    "freddy@cs.technion.ac.il",
    "bhochwald@nd.edu",
    "jhui@asu.edu",
    "buhler@ccrwest.org",
    "robert.calderbank@duke.edu",
    "panuc@marvell.com",
    "chanys@ieee.org",
    "gal.chechik@gmail.com",
    "junchen@ece.mcmaster.ca",
    "mkcheng@jpl.nasa.gov",
    "pachou@microsoft.com",
    "iltis@ece.ucsb.edu",
    "hamidj@uci.edu",
    "gerard.cohen@telecom-paristech.fr",
    "costello.2@nd.edu",
    "zoran.cvetkovic@kcl.ac.uk",
    "nando@cs.ox.ac.uk",
    "devetak@usc.edu",
    "nihar.jindal@gmail.com",
    "jojic@microsoft.com",
    "suhasdiggavi@ucla.edu",
    "dariush.divsalar@jpl.nasa.gov",
    "stark.draper@utoronto.ca",
    "dumer@ee.ucr.edu",
    "effros@caltech.edu",
    "abbas@ee.stanford.edu",
    "helgamal@ece.osu.edu",
    "salim.elrouayheb@rutgers.edu",
    "etony@umd.edu",
    "eeskin@cs.ucla.edu",
    "meir@eng.tau.ac.il",
    "jordan@cs.berkeley.edu",
    "kamabe@ieee.org",
    "damianos@jhu.edu",
    "michael.gastpar@epfl.ch",
    "akfletcher@ucla.edu",
    "forneyd@comcast.net",
    "mfossorier2@yahoo.com",
    "christina.fragouli@ucla.edu",
    "georghiades@tamu.edu",
    "gibson@ece.ucsb.edu",
    "andrea@ee.stanford.edu",
    "gordon@ccrwest.org",
    "karp@cs.berkeley.edu",
    "nkashyap@ece.iisc.ernet.in",
    "uri@maths.usyd.edu.au",
    "v.goyal@ieee.org",
    "alex.grant@unisa.edu.au",
    "kmakaryc@cs.princeton.edu",
    "hales@ccrwest.org",
    "kesidis@engr.psu.edu",
    "kieffer@ece.umn.edu",
    "kingo@ieee.org",
    "gerhard.kramer@tum.de",
    "prkumar@uiuc.edu",
    "pvk1729@gmail.com",
    "jnl@nd.edu",
    "elm@cs.umass.edu",
    "cleslie@cbio.mskcc.org",
    "shulin@ucdavis.edu",
    "mingyan@umich.edu",
    "loeliger@isi.ee.ethz.ch",
    "luby@qti.qualcomm.com",
    "madhow@ece.ucsb.edu",
    "armand@isr.umd.edu",
    "marcus@math.ubc.ca",
    "athina@uci.edu",
    "tom.marzetta@alcatel-lucent.com",
    "mcallester@tti-c.org",
    "medard@mit.edu",
    "mmp@stat.washington.edu",
    "meyn@ece.ufl.edu",
    "milenkov@uiuc.edu",
    "ubli@usc.edu",
    "mitter@mit.edu",
    "dmodha@almaden.ibm.com",
    "modiano@mit.edu",
    "bmoision@google.com",
    "motani@nus.edu.sg",
    "prakash@umd.edu",
    "krn@tamu.edu",
    "mikejneely@gmail.com",
    "neuhoff@umich.edu",
    "alon@ucsd.edu",
    "jsno@snu.ac.kr",
    "nowak@engr.wisc.edu",
    "jao@wustl.edu",
    "oohama@uec.ac.jp",
    "eord@hpl.hp.com",
    "jtyard@gmail.com",
    "nsanthan@hawaii.edu",
    "padovani@qti.qualcomm.com",
    "peres@microsoft.com",
    "henry.pfister@duke.edu",
    "lpoo@marvell.com",
    "poolla@me.berkeley.edu",
    "poor@princeton.edu",
    "pottie@ee.ucla.edu",
    "pradhanv@eecs.umich.edu",
    "gil@ee.columbia.edu",
    "kannanr@eecs.berkeley.edu",
    "rish@us.ibm.com",
    "jorma.rissanen@hiit.fi",
    "vwani@ee.ucla.edu",
    "rubin@ee.ucla.edu",
    "ryan@ece.arizona.edu",
    "sahai@eecs.berkeley.edu",
    "swati@ee.upenn.edu",
    "sason@ee.technion.ac.il",
    "christian.schlegel@dal.ca",
    "gseroussi@ieee.org",
    "naseshadri@eng.ucsd.edu",
    "devavrat@mit.edu",
    "sshlomo@ee.technion.ac.il",
    "gshamir@ieee.org",
    "bzshen@broadcom.com",
    "shroff@ece.osu.edu",
    "moshe@ee.technion.ac.il",
    "acsinger@uiuc.edu",
    "smyth@ics.uci.edu",
    "emina.soljanin@rutgers.edu",
    "jsoriaga@qti.qualcomm.com",
    "spasojev@winlab.rutgers.edu",
    "spalex@tamu.edu",
    "rsrikant@illinois.edu",
    "yp@mit.edu",
    "vgsubram@umich.edu",
    "szpan@purdue.edu",
    "tamm@ieee.org",
    "sekhar.tatikonda@yale.edu",
    "patrick.thiran@epfl.ch",
    "tishby@cs.huji.ac.il",
    "trachten@bu.edu",
    "mitchell.trott@hp.com",
    "dntse@stanford.edu",
    "ertem.tuncel@ucr.edu",
    "danielat@uic.edu",
    "ruediger.urbanke@epfl.ch",
    "verdu@princeton.edu",
    "vinay@research.att.com",
    "vasic@ece.arizona.edu",
    "vvv@illinois.edu",
    "venkatesh@ee.upenn.edu",
    "martin.vetterli@epfl.ch",
    "vinck@exp-math.uni-essen.de",
    "sriram@ece.utexas.edu",
    "pramodv@uiuc.edu",
    "krishnamurthy.viswanathan@hp.com",
    "andrew.viterbi@viterbigroup.com",
    "dean@science.purdue.edu",
    "pascal.vontobel@ieee.org",
    "wainwrig@eecs.berkeley.edu",
    "wangx@ee.columbia.edu",
    "manfred@cse.ucsc.edu",
    "welling@ics.uci.edu",
    "wesel@ucla.edu",
    "philip.whiting@mq.edu.au",
    "f.m.j.willems@tue.nl",
    "moewin@mit.edu",
    "gww@mit.edu",
    "epxing@cs.cmu.edu",
    "zx@ece.tamu.edu",
    "ehyang@uwaterloo.ca",
    "ryates@winlab.rutgers.edu",
    "eyeh@ece.neu.edu",
    "whyeung@ie.cuhk.edu.hk",
    "nmioy@uib.no",
    "binyu@stat.berkeley.edu",
    "zamir@eng.tau.ac.il",
    "zhzhang@usc.edu",
    "lizhong@mit.edu",
    "jz@ee.technion.ac.il",
    "kurkoski@jaist.ac.jp",
    "jandrews@ece.utexas.edu",
    "pgupta@ieee.org",
    "abouzeid@ecse.rpi.edu",
    "j.h.weber@tudelft.nl",
    "juergen.zech@tum.de",
    "oshental@gmail.com",
    "nkaroui@stat.berkeley.edu",
    "ita+deceased_email.Massey.James.331@ucsd.edu",
    "rp3@u.washignton.edu",
    "melda.yuksel@gmail.com",
    "ramesh.annavajjala@gmail.com",
    "sidharth@jaggi.name",
    "elza@nyu.edu",
    "uelif@metu.edu.tr",
    "baras@isr.umd.edu",
    "slow@caltech.edu",
    "pgrover@andrew.cmu.edu",
    "gil@mit.edu",
    "dirk.slock@eurecom.fr",
    "palomar@ust.hk",
    "anna.scaglione@asu.edu",
    "rsmarand@nd.edu",
    "ysteinbe@ee.technion.ac.il",
    "wagner@cornell.edu",
    "emanuele.viterbo@monash.edu",
    "merouane.debbah@supelec.fr",
    "fisher@csail.mit.edu",
    "elkan@cs.ucsd.edu",
    "marcellin@ece.arizona.edu",
    "noble@gs.washington.edu",
    "ghosh@ece.utexas.edu",
    "jon@mcauliffe.com",
    "yoshua.bengio@umontreal.ca",
    "boelcskei@nari.ee.ethz.ch",
    "guruswami@cmu.edu",
    "vazirani@cc.gatech.edu",
    "hmmeng@se.cuhk.edu.hk",
    "candes@stanford.edu",
    "heckerma@microsoft.com",
    "yuille@stat.ucla.edu",
    "mmblaum@us.ibm.com",
    "sergio.benedetto@polito.it",
    "yener@ee.psu.edu",
    "tsachy@stanford.edu",
    "ajw@wharton.upenn.edu",
    "weiyu@comm.utoronto.ca",
    "sychung@ee.kaist.ac.kr",
    "claudio.silva@ieee.org",
    "doyle@caltech.edu",
    "duman@ee.bilkent.edu.tr",
    "etzion@cs.technion.ac.il",
    "mayagupta@google.com",
    "rheath@utexas.edu",
    "ivanam@stanford.edu",
    "skannan@nsf.gov",
    "yiannis@aueb.gr",
    "caire@usc.edu",
    "subhrakanti.dey@angstrom.uu.se",
    "pi@bu.edu",
    "mkearns@cis.upenn.edu",
    "khudanpur@jhu.edu",
    "olivier.leveque@epfl.ch",
    "swm@ece.gatech.edu",
    "smiller@ece.tamu.edu",
    "montanari@stanford.edu",
    "francois.meyer@colorado.edu",
    "balaji@stanford.edu",
    "raheli@unipr.it",
    "schniter.1@osu.edu",
    "kulkarni@princeton.edu",
    "lafferty@cs.cmu.edu",
    "gshafer@andromeda.rutgers.edu",
    "shakkott@ece.utexas.edu",
    "leandros@inf.uth.gr",
    "lalithasankar@asu.edu",
    "torleiv@ii.uib.no",
    "ggordon@cs.cmu.edu",
    "dguo@northwestern.edu",
    "morita@is.uec.ac.jp",
    "ritasemail@gmail.com",
    "ulukus@umd.edu",
    "pdg@cwi.nl",
    "tommi@csail.mit.edu",
    "ddlee@seas.upenn.edu",
    "berlek@math.berkeley.edu",
    "singer@cs.huji.ac.il",
    "murphyk@cs.ubc.ca",
    "moulin@ifp.uiuc.edu",
    "mccallum@cs.umass.edu",
    "srv@bu.edu",
    "richb@rice.edu",
    "aviyente@egr.msu.edu",
    "kjc@eecs.umich.edu",
    "topsoe@math.ku.dk",
    "akbar@engr.wisc.edu",
    "jmodestino@miami.edu",
    "nmartins@isr.umd.edu",
    "mh@eecs.northwestern.edu",
    "manuel.lladser@colorado.edu",
    "sanghavi@mail.utexas.edu",
    "ozgur.oyman@intel.com",
    "fernando.perez-cruz@alcatel-lucent.com",
    "pavann@broadcom.com",
    "hamid@soe.ucsc.edu",
    "frank@comm.utoronto.ca",
    "mjfg@eng.cam.ac.uk",
    "f.p.kelly@statslab.cam.ac.uk",
    "ninoslav.marina@gmail.com",
    "liang.889@osu.edu",
    "fabio.fagnani@polito.it",
    "fparvaresh@gmail.com",
    "andrewsling@gmail.com",
    "skittipi@ucsd.edu",
    "aslan.tchamkerten@telecom-paristech.fr",
    "tetali@math.gatech.edu",
    "anastas@umich.edu",
    "nikhilk@ee.iitb.ac.in",
    "kostas@ucsd.edu",
    "jprice@eas.uccs.edu",
    "brunos@ece.cmu.edu",
    "olivier.dousse@here.com",
    "narayan@winlab.rutgers.edu",
    "haenggi.1@nd.edu",
    "t.j.tjalkens@tue.nl",
    "viola@fing.edu.uy",
    "amcgregor@gmail.com",
    "teemu.roos@cs.helsinki.fi",
    "srangan@nyu.edu",
    "constantine@utexas.edu",
    "terence.chan@unisa.edu.au",
    "nazanin@eecs.ucf.edu",
    "petri.myllymaki@cs.helsinki.fi",
    "shayan.gs@dese.iisc.ernet.in",
    "chertkov@lanl.gov",
    "ghan@hku.hk",
    "ota@pit-nagano.ac.jp",
    "giacomo.como@control.lth.se",
    "ingrid@math.duke.edu",
    "mbelkin@cse.ohio-state.edu",
    "darwiche@cs.ucla.edu",
]


def make_email_with_vars(formal_last_name, email_address):
    """Returns email object, substituting the given values in the template."""
    body = TEMPLATE.format(formal_last_name=formal_last_name)
    email = mail.EmailMessage(
        subject=SUBJECT,
        body=body,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[email_address],
        bcc=[settings.DEFAULT_BCC_EMAIL],
    )
    email.content_subtype = "html"
    return email


def make_email(user):
    """Returns email object"""
    return make_email_with_vars(user.user_profile.formal_last_name, user.email)


class Command(BaseCommand):
    """The main command."""

    help = "Set up the Workshop and RegistrationOption instances for ITA 2019."

    def print(self, msg):
        """Print a message to stdout."""
        self.stdout.write(msg)

    def print_success(self, msg):
        """Print a message to stdout, with SUCCESS styling."""
        self.print(self.style.SUCCESS(msg))

    def handle(self, *args, **options):
        users = (
            models.User.objects.prefetch_related("user_profile")
            .filter(user_profile__presenting_default=True)
            .all()
        )
        users = [u for u in users if u.email not in SENT_IN_FIRST_BATCH]

        num_sent = 0
        for user in users:
            # make_email(user).send()
            self.print(
                "sent to {} <{}>".format(
                    user.user_profile.formal_name, user.email
                )
            )
            num_sent += 1
        self.print_success("{} total emails sent".format(num_sent))
