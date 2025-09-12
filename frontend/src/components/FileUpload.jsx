import { useState } from "react";
import * as XLSX from "xlsx";

const FileUpload = ({ onUpload }) => {
  const [fileName, setFileName] = useState("");

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = evt.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet);
      onUpload(rows); // send parsed data to parent
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="p-4 border rounded-md bg-gray-50">
      <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFile} />
      {fileName && <p className="text-sm mt-2">Uploaded: {fileName}</p>}
    </div>
  );
};

export default FileUpload;
