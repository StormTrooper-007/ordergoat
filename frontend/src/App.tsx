import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Tables } from "./pages/Tables";
import { Register } from "./pages/Register";
import { fetchUser } from "./redux/actions/fetchUserAction";
import { fetchOrders } from "./redux/actions/fetchOrderAction";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "./redux/store";
import RequireAuth from "./pages/RequireAuth";
import { useSwitch } from "./hooks/useSwitch";
import { useOpenOrder } from "./hooks/useOpenOrder";
import { useQuantity } from "./hooks/useQuantity";
import { useTableNumber } from "./hooks/useTableNumber";
import { useOrder } from "./hooks/useOrder";
import { MyOrders } from "./pages/MyOrders";
import { Admin } from "./pages/Admin";
import { EditUser } from "./pages/EditUser";
import { Shadow } from "./components/Shadow";
import { Sidebar } from "./components/Sidebar";
import {RequireAdminAuth} from "./pages/RequireAdminAuth";

function App() {
  const off = useSwitch();
  const openOrder = useOpenOrder();
  const quantity = useQuantity();
  const tableNumber = useTableNumber();
  const [notes, setNotes] = useState<string>("");
  const orders = useOrder();

  const dispatch = useDispatch();
  const { user } = useSelector((state: rootState) => state.user);
  const { myorders } = useSelector((state: rootState) => state.myorders);

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar user={user} {...off} />}>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home
                  {...off}
                  {...openOrder}
                  {...quantity}
                  notes={notes}
                  setNotes={setNotes}
                  {...tableNumber}
                  {...orders}
                />
              </RequireAuth>
            }
          />
          <Route
            path="/tables"
            element={<Tables {...tableNumber} {...off} />}
          />
          <Route
            path="/myorders"
            element={<MyOrders myorders={myorders} {...off} />}
          />
          
          
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<RequireAdminAuth>
          <Admin {...off}/>
        </RequireAdminAuth>}/>
        <Route path="/edituser/:userId" element={<EditUser {...off} handleSwitch={off.handleSwitch}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
