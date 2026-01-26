import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

const products = [
  { name: "Afrisinc Cloud", status: "Live", users: "1,234" },
  { name: "Analytics Suite", status: "Live", users: "856" },
  { name: "WorkFlow Pro", status: "Beta", users: "342" },
  { name: "SecureID", status: "Live", users: "567" },
];

const DashboardProducts = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div><h1 className="text-2xl font-bold">Products</h1><p className="text-muted-foreground">Manage your products and services</p></div>
      <Button variant="gold"><Plus className="w-4 h-4 mr-2" />Add Product</Button>
    </div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <Card key={p.name} className="hover:shadow-card-hover transition-shadow cursor-pointer">
          <CardHeader><CardTitle className="flex items-center justify-between">{p.name}<Badge variant={p.status === "Live" ? "default" : "secondary"}>{p.status}</Badge></CardTitle></CardHeader>
          <CardContent><p className="text-sm text-muted-foreground">{p.users} active users</p></CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default DashboardProducts;
