"use client"

import { DataTable } from "./components/DataTable"
import { createClient } from "@/utils/supabase/client"
import { useQuery } from "@tanstack/react-query"

const columns = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Phone",
    accessorKey: "phone",
  },
  {
    header: "Location",
    accessorKey: "location",
  },
  {
    header: "Services",
    accessorKey: "services",
  },
  {
    header: "Price",
    accessorKey: "price",
  },
  {
    header: "Created At",
    accessorKey: "created_at",
  },
]

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
      <DataTable data={data} columns={columns} isLoading={isLoading} />
    </div>
  )
}
