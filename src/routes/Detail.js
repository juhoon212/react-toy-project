import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from 'styled-components'
import { Nav } from "react-bootstrap"
import '../App.css'
import {Context1} from '../App.js'

let YellowBtn = styled.button`
  background : ${props => props.bg};
  color : ${props => props.bg == 'blue' ? 'white' : 'black'}
  padding: 10px;
`

const Details = (props) => {
  {/* useEffect 안에는 어려운 연산 작업 why? html모두 렌더링 한다음 useEffect안에 있는 함수 실행, 서버에서 데이터 가져오는 작업, 타이머 장착*/}

  // 보관함 해체 함수
  let {item} = useContext(Context1);
  

  let [count, setCount] = useState(2);
  let [box, setBox] = useState(true);
  let [search, setSearch] = useState('');
  let [tab, setTab] = useState(0);
  let [detailFade, setDetailFade] = useState('');
  let [warnFade, setWarnFade] = useState('');

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setBox(false)
    }, 2000);
    let fadeIn = setTimeout(() => {
      setWarnFade('end');
    }, 100)
    {/* useEffect 실행 전 실행 */}
    setTimeout(() => {
      setWarnFade('endMotion');
    }, 1500)
    return () => {
      setWarnFade('')
      clearTimeout(timeOut, fadeIn);
    }
  }, [])



  useEffect(() => {
    setTimeout(() => {
      setCount(count - 1);
    }, 1000)
  }, [count])

  {/* 컴포넌트 마운트 시 1회만 실행 , mount시 실행안됨, unmount시 실행됨*/}

  useEffect(() => {
    if(isNaN(search) === true) {
      alert('그러지마세요');  
    }
  }, [search])

  useEffect(() => {
    
    let timeOut = setTimeout(() => {setDetailFade('end')}, 100)

    return (() => {
      setDetailFade('')
      clearTimeout(timeOut);
    })

  }, [])


  let {id} = useParams();
  let findItem = props.shoes.find((item) => {
    return item.id == id;
  })



  return (
    <>
    <div className={`container start ${detailFade}`}>
      {
          box === true ?
          <div className={`alert alert-warning start ${warnFade}`}>
            {`${count}초 이내 구매 시 할인`}
          </div>
          : null
      }
      {/* <YellowBtn bg="blue" onClick={() => {setCount(count + 1)}}>버튼</YellowBtn> */}
      <div className="row">
        <div className="col-md-6">
          <img src={`https://codingapple1.github.io/shop/shoes` + (findItem.id + 1)+ `.jpg`} width="100%" />
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

const TabContent = ({tab}) => {

  let [fade, setFade] = useState('');
  let {item} = useContext(Context1);

  

  useEffect(() => {
    let timeOut = setTimeout(() => {setFade('end')}, 100)
    return () => {
      setFade('');
      clearTimeout(timeOut);
    }
  }, [tab])
  return (
    
    <div className={'start ' + fade}>
      {[<div>{item[0]}</div>, <div>내용1</div>, <div>내용2</div>][tab]}
    </div>

  )
}

export default Details