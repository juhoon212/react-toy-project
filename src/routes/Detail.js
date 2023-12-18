import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from 'styled-components'
import { Nav } from "react-bootstrap"

let YellowBtn = styled.button`
  background : ${props => props.bg};
  color : ${props => props.bg == 'blue' ? 'white' : 'black'}
  padding: 10px;
`

const Details = (props) => {
  {/* useEffect 안에는 어려운 연산 작업 why? html모두 렌더링 한다음 useEffect안에 있는 함수 실행, 서버에서 데이터 가져오는 작업, 타이머 장착*/}
  

  let [count, setCount] = useState(0);
  let [box, setBox] = useState(true);
  let [search, setSearch] = useState('');
  let [tab, setTab] = useState(0);

  useEffect(() => {
    const timeOut = setTimeout(() => {setBox(false)}, 2000);
    console.log(1);
    {/* useEffect 실행 전 실행 */}
    return () => {
      clearTimeout(timeOut);
    }
  }, [])
  {/* 컴포넌트 마운트 시 1회만 실행 , mount시 실행안됨, unmount시 실행됨*/}

  useEffect(() => {
    if(isNaN(search) == true) {
      alert('그러지마세요');  
    }
  }, [search])


  let {id} = useParams();
  let findItem = props.shoes.find((item) => {
    return item.id == id;
  })



  return (
    <>
    <div className="container">
      {
          box == true ? 
          <div className="alert alert-warning">
            2초 이내 구매 시 할인
          </div>
          : null
      }
      {/* <YellowBtn bg="blue" onClick={() => {setCount(count + 1)}}>버튼</YellowBtn> */}
      <div className="row">
        <div className="col-md-6">
          <img src={`https://codingapple1.github.io/shop/shoes` + (findItem.id + 1)+ `.jpg`}width="100%" />
      </div>
        <div className="col-md-6">
          <input onChange={(e) => {
            setSearch(e.target.value);
          }}></input>
          <h4 className="pt-5">{findItem.title}</h4>
          <p>{findItem.content}</p>
          <p>{findItem.price}</p>
          <button className="btn btn-danger">주문하기</button> 
        </div>
      </div>
    </div>
                          {/* 페이지가 렌더링 될때 제일 먼저 선택되어있음 */}
    <Nav variant="tabs"  defaultActiveKey="link0">
      <Nav.Item>
        <Nav.Link eventKey="link0" onClick={() => {setTab(0)}}>버튼0</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link1" onClick={() => {setTab(1)}}>버튼1</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link2" onClick={() => {setTab(2)}}>버튼2</Nav.Link>
      </Nav.Item>
    </Nav>
    
    <TabContent tab={tab}/>
    </>
  )
}

const TabContent = (props) => {
  
  return [<div>상품정보</div>, <div>디자인</div>, <div>후기</div>][props.tab]
}

export default Details