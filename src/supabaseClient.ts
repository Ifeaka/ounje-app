// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://spiurnebpiaotrpkmewd.supabase.co';
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwaXVybmVicGlhb3RycGttZXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MDM5OTEsImV4cCI6MjA2NzM3OTk5MX0.TXxGhD_6nHO9Bkj4BKZkOJuf00yM6IvlK8BatefpCEY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
