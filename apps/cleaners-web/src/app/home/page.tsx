"use client"

import { DataTableDemo } from "./components/DataTableDemo"
import { createClient } from "@/utils/supabase/client"
import { useQuery } from "@tanstack/react-query"

export default function Home() {

  // Use react-query to fetch data from Supabase
  const { data, isLoading, error } = useQuery({
    queryKey: ['home', 'cleaners'],
    queryFn: async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('cleaners')
        .select('*')
        .limit(100)
      
      if (error) {
        throw new Error(error.message)
      }
      
      return data || []
    }
  })

  console.log({ data })
  
  // Show error state
  if (error) return <div>Error: {error instanceof Error ? error.message : 'Unknown error'}</div>

  return (
    <div className="container py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Welcome Home</h1>
      <DataTableDemo data={data} isLoading={isLoading} />
    </div>
  )
}
