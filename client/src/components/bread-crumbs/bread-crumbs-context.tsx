import { createContext, ReactNode, useContext, useState } from 'react';

type Breadcrumb = {
  label: string;
  href: string;
};

type BreadcrumbsContextType = {
  breadcrumbs: Breadcrumb[];
  setBreadcrumbs: (newBreadcrumbs: Breadcrumb[]) => void;
};

const BreadcrumbsContext = createContext<BreadcrumbsContextType | undefined>(undefined);

export const BreadcrumbsProvider = ({ children }: { children: ReactNode }) => {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

  return (
    <BreadcrumbsContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
      {children}
    </BreadcrumbsContext.Provider>
  );
};

export const useBreadcrumbs = () => {
  const context = useContext(BreadcrumbsContext);
  if (!context) {
    throw new Error('useBreadcrumbs must be used within a BreadcrumbsProvider');
  }
  return context;
};
