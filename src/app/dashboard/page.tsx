import { WidgetItem } from "../../components";

export default function DashboardPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    
        {/* TODO: src/components <WidgetItem /> */}
        <WidgetItem title="Total Revenue" amount={12000} percentage={10} comparedTo={10000} />
      
    </div>
  );
}