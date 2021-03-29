import { db } from "configs/firebase";
import { useEffect, useState } from "react";

type Blog = {
  id: string;
  imageUrl: string;
  title: string;
};

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loaded, setLoaded] = useState(false);

  const getBlogs = () => {
    return db.collection("blogs").onSnapshot((snapshot) => {
      const docs: any = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setBlogs(docs);
      setLoaded(true);
    });
  };

  useEffect(() => {
    const unsubscribe = getBlogs();
    return () => {
      unsubscribe();
    };
  }, []);

  return {
    blogs,
    getBlogs,
    loaded,
  };
};
