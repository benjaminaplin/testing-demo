import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";

type CustomRenderOptions = {
  routeOptions?: { path: string; route: string };
};

const getAllProviders = (options: CustomRenderOptions | undefined) => {
  return ({ children }: { children: React.ReactNode }) => {
    const routeOption = options?.routeOptions?.route || "/";
    const pathOption = options?.routeOptions?.path || "/";
    return (
      <Router initialEntries={[routeOption]}>
        <Routes>
          <Route path={pathOption} element={children}></Route>
        </Routes>
      </Router>
    );
  };
};

const provideForStoryBookTemplate = (
  template: any,
  options: CustomRenderOptions = {}
) => {
  const AllTheProviders = getAllProviders(options);
  return <AllTheProviders>{template}</AllTheProviders>;
};

const customRender = (ui: any, options?: CustomRenderOptions) => {
  const AllTheProviders = getAllProviders(options);
  return render(ui, { wrapper: AllTheProviders, ...options });
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render, provideForStoryBookTemplate as provide };