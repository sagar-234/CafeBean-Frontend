import React, { useEffect, useState } from 'react';
import CafeTableService from '../../service/CafeTableService';
import {CiEdit} from 'react-icons/ci';
import {RiDeleteBin6Line} from 'react-icons/ri';
import { Form } from 'react-bootstrap';


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
      <Form onSubmit={handleSubmit} style={{marginTop:'0px',marginBottom:'0px',height:'150px'}}>
        {editMode ? (
          <Form.Label className='form-control'>
            Table ID:
            <input
              type="text"
              name="tableId"
              value={ formData.tableId}
              onChange={handleChange}
              readOnly
            />
          </Form.Label>
        ) : null}
        <Form.Label>
          Seating Capacity:
          <input
            type="number"
            name="seatingCapacity"
            value={formData.seatingCapacity}
            onChange={handleChange}
          />
        </Form.Label>
        <button className='btn btn-warning' type="submit">{editMode ? 'Update' : 'Add'}</button>
      </Form>
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
                    <button className='btn btn-info mx-2' onClick={() => handleEdit(t)}>Edit <CiEdit/></button>
                    <button className='btn btn-danger' onClick={() => handleDelete(t)}>Delete <RiDeleteBin6Line /></button>


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
