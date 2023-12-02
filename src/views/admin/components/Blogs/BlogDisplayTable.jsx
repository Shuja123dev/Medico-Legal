import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const BlogDisplayTable = ({ labels, pageCasesToDisplay, path }) => {

    const navigate = useNavigate()

    return (
        <>
            {pageCasesToDisplay?.length !== 0 ? (
                <table className="user_cases_display_table">
                    <thead>
                        <tr className="user_cases_display_table__head">
                            {labels?.map((label, index) => (
                                <th className="user_cases_display_table__label" key={index}>
                                    {label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {pageCasesToDisplay.map((caseItem, index) => (
                            <tr key={index} className="user_cases_display_table__row" style={{ height: "6rem", cursor: "pointer" }} onClick={() => navigate(path + caseItem.id)}>
                                {/* <Link className="w-100 d-block user_cases_display_table__cell_link" to={path + caseItem.id}> */}
                                {Object.keys(caseItem).map((data, dataIndex) =>
                                    dataIndex === 1 ? (
                                        <td key={dataIndex}>
                                            <img src={caseItem[data]} alt="" />
                                        </td>
                                    ) : (
                                        <td
                                            key={dataIndex}
                                            className="user_cases_display_table__cell">
                                            {caseItem[data]}
                                        </td>
                                    )
                                )}
                                <td className="user_cases_display_table__cell memberActions">
                                    <button style={{ color: "rgb(53, 115, 201)" }}>Edit</button> /
                                    <button style={{ color: "rgb(238, 51, 51)" }}>Delete</button>
                                </td>
                                {/* </Link> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="text-center">{t("UserPanel.Cases.NoCasesFound")}</div>
            )}
        </>
    )
}

export default BlogDisplayTable
