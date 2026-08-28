"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { Columns3, Download, MoreHorizontal, Plus, Search, Trash2} from "lucide-react"

import { getOrders, saveOrders } from "@/data/orders"

import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator} from "@/components/ui/breadcrumb"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"

const columns = [
  { id: "order", label: "Order" },
  { id: "customer", label: "Customer" },
  { id: "product", label: "Product" },
  { id: "status", label: "Status" },
  { id: "date", label: "Date" },
  { id: "amount", label: "Amount" },
]

  

export default function OrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState([])
  const [status, setStatus] = useState("all")
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [selectedOrders, setSelectedOrders] = useState(new Set())

  const [visibleColumns, setVisibleColumns] = useState({
    order: true,
    customer: true,
    product: true,
    status: true,
    date: true,
    amount: true,
  })

  const filteredOrders = orders.filter((order) => {

    const matchesStatus = status === "all" || order.status === status
    const searchValue = search.toLowerCase()

    const matchesSearch =
      order.id.toLowerCase().includes(searchValue) ||
      order.customer.name.toLowerCase().includes(searchValue) ||
      order.customer.email.toLowerCase().includes(searchValue) ||
      order.product.name.toLowerCase().includes(searchValue)

    return matchesStatus && matchesSearch
  })

  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + rowsPerPage)

  const pageOrderIds = paginatedOrders.map((order) => order.id)
  const selectedOnPage = pageOrderIds.filter((id) => selectedOrders.has(id))
  const allSelected = pageOrderIds.length > 0 && selectedOnPage.length === pageOrderIds.length
  const someSelected = selectedOnPage.length > 0 && !allSelected

  const toggleColumn = (column) => {
    setVisibleColumns((prev) => ({...prev, [column]: !prev[column]}))
  }

  const toggleOrder = (id) => {
    setSelectedOrders((prev) => {
      const next = new Set(prev)

      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }

      return next
    })
  }

  const togglePageOrders = () => {
    setSelectedOrders((prev) => {
      const next = new Set(prev)

      if (allSelected) {
        pageOrderIds.forEach((id) => next.delete(id))
      } else {
        pageOrderIds.forEach((id) => next.add(id))
      }

      return next
    })
  }

  const clearSelection = () => {setSelectedOrders(new Set())}

  const deleteOrder = (id) => {
    setOrders((prev) => {
      const updatedOrders = prev.filter((order) => order.id !== id)

      saveOrders(updatedOrders)

      return updatedOrders
    })

    setSelectedOrders((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  const deleteSelected = () => {
    setOrders((prev) => {
      const updatedOrders = prev.filter(
        (order) => !selectedOrders.has(order.id)
      )

      saveOrders(updatedOrders)

      return updatedOrders
    })

    setSelectedOrders(new Set())

    if (
      currentPage > 1 &&
      startIndex >= filteredOrders.length - selectedOrders.size
    ) {
      setCurrentPage((page) => Math.max(1, page - 1))
    }
  }

  const clearFilters = () => {
    setSearch("")
    setStatus("all")
    setCurrentPage(1)
  }

  const handleExport = () => {
    const headers = ["Order", "Customer", "Email", "Product", "Status", "Date", "Amount"]

    const rows = filteredOrders.map((order) => [
      order.id,
      order.customer.name,
      order.customer.email,
      order.product.name,
      order.status,
      order.date,
      `${order.amount} ${order.currency}`,
    ])

    const csv = [headers, ...rows]
      .map((row) => row.map((value) => `"${value}"`).join(","))
      .join("\n")

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")

    link.href = url
    link.download = "orders.csv"
    link.click()

    URL.revokeObjectURL(url)
  }

  const statusClass = {
    completed:
      "bg-green-500/15 text-green-600 dark:text-green-400",
    pending:
      "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400",
    cancelled:
      "bg-red-500/15 text-red-600 dark:text-red-400",
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    if (params.get("created") === "true") {
      toast.success("Order created successfully", {
        description: "The new order has been added to the orders list.",
        duration: 5000,
      })

      window.history.replaceState({}, "", "/orders")
    }
  }, [])

  useEffect(() => {
    setOrders(getOrders())
  }, [])

  

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/" />}>
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>Orders</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Orders
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage and track all customer orders.
          </p>
        </div>

        <Button onClick={() => router.push("/orders/new")}>
          <Plus />
          New Order
        </Button>
      </div>

      <div className="space-y-4">
        <Tabs
          value={status}
          onValueChange={(value) => {
            setStatus(value)
            setCurrentPage(1)
            clearSelection()
          }}
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex w-full items-center justify-between">
          {selectedOrders.size > 0 ? (
            <div className="flex w-200 items-center gap-2">
              <span className="w-auto text-sm font-medium">
                {selectedOrders.size} selected
              </span>

              <Button
                variant="destructive"
                size="sm"
                onClick={deleteSelected}
              >
                <Trash2 />
                Delete ({selectedOrders.size})
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={clearSelection}
                className="hover:bg-secondary! hover:text-black"
              >
                Clear
              </Button>
            </div>
          ) : (
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value)
                  setCurrentPage(1)
                }}
                placeholder="Search orders..."
                className="pl-9"
              />
            </div>
          )}

          <div className="flex w-full items-center justify-end gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="outline" size="icon" />}
              >
                <Columns3 />
                <span className="sr-only">Columns</span>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                {columns.map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={visibleColumns[column.id]}
                    onCheckedChange={() =>
                      toggleColumn(column.id)
                    }
                  >
                    {column.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" onClick={handleExport}>
              <Download />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <Table className="min-w-225">
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={
                      allSelected
                        ? true
                        : someSelected
                          ? "indeterminate"
                          : false
                    }
                    onCheckedChange={togglePageOrders}
                    aria-label="Select all orders"
                  />
                </TableHead>

                {visibleColumns.order && (
                  <TableHead>Order</TableHead>
                )}

                {visibleColumns.customer && (
                  <TableHead>Customer</TableHead>
                )}

                {visibleColumns.product && (
                  <TableHead>Product</TableHead>
                )}

                {visibleColumns.status && (
                  <TableHead>Status</TableHead>
                )}

                {visibleColumns.date && (
                  <TableHead>Date</TableHead>
                )}

                {visibleColumns.amount && (
                  <TableHead>Amount</TableHead>
                )}

                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedOrders.length > 0 ? (
                paginatedOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedOrders.has(order.id)}
                        onCheckedChange={() =>
                          toggleOrder(order.id)
                        }
                        aria-label={`Select ${order.id}`}
                      />
                    </TableCell>

                    {visibleColumns.order && (
                      <TableCell className="font-medium">
                        {order.id}
                      </TableCell>
                    )}

                    {visibleColumns.customer && (
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="size-8">
                            <AvatarFallback>
                              {order.customer.initials}
                            </AvatarFallback>
                          </Avatar>

                          <div>
                            <p className="font-medium">
                              {order.customer.name}
                            </p>

                            <p className="text-xs text-muted-foreground">
                              {order.customer.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                    )}

                    {visibleColumns.product && (
                      <TableCell>
                        {order.product.name}
                      </TableCell>
                    )}

                    {visibleColumns.status && (
                      <TableCell>
                        <Badge
                          className={`w-auto p-2 capitalize ${statusClass[order.status]}`}
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                    )}

                    {visibleColumns.date && (
                      <TableCell>{order.date}</TableCell>
                    )}

                    {visibleColumns.amount && (
                      <TableCell className="font-medium">
                        ${order.amount.toLocaleString()}
                      </TableCell>
                    )}

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Button
                              variant="ghost"
                              size="icon"
                            />
                          }
                        >
                          <MoreHorizontal />
                          <span className="sr-only">
                            Actions
                          </span>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              router.push(
                                `/orders/${order.id}`
                              )
                            }
                          >
                            View Order
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() =>
                              router.push(
                                `/orders/${order.id}/edit`
                              )
                            }
                          >
                            Edit Order
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() =>
                              deleteOrder(order.id)
                            }
                            className="text-red-600 hover:text-red-600! focus:bg-red-500/10 focus:text-red-600!"
                          >
                            <Trash2
                              style={{ stroke: "#dc2626" }}
                            />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={
                      Object.values(visibleColumns).filter(Boolean)
                        .length + 2
                    }
                    className="h-40 text-center"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <p className="font-medium">
                        No orders found
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Try changing your search or filter.
                      </p>

                      {(search || status !== "all") && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={clearFilters}
                        >
                          Clear filters
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col gap-3 border-t border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredOrders.length ? startIndex + 1 : 0}-
            {Math.min(
              startIndex + rowsPerPage,
              filteredOrders.length
            )}{" "}
            of {filteredOrders.length} results
          </p>

          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Rows
              </span>

              <select
                value={rowsPerPage}
                onChange={(event) => {
                  setRowsPerPage(Number(event.target.value))
                  setCurrentPage(1)
                  clearSelection()
                }}
                className="h-8 rounded-md border border-border bg-background px-2 text-sm outline-none"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage((page) => page - 1)
                  clearSelection()
                }}
              >
                Previous
              </Button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (
                <Button
                  key={page}
                  variant={
                    currentPage === page
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() => {
                    setCurrentPage(page)
                    clearSelection()
                  }}
                >
                  {page}
                </Button>
              ))}

              <Button
                variant="outline"
                size="sm"
                disabled={
                  currentPage === totalPages ||
                  totalPages === 0
                }
                onClick={() => {
                  setCurrentPage((page) => page + 1)
                  clearSelection()
                }}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}