// ounje-food-budget-app.tsx (Refactored with Supabase)

import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { User } from "@supabase/supabase-js";
import { DollarSign, Plus } from "lucide-react";

type BudgetItem = {
  id: number;
  user_id: string;
  name: string;
  budgeted: number;
  spent: number;
  category: string;
  month: number;
  created_at: string;
};

const OunjeApp = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    budget: "",
    category: "grains",
  });
  const [currentView, setCurrentView] = useState("dashboard");
  const [currentMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data?.session?.user || null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchBudgetItems = async () => {
      const { data, error } = await supabase
        .from("budget_items")
        .select("*")
        .eq("user_id", user.id);
      if (data) setBudgetItems(data);
      if (error) console.error("Fetch error:", error);
    };

    const fetchProfile = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("is_premium")
        .eq("id", user.id)
        .single();
      if (data) setIsPremium(data.is_premium);
    };

    fetchBudgetItems();
    fetchProfile();
  }, [user]);

  const handleAuth = async (
    email: string,
    password: string,
    name: string = ""
  ) => {
    if (authMode === "signup") {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (data.user) {
        await supabase
          .from("profiles")
          .insert([{ id: data.user.id, name, is_premium: false }]);
        setUser(data.user);
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (data.user) setUser(data.user);
    }
    setShowAuthModal(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setBudgetItems([]);
    setCurrentView("dashboard");
  };

  const addBudgetItem = async () => {
    if (!newItem.name || !newItem.budget || !user) return;

    const { data, error } = await supabase.from("budget_items").insert([
      {
        name: newItem.name,
        budgeted: parseInt(newItem.budget),
        spent: 0,
        category: newItem.category,
        month: currentMonth,
        user_id: user.id,
      },
    ]);

    if (error) {
      console.error("Add item error:", JSON.stringify(error, null, 2));
      return;
    }

    if (data) setBudgetItems([...budgetItems, ...data]);
    setNewItem({ name: "", budget: "", category: "grains" });
    setShowAddItemModal(false);
  };

  const updateSpent = async (id: number, amount: string) => {
    if (!user) return;
    const spent = parseInt(amount) || 0;
    const { error } = await supabase
      .from("budget_items")
      .update({ spent })
      .eq("id", id)
      .eq("user_id", user.id);

    if (!error) {
      setBudgetItems(
        budgetItems.map((item) => (item.id === id ? { ...item, spent } : item))
      );
    }
  };

  const totalBudgeted = budgetItems.reduce(
    (sum, item) => sum + item.budgeted,
    0
  );
  const totalSpent = budgetItems.reduce((sum, item) => sum + item.spent, 0);
  const remainingBudget = totalBudgeted - totalSpent;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Ounje App</h1>
      {user ? (
        <>
          <div className="mb-4">
            <p className="text-lg font-semibold">Welcome, {user.email}</p>
            <p className="text-sm">Premium: {isPremium ? "Yes" : "No"}</p>
            <button
              onClick={handleLogout}
              className="mt-2 text-red-600 underline"
            >
              Logout
            </button>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Your Budget</h2>
            <p>Total Budgeted: ₦{totalBudgeted}</p>
            <p>Total Spent: ₦{totalSpent}</p>
            <p>Remaining: ₦{remainingBudget}</p>
          </div>

          <div className="mb-4">
            <h3 className="font-medium mb-1">Add New Item</h3>
            <input
              type="text"
              placeholder="Food Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="border px-2 py-1 rounded w-full mb-2"
            />
            <input
              type="number"
              placeholder="Budget (₦)"
              value={newItem.budget}
              onChange={(e) =>
                setNewItem({ ...newItem, budget: e.target.value })
              }
              className="border px-2 py-1 rounded w-full mb-2"
            />
            <button
              onClick={addBudgetItem}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Add Item
            </button>
          </div>

          <div>
            <h3 className="font-medium mb-2">Tracked Items</h3>
            {budgetItems.map((item) => (
              <div key={item.id} className="border rounded p-2 mb-2">
                <p className="font-semibold">{item.name}</p>
                <p>Budgeted: ₦{item.budgeted}</p>
                <p>Spent: ₦{item.spent}</p>
                <input
                  type="number"
                  value={item.spent}
                  onChange={(e) => updateSpent(item.id, e.target.value)}
                  className="border px-2 py-1 mt-1 w-full"
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>
          <h2 className="text-lg font-semibold">Login / Sign Up</h2>
          <button
            onClick={() => handleAuth("user@example.com", "password")}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
          >
            Quick Login (test)
          </button>
        </div>
      )}
    </div>
  );
};

export default OunjeApp;
