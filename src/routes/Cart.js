import {Table} from 'react-bootstrap'
import {useDispatch, useSelector} from "react-redux";
import {changeName} from "../store";

function Cart() {

  const store = useSelector((state) => {
    return state;
  });
  let dispatch = useDispatch();

  return (
    <div>

      {store.user}의 장바구니

      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
        {
          store.items.map((item, index) => {
            return (
                <tr>
                  <td>{store.items[index].id}</td>
                  <td>{store.items[index].name}</td>
                  <td>{store.items[index].count}</td>
                  <td>
                    <button onClick={() => {
                      dispatch(changeName())
                    }
                    }>+</button>
                  </td>
                </tr>
            )
          })
        }
        </tbody>
      </Table> 
    </div>
  )
}

export default Cart