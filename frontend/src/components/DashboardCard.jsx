const DashboardCard = ({ title, value, color }) => {
  return (
    <div className={`p-6 rounded-lg shadow-md text-white ${color}`}>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
};

export default DashboardCard;
