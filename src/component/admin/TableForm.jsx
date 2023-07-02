import React, { useEffect, useState } from 'react';
import CafeTableService from '../../service/CafeTableService';

const TableForm = () => {

  useEffect(()=>{
    getAllTables()
  },[])
  const [formData, setFormData] = useState({
    tableId: '',
    seatingCapacity: ''
  });

  const [tables,setTables]=useState([])

  const getAllTables=()=>{
    CafeTableService.getAllCafeTable().then(
      res=>{
        setTables(res.data)
      }
    )
  }

  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      // Update existing table
      // Use editIndex to identify the table to update
      CafeTableService.updateCafeTable(formData).then(
        res=>{
          getAllTables()
        }
      )
      console.log('Updating table at index', editIndex);
      
    } else {
      // Add new table
      // Use formData to access the entered values

      CafeTableService.addCafeTable(formData).then(
       res=>{getAllTables()}
      )
      console.log('Adding new table:', formData);
    }

    // Reset form
    setFormData({
      tableId: '',
      seatingCapacity: ''
    });
    setEditMode(false);
    setEditIndex(null);
  };

  const handleEdit = (table) => {
    // Populate the form fields with existing table data
    const editedTable = {
      tableId: table.tableId, // Replace with your data structure
      seatingCapacity: table.seatingCapacity // Replace with your data structure
    };
    setFormData(editedTable);
    setEditMode(true);
    setEditIndex(table);
  };

  const handleDelete=(table)=>{
     CafeTableService.deleteCafeTable(table.tableId).then(
      res=>{
        getAllTables()
      }
     )
  }

  return (
    <div className='container'>
      <h2>{editMode ? 'Update Table' : 'Add Table'}</h2>
      <form onSubmit={handleSubmit} style={{marginTop:'0px',marginBottom:'0px',height:'150px'}}>
        {editMode ? (
          <label>
            Table ID:
            <input
              type="text"
              name="tableId"
              value={formData.tableId}
              onChange={handleChange}
              readOnly
            />
          </label>
        ) : null}
        <label>
          Seating Capacity:
          <input
            type="number"
            name="seatingCapacity"
            value={formData.seatingCapacity}
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
           tables.map((t)=>(
            <div key={t.tableId} className="col-lg-3 col-md-4 mb-4" >
                <div className="card h-100" >
                  <div className="card-body " >
                    <h6 className="card-title">Table No:{t.tableId}</h6>
                    <p className="text-muted">Seating Capacity :{t.seatingCapacity}</p>
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



export default TableForm;
