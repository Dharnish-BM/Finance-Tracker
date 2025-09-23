import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/CalendarCustom.css"; // <-- we'll create this

// Utility function to calculate remaining days
const daysRemaining = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);
  const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
  return diff < 0 ? 0 : diff;
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
  const [form, setForm] = useState({
    name: "",
    amount: "",
    dueDate: "",
    recurring: "none",
    paid: false,
  });
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("payments")) || [];
    setPayments(saved);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("payments", JSON.stringify(payments));
  }, [payments]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.name || !form.amount || !form.dueDate) return;

    if (editPayment) {
      setPayments(
        payments.map((p) =>
          p.id === editPayment.id ? { ...form, id: editPayment.id } : p
        )
      );
      setEditPayment(null);
    } else {
      setPayments([...payments, { ...form, id: crypto.randomUUID() }]);
    }

    setForm({
      name: "",
      amount: "",
      dueDate: "",
      recurring: "none",
      paid: false,
    });
    setModalOpen(false);
  };

  const handleDelete = (id) =>
    setPayments(payments.filter((p) => p.id !== id));
  const handleEdit = (payment) => {
    setEditPayment(payment);
    setForm(payment);
    setModalOpen(true);
  };

  const markAsPaid = (payment) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === payment.id ? { ...p, paid: true } : p))
    );

    if (payment.recurring !== "none") {
      const nextDate = getNextDueDate(payment.dueDate, payment.recurring);
      setPayments((prev) => [
        ...prev,
        {
          ...payment,
          id: crypto.randomUUID(),
          dueDate: nextDate,
          paid: false,
        },
      ]);
    }
  };

  // Progress Tracker
  const today = new Date();
  const totalThisMonth = payments.filter(
    (p) => new Date(p.dueDate).getMonth() === today.getMonth()
  );
  const completed = totalThisMonth.filter((p) => p.paid).length;
  const progress = totalThisMonth.length
    ? (completed / totalThisMonth.length) * 100
    : 0;

  // Sort payments
  const sortedPayments = [...payments].sort(
    (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 px-6 bg-gradient-to-br from-[#e0c3fc] to-[#8ec5fc] flex gap-6 pb-6"
    >
      {/* Calendar Section */}
      <div className="w-[70%] h-[calc(100vh-6rem)] bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 flex flex-col">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          className="flex-1 w-full"
          tileContent={({ date }) => {
            const paymentForDay = payments.filter(
              (p) =>
                new Date(p.dueDate).toDateString() === date.toDateString()
            );

            if (!paymentForDay.length) return null;

            return (
              <ul className="mt-1 flex flex-col gap-[2px]">
                {paymentForDay.map((p) => {
                  const remaining = daysRemaining(p.dueDate);
                  let color =
                    remaining < 3
                      ? "bg-red-400"
                      : remaining < 7
                      ? "bg-yellow-400"
                      : "bg-green-400";
                  return (
                    <li
                      key={p.id}
                      className={`${color} text-white text-[10px] px-1 rounded`}
                    >
                      {p.name}
                    </li>
                  );
                })}
              </ul>
            );
          }}
          onClickDay={(date) => {
            setForm({ ...form, dueDate: date.toISOString().split("T")[0] });
            setModalOpen(true);
          }}
        />
      </div>

      {/* Sidebar Cards */}
      <div className="w-[25%] flex flex-col gap-6 h-[calc(100vh-6rem)]">
        {/* Scheduled Payments Card */}
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

          {sortedPayments.length === 0 && (
            <p className="text-gray-400 mt-4">No payments scheduled</p>
          )}

          <ul className="flex flex-col gap-3 overflow-y-auto max-h-[calc(100vh-14rem)] pr-2">
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
                    ₹{payment.amount} - Due in {daysRemaining(payment.dueDate)}{" "}
                    days
                  </p>
                  <p className="text-xs text-gray-500">
                    {payment.paid ? "Paid" : "Pending"}
                  </p>
                </div>
                <div className="flex gap-2">
                  {!payment.paid && (
                    <button
                      onClick={() => markAsPaid(payment)}
                      className="text-green-500 hover:underline"
                    >
                      Mark Paid
                    </button>
                  )}
                  <button
                    onClick={() => handleEdit(payment)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(payment.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Progress Card */}
        <div className="h-32 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 flex flex-col justify-center">
          <h2 className="font-bold text-lg mb-2">This Month Progress</h2>
          <p className="text-sm mb-2">
            {completed}/{totalThisMonth.length} payments completed
          </p>
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
            <h3 className="font-bold text-lg">
              {editPayment ? "Edit Payment" : "Add Payment"}
            </h3>
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
