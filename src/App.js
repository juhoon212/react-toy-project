import {Button, Navbar, Container, Nav} from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import data from './data.js';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import Details from './routes/Detail.js';
import Card from './components/Card.js';
import axios from 'axios';

function App() {

  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  let [count, setCount] = useState(0);
  let [visible, setVisible] = useState(false);



  return (
    <div className="App">

      

      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/">Juhoon</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => {
              navigate('/')
            }}>HOME</Nav.Link>
            <Nav.Link onClick={() => {
              navigate('/detail');
            }}>Details</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path='/detail/:id' element={<Details shoes={shoes}></Details>}></Route>
        <Route path='/about' element={<About></About>}>
          {/* nested routes */}
          <Route path='member' element={<div>멤버임</div>}></Route>
          <Route path='location' element={<About></About>}></Route>
        </Route>
        <Route path='/event' element={<Event></Event>}>
          <Route path='one' element={<EventOne></EventOne>}></Route>
          <Route path='two' element={<EventTwo></EventTwo>}></Route>
        </Route>
        <Route path='*' element={<div>ErrorPage</div>}></Route>
        <Route path='/' element={
          <>
          <div className='main-bg'></div>
          <div className="container">
            <div className="row">
              {
                shoes.map((a,i) => {
                  return (
                    <Card shoes={shoes[i]} i={i} key={i}></Card>  
                  )            
                })
              }
            </div>
          </div>
                {!visible ? <button onClick={() => {
            count += 1
            setCount(count);
            if(count == 1) {
              alert('로딩중입니다');
              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((result) => {
                let copy = [...shoes, ...result.data];
                setShoes(copy);
              
              })
              .catch(() => {
                alert('더보기 실패');
              })
            } else if(count == 2) {
              alert('로딩중입니다');
              axios.get('https://codingapple1.github.io/shop/data3.json')
              .then((result) => {
                let copy = [...shoes, ...result.data];
                setShoes(copy);
              })
              .catch(() => {
                alert('더보기 실패');
              })
            } else {
              setVisible(true);
              alert('마지막 상품입니다.');
              return;
            }
          }}>더보기</button> : null}
          </>
        }></Route>
      </Routes>
    
      

    </div>
  );
}

const About = () => {
  return (
    <>
      <div>회사정보임</div>
      {/*nested routes 어디에 쓰여질지*/}
      <Outlet></Outlet>
    </>
  )
}

const Event = () => {
  return (
    <>
      <h1>오늘의 이벤트</h1>
      <Outlet></Outlet>
    </>
  )
}

const EventOne = () => {
  return (
    <>
      <h4>첫 주문시 양배추즙 서비스</h4>
    </>
  )
}

const EventTwo = () => {
  return (
    <>
      <h4>생일기념 쿠폰받기</h4>
    </>
  )
}







export default App;
