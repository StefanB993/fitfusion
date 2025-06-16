import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://fdrjcrrrxwntvbtcheks.supabase.co";
export const supabaseStorage = `${supabaseUrl}/storage/v1/object/public/`;
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkcmpjcnJyeHdudHZidGNoZWtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzNjA0MTEsImV4cCI6MjA1NjkzNjQxMX0.hvYZo21bqJx4TuJsmnONuRZvIwH4QpxghZLsNCxQkm8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
