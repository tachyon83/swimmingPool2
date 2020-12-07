import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import NavBar from "../components/NavBar";
import AdminEditForm from "../components/AdminEditForm";
import Loading from "../components/Loading";
import Redirecting from "../components/Redirecting";
import { Form, Button, Col, Row } from "react-bootstrap";
import "../styles/AdminSpecificPoolPage.css";
const host = require("../host");

function AdminSpecificPoolPage({ history, match }) {
  let historyUse = useHistory();

  const poolId = match.params.id;
  const [queryResults, setQueryResults] = useState({});

  const [isAdmin, setIsAdmin] = useState(undefined);

  useEffect(() => {
    async function checkAuthenticated() {
      const response = await axios.get(`${host.server}/isAuthenticated`);
      const data = await response.data.response;
      if (!data) {
        historyUse.push("/login");
      }
      setIsAdmin(data);
    }
    checkAuthenticated();

    axios
      .get(`${host.server}/pool/${poolId}`)
      .then((response) => {
        const result = response.data;
        // PoolTypeMask (poolPublic, poolPrivate, poolHotel, poolIndoor, poolOutdoor)
        let poolTypeMask = result.poolTypeMask.toString(2).split("");
        poolTypeMask = [
          ...Array(5 - poolTypeMask.length).fill("0"),
          ...poolTypeMask,
        ];
        poolTypeMask = poolTypeMask.map((el) => parseInt(el) === 1);

        // PoolOption (poolForChild, poolForWoman, poolForDisabled)
        let poolOptionMask = result.poolOption.toString(2).split("");
        poolOptionMask = [
          ...Array(3 - poolOptionMask.length).fill("0"),
          ...poolOptionMask,
        ];
        poolOptionMask = poolOptionMask.map((el) => parseInt(el) === 1);

        let poolType;
        if (poolTypeMask[0]) {
          poolType = "public";
        } else if (poolTypeMask[1]) {
          poolType = "private";
        } else {
          poolType = "hotel";
        }

        setQueryResults({
          poolName: result.poolName,
          poolAddress: result.poolAddress,
          poolPhone: result.poolPhone,
          poolType: poolType,
          poolIndoor: poolTypeMask[3],
          poolOutdoor: poolTypeMask[4],
          poolForChild: poolOptionMask[0],
          poolForWoman: poolOptionMask[1],
          poolForDisabled: poolOptionMask[2],
          poolOpentime: result.poolOpentime === 1,
        });
      })
      .catch((response) => console.log(response));
  }, []);

  if (isAdmin === undefined) {
    return <Loading />;
  } else if (!isAdmin) {
    return <Redirecting />;
  } else {
    return (
      <>
        <NavBar page={2} />
        <div id="adminPageContent">
          <Button onClick={history.goBack}>돌아가기</Button>
          {queryResults.poolName ? (
            <AdminEditForm
              history={history}
              queryResults={queryResults}
              poolId={poolId}
            />
          ) : (
            <Form id="adminSpecificPoolForm">
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  수영장 이름
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    placeholder="수영장 이름을 입력하세요."
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
                        <Form.Check label="유아" type="checkbox" />
                        <Form.Check label="여성" type="checkbox" />
                        <Form.Check label="장애인" type="checkbox" />
                      </div>
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label className="font-weight-bold">유형</Form.Label>
                      <div className="mb-3">
                        <Form.Check label="실내" type="checkbox" />
                        <Form.Check label="야외" type="checkbox" />
                      </div>
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label className="font-weight-bold">
                        자유 수영
                      </Form.Label>
                      <div className="mb-3">
                        <Form.Check label="가능" type="checkbox" />
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
          )}
        </div>
      </>
    );
  }
}

export default AdminSpecificPoolPage;
