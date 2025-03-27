import { DataTableDemo } from "./components/DataTableDemo"
import { supabase } from "@/lib/supabase"

// This is an async Server Component that will fetch data from Supabase
export default async function Home() {
  // Fetch data from Supabase
  // Replace 'your_table_name' with your actual table name
  const { data, error } = await supabase
    .from('cleaners')
    .select('*')
    .limit(100)
  
  if (error) {
    console.error('Error fetching data:', error)
  }

  console.log({ data })

  return (
    <div className="container py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Welcome Home</h1>
      <DataTableDemo data={data || []} />
    </div>
  )
}
