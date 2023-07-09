import { useContext, useEffect, useState } from "react";
import CoffeeService from "../../service/CoffeeService";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import CoffeeItemService from "../../service/CoffeeItemService";
import { BsFillTrashFill, BsCurrencyRupee } from "react-icons/bs";
import { FaMugHot } from "react-icons/fa";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import BookingContext from "../../context/BookingContext";
import BookingService from "../../service/BookingService";
import bookNow from "../../assets/img/book-now.png";


const CoffeeList = () => {
  const [coffee, setCoffee] = useState([]);
  const [show, setShow] = useState(false);
  const modalClose = () => setShow(false);
  const modalShow = () => {
    setShow(true);
    getCoffeeItem(JSON.parse(sessionStorage.getItem("log")).cust_id);
  };
  const [coffeeitem, setCoffeeItem] = useState([]);

  const { value, setValue } = useContext(BookingContext);
  const changeQty = (item, qty) => {
    const updatedCoffeeitem = [...coffeeitem];
    let i = updatedCoffeeitem.indexOf(item);
    updatedCoffeeitem[i].quantity = updatedCoffeeitem[i].quantity + qty;

    CoffeeItemService.updateCoffeeItem(updatedCoffeeitem[i]);

    setCoffeeItem(updatedCoffeeitem);
  };

  const deleteCoffeeItem = (item) => {
    if (
      window.confirm(
        "Are you sure to delete the product " + item.coffee.coffee_type
      )
    ) {
      const updatedCoffeeitem = [...coffeeitem];

      try {
        CoffeeItemService.deleteCoffeeItemById(item.coffeeItemId);

        let i = updatedCoffeeitem.indexOf(item);
        updatedCoffeeitem.splice(i, 1);

        setCoffeeItem(updatedCoffeeitem);
      } catch (error) {
        window.alert("error");
      }
    }
  };

  const confirmOrder = () => {
    BookingService.addBooking(value)
      .then((res) => {
        window.alert("Booking Confirmed");
        setCoffeeItem([]);
      })
      .catch((error) => {
        window.alert("error");
      });
  };

  const AddCoffee = (userid, coffee) => {
    CoffeeItemService.addCoffee(userid, coffee);
  };

  const getCoffeeItem = (userid) => {
    CoffeeItemService.getCoffeeItemById(userid).then((res) => {
      setCoffeeItem(res.data);
    });
  };

  const fetchCoffee = () => {
    CoffeeService.getAllCoffee().then((res) => {
      setCoffee(res.data);
    });
  };
  useEffect(() => {
    //console.log(currentDate)
    fetchCoffee();
  }, []);

  return (
    <div className="container p-2">
      <div className="row">
        <div className="col" style={{
              display: "inline-flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignContent: "flex-end",
              justifyContent: "space-evenly",
              gap: "1px",
        }}>
          {coffee.map((t) => (
            <div key={t.tableId} className="col-lg-3 col-md-4 mb-4">
              <div className="card h-100" style={{
                boxShadow: "3px 5px 12px 2px",
                borderWidth: "2px",
                border: "3px solid lavender"
              }}>
                <div className="card-body ">
                  <h5 className="card-title"><FaMugHot /> {t.coffee_type}</h5>
                  <p className="text-muted"><BsCurrencyRupee /> {t.price}</p>
                </div>
                <div className="card-footer">
                  <button
                    className="btn btn-lg btn-block"
                    onClick={() =>
                      AddCoffee(
                        JSON.parse(sessionStorage.getItem("log")).cust_id,
                        t
                      )
                    }
                  >
                    Add Coffee
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col col-md-4 col-lg-4">
          <img src={bookNow} style={{
                width: "-webkit-fill-available"
          }}></img>
        </div>

        <div style={{ marginLeft: "auto", marginRight: "auto" }}>
          <button className="btn btn-primary btn-lg" onClick={modalShow}>
            Next
          </button>
        </div>
        <Modal centered show={show} onHide={modalClose}>
          <Modal.Header>
            <Modal.Title>Coffee Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              <ul
                className="list-group"
                style={{
                  paddingTop: "20px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  overflowY: "scroll",
                }}
              >
                {coffeeitem.map((item) => (
                  <li
                    key={item.coffeeItemId}
                    className="list-group-item cart-item"
                  >
                    <div className="row align-items-center">
                      <div className="col-md-9">
                        <h3 className="cart-item-name">
                          {item.coffee.coffee_type}
                        </h3>
                        <p className="cart-item-price">
                          Price: {item.coffee.price}
                        </p>
                        <button
                          className="btn btn-light"
                          onClick={() => {
                            changeQty(item, -1);
                          }}
                          disabled={item.quantity <= 1}
                        >
                          <AiFillMinusCircle />
                        </button>
                        <input
                          className="cart-item-quantity"
                          value={item.quantity}
                          style={{ width: "20px" }}
                          disabled={true}
                        />
                        <button
                          className="btn btn-light"
                          onClick={() => {
                            changeQty(item, 1);
                          }}
                          disabled={item.quantity > 4}
                        >
                          <AiFillPlusCircle />
                        </button>

                        <button
                          className="btn add btn-sm"
                          onClick={() => {
                            deleteCoffeeItem(item);
                          }}
                        >
                          <BsFillTrashFill />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            }
          </Modal.Body>

          <Modal.Footer>
            <button
              className="btn"
              style={{ backgroundColor: "#fc8019" }}
              disabled={coffeeitem.length === 0}
              onClick={confirmOrder}
            >
              Confirm
            </button>
            <Button variant="secondary" onClick={modalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
export default CoffeeList;
