import React from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Jumbotron,
} from 'reactstrap';
import styles from './AwardSessionsSection.module.css';

const AwardSessionsSection = () => {
  const awardSessions = [
    {
      sessions: [
        {
          category: 'International Conference on Machine Learning (ICML)  Outstanding Paper Award',
          title:
            'Roll the dice & look before you leap: Going beyond the creative limits of next-token prediction',
          authors: 'Vaishnavh Nagarajan, Chen Henry Wu, Charles Ding, Aditi Raghunathan',
          url: 'https://openreview.net/pdf?id=Hi0SyHMmkd',
        },
        {
          category: 'International Conference on Learning Representations (ICLR) Outstanding Paper Award',
          title: 'Safety Alignment Should be Made More Than Just a Few Tokens Deep',
          authors:
            'Xiangyu_Qi, Ashwinee Panda, Kaifeng Lyu, Xiao Ma, Subhrajit Roy, Ahmad Beirami, Prateek Mittal, Peter Henderson',
          url: 'https://proceedings.iclr.cc/paper_files/paper/2025/file/88be023075a5a3ff3dc3b5d26623fa22-Paper-Conference.pdf',
        },
        // {
        //   category: 'Signal Processing Best Paper Award',
        //   title: 'NIMA: Neural Image Assessment',
        //   authors: 'Hossein Talebi, Peyman Milanfar',
        //   url: 'https://arxiv.org/pdf/1709.05424.pdf',
        // },
      ],
    },

    // Another card
    // {
    //   day: 'Thursday 4:30 pm',
    //   sessions: [
    //     {
    //       category:
    //         'International Conference on Machine Learning (ICML) Outstanding Paper Award',
    //       title: 'A Watermark for Large Language Models',
    //       authors:
    //         'John Kirchenbauer, Jonas Geiping, Yuxin Wen, Jonathan Katz, Ian Miers, Tom Goldstein',
    //       url: 'https://arxiv.org/pdf/2301.10226.pdf',
    //     },
    //     {
    //       category:
    //         'Neural Information Processing Symposium (NeurIPS) Outstanding Main Track Paper Award',
    //       title: 'Are Emergent Abilities of Large Language Models a Mirage?',
    //       authors: 'Rylan Schaeffer, Brando Miranda, Sanmi Koyejo',
    //       url: 'https://arxiv.org/pdf/2304.15004.pdf',
    //     },
    //     {
    //       category:
    //         'Association for Computational Linguistics (ACL) Best Paper Award',
    //       title:
    //         'Do Androids Laugh at Electric Sheep? Humor “Understanding” Benchmarks from The New Yorker Caption Contest',
    //       authors:
    //         'Jack Hessel, Ana Marasovic, Jena D. Hwang, Lillian Lee, Jeff Da, Rowan Zellers, Robert Mankoff, Yejin Choi',
    //       url: 'https://arxiv.org/pdf/2209.06293.pdf',
    //     },
    //   ],
    // },
  ];

  return (
    <Jumbotron fluid className={styles.jumbotron}>
      <div className="text-center">
        <h1 className={styles.title}>Award Session</h1>
        <h4>Friday</h4>
        <p className={styles.introduction}>
          The year’s award winning papers at major journals and conferences
          <br /> <br />
          {/* Didn’t get to attend all technical conferences last year? Were too
          busy to read every technical magazine cover to cover? Not to worry.
          ITA has got you covered! Join our “Award Sessions” for a 1-hour up
          close and personal view of the “best research of the year”. At
          Monday’s last session, we will cover best journal papers from EE
          disciplines, and at Thursday’s last session, best conference papers in
          the CS and ML areas. At the end of each session, you will see that we
          really kept “The Best of The Best for Last”. */}
          Didn’t get to attend all technical conferences last year? Were too busy to read every technical magazine cover to cover? Not to worry. ITA has got you covered! Join our “Award Sessions” for a 1-hour up close and personal view of the “best research of the year”.  At the end of the session, you will see that we really kept “The Best of The Best for Last”.
        </p>
        <Row className="justify-content-center">
          {awardSessions.map((session, index) => (
            <Col
              key={index}
              xs={12}
              md={10}
              lg={8}
            >
              <Card className={styles.card}>
                <CardBody>
                  {session.sessions.map((award, awardIndex) => (
                    <React.Fragment key={awardIndex}>
                      {awardIndex > 0 && <hr className={styles.divider} />}
                      <CardText className={styles.cardText}>
                        <strong>{award.category}</strong>
                        <br />
                        <a
                          href={award.url}
                          className={styles.paperTitle}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {award.title}
                        </a>
                        <div className={styles.authors}>{award.authors}</div>
                      </CardText>
                    </React.Fragment>
                  ))}
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Jumbotron>
  );
};

export default AwardSessionsSection;
