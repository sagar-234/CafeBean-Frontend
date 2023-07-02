import React, { useEffect, useState } from 'react';
import CoffeeService from '../../service/CoffeeService';

const CoffeeForm = () => {
  const [formData, setFormData] = useState({
    coffee_id: '',
    coffee_type: '',
    price: ''
  });

  const [coffees,setCoffees]=useState([])

  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);


  useEffect(()=>{
    getAllCoffee()
  },[])
  const getAllCoffee=()=>{
    CoffeeService.getAllCoffee().then(
        res=>{
            setCoffees(res.data)
        }
    )
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDelete=(coffee)=>{
    CoffeeService.deleteCoffee(coffee.coffee_id).then(
      res=>{
        getAllCoffee()
      }
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      // Update existing coffee
      // Use editIndex to identify the coffee to update
      CoffeeService.updateCoffee(formData).then(
        res=>{
          getAllCoffee();
        }
      )
      console.log('Updating coffee at index', editIndex);
    } else {
      // Add new coffee
      // Use formData to access the entered values
      CoffeeService.addCoffee(formData).then(
        res=>{
          getAllCoffee();
        }
      )
      console.log('Adding new coffee:', formData);
    }

    // Reset form
    setFormData({
      coffee_id: '',
      coffee_type: '',
      price: ''
    });
    setEditMode(false);
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    // Populate the form fields with existing coffee data
    const editedCoffee = {
      coffee_id: index.coffee_id, // Replace with your data structure
      coffee_type: index.coffee_type, // Replace with your data structure
      price: index.price // Replace with your data structure
    };
    setFormData(editedCoffee);
    setEditMode(true);
    setEditIndex(index);
  };

  return (
    <div>
      <h2>{editMode ? 'Update Coffee' : 'Add Coffee'}</h2>
      <form onSubmit={handleSubmit} style={{marginTop:'0px',marginBottom:'0px',height:'150px'}}>
        {editMode ? (
          <label>
            Coffee ID:
            <input
              type="text"
              name="coffee_id"
              value={formData.coffee_id}
              onChange={handleChange}
              readOnly
            />
          </label>
        ) : null}
        <label>
          Coffee Type:
          <input
            type="text"
            name="coffee_type"
            value={formData.coffee_type}
            onChange={handleChange}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </label>
        <button type="submit">{editMode ? 'Update' : 'Add'}</button>
      </form>
      {editMode && (
        <button onClick={() => setEditMode(false)}>Cancel</button>
      )}
      <hr />
      <div className='row'>
      {
           coffees.map((t)=>(
            <div key={t.tableId} className="col-lg-3 col-md-4 mb-4" >
                <div className="card h-100" >
                  <div className="card-body " >
                    <h6 className="card-title">Coffee ID:{t.coffee_id}</h6>
                    <p className="text-muted">Name :{t.coffee_type}</p>
                    <p className="text-muted">Name :{t.price}</p>

                    <button onClick={() => handleEdit(t)}>Edit</button>
                    <button onClick={() => handleDelete(t)}>Delete</button>


                  </div>
                  
                </div>
              </div>
    
                    ))
      }
      </div>
    </div>
  );
};

export default CoffeeForm;
