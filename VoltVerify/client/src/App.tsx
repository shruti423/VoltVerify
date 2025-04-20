import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Layout from "@/components/layout";
import Home from "@/pages/home";
import Scanner from "@/pages/scanner";
import AuthenticResult from "@/pages/authentic-result";
import CounterfeitResult from "@/pages/counterfeit-result";
import ReportSubmitted from "@/pages/report-submitted";
import Dashboard from "@/pages/dashboard";
import Manufacturer from "@/pages/manufacturer";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/scanner" component={Scanner} />
        <Route path="/authentic-result" component={AuthenticResult} />
        <Route path="/counterfeit-result" component={CounterfeitResult} />
        <Route path="/report-submitted" component={ReportSubmitted} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/manufacturer" component={Manufacturer} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
