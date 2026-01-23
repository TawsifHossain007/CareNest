export const dynamic = "force-dynamic";

import Service from "@/components/home/Services";
import { getService } from "@/actions/server/Service";
import SearchBar from "@/components/layouts/SearchBar";
import Pagination from "@/components/layouts/Pagination";
import SortDropdown from "@/components/layouts/SortDropdown";
import FilterDropdown from "@/components/layouts/FilterDropdown";

export const metadata = {
  title: "All Services",
};

const ServicePage = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams;
  const data = await getService({
    search: resolvedSearchParams?.search || "",
    category: resolvedSearchParams?.category || "",
    sort: resolvedSearchParams?.sort || "",
    page: Number(resolvedSearchParams?.page) || 1,
  });

  const { services, page, totalPages } = data;

  return (
    <div className="min-h-screen">
      <h2 className="text-4xl text-center font-bold mb-15 text-primary">Our Services</h2>

      <div className="mb-15 flex items-center justify-between">
        <SearchBar />
        <div className="flex items-center justify-center gap-4">
          <FilterDropdown />
          <SortDropdown currentSort={resolvedSearchParams?.sort || ""} />
        </div>
      </div>

      <Service services={services} />

      <Pagination
        page={page}
        totalPages={totalPages}
        search={resolvedSearchParams?.search || ""}
        sort={resolvedSearchParams?.sort || ""}
        category={resolvedSearchParams?.category || ""}
      />
    </div>
  );
};

export default ServicePage;
