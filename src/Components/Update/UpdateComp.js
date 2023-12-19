import React from "react";
import { TbReload } from "react-icons/tb";
import { FiTrash } from "react-icons/fi";


export default function UpdateComp() {
  return (
    <div>
      <div className="update__components">
        <div>
          <p className="operator_content">
            Operator&nbsp;&nbsp; <h4>Aman Verma</h4>
          </p>
          <p className="operator_content">
            Station&nbsp;&nbsp; <h4>145A</h4>
          </p>
          <p className="operator_content">
            Process &nbsp;&nbsp;<h4>Coating</h4>
          </p>
        </div>
        <div className="update_below1_content">
          <div className="update_below_content">
            <div className="update_remove_btn1">
              <TbReload className="update_regsave" />
              <span>
                <button>Change</button>
              </span>
            </div>
            <div className="update_remove_btn2">
              <FiTrash className="update_regsave" />
              <span>
                <button>Remove</button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
