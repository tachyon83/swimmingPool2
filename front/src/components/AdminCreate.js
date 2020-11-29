import React, { useState } from "react";
import { Accordion, Card, Form, Button, Col } from "react-bootstrap";
import "../styles/AdminCreate.css";

function AdminCreate() {
  const [poolName, setPoolName] = useState("");

  const [poolPublic, setPoolPublic] = useState(false);
  const [poolPrivate, setPoolPrivate] = useState(false);
  const [poolHotel, setPoolHotel] = useState(false);

  const [poolForChild, setPoolForChild] = useState(false);
  const [poolForWoman, setPoolForWoman] = useState(false);
  const [poolForDisabled, setPoolForDisabled] = useState(false);

  const [poolIndoor, setPoolIndoor] = useState(false);
  const [poolOutdoor, setPoolOutdoor] = useState(false);

  const [poolOpentime, setPoolOpentime] = useState(false);

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (poolName === "") {
      alert("수영장 이름을 입력해주세요");
    } else {
      alert(
        `${poolName}, ${poolPublic}, ${poolPrivate}, ${poolHotel}, ${poolForChild}, ${poolForWoman}, ${poolForDisabled}, ${poolIndoor}, ${poolOutdoor}, ${poolOpentime}`
      );
    }
  };

  return (
    <Form id="adminCreateForm" onSubmit={handleCreateSubmit}>
      <Form.Group id="adminCreateFormTop">
        <Form.Control
          type="text"
          placeholder="수영장 이름을 입력하세요."
          value={poolName}
          onChange={(e) => setPoolName(e.target.value)}
        />
        <Button variant="primary" type="submit">
          추가
        </Button>
      </Form.Group>
      <Accordion>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            + 상세 정보
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label className="font-weight-bold">
                    운영 방식
                  </Form.Label>
                  <div className="mb-3">
                    <Form.Check
                      label="공공"
                      type="checkbox"
                      onChange={(e) => {
                        setPoolPublic(e.target.checked);
                      }}
                    />
                    <Form.Check
                      label="사설"
                      type="checkbox"
                      onChange={(e) => setPoolPrivate(e.target.checked)}
                    />
                    <Form.Check
                      label="호텔"
                      type="checkbox"
                      onChange={(e) => setPoolHotel(e.target.checked)}
                    />
                  </div>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label className="font-weight-bold">
                    전용 수영장
                  </Form.Label>
                  <div className="mb-3">
                    <Form.Check
                      label="유아"
                      type="checkbox"
                      onChange={(e) => setPoolForChild(e.target.checked)}
                    />
                    <Form.Check
                      label="여성"
                      type="checkbox"
                      onChange={(e) => setPoolForWoman(e.target.checked)}
                    />
                    <Form.Check
                      label="장애인"
                      type="checkbox"
                      onChange={(e) => setPoolForDisabled(e.target.checked)}
                    />
                  </div>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label className="font-weight-bold">유형</Form.Label>
                  <div className="mb-3">
                    <Form.Check
                      label="실내"
                      type="checkbox"
                      onChange={(e) => setPoolIndoor(e.target.checked)}
                    />
                    <Form.Check
                      label="야외"
                      type="checkbox"
                      onChange={(e) => setPoolOutdoor(e.target.checked)}
                    />
                  </div>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label className="font-weight-bold">
                    자유 수영
                  </Form.Label>
                  <div className="mb-3">
                    <Form.Check
                      label="가능"
                      type="checkbox"
                      onChange={(e) => setPoolOpentime(e.target.checked)}
                    />
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

export default AdminCreate;
