import React, { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, Calendar, MapPin, Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest } from "@/lib/queryClient";
import type { CounterfeitReport } from "@shared/schema";

export default function Dashboard() {
  const [_, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  
  const { 
    data: reports, 
    isLoading,
    refetch 
  } = useQuery<CounterfeitReport[]>({
    queryKey: ['/api/reports'],
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    // Refetch with the search query
    refetch();
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Under Investigation":
        return "bg-yellow-100 text-yellow-800";
      case "Confirmed Counterfeit":
        return "bg-green-100 text-green-800";
      case "Investigation Complete":
        return "bg-red-100 text-red-800";
      default:
        return "bg-neutral-100 text-neutral-800";
    }
  };

  // Format date from ISO string to human readable
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'Unknown date';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-800">Counterfeit Reports Dashboard</h1>
        <Button
          variant="outline"
          onClick={handleBackToHome}
        >
          Back to Home
        </Button>
      </div>

      <Card>
        <div className="border-b border-neutral-200 px-4 py-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between sm:flex-nowrap">
            <div>
              <h3 className="text-lg leading-6 font-medium text-neutral-900">Recent Reports</h3>
              <p className="mt-1 text-sm text-neutral-500">
                A list of all counterfeit product reports submitted by users.
              </p>
            </div>
            <div className="flex-shrink-0">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  id="search-reports"
                  className="pr-10"
                  placeholder="Search reports"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Search className="h-5 w-5 text-neutral-400" />
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="divide-y divide-neutral-200">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="px-4 py-4 sm:px-6">
                <div className="flex justify-between">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-3 w-32 mt-2" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-32 rounded-full" />
                </div>
                <div className="mt-4 flex justify-between">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-40" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ul className="divide-y divide-neutral-200">
            {reports && reports.length > 0 ? (
              reports.map((report) => (
                <li key={report.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-red-100 rounded-full flex items-center justify-center text-red-500">
                          <AlertTriangle className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-sm font-medium text-neutral-900">{report.productId}</h4>
                          <p className="text-sm text-neutral-500">Seller: {report.sellerName}</p>
                        </div>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(report.status || '')}`}>
                          {report.status || 'Unknown'}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-neutral-500">
                          <MapPin className="flex-shrink-0 mr-1.5 h-5 w-5 text-neutral-400" />
                          <span>{report.purchaseLocation}</span>
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-neutral-500 sm:mt-0">
                        <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-neutral-400" />
                        <span>
                          Reported on <time dateTime={report.reportDate?.toString() || ''}>{formatDate(report.reportDate)}</time>
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="px-4 py-6 text-center text-neutral-500">
                No reports found. When users report counterfeit products, they will appear here.
              </li>
            )}
          </ul>
        )}
      </Card>
    </div>
  );
}
