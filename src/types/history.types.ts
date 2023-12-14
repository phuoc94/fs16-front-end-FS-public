export type History = {
  borrowed_Date: string;
  returned_Date: string;
  book: {
    _id: string;
    title: string;
    img: string;
  };
  returned: boolean;
};
