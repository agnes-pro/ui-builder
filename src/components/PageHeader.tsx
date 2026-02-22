import Breadcrumbs from "@/components/Breadcrumbs";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export default function PageHeader({ breadcrumbs, title, description, children }: PageHeaderProps) {
  return (
    <div>
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold md:text-4xl">{title}</h1>
          {description && <p className="mt-2 text-muted-foreground">{description}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}
