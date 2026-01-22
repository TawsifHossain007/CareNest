export const dynamic = "force-dynamic";

import Service from "@/components/home/Services";
import { getService } from "@/actions/server/Service";
import SearchBar from "@/components/layouts/SearchBar";

export const metadata = {
  title: "All Services",
};

const ServicePage = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams;
  const data = await getService({
    search: resolvedSearchParams?.search || "",
    page: Number(resolvedSearchParams?.page) || 1,
  });

const { services, total, page, totalPages } = data;


  return (
    <div className="min-h-screen">
      <h2 className="text-4xl text-center font-bold mb-15">Our Services</h2>

      
      <div className="mb-15 flex items-center justify-between">
       <SearchBar></SearchBar>
        <div className="dropdown dropdown-center">
          <div tabIndex={0} role="button" className="btn btn-primary btn-outline m-1">
            Filter By:
          </div>
          <ul
            tabIndex="-1"
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
      </div>

      <Service services={services} />
    </div>
  );
};

export default ServicePage;
