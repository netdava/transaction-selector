import React, { useCallback } from "react";

import { useDropzone } from "react-dropzone";

import styled from "styled-components";
import Papa from "papaparse";

import { processCsv } from "../ing-parser";

const DropZone = styled.div`
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: #eeeeee;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

function TransactionFileImport(props) {
  const { setTransactions } = props;

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        Papa.parse(file, {
          complete: (results, file) => {
            console.log(`Processed CSV file ${file.name}`);
            const { data } = results;
            const txns = processCsv(data);
            setTransactions(txns);
          },
          error: (error, file) => {
            console.log(`Error processing ${file.name} - ${error}`);
            alert(`Error processing ${file.name} - ${error}`);
          },
        });
      });
    },
    [setTransactions]
  );

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <DropZone {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop CSV files here, or click to select files</p>
      </DropZone>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}


export default TransactionFileImport;