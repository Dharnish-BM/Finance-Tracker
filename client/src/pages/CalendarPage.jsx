import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Utility function to calculate remaining days
const daysRemaining = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);
  return Math.ceil((due - today) / (1000 * 60 * 60 * 24));
};

// Utility function for recurring payments
const getNextDueDate = (dueDate, recurring) => {
  const date = new Date(dueDate);
  switch (recurring) {
    case "daily":
      date.setDate(date.getDate() + 1);
      break;
    case "weekly":
      date.setDate(date.getDate() + 7);
      break;
    case "monthly":
      date.setMonth(date.getMonth() + 1);
      break;
    case "yearly":
      date.setFullYear(date.getFullYear() + 1);
      break;
    default:
      break;
  }
  return date.toISOString().split("T")[0];
};

function CalendarPage() {
  const [payments, setPayments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editPayment, setEditPayment] = useState(null);
  const [form, setForm] = useState({ name: "", amount: "", dueDate: "", recurring: "none", paid: false });

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("payments")) || [];
    setPayments(saved);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("payments", JSON.stringify(payments));
  }, [payments]);

  // Handle form changes
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Add or Edit payment
  const handleSubmit = () => {
    if (!form.name || !form.amount || !form.dueDate) return;

    if (editPayment) {
      setPayments(payments.map((p) => (p.id === editPayment.id ? { ...form, id: editPayment.id } : p)));
      setEditPayment(null);
    } else {
      setPayments([...payments, { ...form, id: crypto.randomUUID() }]);
    }

    setForm({ name: "", amount: "", dueDate: "", recurring: "none", paid: false });
    setModalOpen(false);
  };

  // Delete payment
  const handleDelete = (id) => setPayments(payments.filter((p) => p.id !== id));

  // Edit payment
  const handleEdit = (payment) => {
    setEditPayment(payment);
    setForm(payment);
    setModalOpen(true);
  };

  // Progress Tracker
  const today = new Date();
  const totalThisMonth = payments.filter((p) => new Date(p.dueDate).getMonth() === today.getMonth());
  const completed = totalThisMonth.filter((p) => p.paid).length;
  const progress = totalThisMonth.length ? (completed / totalThisMonth.length) * 100 : 0;

  // Sort payments by upcoming due date
  const sortedPayments = payments.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 px-6 bg-gradient-to-br from-[#e0c3fc] to-[#8ec5fc] flex gap-6 pb-6"
    >
      {/* Calendar Section */}
      <div className="w-[70%] bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
        <iframe
          src="https://calendar.google.com/calendar/embed?height=700&wkst=1&ctz=Asia%2FKolkata&showPrint=0&showTitle=0"
          style={{ border: "1px solid #777" }}
          className="w-full h-[calc(100vh-8rem)] rounded-2xl"
          frameBorder="0"
          scrolling="no"
          title="Google Calendar"
        ></iframe>
      </div>

      {/* Sidebar Cards */}
      <div className="w-[25%] flex flex-col gap-6">
        {/* Big Scrollable Payment Card */}
        <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 flex flex-col">
          <h2 className="font-bold text-lg mb-4 flex justify-between items-center">
            Scheduled Payments
            <button
              onClick={() => setModalOpen(true)}
              className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600"
            >
              + Add
            </button>
          </h2>

          {sortedPayments.length === 0 && <p className="text-gray-400 mt-4">No payments scheduled</p>}

          <ul className="flex flex-col gap-3 overflow-y-auto max-h-[calc(100vh-12rem)] pr-2">
            {sortedPayments.map((payment) => (
              <li
                key={payment.id}
                className={`flex justify-between items-center p-3 rounded-lg shadow transition-colors ${
                  daysRemaining(payment.dueDate) < 3
                    ? "bg-red-100"
                    : daysRemaining(payment.dueDate) < 7
                    ? "bg-yellow-100"
                    : "bg-green-100"
                }`}
              >
                <div className="flex flex-col">
                  <p className="font-semibold">{payment.name}</p>
                  <p className="text-sm text-gray-600">
                    ₹{payment.amount} - Due in {daysRemaining(payment.dueDate)} days
                  </p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(payment)} className="text-blue-500 hover:underline">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(payment.id)} className="text-red-500 hover:underline">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Small Progress Card */}
        <div className="h-32 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 flex flex-col justify-center">
          <h2 className="font-bold text-lg mb-2">This Month Progress</h2>
          <p className="text-sm mb-2">{completed}/{totalThisMonth.length} payments completed</p>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-80 flex flex-col gap-4 animate-fade-in">
            <h3 className="font-bold text-lg">{editPayment ? "Edit Payment" : "Add Payment"}</h3>
            <input
              type="text"
              name="name"
              placeholder="Bill Name"
              value={form.name}
              onChange={handleChange}
              className="border px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={form.amount}
              onChange={handleChange}
              className="border px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              className="border px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <select
              name="recurring"
              value={form.recurring}
              onChange={handleChange}
              className="border px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="none">None</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>

            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => {
                  setModalOpen(false);
                  setEditPayment(null);
                }}
                className="px-4 py-2 rounded-lg border hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default CalendarPage;
