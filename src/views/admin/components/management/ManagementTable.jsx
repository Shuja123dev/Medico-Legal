import React, { useEffect, useState } from 'react'
import { CardLayout } from '../../../user/containers';
import { H3, InputBox, Modal, Pagination } from '../../../user/components';
import ConfitmationModal from '../membership/ConfitmationModal';

const ManagementTable = ({ tableData }) => {

  const [casesToDisplay, setCasesToDisplay] = useState(tableData);
  const [status, setStatus] = useState("All");
  const [pageCasesToDisplay, setPageCasesToDisplay] = useState(tableData);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal1, setShowModal1] = useState(false)
  const [showModal2, setShowModal2] = useState(false)


  useEffect(() => {
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;

    setPageCasesToDisplay(casesToDisplay.slice(startIndex, endIndex));
  }, [casesToDisplay, currentPage, recordsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [recordsPerPage]);

  const toggleModal1 = () => {
    setShowModal1(!showModal1);
  }
  const toggleModal2 = () => {
    setShowModal2(!showModal2);
  }


  return (
    <>

      <CardLayout className='mt-2'>
        <div className="user_cases_table_outer">
          {
            (pageCasesToDisplay?.length !== 0) ? (<table className="user_cases_display_table">
              <thead>
                <tr className="user_cases_display_table__head">
                  <th className="user_cases_display_table__label" >ID</th>
                  <th className="user_cases_display_table__label" >NAME</th>
                  <th className="user_cases_display_table__label" >DESCRIPTION</th>
                  <th className="user_cases_display_table__label" >YEAR</th>
                  <th className="user_cases_display_table__label" >AMOUNT</th>
                  <th className="user_cases_display_table__label" >DISCOUNT</th>
                  <th className="user_cases_display_table__label" >STATUS</th>
                  <th className="user_cases_display_table__label" >ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {
                  pageCasesToDisplay.map((record, index) => {
                    return (
                      <tr key={index} className="user_cases_display_table__row">
                        <td key={index} className="user_cases_display_table__cell">{record.id}</td>
                        <td key={index} className="user_cases_display_table__cell">{record.name}</td>
                        <td key={index} className="user_cases_display_table__cell">{record.description}</td>
                        <td key={index} className="user_cases_display_table__cell">{record.year}</td>
                        <td key={index} className="user_cases_display_table__cell">{record.amount}</td>
                        <td key={index} className="user_cases_display_table__cell">{record.discount}</td>
                        <td key={index} className="user_cases_display_table__cell">
                          <select>
                            <option value="active">Active</option>
                            <option value="deactive">Deactive</option>
                          </select>
                        </td>
                        <td key={index} className="user_cases_display_table__cell memberActions">
                          <button style={{ color: "#3573C9" }} onClick={toggleModal1}>Edit</button> /
                          <button style={{ color: "#EE3333" }} onClick={toggleModal2}>Delete</button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>) : (
              <div className="text-center">{"No Record Found"}</div>
            )
          }
        </div>
        <div className="cases_display_footer">
          <div className="d-flex gap-4 align-items-center justify-content-center justify-content-md-start">
            <span>{"Records / Page"}</span>
            <select
              value={recordsPerPage}
              onChange={(e) => setRecordsPerPage(Number(e.target.value))}>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
              <option value={50}>50</option>
            </select>
          </div>
          <Pagination
            recordsToDisplay={casesToDisplay}
            recordsPerPage={recordsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />

        </div>
      </CardLayout>

      {
        showModal1 && <>
          <Modal toggleModal={toggleModal1} modalHead={"Approval Confirmation"}>
            <div className="user_createTicketForm">
              <H3 text={"UPDATE MEMBERSHIP"} />
              <InputBox type={"text"} placeholder={"Name"} />
              <InputBox type={"textarea"} placeholder={"Description"} />
              <InputBox type={"date"} placeholder={"Year"} />
              <div className="row">
                <div className="col-sm-6" style={{ paddingLeft: "0" }}>
                  <InputBox type={"text"} placeholder={"Amount"} />
                </div>
                <div className="col-sm-6" style={{ paddingRight: "0" }}>
                  <InputBox type={"text"} placeholder={"Discount (%)"} />
                </div>
              </div>
              <InputBox type={"select"} placeholder={"Discount (%)"} options={["Type"]} />
              <div className="user_input_box">
                <div className="flex_box" style={{ justifyContent: "flex-start" }}>
                  <input type="radio" id='promo' />
                  <h5 className='mx-2'>Promo</h5>
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-end ">
              <button className="mx-3 user_button1 user_button1--gray " onClick={toggleModal1}>
                <span>Cancel</span>
              </button>
              <button className=" user_button1" onClick={toggleModal1}>
                <span>Update</span>
              </button>
            </div>

          </Modal>
        </>

      }

      {
        showModal2 && <>
          <ConfitmationModal toggleModal={toggleModal2} modalHead={"Approval Confirmation"}>
            <div className='flex_box my-3'>
              <p>Are you sure you want to Delete this Membership?</p>
            </div>
            <div className="d-flex align-items-center justify-content-end ">
              <button className="mx-3 user_button1 user_button1--gray " onClick={toggleModal2}>
                <span>Cancel</span>
              </button>
              <button className=" user_button1" onClick={toggleModal2}>
                <span>Delete</span>
              </button>
            </div>
          </ConfitmationModal>
        </>
      }


    </>
  )
}

export default ManagementTable
