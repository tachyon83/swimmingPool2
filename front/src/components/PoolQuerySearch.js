import React, { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { Accordion, Card, Form, Button, Col } from "react-bootstrap";
import "../styles/PoolQuerySearch.css";

function PoolQuerySearch({ query }) {
  let history = useHistory();

  const [searchWord, setSearchWord] = useState(query.searchWord);

  const [poolPublic, setPoolPublic] = useState(query.poolPublic === "1");
  const [poolPrivate, setPoolPrivate] = useState(query.poolPrivate === "1");
  const [poolHotel, setPoolHotel] = useState(query.poolHotel === "1");

  const [poolForChild, setPoolForChild] = useState(query.poolForChild === "1");
  const [poolForWoman, setPoolForWoman] = useState(query.poolForWoman === "1");
  const [poolForDisabled, setPoolForDisabled] = useState(
    query.poolForDisabled === "1"
  );

  const [poolIndoor, setPoolIndoor] = useState(query.poolIndoor === "1");
  const [poolOutdoor, setPoolOutdoor] = useState(query.poolOutdoor === "1");

  const [poolOpentime, setPoolOpentime] = useState(query.poolOpentime === "1");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchWord === "") {
      alert("검색어를 입력해주세요");
    } else {
      history.push({
        pathname: "/pool",
        search: `?searchWord=${searchWord}&poolPublic=${
          poolPublic ? 1 : 0
        }&poolPrivate=${poolPrivate ? 1 : 0}&poolHotel=${
          poolHotel ? 1 : 0
        }&poolForChild=${poolForChild ? 1 : 0}&poolForWoman=${
          poolForWoman ? 1 : 0
        }&poolForDisabled=${poolForDisabled ? 1 : 0}&poolIndoor=${
          poolIndoor ? 1 : 0
        }&poolOutdoor=${poolOutdoor ? 1 : 0}&poolOpentime=${
          poolOpentime ? 1 : 0
        }&pageNumber=1`,
      });
    }
  };

  return (
    <>
      <Form id="poolQueryForm" onSubmit={handleSubmit}>
        <Form.Group id="queryFormTop">
          <Form.Control
            type="text"
            placeholder="수영장 이름"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
          />
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
                      <Form.Check
                        label="공공"
                        type="checkbox"
                        defaultChecked={poolPublic}
                        onChange={(e) => setPoolPublic(e.target.checked)}
                      />
                      <Form.Check
                        label="사설"
                        type="checkbox"
                        defaultChecked={poolPrivate}
                        onChange={(e) => setPoolPrivate(e.target.checked)}
                      />
                      <Form.Check
                        label="호텔"
                        type="checkbox"
                        defaultChecked={poolHotel}
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
                        defaultChecked={poolForChild}
                        onChange={(e) => setPoolForChild(e.target.checked)}
                      />
                      <Form.Check
                        label="여성"
                        type="checkbox"
                        defaultChecked={poolForWoman}
                        onChange={(e) => setPoolForWoman(e.target.checked)}
                      />
                      <Form.Check
                        label="장애인"
                        type="checkbox"
                        defaultChecked={poolForDisabled}
                        onChange={(e) => setPoolForDisabled(e.target.checked)}
                      />
                    </div>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label className="font-weight-bold">
                      자유 수영
                    </Form.Label>
                    <div className="mb-3">
                      <Form.Check
                        label="가능"
                        type="checkbox"
                        defaultChecked={poolOpentime}
                        onChange={(e) => setPoolOpentime(e.target.checked)}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label className="font-weight-bold">유형</Form.Label>
                    <div className="mb-3">
                      <Form.Check
                        label="실내"
                        type="checkbox"
                        defaultChecked={poolIndoor}
                        onChange={(e) => setPoolIndoor(e.target.checked)}
                      />
                      <Form.Check
                        label="야외"
                        type="checkbox"
                        defaultChecked={poolOutdoor}
                        onChange={(e) => setPoolOutdoor(e.target.checked)}
                      />
                    </div>
                  </Form.Group>
                </Form.Row>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Form>
    </>
  );
}

export default PoolQuerySearch;
