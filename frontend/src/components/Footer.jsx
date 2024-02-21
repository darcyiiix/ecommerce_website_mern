import { Container, Row, Col } from 'react-bootstrap';

export const Footer = () => {

    const getCurrentYear = new Date().getFullYear()
  return (
    <footer>
        <Container>
        <Row>
            <Col className="text-center py-3">
                <p>Copyright © { getCurrentYear } Love Frankie Ltd. Registered in England No. 08009117.</p>
            </Col>
        </Row>
        </Container>
    </footer>
  )
}

export default Footer;