import React from "react";
import { Accordion, Card, Form, Button, Col } from "react-bootstrap";
import "../styles/AdminQuerySearch.css";

function AdminQuerySearch() {
  return (
    <Form id="adminQueryForm">
      <Form.Group id="adminQueryFormTop">
        <Form.Control type="text" placeholder="수영장 이름" />
        <Button variant="primary" type="submit">
          검색
        </Button>
      </Form.Group>
      <Accordion>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            + 검색 필터 설정
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label className="font-weight-bold">
                    운영 방식
                  </Form.Label>
                  <div className="mb-3">
                    <Form.Check label="공공" type="checkbox" />
                    <Form.Check label="사설" type="checkbox" />
                    <Form.Check label="호텔" type="checkbox" />
                  </div>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label className="font-weight-bold">
                    전용 수영장
                  </Form.Label>
                  <div className="mb-3">
                    <Form.Check label="유아" type="checkbox" />
                    <Form.Check label="여성" type="checkbox" />
                    <Form.Check label="장애인" type="checkbox" />
                  </div>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label className="font-weight-bold">
                    자유 수영
                  </Form.Label>
                  <div className="mb-3">
                    <Form.Check label="가능" type="checkbox" />
                  </div>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label className="font-weight-bold">유형</Form.Label>
                  <div className="mb-3">
                    <Form.Check label="실내" type="checkbox" />
                    <Form.Check label="야외" type="checkbox" />
                  </div>
                </Form.Group>
              </Form.Row>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Form>
  );
}

export default AdminQuerySearch;
