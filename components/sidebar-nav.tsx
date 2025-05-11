"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon?: React.ReactNode
    subItems?: {
      href: string
      title: string
    }[]
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex flex-col space-y-1 sticky top-20", className)} {...props}>
      <ScrollArea className="h-[calc(100vh-120px)] pr-4">
        {items.map((item) => (
          <div key={item.href} className="mb-4">
            <Link
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100",
                pathname === item.href ? "bg-gray-100 text-gray-900" : "text-gray-600",
              )}
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {item.title}
            </Link>
            {item.subItems && item.subItems.length > 0 && (
              <div className="ml-4 mt-1 space-y-1">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className={cn(
                      "flex items-center px-3 py-1.5 text-sm rounded-md hover:bg-gray-100",
                      pathname === subItem.href ? "bg-gray-100 text-gray-900" : "text-gray-500",
                    )}
                  >
                    {subItem.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </ScrollArea>
    </nav>
  )
}
