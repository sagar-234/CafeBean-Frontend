import React, { useState } from 'react';
import BookingContext from './BookingContext';

const BookingProvider = ({ children }) => {
  const [value, setValue] = useState({
    "table_id":0,
    "custid":Number(JSON.parse(sessionStorage.getItem('log')).cust_id),
    "amount":0,
    "bookingdate":"",
    "startTimeField":"",
      "endTimeField":""
  });

  

  return (
    <BookingContext.Provider value={{ value, setValue }}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingProvider;
