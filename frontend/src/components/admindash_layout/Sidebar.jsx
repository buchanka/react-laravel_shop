import { Link } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, User, Users, InboxIcon, List } from "lucide-react";
import { Card } from "../ui/card";
import AdminLogoutButton from "./AdminLogoutButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Sidebar() {
  return (
    <div className="border-r bg-muted/40 md:block w-64 fixed h-screen ">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <h1 className="text-xl font-semibold">Админ</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin_dash" className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted">
            <LayoutDashboard className="w-5 h-5" /> Дашборд
          </Link>
          <Link to="/admin_dash/products" className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted">
            <Package className="w-5 h-5" /> Товары
          </Link>
          <Link to="/admin_dash/orders" className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted">
            <ShoppingCart className="w-5 h-5" /> Заказы
          </Link>
          <Link to="/admin_dash/users" className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted">
            <Users className="w-5 h-5" /> Пользователи
          </Link>
          <Link to="/admin_dash/collections" className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted">
            <InboxIcon className="w-5 h-5" /> Коллекции свечей
          </Link>
          <Link to="/admin_dash/categories" className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted">
            <List className="w-5 h-5" /> Категории свечей
          </Link>
          <div className="flex justify-center p-4">
            <AdminLogoutButton className="w-24 h-16"/>
          </div>
        </nav>
      </div>
    </div>
  );
}