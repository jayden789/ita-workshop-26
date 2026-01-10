import React from 'react';
import { Container, Jumbotron } from 'reactstrap';

export default class GeneralInfoSection extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron fluid style={{ backgroundColor: 'white', margin: 0 }}>
          <div className="text-center">
            <h1 className="display-4 mb-4"> A bit ab't ITA</h1>
            <Container>
              <p>
                The Information Theory and Applications (ITA){' '}
                Workshop is an annual interdisciplinary meeting celebrating its
                twenty first anniversary. It brings together leading academic and 
                industrial researchers who share recent advances and explore emerging 
                directions in the theory and broad applications of information, 
                ranging from artificial intelligence to data science, machine learning, 
                information theory, theoretical computer science, communication, 
                signal processing, statistics, and related areas at the confluence 
                of theory and practice. 
              </p>
              <p>
                TA is designed with several purposeful twists on the traditional conference format. 
                Instead of plenary talks, it holds plenary sessions where several prominent researchers
                present diverse views of an important and timely topic. Contributed talks are not limited
                to previously-unpublished results, rather speakers are encouraged to present their most 
                significant and insightful work of the year, whether already published or not yet. 
                Graduate students and postdoctoral researchers may present accessible high-level overviews
                of their work and its future impact potential. 
              </p>

              <p>
                A defining feature of ITA is its strong emphasis on community building and 
                participants' career advancement. Many friendships, collaborations, 
                research-directions, individual and joint grants, postdocs, industrial and 
                academic positions, and even startups, originated at the workshop. 
                They were facilitated by multiple events designed to help participants, mingle,
                meet, converse, learn, advance, and grow. A few examples: many food-centered events,
                the workshop's  know-thy-neighbor session where participants introduce themselves, 
                graduation-day talks where students and postdocs present their research 
                and receive the sand-sea-sun awards judged by external referees, hello-boss session
                where futue employees meet current employers, entrepreneurship sessions, entertainment
                session, NSF-funding presentation, sports activities, tutorials, and more.

              </p>
              <h1 className="display-4 mb-4 mt-5"> Join Us!</h1>
              <p>
                We cordially invite you to join ITA 2026. <br />
                There is still time to join and contribute to this year's workshop. If you like to 
                present a talk, organize a session, or contribute in any other way, please{' '}
                <a href="mailto:ita@ucsd.edu">
                  <strong>drop us a line and tell us a bit ab't it.</strong>
                </a>
              </p>
            </Container>
          </div>
        </Jumbotron>
      </div>
    );
  }
}
