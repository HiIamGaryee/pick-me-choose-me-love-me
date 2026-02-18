import { useEffect, useMemo, useState } from "react";
import { getProductList } from "../api/admin";

export type Product = {
  id: number;
  code: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
};

export const useProducts = (limit = 200, offset = 0) => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getProductList(limit, offset);
        setData(res.data || []);
      } catch (e) {
        setError("Failed to load products");
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [limit, offset]);

  const mapByCode = useMemo(() => {
    const m = new Map<string, Product>();
    data.forEach((p: any) => m.set(p.code, p));
    return m;
  }, [data]);

  return { data, loading, error, mapByCode };
};


