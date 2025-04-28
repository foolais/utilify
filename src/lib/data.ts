export const ITEM_PER_PAGE = 10;

// "hardware", "software", "accessory"

export const TOOLS_CATEGORIES = [
  { value: "hardware", label: "Hardware" },
  { value: "software", label: "Software" },
  { value: "accessory", label: "Accessory" },
];

export const TOOLS_STATUS = [
  { value: "available", label: "Available" },
  { value: "unavailable", label: "Unavailable" },
  { value: "pending", label: "Pending" },
  { value: "borrowed", label: "Borrowed" },
];

export const LOANS_STATUS = [
  { value: "pending", label: "Pending" },
  { value: "rejected", label: "Rejected" },
  { value: "borrowed", label: "Borrowed" },
  { value: "returned", label: "Returned" },
  { value: "overdue", label: "Overdue" },
];
