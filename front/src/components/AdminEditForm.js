import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Col, Row } from "react-bootstrap";
const host = require("../host");

function AdminEditForm({ history, queryResults, poolId }) {
  const [poolName, setPoolName] = useState(queryResults.poolName);
  const [poolAddress, setPoolAddress] = useState(queryResults.poolAddress);
  const [poolPhone, setPoolPhone] = useState(queryResults.poolPhone);

  const [poolType, setPoolType] = useState(queryResults.poolType);

  const [poolIndoor, setPoolIndoor] = useState(queryResults.poolIndoor);
  const [poolOutdoor, setPoolOutdoor] = useState(queryResults.poolOutdoor);

  const [poolForChild, setPoolForChild] = useState(queryResults.poolForChild);
  const [poolForWoman, setPoolForWoman] = useState(queryResults.poolForWoman);
  const [poolForDisabled, setPoolForDisabled] = useState(
    queryResults.poolForDisabled
  );

  const [poolOpentime, setPoolOpentime] = useState(queryResults.poolOpentime);

  const handleDelete = () => {
    axios.delete(`${host.server}/admin/pool/${poolId}`).then((res) => {
      if (res.data.response) {
        alert("정상 처리 되었습니다. ");
        history.goBack();
      }
    });
  };

  const handleEdit = () => {
    if (!poolIndoor && !poolOutdoor) {
      alert("유형을 선택해주세요.");
    } else {
      // PoolTypeMask (poolPublic, poolPrivate, poolHotel, poolIndoor, poolOutdoor)
      let poolTypeMask;
      if (poolType === "public") {
        poolTypeMask = "100";
      } else if (poolType === "private") {
        poolTypeMask = "010";
      } else if (poolType === "hotel") {
        poolTypeMask = "001";
      }
      if (poolIndoor) {
        poolTypeMask += "1";
      } else {
        poolTypeMask += "0";
      }
      if (poolOutdoor) {
        poolTypeMask += "1";
      } else {
        poolTypeMask += "0";
      }

      // PoolOption (poolForChild, poolForWoman, poolForDisabled)
      let poolOption = "";
      if (poolForChild) {
        poolOption += "1";
      } else {
        poolOption += "0";
      }
      if (poolForWoman) {
        poolOption += "1";
      } else {
        poolOption += "0";
      }
      if (poolForDisabled) {
        poolOption += "1";
      } else {
        poolOption += "0";
      }

      // Change binary to decimal
      poolTypeMask = parseInt(poolTypeMask, 2);
      poolOption = parseInt(poolOption, 2);

      const information = {
        poolId,
        poolName,
        poolAddress,
        poolPhone,
        poolTypeMask,
        poolOption,
        poolOpentime,
      };

      axios.put(`${host.server}/admin/pool`, { information }).then((res) => {
        if (res.data.response) {
          alert("정상 처리 되었습니다. ");
        }
      });
    }
  };

  return (
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
              <Form.Label className="font-weight-bold">운영 방식</Form.Label>
              <div className="mb-3">
                <Form.Check
                  label="공공"
                  value="public"
                  name="poolType"
                  type="radio"
                  checked={poolType === "public"}
                  onChange={(e) => {
                    setPoolType(e.target.value);
                  }}
                />
                <Form.Check
                  label="사설"
                  value="private"
                  name="poolType"
                  type="radio"
                  checked={poolType === "private"}
                  onChange={(e) => {
                    setPoolType(e.target.value);
                  }}
                />
                <Form.Check
                  label="호텔"
                  value="hotel"
                  name="poolType"
                  type="radio"
                  checked={poolType === "hotel"}
                  onChange={(e) => {
                    setPoolType(e.target.value);
                  }}
                />
              </div>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label className="font-weight-bold">전용 수영장</Form.Label>
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
              <Form.Label className="font-weight-bold">자유 수영</Form.Label>
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
          <Button variant="primary" onClick={handleEdit}>
            수정
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            삭제
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default AdminEditForm;
