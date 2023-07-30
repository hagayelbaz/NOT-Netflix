import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import './AboutPage.css'


/**
 * about page
 * @returns {JSX.Element}
 * @constructor
 */
const AboutPage = () => {
    return (
        <div style={{ backgroundColor: "#141414", color: "white", minHeight: "100vh", padding: "3rem" }}>
            <Container>
                <Row className="mb-5 mt-10">
                    <Col>
                        <h1>About NOT NETFLIX</h1>
                    </Col>
                </Row>
                <Row className="mb-5">
                    <Col md={6}>
                        <h2>Who We Are</h2>
                        <p>
                            NOT NETFLIX is an online platform that provides a vast selection of TV shows, movies, and more from various genres and languages. We strive to deliver the best entertainment experience to our viewers worldwide.
                        </p>
                    </Col>
                    <Col md={6}>
                        <h2>Our Mission</h2>
                        <p>
                            Our mission is to provide an easy-to-use platform for our viewers to find and watch their favorite shows and movies anytime, anywhere. We are constantly updating our collection to ensure a wide variety of choices.
                        </p>
                    </Col>
                </Row>
                <Row className="mb-5">
                    <Col md={6}>
                        <h2>What We Do</h2>
                        <p>
                            We offer unlimited streaming of TV shows and movies. Our subscribers can enjoy unlimited ad-free viewing of our collection. We aim to bring you the latest and greatest in entertainment, right at your fingertips.
                        </p>
                    </Col>
                    <Col md={6}>
                        <h2>Contact Us</h2>
                        <p>
                            For any questions or concerns, please contact us at support@notnetflix.com. We are here to help!
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AboutPage;
