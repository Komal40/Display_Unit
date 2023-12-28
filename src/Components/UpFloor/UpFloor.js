import React from 'react'
import { FaPlus } from "react-icons/fa6";
import AddLine from '../AddLine/AddLine';

export default function UpFloor() {
  return (
    <div>
      <div className="updates__cont">
<div className="update_linecontainer">
          <div className="update_dropdown">
            <select>
              <option>Line 1</option>
              <option>Line 2</option>
            </select>
          </div>
          <div className="update_add_btn">
            <FaPlus className="update_plus" />
            <span>
              <button>Add New Line</button>
            </span>
          </div>

          <div className="update_error">
            <h5>Error Message: </h5>
          </div>

      </div>

      <div className="updateparts__btn">            
            <span>
              <button >Update Parts</button>
            </span>
        </div>
</div>
    </div>
  )
}
