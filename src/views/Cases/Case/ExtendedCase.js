import React from "react";

export default ({onboard}) => {
  return (
    <>
      <div uk-grid="">
        <div className="uk-width-auto">
          <p>
            <b>Contact</b>
          </p>
          <p>{onboard.email}</p>
        </div>
        <div className="uk-width-auto">
          <p>
            <b>Contact at organization</b>
          </p>
          <p>{onboard.contact}</p>
        </div>
      </div>
      <hr />
      <table className="uk-table">
        <thead>
          <tr>
            <th>Document Name</th>
            <th>File Type</th>
            <th>Download</th>
            <th>Translation Upload</th>
            <th>Certificate Download</th>
          </tr>
        </thead>
        <tbody>
        {onboard.documents.map((document, p) => (
            <tr key={`${document.name} ${p} ${document.file_type}`}>
              <td>{document.name}</td>
              <td>{document.file_type}</td>
              <td>
                <a
                  href={document.file_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  C
                </a>
              </td>
              <td>
                <a
                  href={document.translated_document_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  C
                </a>
              </td>
              <td>
                <a
                  href={document.certificate_upload}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  C
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
      <p>
        <b>Notes</b>
      </p>
      {onboard.note}
    </>
  );
};
