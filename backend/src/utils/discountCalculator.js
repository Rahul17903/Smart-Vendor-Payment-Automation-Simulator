// Simple discount calculation rule
export const calculateDiscount = (amount, dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);

  const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

  if (diffDays <= 15 && amount < 100000) {
    return "2% discount if paid early";
  }

  return null;
};
