import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { User } from "@supabase/supabase-js";
import OunjeApp from "./OunjeApp";
import LandingPage from "./LandingPage";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data?.session?.user || null);
    });
  }, []);

  return user ? <OunjeApp /> : <LandingPage />;
}

export default App;
