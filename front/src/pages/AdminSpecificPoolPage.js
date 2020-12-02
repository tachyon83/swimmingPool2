import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import { Form, Button, Col, Row } from "react-bootstrap";
import "../styles/AdminSpecificPoolPage.css";

function AdminSpecificPoolPage({ history, match }) {
  const poolId = match.params.id;
  let queryResults = {};

  const [poolName, setPoolName] = useState("");
  const [poolAddress, setPoolAddress] = useState("");
  const [poolPhone, setPoolPhone] = useState("");

  const [poolPublic, setPoolPublic] = useState(false);
  const [poolPrivate, setPoolPrivate] = useState(false);
  const [poolHotel, setPoolHotel] = useState(false);

  const [poolIndoor, setPoolIndoor] = useState(false);
  const [poolOutdoor, setPoolOutdoor] = useState(false);

  const [poolForChild, setPoolForChild] = useState(false);
  const [poolForWoman, setPoolForWoman] = useState(false);
  const [poolForDisabled, setPoolForDisabled] = useState(false);

  const [poolOpentime, setPoolOpentime] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/pool/${poolId}`)
      .then((response) => {
        const result = response.data;
        queryResults = result;
      })
      .then(() => {
        console.log(queryResults);
        // PoolName, PoolAddress, PoolPhone
        setPoolName(queryResults.poolName);
        setPoolAddress(queryResults.poolAddress);
        setPoolPhone(queryResults.poolPhone);

        // PoolTypeMask (poolPublic, poolPrivate, poolHotel, poolIndoor, poolOutdoor)
        let poolTypeMask = queryResults.poolTypeMask.toString(2).split("");
        poolTypeMask = [
          ...Array(5 - poolTypeMask.length).fill("0"),
          ...poolTypeMask,
        ];
        poolTypeMask = poolTypeMask.map((el) => parseInt(el) === 1);
        setPoolPublic(poolTypeMask[0]);
        setPoolPrivate(poolTypeMask[1]);
        setPoolHotel(poolTypeMask[2]);
        setPoolIndoor(poolTypeMask[3]);
        setPoolOutdoor(poolTypeMask[4]);

        // PoolOption (poolForChild, poolForWoman, poolForDisabled)
        let poolOptionMask = queryResults.poolOption.toString(2).split("");
        poolOptionMask = [
          ...Array(3 - poolOptionMask.length).fill("0"),
          ...poolOptionMask,
        ];
        poolOptionMask = poolOptionMask.map((el) => parseInt(el) === 1);
        setPoolForChild(poolOptionMask[0]);
        setPoolForWoman(poolOptionMask[1]);
        setPoolForDisabled(poolOptionMask[2]);

        // PoolOpenTime
        setPoolOpentime(queryResults.poolOpentime === 1);
        console.log("끝");
      })
      .catch((response) => console.log("axios result error", response));
  }, []);

  return (
    <>
      <NavBar page={2} />
      <div id="adminPageContent">
        <Button onClick={history.goBack}>돌아가기</Button>
        <Form id="adminSpecificPoolForm">
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              수영장 이름
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="수영장 이름을 입력하세요."
                required
                value={poolName}
                onChange={(e) => setPoolName(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              수영장 주소
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="수영장 주소를 입력하세요."
                required
                value={poolAddress}
                onChange={(e) => setPoolAddress(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              수영장 전화번호
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="수영장 전화번호를 입력하세요."
                value={poolPhone}
                onChange={(e) => setPoolPhone(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              세부사항
            </Form.Label>
            <Col sm={10}>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label className="font-weight-bold">
                    운영 방식
                  </Form.Label>
                  <div className="mb-3">
                    <Form.Check
                      label="공공"
                      value="public"
                      name="poolType"
                      type="radio"
                    />
                    <Form.Check
                      label="사설"
                      value="private"
                      name="poolType"
                      type="radio"
                    />
                    <Form.Check
                      label="호텔"
                      value="hotel"
                      name="poolType"
                      type="radio"
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
                <Form.Group as={Col}>
                  <Form.Label className="font-weight-bold">유형</Form.Label>
                  {console.log("poolIndoor: ", poolIndoor)}

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
              </Form.Row>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button variant="primary">수정</Button>
              <Button variant="primary">삭제</Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    </>
  );
}

export default AdminSpecificPoolPage;
