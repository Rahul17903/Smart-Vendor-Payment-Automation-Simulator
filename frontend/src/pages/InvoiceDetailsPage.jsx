import { useParams } from "react-router-dom";

const InvoiceDetailsPage = () => {
  const { id } = useParams();

  // For now, just a placeholder (you can fetch invoice by ID later)
  return (
    <>
      <div className="p-8">
        <h1 className="text-xl font-bold">Invoice Details</h1>
        <p className="mt-4">Invoice ID: {id}</p>
        <p className="text-gray-600">Coming soon: detailed invoice view</p>
      </div>
    </>
  );
};

export default InvoiceDetailsPage;
