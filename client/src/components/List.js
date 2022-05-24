import React from "react";

const List = (props) => {
  const memberList = props.list ? props.list : [];

  const renderedList = memberList.map((member) => {
    return (
      <tr key={member.ssn}>
        <td>{member.firstName}</td>
        <td>{member.lastName}</td>
        <td>{member.address}</td>
        <td>{member.ssn}</td>
      </tr>
    );
  });

  return (
    <div className="list-container">
      <table>
        <tbody>
          <tr key="header">
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>SSN</th>
          </tr>
          {renderedList}
        </tbody>
      </table>
    </div>
  );
};

export default List;
